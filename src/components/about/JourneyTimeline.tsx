"use client";

import { useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyContext } from "../sections/AboutSection";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const error = null;

  const journeyData = useContext(JourneyContext);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Loading state
  if (journeyData.length === 0) {
    return (
      <div className="relative mb-20">
        <div className="flex items-center gap-3 mb-10 font-mono">
          <span className="text-primary/50">{"/**"}</span>
          <h3 className="text-2xl font-bold text-text-light">Journey.map()</h3>
          <span className="text-primary/50">{"*/"}</span>
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="bg-dark-light/30 rounded-lg border border-primary/20 backdrop-blur-sm overflow-hidden animate-pulse"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center font-mono text-sm text-primary/70">
                  <div className="h-4 w-24 mx-auto bg-primary/20 rounded"></div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="h-6 w-6 bg-primary/20 rounded"></div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-2/3 bg-primary/20 rounded"></div>
                    <div className="h-4 w-1/2 bg-primary/10 rounded"></div>
                    <div className="h-4 w-full bg-primary/5 rounded"></div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="px-3 py-1 rounded-md bg-primary/5 border border-primary/20"
                        >
                          <div className="h-3 w-16 bg-primary/10 rounded"></div>
                        </div>
                      ))}
                    </div>
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
      <div className="relative mb-20 text-center py-10">
        <div className="text-red-500 text-lg">
          {error || "No journey data found"}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative mb-20">
      {/* Title with code-style comment */}
      <motion.div
        className="flex items-center gap-3 mb-10 font-mono"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary/50">{"/**"}</span>
        <h3 className="text-2xl font-bold text-text-light">Journey.map()</h3>
        <span className="text-primary/50">{"*/"}</span>
      </motion.div>

      {/* Main Timeline */}
      <div className="space-y-8">
        {journeyData.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.17, 0.55, 0.55, 1],
            }}
          >
            <div
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Terminal-style Card */}
              <motion.div
                className="relative bg-dark-light/30 rounded-lg border border-primary/20 
                          backdrop-blur-sm overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center font-mono text-sm text-primary/70">
                    {item.date}.js
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon with Matrix-style background */}
                    <motion.div
                      className="relative w-12 h-12 rounded-lg bg-primary/10 
                                flex items-center justify-center overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="relative z-10 text-2xl">{item.icon}</div>
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        initial={false}
                        animate={{
                          backgroundPosition: ["0% 0%", "0% 100%"],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-family='monospace' font-size='10' fill='%23149ddd' text-anchor='middle'%3E01%3C/text%3E%3C/svg%3E")`,
                        }}
                      />
                    </motion.div>

                    <div className="flex-1">
                      {/* Title with code syntax */}
                      <div className="font-mono mb-2">
                        <span className="text-primary/70">const</span>{" "}
                        <span className="text-text-light text-xl font-semibold">
                          {item.title}
                        </span>
                      </div>

                      {/* Subtitle */}
                      <div className="text-text-secondary mb-2 ml-4">
                        @ {item.subtitle}
                      </div>

                      {/* Description with typing effect */}
                      <motion.div
                        className="text-text-secondary/80 mb-3 ml-4"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {item.description}
                      </motion.div>

                      {/* Tech stack with code-style tags */}
                      <div className="ml-4 flex flex-wrap gap-2">
                        {item.tech.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            className="group relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ delay: techIndex * 0.1 }}
                          >
                            <div className="px-3 py-1 rounded-md bg-primary/5 border border-primary/20">
                              <code className="text-xs text-primary">
                                import {tech}
                              </code>
                            </div>

                            {/* Hover glow effect */}
                            <motion.div
                              className="absolute inset-0 -z-10 bg-primary/20 rounded-md blur-lg"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive elements on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <>
                      {/* Code lines decoration */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute left-0 h-px w-full bg-primary/10"
                            style={{ top: `${(i + 1) * 20}%` }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </motion.div>

                      {/* Glitch effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-primary/5 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.1, 0],
                          clipPath: [
                            "inset(0 0 100% 0)",
                            "inset(0 0 0 0)",
                            "inset(100% 0 0 0)",
                          ],
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Link if available */}
              {item.link && (
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -right-4 -bottom-4 px-4 py-2 bg-primary 
                           text-white text-sm rounded-full shadow-lg 
                           hover:shadow-primary/20 transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project →
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
