"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { skillNodes } from "../skills/skillsList";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function SkillsMobile() {
  const [activeSkill, setActiveSkill] = useState<string>("webdev");
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<"overview" | "details">("overview");
  const [activeTab, setActiveTab] = useState<"about" | "tools" | "projects">("about");
  const { isMobile } = useDeviceDetection();

  const activeNode = skillNodes.find((node) => node.id === activeSkill);

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
        className="relative min-h-[100svh] py-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Simplified Background for Mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_50%_30%,rgba(20,157,221,0.02),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:3rem_3rem] opacity-40" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-text-light mb-2">My Skills</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto"></div>
          </motion.div>

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
                {skillNodes.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className={`relative rounded-lg overflow-hidden border ${
                      skill.id === activeSkill ? "border-primary" : "border-primary/20"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(skill.id)}
                  >
                    {/* Card with Info */}
                    <div className="p-4 bg-dark-light/30 h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <h3 className="text-base font-medium text-text-light">{skill.title}</h3>
                      </div>
                      
                      {/* Experience Badge */}
                      <div className="mb-2">
                        <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {skill.experience}
                        </span>
                      </div>
                      
                      {/* Short Description */}
                      <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                        {skill.description}
                      </p>
                      
                      {/* View More Button */}
                      <div className="mt-auto text-xs text-primary flex items-center">
                        <span>View details</span>
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                    {/* Back Button */}
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1 text-sm text-primary mb-4"
                    >
                      <span>←</span>
                      <span>Back to all skills</span>
                    </button>
                    
                    {/* Skill Header */}
                    <div className="bg-dark-light/20 rounded-t-lg p-4 border border-primary/30 border-b-0">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{activeNode.icon}</span>
                        <div>
                          <h3 className="text-xl font-medium text-text-light">
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
                            : "text-text-secondary"
                        }`}
                      >
                        About
                      </button>
                      <button
                        onClick={() => setActiveTab("tools")}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          activeTab === "tools" 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-text-secondary"
                        }`}
                      >
                        Tools
                      </button>
                      {activeNode.projects && (
                        <button
                          onClick={() => setActiveTab("projects")}
                          className={`flex-1 py-2 text-center text-sm font-medium ${
                            activeTab === "projects"
                              ? "text-primary border-b-2 border-primary"
                              : "text-text-secondary"
                          }`}
                        >
                          Projects
                        </button>
                      )}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="bg-dark-light/20 rounded-b-lg p-4 border border-primary/30 border-t-0 min-h-[50vh]">
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
                            <h4 className="text-text-light font-medium mb-3">Overview</h4>
                            <p className="text-text-secondary mb-6 text-sm">
                              {activeNode.description}
                            </p>
                            
                            <h4 className="text-text-light font-medium mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {activeNode.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-1 rounded-full text-xs bg-dark-light/30 
                                          border border-primary/20 text-primary"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            
                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mt-6">
                              <h4 className="text-primary text-sm font-medium mb-2">{activeNode.workspace.environment}</h4>
                              <p className="text-text-secondary text-xs">
                                {activeNode.workspace.title} with specialized tools for optimal productivity
                                and efficient workflow. Tap the Tools tab to learn more.
                              </p>
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
                            <h4 className="text-text-light font-medium mb-4">
                              {activeNode.workspace.title}
                            </h4>
                            
                            <div className="grid grid-cols-3 gap-3">
                              {activeNode.workspace.tools.map((tool, index) => (
                                <motion.div
                                  key={tool.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="bg-dark-light/30 p-3 rounded-lg border border-primary/20 flex flex-col items-center"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="relative w-10 h-10 mb-2">
                                    <Image
                                      src={tool.icon}
                                      alt={tool.name}
                                      fill
                                      sizes="40px"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                  <span className="text-center text-xs text-text-secondary">
                                    {tool.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <p className="text-xs text-text-secondary">
                                These are the primary tools and technologies I use for {activeNode.title.toLowerCase()} projects, 
                                allowing me to deliver high-quality results efficiently.
                              </p>
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
                            <h4 className="text-text-light font-medium mb-4">Featured Projects</h4>
                            
                            <div className="space-y-3">
                              {activeNode.projects.map((project, index) => (
                                <motion.div
                                  key={project}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-3 bg-dark-light/30 rounded-lg border border-primary/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-medium text-text-light">{project}</h5>
                                    <span className="text-xs text-primary">View →</span>
                                  </div>
                                  <p className="text-xs text-text-secondary mt-1">
                                    A {activeNode.title.toLowerCase()} project showcasing my skills in
                                    {activeNode.tools.slice(0, 2).join(", ")} and more.
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-6 text-center">
                              <button className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30">
                                See all projects
                              </button>
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