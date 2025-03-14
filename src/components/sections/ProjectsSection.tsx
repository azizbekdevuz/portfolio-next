"use client";

import { useState, useRef, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectPreview from "../projects/ProjectPreview";
import { Project } from "../../models/Project";

interface ProjectsSectionProps {
  projects: Project[];
}

// Memoized components for better performance
const EditorTab = memo(({ 
  project, 
  isActive, 
  onClick 
}: { 
  project: Project; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm border-r border-primary/20
              flex items-center gap-2 transition-colors relative
              ${
                isActive
                  ? "bg-dark-light/50 text-text-light"
                  : "text-text-secondary hover:bg-primary/5"
              }`}
  >
    <span className={`w-2 h-2 rounded-full ${isActive ? "bg-primary" : "bg-primary/50"}`} />
    {project.title}.tsx
    {isActive && (
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
        layoutId="activeTab"
      />
    )}
  </button>
));

EditorTab.displayName = 'EditorTab';

const ProjectFile = memo(({ 
  project, 
  isSelected, 
  onClick 
}: { 
  project: Project; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-1.5 rounded text-sm
              flex items-center gap-2 transition-colors
              ${
                isSelected
                  ? "bg-primary/10 text-text-light"
                  : "text-text-secondary hover:bg-primary/5"
              }`}
  >
    <svg
      className="w-4 h-4 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    {project.title}.tsx
  </button>
));

ProjectFile.displayName = 'ProjectFile';

const TechBadge = memo(({ tech }: { tech: { name: string; icon: string } }) => (
  <div
    className="px-3 py-1.5 rounded-full bg-primary/5 
              border border-primary/20 text-sm text-primary
              flex items-center gap-2 group hover:bg-primary/10 
              transition-all duration-300"
  >
    <div className="relative w-4 h-4">
      <Image
        src={tech.icon}
        alt={`${tech.name} icon`}
        fill
        className="object-contain"
      />
    </div>
    <span className="group-hover:text-text-light transition-colors">
      {tech.name}
    </span>
  </div>
));

TechBadge.displayName = 'TechBadge';

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  type ViewType = "code" | "preview";
  const [activeView, setActiveView] = useState<ViewType>("code");
  // Add this to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Use useEffect to initialize the selected project after mounting
  useEffect(() => {
    setHasMounted(true);
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  // Memoized handlers for better performance
  const toggleExplorer = useCallback(() => {
    setIsExplorerOpen(prev => !prev);
  }, []);

  const switchView = useCallback((view: ViewType) => {
    setActiveView(view);
  }, []);

  // Show loading state if not mounted yet or no projects
  if (!hasMounted || projects.length === 0) {
    return (
      <section id="projects" className="relative min-h-screen py-20">
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-between h-12 bg-dark-light/80 backdrop-blur-sm border-b border-primary/20 px-4">
            <div className="h-4 w-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-80"></div>
            </div>
          </div>
          <div className="border-x border-b border-primary/20 flex">
            <div className="w-[250px] border-r border-primary/20 bg-dark-light/50 min-h-[600px]">
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-[600px] bg-dark-light/30 p-6">
              <div className="h-8 w-3/4 bg-gradient-to-r from-primary/30 to-primary/10 rounded animate-pulse mb-4"></div>
              <div className="h-24 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse"></div>
            </div>
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
        className="relative min-h-screen py-20 flex items-center justify-center"
      >
        <div className="text-red-500 text-lg">No projects found</div>
      </section>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Elements - using suppressHydrationWarning on potentially problematic divs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.05),transparent)]" suppressHydrationWarning />
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]
                     opacity-50"
          suppressHydrationWarning
        />
      </div>

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

      {/* VS Code-style Editor Layout */}
      <div className="relative z-10 container mx-auto px-4 overflow-hidden">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between h-12 bg-dark-light/90 backdrop-blur-sm border-b border-primary/20 px-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            {/* Toggle Explorer Button */}
            <button
              onClick={toggleExplorer}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
              aria-label="Toggle Explorer"
            >
              <svg
                className="w-4 h-4 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="text-text-secondary text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
              </svg>
              Projects - VS Code
            </span>
          </div>

          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex border-x border-b border-primary/20 rounded-b-lg overflow-hidden shadow-lg">
          {/* File Explorer - Optimized animation */}
          <AnimatePresence initial={false}>
            {isExplorerOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  opacity: { duration: 0.2 } 
                }}
                className="border-r border-primary/20 bg-dark-light/50 backdrop-blur-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="text-sm text-text-secondary mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    EXPLORER
                  </div>
                  
                  {/* Project Files */}
                  <div className="space-y-1">
                    {projects.map((project) => (
                      <ProjectFile 
                        key={project.id}
                        project={project}
                        isSelected={selectedProject.id === project.id}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Content */}
          <div className="flex-1 min-h-[600px] bg-dark-light/30 backdrop-blur-sm flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center border-b border-primary/20 bg-dark-light/40">
              {projects.map((project) => (
                <EditorTab
                  key={project.id}
                  project={project}
                  isActive={selectedProject.id === project.id}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Editor Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 overflow-auto flex-1"
              >
                {/* Project Content Here */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Project Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-text-light mb-4 group">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                        {selectedProject.title}
                      </span>
                      <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded mt-1 group-hover:w-32 transition-all duration-300" />
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="text-sm text-primary mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <TechBadge key={tech.name} tech={tech} />
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4">
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded bg-gradient-to-r from-primary to-blue-500 text-white
                                   hover:brightness-110 transition-all shadow-md shadow-primary/20 
                                   flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Live
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded border border-primary
                                   text-primary hover:bg-primary/10 transition-colors
                                   flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          View Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Code Preview & Mockup */}
                  <div className="relative">
                    {/* Tabs for switching between code and preview */}
                    <div className="gap-2 mb-4 bg-dark-light/30 inline-flex rounded-lg p-1">
                      <button
                        onClick={() => switchView("code")}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-all duration-200 ${
                          activeView === "code"
                            ? "bg-primary/20 text-primary shadow-sm"
                            : "text-text-secondary hover:bg-primary/5"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        Code
                      </button>
                      <button
                        onClick={() => switchView("preview")}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-all duration-200 ${
                          activeView === "preview"
                            ? "bg-primary/20 text-primary shadow-sm"
                            : "text-text-secondary hover:bg-primary/5"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Preview
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeView === "code" ? (
                        <motion.div
                          key="code"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative bg-dark/70 backdrop-blur-sm rounded-lg 
                                    border border-primary/20 overflow-hidden shadow-lg"
                        >
                          {/* Line numbers */}
                          <div className="absolute top-0 left-0 bottom-0 w-8 bg-dark/50 border-r border-primary/10 flex flex-col items-end pt-4 px-2 text-xs text-text-secondary/50">
                            {Array.from({ length: 15 }, (_, i) => (
                              <div key={i} className="leading-6">{i + 1}</div>
                            ))}
                          </div>
                          
                          <div className="p-4 pl-12 font-mono text-sm text-text-secondary overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-dark-light/10">
                            <pre>
                              <code className="text-sm">{selectedProject.codeSnippet}</code>
                            </pre>
                          </div>
                          {/* Tooltip indicators */}
                          <div className="absolute right-3 top-3 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Warnings: 0" />
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="No errors" />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border border-primary/20 rounded-lg overflow-hidden shadow-lg"
                        >
                          <ProjectPreview
                            liveLink={selectedProject.liveLink}
                            title={selectedProject.title}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Terminal - with animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="h-32 bg-dark-light/90 backdrop-blur-sm border-x border-b border-primary/20 
                    font-mono text-sm text-text-secondary p-4 rounded-b-lg shadow-lg
                    overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary">$</span>
            <span className="typing-animation">git status</span>
          </div>
          <div className="text-text-secondary/70">
            On branch main
            <br />
            Your branch is up to date with &apos;origin/main&apos;
            <br />
            <span className="text-green-400">✓</span> All files committed and pushed
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}