import type { Project } from "@/models/Project";

/** String-shaped site fields for locale merges (avoids `as const` literal typing from `SiteProfile`). */
export type LocalizedSiteOverride = {
  headlineRole: string;
  heroSummaryLines: readonly string[];
  heroProofTags: readonly string[];
  location: string;
  availability: string;
  headlineFocus: string;
  positioningParagraph: string;
};

/** Server-only merge payloads for non-English locales. */
export type LocalizedOverrides = {
  site: LocalizedSiteOverride;
  /** Locale-specific project copy. Omitted fields keep base `content/projects-data` strings. */
  projectsBySlug: Partial<
    Record<
      string,
      Partial<
        Pick<
          Project,
          | "title"
          | "summary"
          | "whyItMatters"
          | "description"
          | "projectType"
          | "role"
          | "timeline"
          | "teamContext"
          | "problem"
          | "outcome"
          | "owned"
          | "architectureNotes"
          | "challenges"
          | "metrics"
          | "codeSnippet"
        >
      >
    >
  >;
  bio: Record<string, { title: string; content: string }>;
  journey: Record<
    string,
    { date: string; title: string; subtitle: string; description: string }
  >;
  techCategories: Record<string, { title: string }>;
  achievementCategories: Record<string, { title: string }>;
};
