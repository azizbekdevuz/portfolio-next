"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AchievementsContext } from "../sections/AboutSection";

export function MobileAchievements() {
  // Use context instead of fetching
  const achievements = useContext(AchievementsContext);

  const [activeCategory, setActiveCategory] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Set the first category as active if we have data and no active category
  if (achievements.length > 0 && activeCategory === "") {
    setActiveCategory(achievements[0].id);
  }

  // Show loading skeleton if no achievements yet - Simplified for mobile
  if (achievements.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6 font-mono">
          <div className="h-5 w-16 bg-primary/10 animate-pulse rounded"></div>
          <div className="h-6 w-36 bg-primary/20 animate-pulse rounded"></div>
          <div className="h-5 w-6 bg-primary/10 animate-pulse rounded"></div>
        </div>

        <div className="flex overflow-x-auto pb-2 space-x-2 mb-6 scrollbar-hide">
          {["Education", "Projects", "Skills"].map((label, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-8 w-24 bg-dark-light/20 animate-pulse rounded-lg flex items-center justify-center"
            >
              <span className="text-text-secondary/50 text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[
            "Loading achievements...",
            "Fetching more data...",
          ].map((text, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-primary/20 bg-dark-light/20"
            >
              <div className="flex justify-between">
                <div className="space-y-2 w-4/5">
                  <div className="h-5 w-1/2 bg-primary/20 animate-pulse rounded flex items-center">
                    <span className="text-text-secondary/50 text-xs px-2">
                      {text}
                    </span>
                  </div>
                  <div className="h-4 w-2/5 bg-primary/10 animate-pulse rounded"></div>
                  <div className="h-3 w-3/4 bg-dark-light/40 animate-pulse rounded"></div>
                </div>
                <div className="h-5 w-16 bg-primary/10 animate-pulse rounded-full"></div>
              </div>
            </div>
          ))}
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
        <span className="text-primary/50">function</span>
        <h3 className="text-xl font-bold text-text-light">achievements()</h3>
        <span className="text-primary/50">{" {"}</span>
      </motion.div>

      {/* Horizontal Scrolling Categories for Mobile */}
      <div className="overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <div className="flex space-x-2 min-w-min">
          {achievements.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                         transition-all duration-300 ${
                           activeCategory === category.id
                             ? "bg-primary/10 border-primary"
                             : "bg-dark-light/20 border-primary/20"
                         } border`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-text-light text-sm whitespace-nowrap">{category.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Achievement Cards - Simplified for Mobile */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {achievements
              .find((cat) => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Achievement Card - Simplified for Mobile */}
                  <motion.div
                    className="relative p-4 rounded-lg border border-primary/20
                             bg-dark-light/20 overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                    onTouchStart={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                  >
                    {/* Year Badge */}
                    <div className="absolute top-3 right-3">
                      <div
                        className="px-2 py-0.5 rounded-full bg-primary/10 
                                    text-primary text-xs font-mono"
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pr-12">
                      <h4 className="text-lg text-text-light font-bold mb-1">
                        {item.title}
                      </h4>
                      <div className="text-primary text-sm mb-1.5">{item.subtitle}</div>
                      
                      {/* Description - Only show when expanded */}
                      <AnimatePresence>
                        {expandedItem === item.title && (
                          <motion.p 
                            className="text-text-secondary text-xs mb-3"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      
                      <div className="font-mono text-xs text-primary/70">
                        &gt; {expandedItem === item.title ? item.highlight : `${item.highlight.substring(0, 40)}${item.highlight.length > 40 ? '...' : ''}`}
                      </div>
                    </div>

                    {/* Tap to expand indicator */}
                    {expandedItem !== item.title && (
                      <motion.div 
                        className="absolute bottom-2 right-2 text-xs text-primary/50"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ↓
                      </motion.div>
                    )}

                    {/* Simple Effects for Mobile */}
                    {expandedItem === item.title && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Simplified circuit pattern */}
                        <svg className="w-full h-full opacity-30">
                          <pattern
                            id="circuit-mobile"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 10 0 L 10 10 M 0 10 L 20 10"
                              stroke="currentColor"
                              strokeWidth="0.5"
                            />
                          </pattern>
                          <rect
                            width="100%"
                            height="100%"
                            fill="url(#circuit-mobile)"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Closing Bracket */}
      <motion.div
        className="flex items-center gap-2 mt-6 font-mono text-primary/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {"}"}
      </motion.div>
    </div>
  );
}