import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { OptimizedCursor } from "@/components/ui/Cursor";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { NavigationDots } from "@/components/navigation/NavigationDots";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { fonts } from "@/libs/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Azizbek Arzikulov",
  description: "Web Developer portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="bg-light dark:bg-dark text-text-primary dark:text-text-light">
      <SpeedInsights />
        <ThemeProvider>
          <ProgressProvider>
            {/* Custom cursor */}
            <OptimizedCursor />

            {/* Animated background gradient */}
            <BackgroundGradient />

            {/* Dynamic navigation dots */}
            <NavigationDots />

            {/* Main content */}
            <main className="relative min-h-screen">{children}</main>
          </ProgressProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
