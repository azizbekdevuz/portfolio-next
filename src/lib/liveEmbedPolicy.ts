/**
 * Heuristics for whether a URL can be shown in a cross-origin iframe from our site.
 * Matches common X-Frame-Options and CSP frame-ancestors behavior (not COEP/CORP).
 */

export type XFrameOptionsParse = "allow" | "deny" | "sameorigin";

export function parseXFrameOptions(value: string | null): XFrameOptionsParse {
  if (!value) return "allow";
  const first = value.split(",")[0]?.trim().toUpperCase() ?? "";
  if (first === "DENY") return "deny";
  if (first.startsWith("SAMEORIGIN")) return "sameorigin";
  return "allow";
}

/** External pages framed from a portfolio are never same-origin with the framed document. */
export function isBlockedByXFrameOptions(xfo: XFrameOptionsParse): boolean {
  if (xfo === "deny") return true;
  if (xfo === "sameorigin") return true;
  return false;
}

export function extractAllFrameAncestorsLists(csp: string | null): string[][] {
  if (!csp) return [];
  const lists: string[][] = [];
  const re = /frame-ancestors\s+([^;]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(csp)) !== null) {
    const tokens = m[1].trim().split(/\s+/).filter(Boolean);
    if (tokens.length) lists.push(tokens);
  }
  return lists;
}

function directiveAllowsEmbedder(
  tokens: string[],
  documentOrigin: string,
  embedderOrigin: string | null,
): boolean | null {
  const lower = tokens.map((t) => t.toLowerCase());
  if (lower.includes("'none'")) return false;

  let matched = false;
  let needsOriginForUrls = false;

  for (const raw of tokens) {
    const t = raw.toLowerCase();
    if (t === "'self'" || t === "self") {
      if (embedderOrigin && embedderOrigin === documentOrigin) matched = true;
      continue;
    }
    if (/^https?:\/\//i.test(raw)) {
      if (!embedderOrigin) {
        needsOriginForUrls = true;
        continue;
      }
      try {
        if (new URL(raw).origin === new URL(embedderOrigin).origin) matched = true;
      } catch {
        /* ignore */
      }
    }
  }

  if (matched) return true;
  if (needsOriginForUrls && !embedderOrigin) return null;
  return false;
}

/**
 * @param documentUrl Final URL of the document that would be framed (after redirects).
 * @param embedderOrigin e.g. https://my-site.vercel.app — required to resolve URL-only allowlists.
 */
export function cspFrameAncestorsAllowsEmbedding(
  csp: string | null,
  documentUrl: string,
  embedderOrigin: string | null,
): boolean | null {
  const lists = extractAllFrameAncestorsLists(csp);
  if (lists.length === 0) return true;

  let documentOrigin: string;
  try {
    documentOrigin = new URL(documentUrl).origin;
  } catch {
    return false;
  }

  for (const tokens of lists) {
    const r = directiveAllowsEmbedder(tokens, documentOrigin, embedderOrigin);
    if (r === false) return false;
    if (r === null) return null;
  }

  return true;
}
