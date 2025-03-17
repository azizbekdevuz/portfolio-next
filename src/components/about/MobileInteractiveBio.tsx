"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BioContext } from "../sections/AboutSection";

export function MobileInteractiveBio() {
  const bioSections = useContext(BioContext);
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const error = null;

  if (bioSections.length > 0 && activeSection === "") {
    setActiveSection(bioSections[0].id);
  }

  // Show loading skeleton
  if (bioSections.length === 0) {
    return (
      <div className="flex flex-col gap-4 mb-12">
        {/* Loading state header */}
        <div className="h-10 w-full bg-dark-light/20 rounded-lg animate-pulse mb-2">
          <div className="h-full w-1/2 mx-auto bg-primary/10 flex items-center justify-center">
            <div className="h-5 w-20 bg-primary/10 rounded"></div>
          </div>
        </div>
        
        {/* Content Display Loading */}
        <div className="relative bg-dark-light/20 rounded-lg p-4 border border-primary/20 min-h-[180px]">
          <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
          <div className="absolute top-6 left-0 h-px w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

          <div className="flex items-start gap-3 ml-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-5 w-1/3 bg-primary/10 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-dark-light/40 rounded animate-pulse"></div>
                <div className="h-3 w-5/6 bg-dark-light/40 rounded animate-pulse"></div>
                <div className="h-3 w-3/4 bg-dark-light/40 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Code-style line numbers - Reduced for mobile */}
          <div className="absolute left-2 top-6 bottom-6 flex flex-col items-end pr-2 text-xs text-primary/30 font-mono">
            {[...Array(6)].map((_, i) => (
              <div key={i}>{String(i + 1).padStart(2, "0")}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || bioSections.length === 0) {
    return (
      <div className="text-center py-8 mb-12">
        <div className="text-red-500 text-lg">
          {error || "No bio sections found"}
        </div>
      </div>
    );
  }

  // Active bio section content
  const activeContent = bioSections.find(section => section.id === activeSection);

  return (
    <div className="flex flex-col gap-4 mb-12">
      {/* Mobile dropdown selector instead of tabs */}
      <motion.button
        className="p-3 rounded-lg text-left transition-colors duration-300
                  border border-primary/50 bg-primary/10"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {activeContent?.icon}
            </span>
            <span className="text-text-light font-medium">
              {activeContent?.title}
            </span>
          </div>
          <motion.span 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-primary"
          >
            ▼
          </motion.span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col gap-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {bioSections.map((section) => (
              section.id !== activeSection && (
                <motion.button
                  key={section.id}
                  className="p-3 rounded-lg text-left transition-colors duration-300
                            border border-primary/20 bg-dark-light/20 hover:bg-primary/5"
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsExpanded(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-text-light font-medium">
                      {section.title}
                    </span>
                  </div>
                </motion.button>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Display */}
      <div className="relative bg-dark-light/20 rounded-lg p-4 border border-primary/20">
        {/* Tech-style decorations */}
        <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
        <div className="absolute top-6 left-0 h-px w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

        <AnimatePresence mode="wait">
          {bioSections.map((section) => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="ml-6 pr-2"
              >
                <div className="flex items-start gap-3">
                  <motion.span
                    className="text-3xl"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.icon}
                  </motion.span>

                  <div>
                    <motion.h3
                      className="text-lg text-text-light font-medium mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {section.title}
                    </motion.h3>

                    <motion.p
                      className="text-text-secondary text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {section.content}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Code-style line numbers - Reduced for mobile */}
        <div className="absolute left-1 top-4 bottom-4 flex flex-col items-end pr-2 text-xs text-primary/30 font-mono">
          {[...Array(6)].map((_, i) => (
            <div key={i}>{String(i + 1).padStart(2, "0")}</div>
          ))}
        </div>
      </div>
    </div>
  );
}