export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  liveLink?: string;
  githubLink?: string;
  codeSnippet: string;
  mockupImage: string;
  imageUrl?: string;
  category?: string;
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
