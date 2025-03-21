"use client";

import { useState, useRef, useEffect } from "react";
import { motion} from "framer-motion";
import { Project } from "../../models/Project";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { DesktopProjectsSection } from "../projects/desktop/DesktopProjectsSection";
import MobileProjectsSection from "../projects/mobile/MobileProjectsSection";

interface ProjectsSectionProps {
  projects: Project[];
}

// Main ProjectsSection component that chooses between mobile and desktop
export function ProjectsSection({ projects }: ProjectsSectionProps) {
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
  
  // Show loading state
  if (!hasMounted || projects.length === 0) {
    return (
      <section id="projects" className="relative min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-light mb-2">Projects</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="h-40 rounded-lg bg-dark-light/30 border border-primary/20 animate-pulse"
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
      <section id="projects" className="relative min-h-screen py-12 flex items-center justify-center">
        <div className="text-red-500 text-lg">No projects found</div>
      </section>
    );
  }
  
  return (
    <motion.section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen py-12 md:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.05),transparent)]" />
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                   bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]
                   opacity-50"
        />
      </div>

      {/* Section Title for desktop only */}
      {!isMobile && (
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4 font-mono">
            <span className="text-primary/50">class</span>
            <h2 className="text-4xl font-bold text-text-light">PortfolioMatrix</h2>
            <span className="text-primary/50">extends</span>
            <span className="text-text-light">Work</span>
          </div>
          <motion.div
            className="h-1 w-20 bg-primary rounded-full"
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
        />
      ) : (
        <DesktopProjectsSection 
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </motion.section>
  );
}