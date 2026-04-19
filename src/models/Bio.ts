export interface BioSection {
  id: string;
  title: string;
  content: string;
  /** @deprecated Prefer lucide map by id in UI */
  icon?: string;
}

// This is the type for the database document
export interface BioSectionDocument extends Omit<BioSection, "id"> {
  _id: string;
}

// This helps convert MongoDB document to our BioSection interface
export function convertDocToBioSection(doc: BioSectionDocument): BioSection {
  const { _id, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
}
