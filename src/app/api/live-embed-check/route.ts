import { NextRequest, NextResponse } from "next/server";
import {
  cspFrameAncestorsAllowsEmbedding,
  isBlockedByXFrameOptions,
  parseXFrameOptions,
} from "@/lib/liveEmbedPolicy";

export const runtime = "nodejs";

const FETCH_TIMEOUT_MS = 10_000;

/**
 * Opaque “passed policy” URL for this route only. All instances are created only after
 * `assertPublicHttpUrl` (or a wrapper that calls it) succeeds, so fetches may only be issued for
 * these values.
 */
type SafePublicUrl = URL & { readonly __brand: "PublicHttp" };

function assertPublicHttpUrl(url: URL): { ok: true } | { ok: false; message: string } {
  const protocol = url.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") {
    return { ok: false, message: "unsupported_protocol" };
  }

  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "0.0.0.0" ||
    host.endsWith(".internal") ||
    host.endsWith(".local")
  ) {
    return { ok: false, message: "blocked_host" };
  }

  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 10 || a === 127 || a === 0) return { ok: false, message: "blocked_host" };
    if (a === 169 && b === 254) return { ok: false, message: "blocked_host" };
    if (a === 192 && b === 168) return { ok: false, message: "blocked_host" };
    if (a === 172 && b >= 16 && b <= 31) return { ok: false, message: "blocked_host" };
    if (a === 100 && b >= 64 && b <= 127) return { ok: false, message: "blocked_host" };
  }

  if (host.includes(":")) {
    if (host === "::1" || host.startsWith("[::1")) return { ok: false, message: "blocked_host" };
    const h = host.startsWith("[") ? host.slice(1) : host;
    if (h.startsWith("fe80:") || h.startsWith("fc") || h.startsWith("fd")) {
      return { ok: false, message: "blocked_host" };
    }
  }

  return { ok: true };
}

function toSafePublicUrl(u: URL): { ok: true; url: SafePublicUrl } | { ok: false; message: string } {
  const g = assertPublicHttpUrl(u);
  if (!g.ok) return g;
  return { ok: true, url: u as SafePublicUrl };
}

/** Only this helper issues outbound requests for embed policy checks. */
function safeFetch(
  method: "HEAD" | "GET",
  target: SafePublicUrl,
  init: { signal: AbortSignal; headers: Record<string, string> },
): Promise<Response> {
  return fetch(target, { method, redirect: "manual" as const, ...init });
}

/** Avoid fetch auto-follow: each redirect target must pass `assertPublicHttpUrl` (SSRF / internal bypass). */
const MAX_REDIRECTS = 8;

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

function isRedirectStatus(status: number): boolean {
  return REDIRECT_STATUSES.has(status);
}

function tryNextFromRedirectResponse(
  res: Response,
  current: SafePublicUrl,
): SafePublicUrl | null {
  const raw = res.headers.get("location")?.trim();
  if (!raw) return null;
  let next: URL;
  try {
    next = new URL(raw, current);
  } catch {
    return null;
  }
  const p = toSafePublicUrl(next);
  if (!p.ok) return null;
  return p.url;
}

/**
 * Fetches a response to inspect framing headers, without following redirects the platform would
 * otherwise follow without re-validating each URL (SSRF / internal bypass on redirect chains).
 */
async function fetchResponseForHeaders(start: SafePublicUrl): Promise<Response | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const baseHeaders: Record<string, string> = {
    "User-Agent": "PortfolioLiveEmbedCheck/1.0",
    Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  };

  const signal = controller.signal;

  let current: SafePublicUrl = start;
  let redirects = 0;

  try {
    for (;;) {
      if (redirects > MAX_REDIRECTS) {
        return null;
      }

      let res = await safeFetch("HEAD", current, { signal, headers: baseHeaders });
      if (isRedirectStatus(res.status)) {
        const next = tryNextFromRedirectResponse(res, current);
        if (!next) return null;
        current = next;
        redirects += 1;
        continue;
      }
      if (res.ok && res.status !== 405 && res.status !== 501) {
        return res;
      }

      res = await safeFetch("GET", current, {
        signal,
        headers: { ...baseHeaders, Range: "bytes=0-0" },
      });
      if (isRedirectStatus(res.status)) {
        const next = tryNextFromRedirectResponse(res, current);
        if (!next) return null;
        current = next;
        redirects += 1;
        continue;
      }
      return res;
    }
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  const embedderOrigin = request.nextUrl.searchParams.get("origin");

  if (!rawUrl?.trim()) {
    return NextResponse.json(
      { embeddable: null as boolean | null, reason: "missing_url" },
      { status: 400 },
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return NextResponse.json({ embeddable: null, reason: "invalid_url" }, { status: 400 });
  }

  const safe = toSafePublicUrl(parsed);
  if (!safe.ok) {
    return NextResponse.json({ embeddable: false, reason: safe.message });
  }

  let origin: string | null = null;
  if (embedderOrigin?.trim()) {
    try {
      origin = new URL(embedderOrigin.trim()).origin;
    } catch {
      origin = null;
    }
  }

  const res = await fetchResponseForHeaders(safe.url);
  if (!res) {
    return NextResponse.json({ embeddable: null, reason: "fetch_failed" });
  }

  const finalUrl = res.url || safe.url.href;

  const xfo = parseXFrameOptions(res.headers.get("x-frame-options"));
  if (isBlockedByXFrameOptions(xfo)) {
    return NextResponse.json({
      embeddable: false,
      reason: "x_frame_options",
    });
  }

  /* Report-Only policies do not enforce framing; ignore them here. */
  const csp = res.headers.get("content-security-policy");

  const cspResult = cspFrameAncestorsAllowsEmbedding(csp, finalUrl, origin);
  if (cspResult === false) {
    return NextResponse.json({ embeddable: false, reason: "csp_frame_ancestors" });
  }
  if (cspResult === null) {
    return NextResponse.json({ embeddable: null, reason: "csp_ambiguous" });
  }

  return NextResponse.json({ embeddable: true, reason: "ok" });
}
