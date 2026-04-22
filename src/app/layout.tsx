import type { Viewport } from "next";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { Analytics } from "@vercel/analytics/react";
import { fonts } from "@/libs/fonts";
import { DeviceDetectionProvider } from "@/components/DeviceDetectionContext";
import { defaultLocale, isLocale, LOCALE_HEADER } from "@/i18n/config";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: "#f0f4f8",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const raw = h.get(LOCALE_HEADER);
  const htmlLang = raw && isLocale(raw) ? raw : defaultLocale;

  return (
    <html lang={htmlLang} className={fonts} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta name="theme-color" content="#f0f4f8" />
        <link rel="preload" href="/assets/img/profile-img.webp" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-page text-fg">
        <DeviceDetectionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DeviceDetectionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
