"use client";

import { Project } from "@/models/Project";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import { TechIconTile } from "@/components/ui/TechIconTile";
import { isUsableImageSrc } from "@/lib/image-src";

// === MOBILE OPTIMIZED VERSION ===
// Mobile project section implementation
const MobileProjectsSection = ({
  projects,
  selectedProject,
  setSelectedProject,
  embedded = false,
}: {
  projects: Project[];
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  embedded?: boolean;
}) => {
    const { messages } = useI18n();
    const pm = messages.projectsMobile;
    const [isDetailView, setIsDetailView] = useState(false);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    
    // Extract unique tech names from all projects
    const allTechnologies = Array.from(
      projects.reduce((techSet, project) => {
        project.technologies.forEach(tech => techSet.add(tech.name));
        return techSet;
      }, new Set<string>())
    ).sort();
    
    // Filter projects by selected technology
    const filteredProjects = selectedTech 
      ? projects.filter(project => 
          project.technologies.some(tech => tech.name === selectedTech)
        )
      : projects;
    
    // Handle viewing project details
    const handleViewProject = (project: Project) => {
      setSelectedProject(project);
      setIsDetailView(true);
    };
    
    // Handle back navigation from detail view
    const handleBackToList = () => {
      setIsDetailView(false);
    };
    
    return (
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        {!embedded && (
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-2 text-3xl font-bold text-fg">{pm.sectionTitle}</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-primary"></div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          {/* Projects List View */}
          {!isDetailView ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Filter by Technology */}
              <div className="mb-5">
                <div className="overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
                  <div className="flex space-x-2 min-w-min">
                    <motion.button
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all
                                ${selectedTech === null 
                                  ? 'bg-primary text-white font-medium' 
                                  : 'bg-card-muted/70 text-muted border border-primary/20'
                                }`}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTech(null)}
                    >
                      {pm.filterAll}
                    </motion.button>
                    
                    {allTechnologies.slice(0, 8).map(tech => (
                      <motion.button
                        key={tech}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all
                                  ${selectedTech === tech 
                                    ? 'bg-primary text-white font-medium' 
                                    : 'bg-card-muted/70 text-muted border border-primary/20'
                                  }`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTech(tech)}
                      >
                        {tech}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Projects Grid */}
              <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-card-muted/80 rounded-lg border border-primary/20 overflow-hidden shadow-md"
                    onClick={() => handleViewProject(project)}
                  >
                    {/* Project Card */}
                    <div className="flex flex-col">
                      {/* Project Image/Banner */}
                      <div className="relative h-32 w-full bg-card-muted/90 border-b border-primary/20">
                        {isUsableImageSrc(project.imageUrl) ? (
                          <Image 
                            src={project.imageUrl} 
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl opacity-30">{project.title.charAt(0)}</div>
                          </div>
                        )}
                        
                        {/* Tech Badges - show top 2 */}
                        <div className="absolute bottom-2 left-2 flex space-x-1">
                          {project.technologies.slice(0, 2).map(tech => (
                            <div
                              key={tech.name}
                              className="flex items-center gap-1 rounded-full border border-border/70 bg-card-muted/90 px-1.5 py-0.5 text-xs backdrop-blur-sm"
                            >
                              <TechIconTile iconId={tech.iconId} size="xs" />
                              <span className="text-fg">{tech.name}</span>
                            </div>
                          ))}
                          
                          {/* Tech count indicator */}
                          {project.technologies.length > 2 && (
                            <div className="px-2 py-0.5 bg-card-muted rounded-full backdrop-blur-sm text-xs border border-primary/30">
                              <span className="text-primary">+{project.technologies.length - 2}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Category Badge */}
                        {project.category && (
                          <div className="absolute top-2 right-2">
                            <div className="px-2 py-0.5 text-xs bg-primary/70 text-white rounded-full backdrop-blur-sm">
                              {project.category}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-fg mb-1">
                          {project.title}
                        </h3>
                        
                        <p className="text-muted text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        {/* View Details Button */}
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-primary">{pm.viewDetails}</div>
                          
                          {/* Quick Action Links */}
                          <div className="flex space-x-2">
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-primary/10 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </a>
                            )}
                            
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-primary/10 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Empty state when no projects match filter */}
                {filteredProjects.length === 0 && (
                  <div className="py-10 text-center">
                    <div className="text-muted">{pm.noMatch}</div>
                    <button 
                      className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm"
                      onClick={() => setSelectedTech(null)}
                    >
                      {pm.clearFilter}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Project Detail View */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-6"
            >
              {/* Back Button */}
              <motion.button
                className="flex items-center gap-1 text-primary mb-4"
                onClick={handleBackToList}
                whileTap={{ x: -3 }}
              >
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="text-sm">{pm.backToList}</span>
              </motion.button>
              
              {/* Project Header */}
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-fg mb-2">
                  {selectedProject.title}
                </h2>
                
                {/* Category badge if available */}
                {selectedProject.category && (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                      {selectedProject.category}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Project Image */}
              <div className="mb-6 rounded-lg overflow-hidden border border-primary/20">
                <div className="relative h-48 w-full bg-card-muted/90">
                  {isUsableImageSrc(selectedProject.imageUrl) ? (
                    <Image
                      src={selectedProject.imageUrl}
                      alt={`${selectedProject.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">{selectedProject.title.charAt(0)}</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-fg mb-2">{pm.about}</h3>
                <div className="p-4 bg-card-muted/80 rounded-lg border border-primary/20">
                  <p className="text-muted">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
              
              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-fg mb-2">{pm.technologies}</h3>
                <div className="p-4 bg-card-muted/80 rounded-lg border border-primary/20">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 rounded-lg border border-border/70 bg-card-muted/50 px-2.5 py-1.5"
                      >
                        <TechIconTile iconId={tech.iconId} size="sm" />
                        <span className="whitespace-nowrap text-sm font-medium text-fg">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Code Snippet */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-fg mb-2">{pm.codeSnippet}</h3>
                <div className="relative bg-card-muted backdrop-blur-sm rounded-lg 
                              border border-primary/20 overflow-hidden max-h-[240px]">
                  <div className="p-3 font-mono text-xs text-muted overflow-auto h-full
                                scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-card-muted/40">
                    <pre>
                      <code>{selectedProject.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Project Links */}
              <div className="flex flex-col space-y-3">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-blue-500 
                             text-white text-center font-medium shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {pm.viewLiveProject}
                  </a>
                )}
                
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg border border-primary
                             text-primary text-center flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {pm.viewSourceCode}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

export default MobileProjectsSection;