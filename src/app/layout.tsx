import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import DeviceDetectionWrapper from "@/components/DeviceDetectionWrapper";
import { Analytics } from "@vercel/analytics/react";
import { fonts } from "@/libs/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Azizbek Arzikulov",
  description: "Web Developer portfolio showcasing projects and skills",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="bg-light dark:bg-dark text-text-primary dark:text-text-light">
      <SpeedInsights />
        <ThemeProvider>
        <DeviceDetectionWrapper>{children}</DeviceDetectionWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}