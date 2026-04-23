import type { BioSection } from "@/models/Bio";
import type { JourneyData } from "@/models/Journey";
import type { TechCategory } from "@/models/TechStack";
import type { Achievement } from "@/models/Achievement";

/** Source: local resume PDFs; dates match materials as of the portfolio build. */
export const bioSections: BioSection[] = [
  {
    id: "build",
    title: "What I build",
    content:
      "Next.js products with real product boundaries—e-commerce, multilingual and RTL experiences, data-heavy and real-time dashboards, AI-backed workflows, and trust-sensitive flows. Integration (auth, APIs, sessions, payments, WebSockets) is part of the feature set, not a footnote.",
  },
  {
    id: "approach",
    title: "How I work",
    content:
      "Tighten seams between modules: clear contracts, explicit loading and failure states, streaming and socket behavior, and changes that stay reviewable. Prefer shippable slices over hand-wavy roadmaps.",
  },
  {
    id: "context",
    title: "Context",
    content:
      "Based in Seoul, South Korea. B.S. Computer Science and Engineering at Sejong University (in progress, expected Dec 2026). Comfortable in English for technical and product work across time zones.",
  },
];

export const journeyData: JourneyData[] = [
  {
    id: "j1",
    date: "Jan 2025 – present",
    title: "Independent product & platform work",
    subtitle: "Founder / full-stack delivery",
    description:
      "End-to-end ownership on shipped products: web apps, integrations, and deployment. Representative work includes Trainium, Rumi-related integration, Fishlinic, GitGuard Agent, and supporting builds such as ProofBoard—each with different constraints, all treated as product delivery.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Python"],
  },
  {
    id: "j2",
    date: "Oct 2025 – present",
    title: "Sejong University — research lab (internship)",
    subtitle: "Product integration & frontend delivery",
    description:
      "Product-facing work where the main risk was integration: BFF-style wiring, session and API alignment, multilingual UX, and stability on Rumi AI as the primary internal-facing example—making separately built services behave like one experience.",
    tech: ["Next.js", "TypeScript", "FastAPI integration", "SSE", "i18n / RTL"],
  },
  {
    id: "j3",
    date: "Dec 2025 – Apr 2026",
    title: "EBIT Co., Ltd. — AI trainer (contractor)",
    subtitle: "Model-facing engineering tasks & quality",
    description:
      "Repository-based software-engineering tasks for AI training products: implementation realism, debugging, environment and verifier-backed correctness, and clear technical feedback. Reinforces an evidence-first habit when something breaks or diverges from spec.",
    tech: ["Code review", "Test harnesses", "Technical writing"],
  },
  {
    id: "j4",
    date: "In progress",
    title: "Sejong University",
    subtitle: "B.S. Computer Science and Engineering (expected Dec 2026)",
    description:
      "Undergraduate program with a capstone (Fishlinic) and ongoing coursework alongside lab- and product-side work.",
    tech: ["Algorithms", "Systems", "Software engineering", "Capstone project"],
  },
];

/**
 * Tech categories: no proficiency scores; names only.
 */
export const techStack: Record<string, TechCategory> = {
  frontend: {
    id: "frontend",
    title: "Frontend",
    techs: [
      { name: "React", iconId: "react" },
      { name: "Next.js", iconId: "nextjs" },
      { name: "TypeScript", iconId: "typescript" },
      { name: "Tailwind CSS", iconId: "tailwindcss" },
      { name: "HTML", iconId: "html5" },
      { name: "CSS", iconId: "css3" },
    ],
  },
  backend: {
    id: "backend",
    title: "Backend & data",
    techs: [
      { name: "Node.js", iconId: "nodejs" },
      { name: "FastAPI", iconId: "fastapi" },
      { name: "REST", iconId: "rest" },
      { name: "GraphQL", iconId: "graphql" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "Prisma", iconId: "prisma" },
      { name: "MongoDB", iconId: "mongodb" },
    ],
  },
  languages: {
    id: "languages",
    title: "Languages",
    techs: [
      { name: "JavaScript", iconId: "javascript" },
      { name: "TypeScript", iconId: "typescript" },
      { name: "Python", iconId: "python" },
      { name: "Java", iconId: "java" },
      { name: "C++", iconId: "cpp" },
    ],
  },
  tools: {
    id: "tools",
    title: "Tooling & ops",
    techs: [
      { name: "Git", iconId: "git" },
      { name: "Docker", iconId: "docker" },
      { name: "GitHub Actions", iconId: "githubactions" },
      { name: "AWS", iconId: "aws" },
      { name: "Vercel", iconId: "vercel" },
      { name: "Nginx", iconId: "nginx" },
    ],
  },
};

export const achievements: Achievement[] = [
  {
    id: "work",
    title: "Recognition",
    items: [
      {
        title: "Scoop AI — Seoul Bowl Hackathon: top prize",
        subtitle: "GitGuard Agent (CLI + web recovery workflow)",
        description:
          "GitGuard Agent is a cross-platform Git recovery tool: snapshot-style diagnosis, merge/rebase conflict and detached-HEAD class handling, and recovery plans with explicit, undo-first steps and gated dangerous actions. Recognized in the Scoop AI / Seoul Bowl hackathon context in December 2025.",
        certificateMedia: "/certificates/scoopai.webp",
        year: "2025.12",
        highlight: "Top prize (hackathon context)",
      },
      {
        title: "Sejong capstone — People's Choice",
        subtitle: "Team Fishlinic",
        description:
          "Fishlinic: smart-aquaculture monitoring and operations dashboard with real-time telemetry, AI-enriched analysis in the product path, and integrated controls relevant to the domain. Presented as a Sejong University capstone project; recognized with a People's Choice award in the program context.",
        certificateMedia: "/certificates/pplchoice.webp",
        year: "2025.09 – 2025.12",
        highlight: "People's Choice (capstone context)",
      },
    ],
  },
];
