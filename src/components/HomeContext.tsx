"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  HeroSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
  ContactSkeleton,
  InProgressSkeleton,
  AboutSkeleton,
} from "@/components/skeletons/SectionSkeletons";
import { I18nErrorBoundary } from "@/components/I18nErrorBoundary";
import type { HomeData } from "@/content/home-data";
import { ViewportPanel } from "@/components/shell/ViewportPanel";
import { useHomeShell } from "@/components/shell/HomeShellContext";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then((mod) => mod.HeroSection),
  { loading: () => <HeroSkeleton /> },
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection),
  { loading: () => <AboutSkeleton /> },
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection),
  { loading: () => <SkillsSkeleton /> },
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection),
  { loading: () => <ProjectsSkeleton /> },
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((mod) => mod.ContactSection),
  { loading: () => <ContactSkeleton /> },
);
const InProgressSection = dynamic(
  () => import("@/components/sections/InProgressSection").then((mod) => mod.InProgressSection),
  { loading: () => <InProgressSkeleton /> },
);

function MainContent({ data }: { data: HomeData }) {
  const { shell } = useHomeShell();
  const { bioSections, journeyData, techStack, achievements, projects, site } = data;
  const primaryProjects = projects.filter((p) => p.status !== "archived");

  return (
    <main className="relative min-h-dvh">
      {shell === "cockpit" ? (
        <motion.div
          key="cockpit"
          className="min-h-dvh"
          initial={{ opacity: 0.92, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <I18nErrorBoundary>
            <HeroSection
              site={site}
              projects={projects}
              techStack={techStack}
              journeyData={journeyData}
              achievements={achievements}
            />
          </I18nErrorBoundary>
        </motion.div>
      ) : null}

      {shell === "projects" ? (
        <ViewportPanel shellKey="projects">
          <I18nErrorBoundary>
            <ProjectsSection projects={primaryProjects} embedded />
          </I18nErrorBoundary>
        </ViewportPanel>
      ) : null}

      {shell === "about" ? (
        <ViewportPanel shellKey="about">
          <I18nErrorBoundary>
            <AboutSection
              bioSections={bioSections}
              journeyData={journeyData}
              techStack={techStack}
              achievements={achievements}
              embedded
            />
          </I18nErrorBoundary>
        </ViewportPanel>
      ) : null}

      {shell === "skills" ? (
        <ViewportPanel shellKey="skills">
          <I18nErrorBoundary>
            <SkillsSection embedded />
          </I18nErrorBoundary>
        </ViewportPanel>
      ) : null}

      {shell === "contact" ? (
        <ViewportPanel shellKey="contact">
          <I18nErrorBoundary>
            <ContactSection site={site} embedded />
          </I18nErrorBoundary>
        </ViewportPanel>
      ) : null}

      {shell === "in-progress" ? (
        <ViewportPanel shellKey="in-progress">
          <I18nErrorBoundary>
            <InProgressSection embedded />
          </I18nErrorBoundary>
        </ViewportPanel>
      ) : null}
    </main>
  );
}

export default function HomeContent({ data }: { data: HomeData }) {
  return <MainContent data={data} />;
}
