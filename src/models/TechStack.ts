export interface Tech {
  name: string;
  level: number;
  icon: string;
}

export interface TechCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  techs: Tech[];
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
