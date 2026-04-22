"use client";

import type { HomeData } from "@/content/home-data";
import type { SiteProfile } from "@/content/site";
import type { Project } from "@/models/Project";
import { ProofCockpit } from "@/components/cockpit/ProofCockpit";

export function HeroSection({
  site,
  projects,
  techStack,
  journeyData,
  achievements,
}: {
  site: SiteProfile;
  projects: Project[];
  techStack: HomeData["techStack"];
  journeyData: HomeData["journeyData"];
  achievements: HomeData["achievements"];
}) {
  return (
    <ProofCockpit
      site={site}
      projects={projects}
      techStack={techStack}
      journeyData={journeyData}
      achievements={achievements}
    />
  );
}
