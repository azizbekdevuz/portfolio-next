"use client";

import { useState, useEffect } from "react";
import { DesktopContactSection } from "../contact/DesktopContactSection";
import { MobileContactSection } from "../contact/MobileContactSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { SiteProfile } from "@/content/site";

export function ContactSection({ site, embedded = false }: { site: SiteProfile; embedded?: boolean }) {
  const { messages } = useI18n();
  const { isMobile } = useDeviceDetection();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component mounts
    // This ensures we don't try to access window during SSR
    setIsClient(true);
  }, []);

  // During SSR or before client component mounts, return a loading state
  if (!isClient) {
    return (
      <div
        className={`flex items-center justify-center ${embedded ? "min-h-24" : "min-h-screen"}`}
      >
        <div className="animate-pulse text-primary">{messages.contact.loading}</div>
      </div>
    );
  }

  return isMobile ? (
    <MobileContactSection site={site} embedded={embedded} />
  ) : (
    <DesktopContactSection embedded={embedded} />
  );
}