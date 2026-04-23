"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Cpu, Palette } from "lucide-react";
import { TechIconTile } from "@/components/ui/TechIconTile";
import { skillNodes } from "../skills/skillsList";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function SkillsMobile({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const [activeSkill, setActiveSkill] = useState<string>("engineering");
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<"overview" | "details">("overview");
  const [activeTab, setActiveTab] = useState<"about" | "tools" | "projects">("about");
  const { isMobile } = useDeviceDetection();

  const localizedNodes = useMemo(
    () =>
      skillNodes.map((node) => {
        const loc = messages.skills.nodes[node.id as keyof typeof messages.skills.nodes];
        if (!loc) return node;
        return {
          ...node,
          title: loc.title,
          description: loc.description,
          experience: loc.experience,
          workspace: {
            ...node.workspace,
            title: loc.workspaceTitle,
            environment: loc.workspaceEnvironment,
          },
        };
      }),
    [messages],
  );

  const activeNode = localizedNodes.find((node) => node.id === activeSkill);

  // Handle back button action
  const handleBack = () => {
    setCurrentView("overview");
  };

  // Handle skill selection
  const handleSelectSkill = (skillId: string) => {
    setActiveSkill(skillId);
    // On mobile, automatically switch to details view when selecting skill
    if (isMobile) {
      setCurrentView("details");
      setActiveTab("about"); // Reset to the first tab
    }
  };
  
  // Mobile version
  if (isMobile) {
    return (
      <motion.section
        ref={containerRef}
        id="skills"
        className={`relative overflow-hidden ${embedded ? "min-h-0 py-4" : "min-h-[100svh] py-10"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Simplified Background for Mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_50%_30%,var(--color-glow),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 dark:opacity-40" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4">
          {!embedded && (
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-fg">{messages.skills.title}</h2>
              <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            </motion.div>
          )}

          {/* Two Views: Overview (Grid) and Details (Focused View) */}
          <AnimatePresence mode="wait">
            {currentView === "overview" ? (
              /* OVERVIEW: Skill Cards Grid */
              <motion.div
                key="overview"
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {localizedNodes.map((skill) => {
                  const NavIcon = skill.id === "engineering" ? Cpu : Palette;
                  return (
                  <motion.div
                    key={skill.id}
                    className={`relative overflow-hidden rounded-lg border ${
                      skill.id === activeSkill ? "border-accent ring-1 ring-accent/30" : "border-border"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(skill.id)}
                  >
                    {/* Card with Info */}
                    <div className="p-4 bg-card-muted/80 h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="mb-2 flex items-center gap-2">
                        <NavIcon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                        <h3 className="text-base font-medium text-fg">{skill.title}</h3>
                      </div>
                      
                      {/* Experience Badge */}
                      <div className="mb-2">
                        <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {skill.experience}
                        </span>
                      </div>
                      
                      {/* Short Description */}
                      <p className="text-xs text-muted line-clamp-2 mb-3">
                        {skill.description}
                      </p>
                      
                      {/* View More Button */}
                      <div className="mt-auto flex items-center text-xs text-accent">
                        <span>{messages.skills.viewDetails}</span>
                        <ChevronRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
                      </div>
                    </div>
                  </motion.div>
                );
                })}
              </motion.div>
            ) : (
              /* DETAILS: Individual Skill Focused View */
              <motion.div
                key="details"
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                ref={skillsContainerRef}
              >
                {activeNode && (
                  <>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      {messages.skills.backToAll}
                    </button>

                    <div className="rounded-t-lg border border-border border-b-0 bg-surface-soft p-4 dark:border-border-strong dark:bg-card-muted/50">
                      <div className="flex items-center gap-3">
                        {activeNode.id === "engineering" ? (
                          <Cpu className="h-8 w-8 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                        ) : (
                          <Palette className="h-8 w-8 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                        )}
                        <div>
                          <h3 className="text-xl font-medium text-fg">
                            {activeNode.title}
                          </h3>
                          <span className="text-primary text-sm">
                            {activeNode.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-primary/30">
                      <button
                        onClick={() => setActiveTab("about")}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          activeTab === "about" 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-muted"
                        }`}
                      >
                        {messages.skills.tabAbout}
                      </button>
                      <button
                        onClick={() => setActiveTab("tools")}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          activeTab === "tools" 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-muted"
                        }`}
                      >
                        {messages.skills.tabTools}
                      </button>
                      {activeNode.projects && (
                        <button
                          onClick={() => setActiveTab("projects")}
                          className={`flex-1 py-2 text-center text-sm font-medium ${
                            activeTab === "projects"
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted"
                          }`}
                        >
                          {messages.skills.tabProjects}
                        </button>
                      )}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="bg-card-muted/60 rounded-b-lg p-4 border border-primary/30 border-t-0 min-h-[50vh]">
                      <AnimatePresence mode="wait">
                        {/* About Tab */}
                        {activeTab === "about" && (
                          <motion.div
                            key="about"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-fg font-medium mb-3">{messages.skills.panelOverview}</h4>
                            <p className="text-muted mb-6 text-sm">
                              {activeNode.description}
                            </p>
                            
                            <h4 className="text-fg font-medium mb-3">{messages.skills.panelTechnologies}</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {activeNode.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-1 rounded-full text-xs bg-card-muted/80 
                                          border border-primary/20 text-primary"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            
                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mt-6">
                              <h4 className="text-primary text-sm font-medium mb-2">{activeNode.workspace.environment}</h4>
                              <p className="text-muted text-xs">{messages.skills.workspaceHint}</p>
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Tools Tab */}
                        {activeTab === "tools" && (
                          <motion.div
                            key="tools"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-fg font-medium mb-4">
                              {activeNode.workspace.title}
                            </h4>
                            
                            <div className="grid grid-cols-3 gap-3">
                              {activeNode.workspace.tools.map((tool, index) => (
                                <motion.div
                                  key={tool.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex flex-col items-center rounded-lg border border-border bg-card p-3 dark:border-border-strong"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="mb-2 flex justify-center">
                                    <TechIconTile iconId={tool.iconId} size="md" />
                                  </div>
                                  <span className="text-center text-xs text-muted">{tool.name}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <p className="text-xs text-muted">{messages.skills.toolsTabFooter}</p>
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Projects Tab */}
                        {activeTab === "projects" && activeNode.projects && (
                          <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-fg font-medium mb-4">{messages.skills.featuredProjects}</h4>
                            
                            <div className="space-y-3">
                              {activeNode.projects.map((project, index) => (
                                <motion.div
                                  key={project}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-3 bg-card-muted/80 rounded-lg border border-primary/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-medium text-fg">{project}</h5>
                                    <span className="text-xs text-primary">{messages.skills.viewCta}</span>
                                  </div>
                                  <p className="text-xs text-muted mt-1">{messages.skills.projectsCardBlurb}</p>
                                </motion.div>
                              ))}
                            </div>
                            
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    );
  }
}