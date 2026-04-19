import type { HomeData } from "./home-data";
import type { LocalizedOverrides } from "@/messages/overrides/types";
import { getHomeData } from "./home-data";

function mergeHomeData(base: HomeData, o: LocalizedOverrides): HomeData {
  return {
    ...base,
    site: {
      ...base.site,
      ...o.site,
    } as HomeData["site"],
    projects: base.projects.map((p) => {
      const t = o.projectsBySlug[p.slug];
      if (!t) return p;
      return {
        ...p,
        ...(t.summary != null ? { summary: t.summary } : {}),
        ...(t.whyItMatters != null ? { whyItMatters: t.whyItMatters } : {}),
      };
    }),
    bioSections: base.bioSections.map((b) => {
      const t = o.bio[b.id];
      return t ? { ...b, title: t.title, content: t.content } : b;
    }),
    journeyData: base.journeyData.map((j) => {
      const jid = j.id;
      const t = jid ? o.journey[jid] : undefined;
      return t
        ? { ...j, date: t.date, title: t.title, subtitle: t.subtitle, description: t.description }
        : j;
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
