import type { BioSection } from "@/models/Bio";
import type { JourneyData } from "@/models/Journey";
import type { TechCategory } from "@/models/TechStack";
import type { Achievement } from "@/models/Achievement";
import type { Project } from "@/models/Project";
import type { ProofTrackFilter } from "@/lib/proof-track";
import { siteProfile, type SiteProfile } from "./site";
import { achievements, bioSections, journeyData, techStack } from "./about-data";
import { projects as rawProjects } from "./projects-data";

export type HomeData = {
  site: SiteProfile;
  bioSections: BioSection[];
  journeyData: JourneyData[];
  techStack: Record<string, TechCategory>;
  achievements: Achievement[];
  projects: Project[];
};

function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const sa = a.status === "archived" ? 1 : 0;
    const sb = b.status === "archived" ? 1 : 0;
    if (sa !== sb) return sa - sb;
    if (a.order !== b.order) return a.order - b.order;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

/** Single entry for the home route: no MongoDB/Redis at request time. */
export function getHomeData(): HomeData {
  return {
    site: siteProfile,
    bioSections,
    journeyData,
    techStack,
    achievements,
    projects: sortProjects(rawProjects),
  };
}

function getFeaturedProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.featured && p.status !== "archived")
    .sort((a, b) => {
      const ta = a.featuredTier === "secondary" ? 1 : 0;
      const tb = b.featuredTier === "secondary" ? 1 : 0;
      if (ta !== tb) return ta - tb;
      return a.order - b.order;
    });
}

export function getFeaturedProjectsForTrack(projects: Project[], track: ProofTrackFilter): Project[] {
  const list = getFeaturedProjects(projects);
  if (track === "all") return list;
  const filtered = list.filter((p) => p.roleTracks?.includes(track));
  return [...filtered].sort((a, b) => {
    const ia = a.roleTracks?.indexOf(track);
    const ib = b.roleTracks?.indexOf(track);
    const pa = ia === undefined || ia < 0 ? 99 : ia;
    const pb = ib === undefined || ib < 0 ? 99 : ib;
    if (pa !== pb) return pa - pb;
    const ta = a.featuredTier === "secondary" ? 1 : 0;
    const tb = b.featuredTier === "secondary" ? 1 : 0;
    if (ta !== tb) return ta - tb;
    return a.order - b.order;
  });
}
