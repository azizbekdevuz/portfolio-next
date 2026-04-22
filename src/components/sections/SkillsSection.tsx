"use client";

import SkillsDesktop from "../skills/SkillsDesktop";
import SkillsMobile from "../skills/SkillsMobile";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function SkillsSection({ embedded = false }: { embedded?: boolean }) {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return <SkillsMobile embedded={embedded} />;
  }

  return <SkillsDesktop embedded={embedded} />;
}