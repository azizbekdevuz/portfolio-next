/**
 * Positioning and identity. Project facts live in `projects-data.ts` (source-aligned to brief).
 */
export const siteProfile = {
  name: "Azizbek Arzikulov",
  /** One serious line — not “web developer” */
  headlineRole: "Product / full-stack engineer",
  /** Above-the-fold only — max two short sentences (cockpit hero). */
  heroSummaryLines: [
    "Frontend-heavy product engineer: UI, data flow, auth, and reliability as one delivery surface.",
    "Shipped multilingual, real-time, and integration-heavy products—not brochure sites.",
  ],
  headlineFocus:
    "Frontend-heavy delivery with strong integration instincts—where UI, data flow, auth, and reliability meet.",
  positioningParagraph:
    "Strongest in the messy middle: multilingual and real-time product surfaces, BFF-style integration, and keeping separately built services feeling like one coherent product. Production-minded execution without inflated titles.",
  location: "Seoul, South Korea",
  availability: "Selective roles — full-time or substantial contract",
  email: "azizbek.dev.uz@gmail.com",
  resumeUrl: null as string | null,
  links: {
    github: "https://github.com/azizbekdevuz",
    linkedin: "https://linkedin.com/in/azizbek-arzikulov",
    telegram: "https://t.me/+Abz6kYFkTX9hNzFi",
    linktree: "https://linktr.ee/azizbekuz",
  },
  /** Above-the-fold proof chips — align with flagship work */
  heroProofTags: [
    "Integration-heavy delivery",
    "Multilingual & RTL",
    "Real-time & data-heavy UI",
    "AI workflow systems",
    "Production execution",
  ],
  /** Flagship names for hero chips (must match featured projects) */
  flagshipProjects: ["Trainium", "Rumi AI", "Fishlinic", "PatchPilot"],
} as const;

export type SiteProfile = typeof siteProfile;
