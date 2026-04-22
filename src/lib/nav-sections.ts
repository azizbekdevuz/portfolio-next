/** Scroll-spy targets — order matches homepage sections (compressed IA). */
export const MAIN_SECTION_IDS = [
  "hero",
  "projects",
  "about",
  "skills",
  "contact",
  "in-progress",
] as const;

export type MainSectionId = (typeof MAIN_SECTION_IDS)[number];
