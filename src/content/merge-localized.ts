/**
 * Server-only: merges `messages/overrides/*` onto static `content/*` home data.
 * Project and site patches are allowlisted so overrides cannot reshape structural fields.
 */
import type { HomeData } from "./home-data";
import {
  LOCALIZED_PROJECT_COPY_KEYS,
  type LocalizedOverrides,
  type LocalizedSiteOverride,
} from "@/messages/overrides/types";
import type { Project } from "@/models/Project";
import { getHomeData } from "./home-data";

function mergeLocalizedSite(base: HomeData["site"], o: LocalizedSiteOverride): HomeData["site"] {
  return {
    ...base,
    headlineRole: o.headlineRole,
    heroSummaryLines: o.heroSummaryLines,
    heroProofTags: o.heroProofTags,
    location: o.location,
    availability: o.availability,
    headlineFocus: o.headlineFocus,
    positioningParagraph: o.positioningParagraph,
  } as HomeData["site"];
}

function mergeLocalizedProjectCopy(
  base: Project,
  patch: Partial<Pick<Project, (typeof LOCALIZED_PROJECT_COPY_KEYS)[number]>>,
): Project {
  const updates: Partial<Project> = {};
  for (const key of LOCALIZED_PROJECT_COPY_KEYS) {
    const v = patch[key];
    if (v !== undefined) Object.assign(updates, { [key]: v });
  }
  return { ...base, ...updates };
}

function mergeHomeData(base: HomeData, o: LocalizedOverrides): HomeData {
  return {
    ...base,
    site: mergeLocalizedSite(base.site, o.site),
    projects: base.projects.map((p) => {
      const t = o.projectsBySlug[p.slug];
      if (!t) return p;
      return mergeLocalizedProjectCopy(p, t);
    }),
    bioSections: base.bioSections.map((b) => {
      const t = o.bio[b.id];
      return t ? { ...b, title: t.title, content: t.content } : b;
    }),
    journeyData: base.journeyData.map((j) => {
      const t = o.journey[j.id];
      if (!t) return j;
      return {
        ...j,
        date: t.date,
        title: t.title,
        subtitle: t.subtitle,
        description: t.description,
      };
    }),
    techStack: Object.fromEntries(
      Object.entries(base.techStack).map(([key, cat]) => {
        const t = o.techCategories[key];
        return [key, t ? { ...cat, title: t.title } : cat];
      }),
    ) as HomeData["techStack"],
    achievements: base.achievements.map((a) => {
      const t = o.achievementCategories[a.id];
      return t ? { ...a, title: t.title } : a;
    }),
  };
}

export function buildHomeDataWithOverrides(overrides: LocalizedOverrides | null): HomeData {
  const base = getHomeData();
  if (!overrides) return base;
  return mergeHomeData(base, overrides);
}
