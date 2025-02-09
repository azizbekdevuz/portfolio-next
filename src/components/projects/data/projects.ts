import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "zdesigner",
    title: "ZDesigner AI",
    description:
      "AI-powered interior design tool that helps users visualize and redesign their spaces using advanced machine learning algorithms.",
    technologies: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "TailwindCSS", icon: "/icons/tailwind.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Replicate API", icon: "/icons/api.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
    ],
    codeSnippet: `const aiRedesign = async (room: Room) => {
      const enhancedImage = await enhance(room.image);
      const styleVector = await generateStyle(room.preferences);
      return applyStyleTransfer(enhancedImage, styleVector);
    };`,
    mockupImage: "/mockups/zdesigner.png",
    liveLink: "https://zdesigner-ai.vercel.app",
    githubLink: "https:/github.com/azizbekdevuz/zdesigner-ai",
  },
  {
    id: "professor",
    title: "Academic Professor Personal Website",
    description: "A modern and responsive website for university professors.",
    technologies: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "TailwindCSS", icon: "/icons/tailwind.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
    ],
    codeSnippet: `import SmoothScrollWrapper from "../components/SmoothScrollWrapper";
    import MainContent from "../components/MainContent";
    import About from "../components/About";
    import Research from "../components/Research";
    import Publications from "../components/Publications";`,
    mockupImage: "/mockups/professor.png",
    liveLink: "https://abolghasemsadeghi-n.com",
    githubLink: "https:/github.com/azizbekdevuz/zdesigner-ai",
  },
  {
    id: "pozitivdenta",
    title: "Dental Clinic Website",
    description:
      "A professional website for the dental clinic 'POZITIV Denta'.",
    technologies: [
      { name: "HTML", icon: "/icons/html.svg" },
      { name: "CSS", icon: "/icons/css.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "jQuery", icon: "/icons/jquery.svg" },
      { name: "Nginx", icon: "/icons/nginx.svg" },
      { name: "Apache", icon: "/icons/apache.svg" },
    ],
    codeSnippet: `<div class="col-lg-4 col-md-6 mt-md-0 mt-3">
      <div class="about-single p-3">
        <div class="about-icon mb-4">
          <i class="fa fa-teeth"></i>
      </div>`,
    mockupImage: "/mockups/pozitivdenta.png",
    liveLink: "https://azizbekdevuz.github.io/pozitiv-denta",
    githubLink: "https:/github.com/azizbekdevuz/pozitiv-denta",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "A creative and modern personal portfolio website.",
    technologies: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "THREE.js", icon: "/icons/three.svg" },
      { name: "GSAP", icon: "/icons/gsap.svg" },
      { name: "framer-motion", icon: "/icons/framer.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
    ],
    codeSnippet: `export default function Home() {
      return (
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      )
    }`,
    mockupImage: "/mockups/portfolio.png",
    liveLink: "https://portfolio-next-silk-two.vercel.app/",
    githubLink: "https:/githubLink.com/azizbekdevuz/portfolio-next",
  },
];
