"use client";

import { useState, useEffect } from "react";
import { DesktopInProgressSection } from "../inprogress/DesktopInProgressSection";
import { MobileInProgressSection } from "../inprogress/MobileInProgressSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function InProgressSection() {
  const { isMobile } = useDeviceDetection();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component mounts
    // This ensures we don't try to access window during SSR
    setIsClient(true);
  }, []);

  // During SSR or before client component mounts, return null or a loading state
  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary">Loading...</div>
    </div>;
  }

  // Once mounted on client, conditionally render based on viewport width
  return isMobile ? <MobileInProgressSection /> : <DesktopInProgressSection />;
}