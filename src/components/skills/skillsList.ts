import type { BrandIconId } from "@/lib/brand-icons";

interface SkillNode {
  id: string;
  title: string;
  description: string;
  tools: string[];
  experience: string;
  projects?: string[];
  workspace: {
    title: string;
    tools: { name: string; iconId: BrandIconId }[];
    environment: string;
  };
}

/** Primary positioning: engineering. Secondary nodes: supporting delivery context. */
export const skillNodes: SkillNode[] = [
  {
    id: "engineering",
    title: "Software engineering",
    description:
      "End-to-end web delivery: typed React/Next.js UIs, APIs and data access, deployment, and iteration with product constraints.",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Framer Motion",
      "Docker",
      "Vercel",
    ],
    experience: "Ongoing (product + research lab + contract)",
    projects: [
      "Trainium",
      "Rumi AI",
      "Fishlinic",
      "GitGuard Agent",
      "ProofBoard",
      "PatchPilot",
    ],
    workspace: {
      title: "Core toolchain",
      tools: [
        { name: "React", iconId: "react" },
        { name: "Next", iconId: "nextjs" },
        { name: "TypeScript", iconId: "typescript" },
        { name: "GitHub", iconId: "github" },
        { name: "Docker", iconId: "docker" },
        { name: "Vercel", iconId: "vercel" },
        { name: "AWS", iconId: "aws" },
        { name: "Python", iconId: "python" },
        { name: "Node.js", iconId: "nodejs" },
        { name: "Nest.js", iconId: "nestjs" },
        { name: "FastAPI", iconId: "fastapi" },
        { name: "PostgreSQL", iconId: "postgresql" },
        { name: "Prisma", iconId: "prisma" },
        { name: "MongoDB", iconId: "mongodb" },
        { name: "Git", iconId: "git" },
      ],
      environment: "Production-oriented setup",
    },
  },
  {
    id: "adjacent",
    title: "Design & client delivery",
    description:
      "Supporting skills for polished UI and client-facing work—Figma and Adobe tools, brand assets, and clear communication on timelines and scope.",
    tools: ["Figma", "UI/UX", "Brand & marketing assets", "Client communication"],
    experience: "Ongoing (select client work)",
    projects: ["Client-facing sites (see Testimonials)"],
    workspace: {
      title: "Design tools",
      tools: [
        { name: "Figma", iconId: "figma" },
        { name: "UI/UX", iconId: "uiux" },
        { name: "Tailwind CSS", iconId: "tailwindcss" },
        { name: "Material UI", iconId: "materialui" },
        { name: "Framer Motion", iconId: "framer" },
      ],
      environment: "When visuals are part of the delivery",
    },
  },
  {
    id: "planning",
    title: "Planning & management",
    description:
      "Planning, brainstorming, flowcharting, team discussions, business research and more.",
    tools: [
      "Flowcharting",
      "Team discussions",
      "Business research",
      "Brainstorming",
      "Project documentation",
    ],
    experience: "Ongoing (cross-functional)",
    projects: ["Fishlinic (capstone)", "Multi-surface product (Trainium, Rumi)"],
    workspace: {
      title: "Planning & management tools",
      tools: [
        { name: "System design", iconId: "system" },
        { name: "ERD", iconId: "entityrelationshipdiagram" },
        { name: "Data modeling", iconId: "datamodeling" },
        { name: "User flow", iconId: "user" },
        { name: "Maintenance & Debugging", iconId: "maintenanceanddebugging" },
        { name: "Deployment & Production", iconId: "deploymentandproduction" },
      ],
      environment: "When planning and managing projects",
    },
  },
];
