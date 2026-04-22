"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion} from "framer-motion";
import { Project } from "../../models/Project";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { DesktopProjectsSection } from "../projects/desktop/DesktopProjectsSection";
import MobileProjectsSection from "../projects/mobile/MobileProjectsSection";
import { useI18n } from "@/components/i18n/I18nProvider";
import {
  DEEP_DIVE_SLUG_MIRROR_KEY,
  PENDING_DEEP_DIVE_SLUG_KEY,
} from "@/lib/locale-switch-persistence";

interface ProjectsSectionProps {
  projects: Project[];
  /** Full-viewport shell: tighter chrome, no duplicate hero title. */
  embedded?: boolean;
}

// Main ProjectsSection component that chooses between mobile and desktop
export function ProjectsSection({ projects, embedded = false }: ProjectsSectionProps) {
  const { messages } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  // Check screen size and initialize component
  useEffect(() => {
    setHasMounted(true);

    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  useEffect(() => {
    if (!embedded || !selectedProject) return;
    try {
      sessionStorage.setItem(DEEP_DIVE_SLUG_MIRROR_KEY, selectedProject.slug);
    } catch {
      /* ignore */
    }
  }, [embedded, selectedProject]);

  useLayoutEffect(() => {
    if (!embedded) return;
    try {
      const pending = sessionStorage.getItem(PENDING_DEEP_DIVE_SLUG_KEY);
      if (!pending) return;
      sessionStorage.removeItem(PENDING_DEEP_DIVE_SLUG_KEY);
      const match = projects.find((p) => p.slug === pending && p.status !== "archived");
      if (match) setSelectedProject(match);
    } catch {
      /* ignore */
    }
  }, [embedded, projects]);
  
  // Show loading state
  if (!hasMounted || projects.length === 0) {
    return (
      <section id="projects" className={`relative py-12 ${embedded ? "min-h-0" : "min-h-screen"}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="mb-2 text-3xl font-bold text-fg">{messages.projectsSection.loadingTitle}</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="h-40 animate-pulse rounded-lg border border-border bg-card-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Show error state
  if (!selectedProject) {
    return (
      <section
        id="projects"
        className={`relative flex items-center justify-center py-12 ${embedded ? "min-h-0" : "min-h-screen"}`}
      >
        <div className="text-red-500 text-lg">{messages.projectsSection.noProjects}</div>
      </section>
    );
  }
  
  return (
    <motion.section
      ref={containerRef}
      id="projects"
      className={`relative overflow-hidden py-12 md:py-20 ${embedded ? "min-h-0 md:py-8" : "min-h-screen"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.05),transparent)]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)] opacity-60 dark:opacity-50"
        />
      </div>

      {/* Section Title for desktop only */}
      {!isMobile && !embedded && (
        <motion.div
          className="mb-12 flex flex-col items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
            {messages.projectsSection.optionalDepth}
          </p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-fg md:text-4xl">
            {messages.projectsSection.title}
          </h2>
          <p className="mt-3 max-w-lg text-center text-sm text-muted">
            {messages.projectsSection.subtitle}
          </p>
          <motion.div
            className="mt-4 h-1 w-20 rounded-full bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
          />
        </motion.div>
      )}

      {/* Conditionally render mobile or desktop version */}
      {isMobile ? (
        <MobileProjectsSection
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          embedded={embedded}
        />
      ) : (
        <DesktopProjectsSection
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          embedded={embedded}
        />
      )}
    </motion.section>
  );
}