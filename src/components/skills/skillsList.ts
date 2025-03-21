interface SkillNode {
    id: string;
    title: string;
    icon: string;
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

export const skillNodes: SkillNode[] = [
    {
      id: "webdev",
      title: "Web Development",
      icon: "💻",
      description:
        "Full-stack development specializing in modern web technologies and AI integration",
      tools: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "TailwindCSS",
        "Framer Motion",
        "Three.js",
        "AWS",
        "Docker",
      ],
      experience: "2+ years",
      projects: ["ZDesigner AI", "Professor Website", "Portfolio"],
      workspace: {
        title: "Development Environment",
        tools: [
          { name: "React", icon: "/icons/react.svg" },
          { name: "Next", icon: "/icons/nextjs.svg" },
          { name: "NodeJS", icon: "/icons/nodejs.svg" },
          { name: "GitHub", icon: "/icons/github.svg" },
          { name: "Docker", icon: "/icons/docker.svg" },
          { name: "Vercel", icon: "/icons/vercel.svg" },
          { name: "AWS", icon: "/icons/aws.svg" },
        ],
        environment: "Modern Development Setup",
      },
    },
    {
      id: "design",
      title: "Graphic Design",
      icon: "🎨",
      description:
        "Creative visual design focusing on brand identity, UI/UX, and marketing materials",
      tools: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma",
        "UI/UX Design",
        "Brand Design",
        "Social Media Graphics",
      ],
      experience: "1+ year",
      projects: ["POZITIV Denta Branding", "Social Media Designs"],
      workspace: {
        title: "Design Studio",
        tools: [
          { name: "Photoshop", icon: "/icons/photoshop.svg" },
          { name: "Illustrator", icon: "/icons/illustrator.svg" },
          { name: "Figma", icon: "/icons/figma.svg" },
        ],
        environment: "Creative Workspace",
      },
    },
    {
      id: "smm",
      title: "Social Media Management",
      icon: "📱",
      description:
        "Strategic social media management focusing on growth and engagement",
      tools: [
        "Content Strategy",
        "Analytics",
        "Community Management",
        "Campaign Planning",
        "Growth Hacking",
        "Engagement Optimization",
      ],
      experience: "1 year",
      projects: ["POZITIV Denta SMM", "Personal Brand Management"],
      workspace: {
        title: "Social Command Center",
        tools: [
          { name: "Analytics", icon: "/icons/analytics.svg" },
          { name: "Telegram", icon: "/icons/telegram.svg" },
          { name: "Instagram", icon: "/icons/instagram.svg" },
          { name: "Facebook", icon: "/icons/facebook.svg" },
        ],
        environment: "Digital Marketing Hub",
      },
    },
    {
      id: "english",
      title: "English Tutoring",
      icon: "📚",
      description:
        "Personalized English language instruction focusing on practical communication skills",
      tools: [
        "IELTS Preparation",
        "Business English",
        "Conversational English",
        "Grammar & Vocabulary",
        "Pronunciation",
        "Academic Writing",
      ],
      experience: "1 year",
      projects: ["Private Tutoring", "Group Classes"],
      workspace: {
        title: "Virtual Classroom",
        tools: [
          { name: "Zoom", icon: "/icons/zoom.svg" },
          { name: "Google Classroom", icon: "/icons/classroom.svg" },
        ],
        environment: "Interactive Learning Space",
      },
    },
  ];