import { memo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/models/Project";
import { TechIconTile } from "@/components/ui/TechIconTile";
import { ABOUT_TECH_CARD_SHELL } from "@/lib/about-tech-surface";

// === DESKTOP COMPONENTS ===
// Memoized components for better performance'

export const EditorTab = memo(({ 
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
                  ? "bg-card-muted text-fg"
                  : "text-muted hover:bg-accent/10"
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

export const ProjectFile = memo(({ 
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
                  ? "bg-accent/10 text-fg"
                  : "text-muted hover:bg-accent/10"
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

export const TechBadge = memo(
  ({
    tech,
    surface = "default",
  }: {
    tech: { name: string; icon: string };
    surface?: "default" | "embeddedEditor";
  }) => {

    const tileSurface = surface === "embeddedEditor" ? "emphasis" : "default";

    if (surface === "embeddedEditor") {
      return (
        <div
          className={`group flex min-w-0 items-center gap-2.5 px-3 py-2 text-sm transition-shadow duration-200 ${ABOUT_TECH_CARD_SHELL} hover:shadow-md`}
        >
          <div className="flex shrink-0 items-center justify-center">
            <TechIconTile src={tech.icon} alt="" size="md" surface={tileSurface} />
          </div>
          <span className="min-w-0 font-semibold leading-tight text-fg">
            {tech.name}
          </span>
        </div>
      );
    }

    return (
      <div
        className="group flex items-center gap-2 rounded-lg border border-border/70 bg-card-muted/40 px-2.5 py-1.5 text-sm text-fg transition-colors duration-200 hover:border-border-strong hover:bg-card-muted/70"
      >
        <TechIconTile src={tech.icon} alt="" size="sm" surface={tileSurface} />
        <span className="font-medium text-muted group-hover:text-fg">
          {tech.name}
        </span>
      </div>
    );
  }
);

TechBadge.displayName = 'TechBadge';