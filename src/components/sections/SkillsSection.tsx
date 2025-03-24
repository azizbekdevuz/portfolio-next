"use client";

import SkillsDesktop from "../skills/SkillsDesktop";
import SkillsMobile from "../skills/SkillsMobile";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function SkillsSection() {
  const { isMobile } = useDeviceDetection();
  
  // Mobile version
  if (isMobile) {
    return (
      <SkillsMobile />
    );
  }

  // Original Desktop Version
  return (
    <SkillsDesktop />
  );
}