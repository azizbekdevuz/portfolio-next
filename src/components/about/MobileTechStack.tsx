"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TechStackContext } from "../sections/AboutSection";

export function MobileTechStack() {
  const techStack = useContext(TechStackContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const error = null;

  if (Object.keys(techStack).length > 0 && selectedCategory === "") {
    setSelectedCategory(Object.keys(techStack)[0]);
  }

  // Loading state - Simplified for mobile
  if (Object.keys(techStack).length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6 font-mono">
          <span className="text-primary/50">{"<"}</span>
          <h3 className="text-xl font-bold text-text-light">TechStack</h3>
          <span className="text-primary/50">{"/>"}</span>
        </div>

        <div className="flex overflow-x-auto pb-2 space-x-2 mb-6 scrollbar-hide">
          {["Frontend", "Backend", "Languages", "Tools"].map((category, i) => (
            <div
              key={i}
              className="flex-shrink-0 p-2.5 rounded-lg border border-primary/20 animate-pulse"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl opacity-50">
                  {["🎨", "⚡", "💻", "🛠️"][i]}
                </span>
                <span className="text-text-secondary/70 whitespace-nowrap">
                  {category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-dark-light/20 rounded-lg p-4 border border-primary/20">
          <div className="grid grid-cols-2 gap-4">
            {["HTML", "CSS", "JS", "React"].map((tech, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-dark border border-primary/20 animate-pulse"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full"></div>
                </div>
                <div className="text-center">
                  <h4 className="text-text-secondary/50 text-sm font-medium mb-1.5">
                    {tech}
                  </h4>
                  <div className="h-1 bg-primary/20 rounded-full"></div>
                  <div className="text-[10px] text-primary/50 mt-1">Loading...</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || Object.keys(techStack).length === 0) {
    return (
      <div className="mb-12 text-center py-6">
        <div className="text-red-500 text-lg">
          {error || "No tech stack data found"}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {/* Section Title */}
      <motion.div
        className="flex items-center gap-2 mb-6 font-mono"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary/50">{"<"}</span>
        <h3 className="text-xl font-bold text-text-light">TechStack</h3>
        <span className="text-primary/50">{"/>"}</span>
      </motion.div>

      {/* Horizontal Scrolling Category Navigation for Mobile */}
      <div className="overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <div className="flex space-x-2 min-w-min">
          {Object.entries(techStack).map(([key, category]) => (
            <motion.button
              key={key}
              className={`flex-shrink-0 p-2.5 rounded-lg text-left transition-all duration-300
                       border ${
                         selectedCategory === key
                           ? "border-primary bg-primary/10"
                           : "border-primary/20 hover:border-primary/50"
                       }`}
              onClick={() => setSelectedCategory(key)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-text-light text-sm font-medium whitespace-nowrap">
                  {category.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tech Grid - 2 columns for mobile */}
      <div className="relative bg-dark-light/20 rounded-lg p-4 border border-primary/20">
        <AnimatePresence mode="wait">
          {selectedCategory && techStack[selectedCategory] && (
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {techStack[selectedCategory].techs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onTouchStart={() => setActiveTech(activeTech === tech.name ? null : tech.name)}
                >
                  {/* Tech Card - Simplified for mobile */}
                  <motion.div
                    className={`relative p-3 rounded-lg bg-dark border 
                              ${activeTech === tech.name ? 'border-primary/50' : 'border-primary/20'}
                              transition-colors duration-300`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Tech Icon */}
                    <div className="flex items-center justify-center mb-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={tech.icon}
                          alt={`${tech.name} icon`}
                          fill
                          sizes="32px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>

                    {/* Tech Name */}
                    <div className="text-center">
                      <h4 className="text-text-light text-sm font-medium mb-1.5 truncate">
                        {tech.name}
                      </h4>

                      {/* Progress Bar */}
                      <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                        />
                      </div>
                      <div className="text-[10px] text-primary mt-0.5">
                        {tech.level}%
                      </div>
                    </div>

                    {/* Simplified Effects for Mobile */}
                    {activeTech === tech.name && (
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-lg opacity-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        style={{
                          backgroundColor: techStack[selectedCategory].color,
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simplified Background Grid Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>
      </div>
    </div>
  );
}