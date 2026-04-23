export interface BioSection {
  id: string;
  title: string;
  content: string;
  /** @deprecated Prefer lucide map by id in UI */
  icon?: string;
}
