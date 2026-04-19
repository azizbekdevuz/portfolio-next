export type ProjectStatus = "live" | "wip" | "archived";

export type RoleTrack = "frontend" | "fullstack" | "ai";

export type FeaturedTier = "primary" | "secondary";

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Short line for cards and SEO */
  summary: string;
  /** e.g. Storefront product, AI workflow */
  projectType?: string;
  /** Card / recruiter-facing “why care” */
  whyItMatters?: string;
  description: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  liveLink?: string;
  /** Skip iframe preview (COEP/CORP, meta CSP, or manual override when server check is wrong). */
  livePreviewExternalOnly?: boolean;
  githubLink?: string;
  codeSnippet: string;
  mockupImage: string;
  imageUrl?: string;
  category?: string;
  featured: boolean;
  /** Homepage card emphasis */
  featuredTier?: FeaturedTier;
  status: ProjectStatus;
  /** Lower sorts earlier */
  order: number;
  /** Role-track filters for reviewer entry points */
  roleTracks?: RoleTrack[];
  /** Short labels for hero / proof chips */
  proofTags?: string[];
  role?: string;
  timeline?: string;
  teamContext?: string;
  problem?: string;
  outcome?: string;
  owned?: string;
  architectureNotes?: string;
  challenges?: string;
  /** Plain text; omit if no verified metrics */
  metrics?: string;
}

// This is the type for the database document
export interface ProjectDocument extends Omit<Project, "id"> {
  _id: string;
}

// This helps convert MongoDB document to our Project interface
export function convertDocToProject(doc: ProjectDocument): Project {
  const { _id, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
}
