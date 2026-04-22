import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiate";

function pathnameLocale(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg && isLocale(seg) ? seg : null;
}

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/") || pathname.startsWith("/_vercel")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next")) {
    const res = NextResponse.next();
    if (pathname.startsWith("/_next/static")) {
      res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    return res;
  }

  if (/\.[\w]+$/.test(pathname.split("/").pop() ?? "")) {
    return NextResponse.next();
  }

  const cookieRaw = request.cookies.get(LOCALE_COOKIE)?.value;
  const cookieLocale = cookieRaw && isLocale(cookieRaw) ? cookieRaw : null;

  if (pathname === "/") {
    const target: Locale = cookieLocale ?? negotiateLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${target}`;
    return NextResponse.redirect(url);
  }

  const current = pathnameLocale(pathname);
  if (current) {
    const res = withLocaleHeader(request, current);
    res.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    return res;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && !isLocale(segments[0])) {
    const target: Locale =
      cookieLocale ?? negotiateLocale(request.headers.get("accept-language")) ?? defaultLocale;
    return NextResponse.redirect(new URL(`/${target}`, request.url));
  }

  const url = request.nextUrl.clone();
  const fallback: Locale = cookieLocale ?? defaultLocale;
  url.pathname = `/${fallback}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)", "/_next/static/:path*"],
};
