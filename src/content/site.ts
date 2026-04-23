/**
 * Positioning and identity. Project facts live in `projects-data.ts`.
 */
export const siteProfile = {
  name: "Azizbek Arzikulov",
  headlineRole: "Full-stack product engineer",
  heroSummaryLines: [
    "Product engineer who ships Next.js apps where UI, APIs, auth, and real-time behavior are one delivery surface—not a handoff dump.",
    "Work spans multilingual and RTL products, data-heavy dashboards, e-commerce, identity-sensitive flows, and AI pipelines tied to real backends.",
  ],
  headlineFocus:
    "Integration-first delivery: BFF-style boundaries, session and contract discipline, and production-minded releases on TypeScript, Node, Python, and PostgreSQL family stacks.",
  positioningParagraph:
    "I am strongest when separate services have to read as one product—locales, streaming, sockets, payment and identity flows, and maintainable full-stack code. Titles are secondary to shipped systems you can run and reason about.",
  location: "Seoul, South Korea",
  availability: "Selective full-time or substantial contract (subject to work authorization for the role and location)",
  email: "azizbek.dev.uz@gmail.com",
  resumeUrl: null as string | null,
  links: {
    github: "https://github.com/azizbekdevuz",
    linkedin: "https://www.linkedin.com/in/azizbek-arzikulov",
    telegram: "https://t.me/+Abz6kYFkTX9hNzFi",
    linktree: "https://linktr.ee/azizbekuz",
  },
  heroProofTags: [
    "E-commerce + admin",
    "Multilingual + RTL",
    "Real-time & telemetry UIs",
    "World ID / trust flows",
    "AI + FastAPI workflows",
  ],
  /** Hero/credibility ordering; must match `Project.title` values */
  flagshipProjects: ["Trainium", "Rumi AI", "Fishlinic", "GitGuard Agent"],
} as const;

export type SiteProfile = typeof siteProfile;
