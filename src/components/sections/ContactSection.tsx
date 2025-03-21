"use client";

import { useState, useEffect } from "react";
import { DesktopContactSection } from "../contact/DesktopContactSection";
import { MobileContactSection } from "../contact/MobileContactSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function ContactSection() {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  // Once mounted on client, conditionally render based on viewport width
  return isMobile ? <MobileContactSection /> : <DesktopContactSection />;
}