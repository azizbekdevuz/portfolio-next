"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export const CountUpValue = ({
  start = 0,
  end,
  duration = 2,
}: {
  start?: number;
  end: number;
  duration?: number;
}) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const progress = (Date.now() - startTime) / (duration * 1000);
      if (progress >= 1) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(start + (end - start) * progress);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [start, end, duration]);

  return <>{Math.floor(value)}</>;
};

// Contribution Tracker Component
const ContributionTracker = () => {
  const [contributions, setContributions] = useState({
    codeLines: 0,
    features: 0,
    optimizations: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setContributions((prev) => ({
        codeLines: prev.codeLines + Math.floor(Math.random() * 10),
        features: prev.features + (Math.random() > 0.8 ? 1 : 0),
        optimizations: prev.optimizations + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {Object.entries(contributions).map(([key, value]) => (
        <div
          key={key}
          className="bg-dark-light/30 p-4 rounded-lg border border-primary/10 
                     hover:bg-primary/5 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-primary mb-2">
            <CountUpValue start={0} end={value} duration={1} />
          </div>
          <span className="text-text-secondary text-sm">
            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

// Construction Stages Component
const ConstructionStages = () => {
  const constructionStages = [
    {
      icon: "🏗️",
      title: "Foundation Laying",
      description: "Core architectural frameworks being established",
      progress: 60,
    },
    {
      icon: "🔧",
      title: "System Integration",
      description: "Connecting complex technological components",
      progress: 45,
    },
    {
      icon: "🖥️",
      title: "Interface Refinement",
      description: "Polishing user experience and interactions",
      progress: 30,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {constructionStages.map((stage, index) => (
        <motion.div
          key={stage.title}
          className="bg-dark-light/30 p-6 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="text-4xl mb-4">{stage.icon}</div>
          <h4 className="text-primary font-bold mb-2">{stage.title}</h4>
          <p className="text-text-secondary text-sm mb-4">
            {stage.description}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-dark-light/20 rounded-full h-2.5 mt-4">
            <motion.div
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stage.progress}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <div className="text-xs text-text-secondary mt-2">
            {stage.progress}% Complete
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export function InProgressSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and fade effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // State for interactive elements
  const [isConstructing, setIsConstructing] = useState(false);

  return (
    <motion.section
      ref={containerRef}
      id="in-progress"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
          style={{ y }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-4">
            Digital Ecosystem in Development
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Construction Metaphor */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="bg-dark-light/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Holographic Construction Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50 animate-pulse" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V7a1 1 0 011-1h1a1 1 0 001-1V4a2 2 0 114 0v1a1 1 0 001 1h2a1 1 0 001-1V4z"
                      />
                    </svg>
                  </motion.div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-text-light mb-4">
                  Crafting a Dynamic Digital Landscape
                </h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  This portfolio is a living, evolving digital ecosystem.
                  Currently under active development, each component is being
                  meticulously designed to showcase not just projects, but the
                  intricate journey of technological innovation.
                </p>

                {/* Construction Stages */}
                <ConstructionStages />

                {/* Contribution Tracker */}
                <ContributionTracker />

                {/* Interactive Construction Indicator */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  <motion.button
                    onClick={() => setIsConstructing(!isConstructing)}
                    className="px-6 py-3 bg-primary/10 border border-primary text-primary 
                               rounded-full flex items-center gap-2 hover:bg-primary/20 
                               transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V7a1 1 0 011-1h1a1 1 0 001-1V4a2 2 0 114 0v1a1 1 0 001 1h2a1 1 0 001-1V4z"
                      />
                    </svg>
                    {isConstructing ? "Hide Details" : "Explore Development"}
                  </motion.button>
                </div>

                {/* Expandable Construction Details */}
                <AnimatePresence>
                  {isConstructing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-dark-light/20 rounded-lg p-6 mt-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            {
                              title: "Sections in Progress",
                              items: [
                                "Skills",
                                "Testimonials",
                                "Blog",
                                "Contact",
                              ],
                            },
                            {
                              title: "Planned Enhancements",
                              items: [
                                "Responsive Optimization",
                                "Performance Tweaks",
                                "Accessibility Improvements",
                              ],
                            },
                            {
                              title: "Near Future",
                              items: [
                                "Case Studies",
                                "Detailed Project Breakdowns",
                                "Interactive Demos",
                              ],
                            },
                          ].map((column, index) => (
                            <motion.div
                              key={column.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 }}
                              className="text-left"
                            >
                              <h4 className="text-primary font-bold mb-3">
                                {column.title}
                              </h4>
                              <ul className="text-text-secondary space-y-2">
                                {column.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                  >
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overall Progress Indicator */}
                <div className="mt-6">
                  <div className="text-sm text-text-secondary mb-2">
                    Portfolio Completion Progress
                  </div>
                  <div className="w-full bg-dark-light/30 rounded-full h-2.5">
                    <motion.div
                      className="bg-primary h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-sm text-text-secondary mt-2 flex items-center justify-between">
                    <span>65% Complete</span>
                    <motion.div
                      className="text-primary font-bold"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Stay Tuned!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
