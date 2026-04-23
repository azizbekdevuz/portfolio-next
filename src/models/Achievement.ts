interface AchievementItem {
  title: string;
  subtitle: string;
  description: string;
  certificateMedia?: string;
  year: string;
  highlight: string;
}

export interface Achievement {
  id: string;
  title: string;
  items: AchievementItem[];
  /** @deprecated Prefer lucide map by id in UI */
  icon?: string;
  color?: string;
}
