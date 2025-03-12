"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectPreview from "../projects/ProjectPreview";
import { Project } from "../../models/Project";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  type ViewType = "code" | "preview";
  const [activeView, setActiveView] = useState<ViewType>("code");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error(`Error fetching projects: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data);

        // Initialize the selected project with the first project
        if (data.length > 0) {
          setSelectedProject(data[0]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <section id="projects" className="relative min-h-screen py-20">
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-between h-12 bg-dark-light/80 border-b border-primary/20 px-4">
            <div className="h-4 w-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e] animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840] animate-pulse"></div>
            </div>
          </div>
          <div className="border-x border-b border-primary/20 flex">
            <div className="w-[250px] border-r border-primary/20 bg-dark-light/50 min-h-[600px]">
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-[600px] bg-dark-light/30 p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-gradient-to-r from-primary/30 to-primary/10 rounded animate-pulse"></div>
                  <div className="h-24 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || !selectedProject) {
    return (
      <section
        id="projects"
        className="relative min-h-screen py-20 flex items-center justify-center"
      >
        <div className="text-red-500 text-lg">
          {error || "No projects found"}
        </div>
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
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
        />
      </div>

      {/* VS Code-style Editor Layout */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between h-12 bg-dark-light/80 border-b border-primary/20 px-4">
          <div className="flex items-center gap-2">
            {/* Toggle Explorer Button */}
            <button
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
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
            <span className="text-text-secondary text-sm">
              Projects - VS Code
            </span>
          </div>

          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex border-x border-b border-primary/20">
          {/* File Explorer */}
          <AnimatePresence mode="wait">
            {isExplorerOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-r border-primary/20 bg-dark-light/50"
              >
                <div className="p-4">
                  <div className="text-sm text-text-secondary mb-2">
                    EXPLORER
                  </div>
                  {/* Project Files */}
                  <div className="space-y-1">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm
                                  flex items-center gap-2 transition-colors
                                  ${
                                    selectedProject.id === project.id
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
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Content */}
          <div className="flex-1 min-h-[600px] bg-dark-light/30">
            {/* Tab Bar */}
            <div className="flex items-center border-b border-primary/20">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`px-4 py-2 text-sm border-r border-primary/20
                            flex items-center gap-2 transition-colors
                            ${
                              selectedProject.id === project.id
                                ? "bg-dark-light/50 text-text-light"
                                : "text-text-secondary hover:bg-primary/5"
                            }`}
                >
                  <span className="w-2 h-2 rounded-full bg-primary/50" />
                  {project.title}.tsx
                </button>
              ))}
            </div>

            {/* Editor Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6"
              >
                {/* Project Content Here */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Project Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-text-light mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {selectedProject.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="text-sm text-primary mb-2">
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <div
                            key={tech.name}
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
                          className="px-4 py-2 rounded bg-primary text-white
                                   hover:bg-primary/90 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded border border-primary
                                   text-primary hover:bg-primary/10 transition-colors"
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Code Preview & Mockup */}
                  <div className="relative">
                    {/* Tabs for switching between code and preview */}
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setActiveView("code")}
                        className={`px-3 py-1 rounded flex items-center gap-2 ${
                          activeView === "code"
                            ? "bg-primary/10 text-primary"
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
                        onClick={() => setActiveView("preview")}
                        className={`px-3 py-1 rounded flex items-center gap-2 ${
                          activeView === "preview"
                            ? "bg-primary/10 text-primary"
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
                          className="relative bg-dark/50 backdrop-blur-sm rounded-lg 
                                    border border-primary/20 overflow-hidden"
                        >
                          <div className="p-4 font-mono text-sm text-text-secondary">
                            <pre>
                              <code>{selectedProject.codeSnippet}</code>
                            </pre>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
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

        {/* Terminal */}
        <div
          className="h-32 bg-dark-light/80 border-x border-b border-primary/20 
                      font-mono text-sm text-text-secondary p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary">$</span>
            <span>git status</span>
          </div>
          <div className="text-text-secondary/70">
            On branch main
            <br />
            Your branch is up to date with &apos;origin/main&apos;
          </div>
        </div>
      </div>
    </motion.section>
  );
}
