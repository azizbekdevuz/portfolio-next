import type { RoleTrack } from "@/models/Project";

export type RoleTrackId = RoleTrack | "all";

export const roleTracksContent = [
  {
    id: "frontend" as const,
    label: "Frontend / Product UI",
    blurb: "Multilingual surfaces, streaming UX, dashboards—product chrome, not one-off pages.",
  },
  {
    id: "fullstack" as const,
    label: "Full-stack / Systems",
    blurb: "Storefront + admin, auth, payments, notifications—BFF seams and ship discipline.",
  },
  {
    id: "ai" as const,
    label: "AI / Workflow products",
    blurb: "Pipelines and verification-minded flows—not a thin chat wrapper.",
  },
] as const;
