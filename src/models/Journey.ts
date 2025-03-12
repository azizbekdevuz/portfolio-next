// models/Journey.ts
export interface JourneyData {
  id?: string; // Make id optional, so we can use this interface for both input and output
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tech: string[];
  link?: string;
}

// This is the type for the database document
export interface JourneyDataDoc extends Omit<JourneyData, "id"> {
  _id: string;
}

// This helps convert MongoDB document to our JourneyData interface
export function convertDocToJourneySection(doc: JourneyDataDoc): JourneyData {
  const { _id, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
}
