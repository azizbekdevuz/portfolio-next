"use client";

import { useState, useEffect } from "react";
import { DesktopInProgressSection } from "../inprogress/DesktopInProgressSection";
import { MobileInProgressSection } from "../inprogress/MobileInProgressSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useI18n } from "@/components/i18n/I18nProvider";

export function InProgressSection({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const { isMobile } = useDeviceDetection();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component mounts
    // This ensures we don't try to access window during SSR
    setIsClient(true);
  }, []);

  // During SSR or before client component mounts, return null or a loading state
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
    <MobileInProgressSection embedded={embedded} />
  ) : (
    <DesktopInProgressSection embedded={embedded} />
  );
}