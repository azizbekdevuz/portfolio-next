"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const achievements = [
  {
    id: "edu",
    title: "Education",
    icon: "🎓",
    color: "#149ddd",
    items: [
      {
        title: "Computer Science & Engineering",
        subtitle: "Sejong University",
        description: "Currently pursuing BSc with strong academic performance",
        year: "2022-2026",
        highlight:
          "Relevant Coursework: Data Structures, Algorithms, Web Development",
      },
      {
        title: "High School",
        subtitle: "46th public school, Samarkand, UZ",
        description: "Graduated with red diploma",
        year: "2019-2022",
        highlight: "Academic Excellence Award",
      },
    ],
  },
  {
    id: "projects",
    title: "Key Projects",
    icon: "💻",
    color: "#2ecc71",
    items: [
      {
        title: "ZDesigner AI",
        subtitle: "AI-Powered Interior Design Tool",
        description: "Web application that redesigns room interiors using AI",
        year: "2024",
        highlight: "Technologies: React, Next.js, Node.js, AI Integration",
      },
      {
        title: "POZITIV Denta",
        subtitle: "Dental Clinic Website",
        description: "Full-featured website with appointment system",
        year: "2023",
        highlight: "Technologies: HTML, CSS, JavaScript, PHP",
      },
    ],
  },
  {
    id: "skills",
    title: "Certifications & Skills",
    icon: "🏆",
    color: "#e74c3c",
    items: [
      {
        title: "Web Development",
        subtitle: "Full Stack Expertise",
        description: "Proficient in modern web technologies",
        year: "2023",
        highlight: "Strong focus on React and Next.js ecosystem",
      },
      {
        title: "Design Skills",
        subtitle: "UI/UX & Graphic Design",
        description: "Experience with modern design tools",
        year: "2022",
        highlight: "Adobe Creative Suite & Figma proficiency",
      },
    ],
  },
];

export function Achievements() {
  const [activeCategory, setActiveCategory] = useState("edu");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
