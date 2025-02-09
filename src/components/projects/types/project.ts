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
}
