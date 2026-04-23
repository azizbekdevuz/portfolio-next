import type { BrandIconId } from "@/lib/brand-icons";

interface Tech {
  name: string;
  /** Omit to hide proficiency bars (recommended). */
  level?: number;
  /** Resolved via `src/lib/brand-icons.tsx` */
  iconId: BrandIconId;
}

export interface TechCategory {
  id: string;
  title: string;
  techs: Tech[];
  color?: string;
}
