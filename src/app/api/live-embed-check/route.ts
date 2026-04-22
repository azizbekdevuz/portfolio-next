import { NextRequest, NextResponse } from "next/server";
import {
  cspFrameAncestorsAllowsEmbedding,
  isBlockedByXFrameOptions,
  parseXFrameOptions,
} from "@/lib/liveEmbedPolicy";

export const runtime = "nodejs";

const FETCH_TIMEOUT_MS = 10_000;

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

async function fetchResponseForHeaders(target: string): Promise<Response | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const baseHeaders: Record<string, string> = {
    "User-Agent": "PortfolioLiveEmbedCheck/1.0",
    Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  };

  const initBase = {
    redirect: "follow" as const,
    signal: controller.signal,
  };

  try {
    let res = await fetch(target, { ...initBase, method: "HEAD", headers: baseHeaders });
    if (!res.ok || res.status === 405 || res.status === 501) {
      res = await fetch(target, {
        ...initBase,
        method: "GET",
        headers: { ...baseHeaders, Range: "bytes=0-0" },
      });
    }
    return res;
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

  const gate = assertPublicHttpUrl(parsed);
  if (!gate.ok) {
    return NextResponse.json({ embeddable: false, reason: gate.message });
  }

  let origin: string | null = null;
  if (embedderOrigin?.trim()) {
    try {
      origin = new URL(embedderOrigin.trim()).origin;
    } catch {
      origin = null;
    }
  }

  const res = await fetchResponseForHeaders(parsed.href);
  if (!res) {
    return NextResponse.json({ embeddable: null, reason: "fetch_failed" });
  }

  const finalUrl = res.url || parsed.href;

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
