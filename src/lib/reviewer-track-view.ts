import type { Project } from "@/models/Project";
import type { ProofTrackFilter } from "@/lib/proof-track";
import { getFeaturedProjectsForTrack } from "@/content/home-data";

/**
 * Preferred default flagship (featured) slug when switching into a lens.
 * First slug that appears in the track-filtered featured list wins.
 */
export const DEFAULT_FEATURED_SLUG_ORDER: Record<Exclude<ProofTrackFilter, "all">, readonly string[]> = {
  frontend: ["rumi-ai", "fishlinic", "trainium", "patchpilot", "proofboard", "gitguardian"],
  fullstack: ["trainium", "patchpilot", "fishlinic", "rumi-ai", "proofboard", "gitguardian"],
  ai: ["patchpilot", "gitguardian", "rumi-ai", "fishlinic", "trainium", "proofboard"],
};

/** Reorder credibility lines so the most relevant line leads for each lens. */
export const EXPERIENCE_ORDER_BY_TRACK: Record<ProofTrackFilter, readonly string[]> = {
  all: ["independent", "sejong", "ebit"],
  frontend: ["independent", "ebit", "sejong"],
  fullstack: ["independent", "sejong", "ebit"],
  ai: ["ebit", "independent", "sejong"],
};

export function getDefaultFeaturedSlugForTrack(projects: Project[], track: ProofTrackFilter): string | null {
  const featured = getFeaturedProjectsForTrack(projects, track);
  if (featured.length === 0) return null;
  if (track === "all") return featured[0].slug;

  for (const slug of DEFAULT_FEATURED_SLUG_ORDER[track]) {
    const hit = featured.find((p) => p.slug === slug);
    if (hit) return hit.slug;
  }
  return featured[0].slug;
}

export function sortExperienceItemsByTrack<T extends { id: string }>(items: T[], track: ProofTrackFilter): T[] {
  const order = EXPERIENCE_ORDER_BY_TRACK[track];
  const rank = new Map(order.map((id, i) => [id, i]));
  return [...items].sort((a, b) => (rank.get(a.id) ?? 99) - (rank.get(b.id) ?? 99));
}
