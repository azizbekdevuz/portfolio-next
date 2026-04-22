interface SkillNode {
  id: string;
  title: string;
  description: string;
  tools: string[];
  experience: string;
  projects?: string[];
  workspace: {
    title: string;
    tools: { name: string; icon: string }[];
    environment: string;
  };
}

/** Primary positioning: engineering. Secondary node is short context only—no separate SMM/tutoring emphasis. */
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
      "Tailwind CSS",
      "Framer Motion",
      "MongoDB",
      "Docker",
      "AWS",
      "Vercel",
    ],
    experience: "3.5+ years",
    projects: ["ZDesigner AI", "Professor Website", "Portfolio"],
    workspace: {
      title: "Core toolchain",
      tools: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Next", icon: "/icons/nextjs.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
        { name: "AWS", icon: "/icons/aws.svg" },
      ],
      environment: "Production-oriented setup",
    },
  },
  {
    id: "adjacent",
    title: "Design & client delivery",
    description:
      "Supporting skills for polished UI and client-facing work—Figma and Adobe tools, brand assets, and clear communication on timelines and scope.",
    tools: ["Figma", "Photoshop", "Illustrator", "Brand & marketing assets", "Client communication"],
    experience: "3.5+ years",
    projects: ["POZITIV Denta (branding & collateral)"],
    workspace: {
      title: "Design tools",
      tools: [
        { name: "Figma", icon: "/icons/figma.svg" },
        { name: "Photoshop", icon: "/icons/photoshop.svg" },
        { name: "Illustrator", icon: "/icons/illustrator.svg" },
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
      "Project Documentation",
    ],
    experience: "3.5+ years",
    projects: ["ZDesigner AI", "Professor Website", "Portfolio"],
    workspace: {
      title: "Planning & management tools",
      tools: [],
      environment: "When planning and managing projects",
    },
  },
];
