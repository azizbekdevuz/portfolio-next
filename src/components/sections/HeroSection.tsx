"use client";

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import HeroDesktop from "../ui/hero/HeroDesktop";
import HeroMobile from "../ui/hero/HeroMobile";

export function HeroSection() {
  const {isMobile} = useDeviceDetection();
  
  // Mobile version of Hero Section
  if (isMobile) {
    <HeroMobile />
  }
  
  // Original Desktop Version - Unchanged
  return (
    <HeroDesktop />
  );
}