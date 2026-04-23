export interface JourneyData {
  /** Required for locale override merges (`messages/overrides/*` keys). */
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  /** @deprecated Prefer lucide map by id in UI */
  icon?: string;
  tech: string[];
  link?: string;
}
