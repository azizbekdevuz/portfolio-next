"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyContext } from "../sections/AboutSection";

export function MobileJourneyTimeline() {
  const error = null;
  const journeyData = useContext(JourneyContext);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Loading state - Simplified for mobile
  if (journeyData.length === 0) {
    return (
      <div className="relative mb-12">
        <div className="flex items-center gap-2 mb-6 font-mono">
          <span className="text-primary/50">{"/**"}</span>
          <h3 className="text-xl font-bold text-text-light">Journey.map()</h3>
          <span className="text-primary/50">{"*/"}</span>
        </div>

        <div className="space-y-4">
          {[1, 2].map((item, index) => (
            <div
              key={index}
              className="bg-dark-light/30 rounded-lg border border-primary/20 backdrop-blur-sm overflow-hidden animate-pulse"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border-b border-primary/20">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center font-mono text-xs text-primary/70">
                  <div className="h-3 w-16 mx-auto bg-primary/20 rounded"></div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="h-5 w-5 bg-primary/20 rounded"></div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-2/3 bg-primary/20 rounded"></div>
                    <div className="h-3 w-1/2 bg-primary/10 rounded"></div>
                    <div className="h-3 w-full bg-primary/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error || journeyData.length === 0) {
    return (
      <div className="relative mb-12 text-center py-6">
        <div className="text-red-500 text-lg">
          {error || "No journey data found"}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-12">
      {/* Title with code-style comment */}
      <motion.div
        className="flex items-center gap-2 mb-6 font-mono"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary/50">{"/**"}</span>
        <h3 className="text-xl font-bold text-text-light">Journey.map()</h3>
        <span className="text-primary/50">{"*/"}</span>
      </motion.div>

      {/* Mobile Timeline - Vertical Layout */}
      <div className="space-y-4">
        {journeyData.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: [0.17, 0.55, 0.55, 1],
            }}
          >
            {/* Timeline connector line - only between items */}
            {index < journeyData.length - 1 && (
              <div className="absolute left-5 top-[40px] w-px h-[calc(100%+1rem)] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"></div>
            )}
            
            <div className="relative">
              {/* Terminal-style Card - More compact for mobile */}
              <motion.div
                className="relative bg-dark-light/30 rounded-lg border border-primary/20 
                          backdrop-blur-sm overflow-hidden"
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {/* Card Header - Simplified */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border-b border-primary/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center font-mono text-xs text-primary/70">
                    {item.date}.js
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon with simplified Matrix-style background */}
                    <motion.div
                      className="relative w-10 h-10 rounded-lg bg-primary/10 
                                flex items-center justify-center overflow-hidden"
                      whileTap={{ scale: 1.1 }}
                    >
                      <div className="relative z-10 text-xl">{item.icon}</div>
                      {/* Simplified animation for better performance */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          backgroundPosition: activeIndex === index ? ["0% 0%", "0% 100%"] : "0% 0%",
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-family='monospace' font-size='10' fill='%23149ddd' text-anchor='middle'%3E01%3C/text%3E%3C/svg%3E")`,
                        }}
                      />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      {/* Title with code syntax */}
                      <div className="font-mono mb-1 text-sm">
                        <span className="text-primary/70">const</span>{" "}
                        <span className="text-text-light font-semibold truncate block">
                          {item.title}
                        </span>
                      </div>

                      {/* Subtitle */}
                      <div className="text-text-secondary text-xs mb-1">
                        @ {item.subtitle}
                      </div>

                      {/* Description with typing effect - Collapsed by default */}
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            className="text-text-secondary/80 text-xs mb-2 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.description}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tech stack with code-style tags - Show fewer on mobile */}
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.tech.slice(0, activeIndex === index ? item.tech.length : 3).map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            className="group relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            <div className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/20">
                              <code className="text-[10px] text-primary">
                                {tech}
                              </code>
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* "Show more" indicator if there are more tech items */}
                        {!activeIndex && item.tech.length > 3 && (
                          <motion.div
                            className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/20"
                            whileTap={{ scale: 0.95 }}
                          >
                            <code className="text-[10px] text-primary">
                              +{item.tech.length - 3} more
                            </code>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive elements on tap - Simplified for mobile */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Simplified code lines decoration */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-0 h-px w-full bg-primary/10"
                          style={{ top: `${(i + 1) * 30}%` }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Link if available - Positioned differently for mobile */}
              {item.link && activeIndex === index && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-1.5 bg-primary 
                             text-white text-xs text-center rounded-md shadow-md
                             hover:shadow-primary/20 transition-shadow"
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      // This prevents the click from propagating to the parent
                      // which would toggle the active index
                      e.stopPropagation();
                    }}
                  >
                    View Project →
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}