"use client";

import { DesktopContactSection } from "../contact/DesktopContactSection";
import { MobileContactSection } from "../contact/MobileContactSection";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import type { SiteProfile } from "@/content/site";

export function ContactSection({ site, embedded = false }: { site: SiteProfile; embedded?: boolean }) {
  const { isMobile } = useDeviceDetection();

  return isMobile ? (
    <MobileContactSection site={site} embedded={embedded} />
  ) : (
    <DesktopContactSection embedded={embedded} />
  );
}