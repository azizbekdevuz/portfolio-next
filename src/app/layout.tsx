import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import DeviceDetectionWrapper from "@/components/DeviceDetectionWrapper";
import { Analytics } from "@vercel/analytics/react";
import { fonts } from "@/libs/fonts";
import { DeviceDetectionProvider } from "@/components/DeviceDetectionContext";
import "./globals.css";

const siteUrl = "https://portfolio-next-silk-two.vercel.app/";

export const metadata: Metadata = {
  title: "Portfolio - Azizbek Arzikulov",
  description: "Web Developer portfolio showcasing projects and skills in React, Next.js, and UI/UX design",
  metadataBase: new URL(siteUrl),
  
  // Open Graph metadata
  openGraph: {
    type: "website",
    countryName: "South Korea",
    locale: "en_US",
    url: siteUrl,
    title: "Azizbek Arzikulov - Web Developer Portfolio",
    description: "Experienced web developer specializing in React, Next.js, and modern web technologies",
    siteName: "Azizbek Arzikulov Portfolio",
    images: [
      {
        url: "/assets/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azizbek Arzikulov - Web Developer Portfolio",
      },
    ],
  },
  
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Azizbek Arzikulov - Web Developer Portfolio",
    description: "Experienced web developer specializing in React, Next.js, and modern web technologies",
    images: ["/assets/img/twitter-image.png"],
  },
  
  // Additional metadata
  keywords: ["web developer", "React", "Next.js", "portfolio", "Azizbek Arzikulov", "frontend developer"],
  authors: [{ name: "Azizbek Arzikulov" }],
  creator: "Azizbek Arzikulov",
  publisher: "Azizbek Arzikulov",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  // Add critical preconnect hints
  themeColor: "#040b14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/assets/img/profile-img.jpg" as="image" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-light dark:bg-dark text-text-primary dark:text-text-light">
        <DeviceDetectionProvider>
          <ThemeProvider>
            <DeviceDetectionWrapper>{children}</DeviceDetectionWrapper>
          </ThemeProvider>
        </DeviceDetectionProvider>
        {/* Defer non-critical scripts */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}