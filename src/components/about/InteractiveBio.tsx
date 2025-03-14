"use client";

import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { BioContext } from "../sections/AboutSection";

export function InteractiveBio() {
  const bioSections = useContext(BioContext);
  const [activeSection, setActiveSection] = useState("");
  const error = null;

  if (bioSections.length > 0 && activeSection === "") {
    setActiveSection(bioSections[0].id);
  }

  // Show loading skeleton
  if (bioSections.length === 0) {
    return (
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 mb-20">
        {/* Navigation Cards Loading */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-primary/20 bg-dark-light/20 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10"></div>
                <div className="h-5 w-24 bg-primary/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Display Loading */}
        <div className="relative bg-dark-light/20 rounded-lg p-6 border border-primary/20 min-h-[200px]">
          <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
          <div className="absolute top-6 left-0 h-px w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

          <div className="flex items-start gap-4 ml-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse"></div>
            <div className="space-y-3 flex-1">
              <div className="h-6 w-1/3 bg-primary/10 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-dark-light/40 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-dark-light/40 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-dark-light/40 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Code-style line numbers */}
          <div className="absolute left-2 top-6 bottom-6 flex flex-col items-end pr-3 text-sm text-primary/30 font-mono">
            {[...Array(10)].map((_, i) => (
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
      <div className="text-center py-10 mb-20">
        <div className="text-red-500 text-lg">
          {error || "No bio sections found"}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-8 mb-20">
      {/* Navigation Cards */}
      <div className="flex flex-col gap-4">
        {bioSections.map((section) => (
          <motion.button
            key={section.id}
            className={`p-4 rounded-lg text-left transition-colors duration-300
                       border ${
                         activeSection === section.id
                           ? "border-primary/50 bg-primary/10"
                           : "border-primary/20 bg-dark-light/20 hover:bg-primary/5"
                       }`}
            onClick={() => setActiveSection(section.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{section.icon}</span>
              <span className="text-text-light font-medium">
                {section.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Content Display */}
      <div className="relative bg-dark-light/20 rounded-lg p-6 border border-primary/20">
        {/* Tech-style decorations */}
        <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
        <div className="absolute top-6 left-0 h-px w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

        {bioSections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: activeSection === section.id ? 1 : 0,
              x: activeSection === section.id ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-6 ${activeSection === section.id ? "block" : "hidden"}`}
          >
            <div className="flex items-start gap-4">
              <motion.span
                className="text-4xl"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {section.icon}
              </motion.span>

              <div>
                <motion.h3
                  className="text-xl text-text-light font-medium mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {section.title}
                </motion.h3>

                <motion.p
                  className="text-text-secondary leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {section.content}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Code-style line numbers */}
        <div className="absolute left-2 top-6 bottom-6 flex flex-col items-end pr-3 text-sm text-primary/30 font-mono">
          {[...Array(10)].map((_, i) => (
            <div key={i}>{String(i + 1).padStart(2, "0")}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
