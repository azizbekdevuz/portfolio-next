export interface Tech {
  name: string;
  /** Omit to hide proficiency bars (recommended). */
  level?: number;
  icon: string;
}

export interface TechCategory {
  id: string;
  title: string;
  techs: Tech[];
  /** @deprecated Prefer lucide map by id in UI */
  icon?: string;
  color?: string;
}

// This is the type for the database document
export interface TechCategoryDocument extends Omit<TechCategory, "id"> {
  _id: string;
}

// This helps convert MongoDB document to our TechCategory interface
export function convertDocToTechCategory(
  doc: TechCategoryDocument,
): TechCategory {
  const { _id, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
}
