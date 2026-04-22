"use client";

import { Project } from "@/models/Project";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ProjectFile, EditorTab, TechBadge } from "./DesktopComponents";
import ProjectPreview from "../ProjectPreview";

// Desktop VS Code version
export const DesktopProjectsSection = ({
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
    const ide = messages.deepDiveIDE;
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);
    const [activeView, setActiveView] = useState<"code" | "preview">("code");
  
    const toggleExplorer = () => {
      setIsExplorerOpen(prev => !prev);
    };
  
    const switchView = (view: "code" | "preview") => {
      setActiveView(view);
    };
  
    return (
      <div
        className={`relative z-10 container mx-auto px-4 ${embedded ? "min-h-0 overflow-visible" : "overflow-hidden"}`}
      >
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between h-12 bg-card/95 backdrop-blur-sm border-b border-border px-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            {/* Toggle Explorer Button */}
            <button
              onClick={toggleExplorer}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
              aria-label={ide.toggleExplorer}
            >
              <svg
                className="w-4 h-4 text-muted"
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
            <span className="text-muted text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
              </svg>
              {ide.titleBar}
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
        <div className="flex border-x border-b border-border rounded-b-lg overflow-hidden shadow-lg">
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
                className="flex max-h-[min(70vh,640px)] flex-col overflow-hidden border-r border-border bg-card-muted/90 backdrop-blur-sm"
              >
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                  <div className="text-sm text-muted mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    {ide.explorer}
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
                {selectedProject.liveLink && (
                  <div className="shrink-0 border-t border-border bg-card-muted/95 p-2">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                      aria-label={ide.liveSiteAria.replace("{title}", selectedProject.title)}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                      <span className="truncate">{ide.openLiveSite}</span>
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Editor Content */}
          <div
            className={`flex min-h-0 flex-1 flex-col overflow-hidden bg-card-muted/70 backdrop-blur-sm ${
              embedded ? "min-h-[min(520px,65dvh)]" : "min-h-[600px]"
            }`}
          >
            {/* Tab Bar */}
            <div className="flex items-center border-b border-border bg-card-muted/80">
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
                    <h3 className="text-2xl font-bold text-fg mb-4 group">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                        {selectedProject.title}
                      </span>
                      <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded mt-1 group-hover:w-32 transition-all duration-300" />
                    </h3>
                    <p className="text-muted mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {(selectedProject.problem ||
                      selectedProject.outcome ||
                      selectedProject.owned ||
                      selectedProject.role) && (
                      <div className="mb-6 space-y-3 rounded-lg border border-border bg-page-elevated/90 p-4 text-sm text-muted">
                        <p className="font-mono text-xs text-primary/80">{ide.caseStudy}</p>
                        {selectedProject.role ? (
                          <p>
                            <span className="text-fg">{ide.role}: </span>
                            {selectedProject.role}
                          </p>
                        ) : null}
                        {selectedProject.timeline ? (
                          <p>
                            <span className="text-fg">{ide.timeline}: </span>
                            {selectedProject.timeline}
                          </p>
                        ) : null}
                        {selectedProject.teamContext ? (
                          <p>
                            <span className="text-fg">{ide.team}: </span>
                            {selectedProject.teamContext}
                          </p>
                        ) : null}
                        {selectedProject.problem ? (
                          <p>
                            <span className="text-fg">{ide.problem}: </span>
                            {selectedProject.problem}
                          </p>
                        ) : null}
                        {selectedProject.outcome ? (
                          <p>
                            <span className="text-fg">{ide.outcome}: </span>
                            {selectedProject.outcome}
                          </p>
                        ) : null}
                        {selectedProject.owned ? (
                          <p>
                            <span className="text-fg">{ide.ownedLabel}: </span>
                            {selectedProject.owned}
                          </p>
                        ) : null}
                        {selectedProject.architectureNotes ? (
                          <p>
                            <span className="text-fg">{ide.architecture}: </span>
                            {selectedProject.architectureNotes}
                          </p>
                        ) : null}
                        {selectedProject.challenges ? (
                          <p>
                            <span className="text-fg">{ide.challenges}: </span>
                            {selectedProject.challenges}
                          </p>
                        ) : null}
                        {selectedProject.metrics ? (
                          <p>
                            <span className="text-fg">{ide.metrics}: </span>
                            {selectedProject.metrics}
                          </p>
                        ) : null}
                      </div>
                    )}
  
                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="text-sm text-primary mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {ide.technologies}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <TechBadge key={tech.name} tech={tech} surface="embeddedEditor" />
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
                          {ide.viewLive}
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
                          {ide.viewCode}
                        </a>
                      )}
                    </div>
                  </div>
  
                  {/* Code Preview & Mockup */}
                  <div className="relative">
                    {/* Tabs for switching between code and preview + open live */}
                    <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex gap-2 rounded-lg bg-card-muted/70 p-1">
                        <button
                          type="button"
                          onClick={() => switchView("code")}
                          className={`flex items-center gap-2 rounded-md px-3 py-1.5 transition-all duration-200 ${
                            activeView === "code"
                              ? "bg-primary/20 text-primary shadow-sm"
                              : "text-muted hover:bg-primary/5"
                          }`}
                        >
                          <svg
                            className="h-4 w-4"
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
                          {ide.code}
                        </button>
                        <button
                          type="button"
                          onClick={() => switchView("preview")}
                          className={`flex items-center gap-2 rounded-md px-3 py-1.5 transition-all duration-200 ${
                            activeView === "preview"
                              ? "bg-primary/20 text-primary shadow-sm"
                              : "text-muted hover:bg-primary/5"
                          }`}
                        >
                          <svg
                            className="h-4 w-4"
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
                          {ide.preview}
                        </button>
                      </div>
                      {/* Open live should only show when live preview tab is active not code tab */}
                      {selectedProject.liveLink && activeView === "preview" && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-card/90 px-3 text-xs font-medium text-fg shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          aria-label={ide.liveSiteAria.replace("{title}", selectedProject.title)}
                          title={ide.openLiveSiteInTab}
                        >
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                          <span className="hidden sm:inline">{ide.openLive}</span>
                        </a>
                      )}
                      {/* Open GitHub should only show when code tab is active not live preview tab */}
                      {selectedProject.githubLink && activeView === "code" && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-card/90 px-3 text-xs font-medium text-fg shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          aria-label={ide.githubAria.replace("{title}", selectedProject.title)}
                          title={ide.openGithubInTab}
                        >
                          <FolderGit2 className="h-4 w-4" strokeWidth={2} aria-hidden />
                          <span className="hidden sm:inline">{ide.openGithub}</span>
                        </a>
                      )}
                    </div>
  
                    <AnimatePresence mode="wait">
                      {activeView === "code" ? (
                        <motion.div
                          key="code"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative bg-page/90 backdrop-blur-sm rounded-lg 
                                    border border-border overflow-hidden shadow-lg"
                        >
                          {/* Line numbers */}
                          <div className="absolute top-0 left-0 bottom-0 w-8 bg-card-muted border-r border-border flex flex-col items-end pt-4 px-2 text-xs text-muted/50">
                            {Array.from({ length: 15 }, (_, i) => (
                              <div key={i} className="leading-6">{i + 1}</div>
                            ))}
                          </div>
                          
                          <div className="p-4 pl-12 font-mono text-sm text-muted overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-dark-light/10">
                            <pre>
                              <code className="text-sm">{selectedProject.codeSnippet}</code>
                            </pre>
                          </div>
                          {/* Tooltip indicators */}
                          <div className="absolute right-3 top-3 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title={ide.warningsTooltip} />
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title={ide.errorsTooltip} />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border border-border rounded-lg overflow-hidden shadow-lg"
                        >
                          <ProjectPreview
                            liveLink={selectedProject.liveLink}
                            title={selectedProject.title}
                            forceExternalOnly={selectedProject.livePreviewExternalOnly}
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
          className="h-32 bg-card/95 backdrop-blur-sm border-x border-b border-border 
                    font-mono text-sm text-muted p-4 rounded-b-lg shadow-lg
                    overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary">$</span>
            <span className="typing-animation">{ide.terminalGitStatus}</span>
          </div>
          <div className="text-muted/70">
            {ide.terminalBranchNote}
            <br />
            {ide.terminalUpToDate}
            <br />
            <span className="text-green-400">✓</span> {ide.terminalClean}
          </div>
        </motion.div>
      </div>
    );
  };