"use client"; // ✅ This is a Client Component

import dynamic from "next/dynamic";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { HeroSkeleton, ProjectsSkeleton, SkillsSkeleton, ContactSkeleton, InProgressSkeleton, AboutSkeleton } from "@/components/skeletons/SectionSkeletons";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ✅ Import the correct types from the models
import { BioSection } from "@/models/Bio";
import { JourneyData } from "@/models/Journey";
import { TechCategory } from "@/models/TechStack";
import { Achievement } from "@/models/Achievement";
import { Project } from "@/models/Project";

interface HomeData {
  bioSections: BioSection[];
  journeyData: JourneyData[];
  techStack: Record<string, TechCategory>;
  achievements: Achievement[];
  projects: Project[];
}

// Dynamic Imports for Client Components
const HeroSection = dynamic(() => import("@/components/sections/HeroSection").then(mod => mod.HeroSection), { loading: () => <HeroSkeleton /> });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(mod => mod.AboutSection), { loading: () => <AboutSkeleton /> });
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection").then(mod => mod.SkillsSection), { loading: () => <SkillsSkeleton /> });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(mod => mod.ProjectsSection), { loading: () => <ProjectsSkeleton /> });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(mod => mod.ContactSection), { loading: () => <ContactSkeleton /> });
const InProgressSection = dynamic(() => import("@/components/sections/InProgressSection").then(mod => mod.InProgressSection), { loading: () => <InProgressSkeleton /> });

function HomeContent({ data }: { data: HomeData }) {
  const { isMobile } = useDeviceDetection();

  return isMobile ? (
      <MainContent data={data} />
  ) : (
    <MainContent data={data} />
  );
}

function MainContent({ data }: { data: HomeData }) {
  const { bioSections, journeyData, techStack, achievements, projects } = data;

  return (
    <main className="relative">
      <section id="hero">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
      </section>
      <section id="about">
        <ErrorBoundary>
          <AboutSection bioSections={bioSections} journeyData={journeyData} techStack={techStack} achievements={achievements} />
        </ErrorBoundary>
      </section>
      <section id="skills">
        <ErrorBoundary>
          <SkillsSection />
        </ErrorBoundary>
      </section>
      <section id="projects">
        <ErrorBoundary>
          <ProjectsSection projects={projects} />
        </ErrorBoundary>
      </section>
      <section id="contact">
        <ErrorBoundary>
          <ContactSection />
        </ErrorBoundary>
      </section>
      <section id="in-progress">
        <ErrorBoundary>
          <InProgressSection />
        </ErrorBoundary>
      </section>
    </main>
  );
}

export default HomeContent;