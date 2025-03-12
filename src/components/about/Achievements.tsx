"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/models/Achievement";

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/achievements");

        if (!response.ok) {
          throw new Error(`Error fetching achievements: ${response.status}`);
        }

        const data = await response.json();
        setAchievements(data);

        // Set the first category as active if we have data
        if (data.length > 0) {
          setActiveCategory(data[0].id);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
        setError("Failed to load achievements. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (isLoading) {
    return (
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-10 font-mono">
          <div className="h-6 w-24 bg-primary/10 animate-pulse rounded"></div>
          <div className="h-8 w-48 bg-primary/20 animate-pulse rounded"></div>
          <div className="h-6 w-8 bg-primary/10 animate-pulse rounded"></div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {["Education", "Projects", "Skills"].map((label, i) => (
            <div
              key={i}
              className="h-10 w-32 bg-dark-light/20 animate-pulse rounded-lg flex items-center justify-center"
            >
              <span className="text-text-secondary/50 text-sm">
                Loading {label}...
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {[
            "Fetching academic background...",
            "Loading project achievements...",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-primary/20 bg-dark-light/20"
            >
              <div className="flex justify-between">
                <div className="space-y-3 w-4/5">
                  <div className="h-7 w-1/2 bg-primary/20 animate-pulse rounded flex items-center">
                    <span className="text-text-secondary/50 text-sm px-2">
                      {text}
                    </span>
                  </div>
                  <div className="h-5 w-2/5 bg-primary/10 animate-pulse rounded"></div>
                  <div className="h-4 w-3/4 bg-dark-light/40 animate-pulse rounded"></div>
                  <div className="h-4 w-3/5 bg-primary/5 animate-pulse rounded"></div>
                </div>
                <div className="h-6 w-20 bg-primary/10 animate-pulse rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error || achievements.length === 0) {
    return (
      <div className="mb-20 text-center py-10">
        <div className="text-red-500 text-lg">
          {error || "No achievements found"}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      {/* Section Title */}
      <motion.div
        className="flex items-center gap-3 mb-10 font-mono"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary/50">function</span>
        <h3 className="text-2xl font-bold text-text-light">achievements()</h3>
        <span className="text-primary/50">{" {"}</span>
      </motion.div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {achievements.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg 
                       transition-all duration-300 ${
                         activeCategory === category.id
                           ? "bg-primary/10 border-primary"
                           : "bg-dark-light/20 border-primary/20"
                       } border`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-text-light">{category.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Achievement Cards */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            {achievements
              .find((cat) => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredItem(item.title)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  {/* Achievement Card */}
                  <motion.div
                    className="relative p-6 rounded-lg border border-primary/20
                             bg-dark-light/20 overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className="px-3 py-1 rounded-full bg-primary/10 
                                    text-primary text-sm font-mono"
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-[80%]">
                      <h4 className="text-xl text-text-light font-bold mb-2">
                        {item.title}
                      </h4>
                      <div className="text-primary mb-2">{item.subtitle}</div>
                      <p className="text-text-secondary mb-4">
                        {item.description}
                      </p>
                      <div className="font-mono text-sm text-primary/70">
                        &gt; {item.highlight}
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <AnimatePresence>
                      {hoveredItem === item.title && (
                        <>
                          {/* Circuit Board Effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            exit={{ opacity: 0 }}
                          >
                            <svg className="w-full h-full">
                              <pattern
                                id="circuit"
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
                                fill="url(#circuit)"
                              />
                            </svg>
                          </motion.div>

                          {/* Glowing Lines */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute bg-primary/10"
                                style={{
                                  height: "1px",
                                  width: "100%",
                                  top: `${(i + 1) * 25}%`,
                                  left: 0,
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.1 }}
                              />
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Closing Bracket */}
      <motion.div
        className="flex items-center gap-2 mt-8 font-mono text-primary/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {"}"}
      </motion.div>
    </div>
  );
}
