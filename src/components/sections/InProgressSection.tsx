"use client";

import { DesktopInProgressSection } from "../inprogress/DesktopInProgressSection";
import { MobileInProgressSection } from "../inprogress/MobileInProgressSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function InProgressSection({ embedded = false }: { embedded?: boolean }) {
  const { isMobile } = useDeviceDetection();

  return isMobile ? (
    <MobileInProgressSection embedded={embedded} />
  ) : (
    <DesktopInProgressSection embedded={embedded} />
  );
}