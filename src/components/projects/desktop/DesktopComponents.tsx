import { memo } from "react";
import { motion} from "framer-motion";
import Image from "next/image";
import { Project } from "@/models/Project";

// === DESKTOP COMPONENTS ===
// Memoized components for better performance

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

export const TechBadge = memo(({ tech }: { tech: { name: string; icon: string } }) => (
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