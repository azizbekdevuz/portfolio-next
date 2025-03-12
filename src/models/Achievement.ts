export interface AchievementItem {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  highlight: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: AchievementItem[];
}

// This is the type for the database document
export interface AchievementDocument extends Omit<Achievement, "id"> {
  _id: string;
}

// This helps convert MongoDB document to our Achievement interface
export function convertDocToAchievement(doc: AchievementDocument): Achievement {
  const { _id, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
}
