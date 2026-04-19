import type { BioSection } from "@/models/Bio";
import type { JourneyData } from "@/models/Journey";
import type { TechCategory } from "@/models/TechStack";
import type { Achievement } from "@/models/Achievement";

/** Maintainable local copy (replaces Mongo `bio` collection). */
export const bioSections: BioSection[] = [
  {
    id: "build",
    title: "What I build",
    content:
      "Large Next.js products—storefronts and admin, multilingual and RTL surfaces, dashboards, and AI workflow UIs—where integration, auth boundaries, and reliability matter as much as layout.",
  },
  {
    id: "approach",
    title: "How I work",
    content:
      "Tighten seams between services: contracts, session behavior, streaming and error states, and deployment. Prefer honest scope and reviewable changes over theater.",
  },
  {
    id: "context",
    title: "Context",
    content:
      "Based in Seoul, South Korea. Comfortable collaborating across time zones in English; background includes client delivery and product-style iteration.",
  },
];

/** Timeline entries avoid fabricated dates; refine years when you confirm them. */
export const journeyData: JourneyData[] = [
  {
    id: "j1",
    date: "Recent",
    title: "Full-stack product delivery",
    subtitle: "Next.js · TypeScript · APIs · deployment",
    description:
      "End-to-end ownership on web apps: routing and data loading, forms and auth flows, integrations, and shipping to Vercel or similar hosts.",
    tech: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS"],
  },
  {
    id: "j2",
    date: "Recent",
    title: "UI engineering with motion",
    subtitle: "Framer Motion · responsive layouts",
    description:
      "Polished marketing and app surfaces with restrained motion—used to guide hierarchy, not to hide content.",
    tech: ["Framer Motion", "CSS", "Responsive design"],
  },
];

/**
 * Tech categories: no proficiency scores—levels omitted so the UI shows names only.
 */
export const techStack: Record<string, TechCategory> = {
  frontend: {
    id: "frontend",
    title: "Frontend",
    techs: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "HTML", icon: "/icons/html.svg" },
      { name: "CSS", icon: "/icons/css.svg" },
    ],
  },
  backend: {
    id: "backend",
    title: "Backend & data",
    techs: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "REST APIs", icon: "/icons/api.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
    ],
  },
  languages: {
    id: "languages",
    title: "Languages",
    techs: [
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "C++", icon: "/icons/cpp.svg" },
    ],
  },
  tools: {
    id: "tools",
    title: "Tooling & ops",
    techs: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "Nginx", icon: "/icons/nginx.svg" },
    ],
  },
};

export const achievements: Achievement[] = [
  {
    id: "work",
    title: "Selected delivery",
    items: [
      {
        title: "Scoop AI: Seoul Bowl Hackathon - Top Prize Winner",
        subtitle: "Built GitGuardian project and won top prize",
        description:
          "GitGuard Agent is a cross-platform Git recovery tool with a snapshot CLI and web-based agent that diagnoses merge conflicts, detached HEAD, and rebase-in-progress states, then generates reversible, undo-first recovery plans with dangerous actions explicitly gated.",
        certificateMedia: "/certificates/scoopai.webp",
        year: "2025.12",
        highlight: "Top Prize Winner",
      },
      {
        title: "Capstone - People's Choice Award Winner",
        subtitle: "© 2025 Team Fishlinic - Sejong University Capstone Project",
        description:
          "Fishlinic is an IoT-based smart aquaculture management platform that combines real-time water-quality monitoring, AI-driven analysis and assistant features, hardware-integrated feeder and camera controls, and a responsive full-stack dashboard for managing aquarium operations across web devices.",
        certificateMedia: "/certificates/pplchoice.webp",
        year: "2025.09 - 2025.12",
        highlight: "People's Choice Award Winner",
      },
    ],
  },
];
