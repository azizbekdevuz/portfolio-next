"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Tech categories with their respective technologies
const techStack = {
  frontend: {
    title: "Frontend",
    icon: "🎨",
    color: "#149ddd",
    techs: [
      { name: "HTML", level: 100, icon: "/icons/html.svg" },
      { name: "CSS", level: 100, icon: "/icons/css.svg" },
      { name: "JavaScript", level: 80, icon: "/icons/javascript.svg" },
      { name: "React", level: 85, icon: "/icons/react.svg" },
      { name: "Next.js", level: 80, icon: "/icons/nextjs.svg" },
      { name: "TypeScript", level: 75, icon: "/icons/typescript.svg" },
      { name: "Tailwind", level: 90, icon: "/icons/tailwind.svg" },
    ],
  },
  backend: {
    title: "Backend",
    icon: "⚡",
    color: "#2ecc71",
    techs: [
      { name: "PHP", level: 80, icon: "/icons/php.svg" },
      { name: "Node.js", level: 75, icon: "/icons/nodejs.svg" },
      { name: "MySQL", level: 70, icon: "/icons/mysql.svg" },
      { name: "MongoDB", level: 65, icon: "/icons/mongodb.svg" },
    ],
  },
  languages: {
    title: "Languages",
    icon: "💻",
    color: "#e74c3c",
    techs: [
      { name: "C", level: 60, icon: "/icons/c.svg" },
      { name: "C++", level: 60, icon: "/icons/cpp.svg" },
      { name: "Java", level: 60, icon: "/icons/java.svg" },
      { name: "Python", level: 30, icon: "/icons/python.svg" },
    ],
  },
  tools: {
    title: "Tools & Others",
    icon: "🛠️",
    color: "#9b59b6",
    techs: [
      { name: "Git", level: 85, icon: "/icons/git.svg" },
      { name: "Photoshop", level: 80, icon: "/icons/photoshop.svg" },
      { name: "Illustrator", level: 75, icon: "/icons/illustrator.svg" },
      { name: "Figma", level: 70, icon: "/icons/figma.svg" },
    ],
  },
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="mb-20">
      {/* Section Title */}
      <motion.div
        className="flex items-center gap-3 mb-10 font-mono"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary/50">{"<"}</span>
        <h3 className="text-2xl font-bold text-text-light">TechStack</h3>
        <span className="text-primary/50">{"/>"}</span>
      </motion.div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(techStack).map(([key, category]) => (
          <motion.button
            key={key}
            className={`p-4 rounded-lg text-left transition-all duration-300
                       border ${
                         selectedCategory === key
                           ? "border-primary bg-primary/10"
                           : "border-primary/20 hover:border-primary/50"
                       }`}
            onClick={() => setSelectedCategory(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-text-light font-medium">
                {category.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Tech Grid */}
      <div className="relative bg-dark-light/20 rounded-lg p-8 border border-primary/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {techStack[selectedCategory as keyof typeof techStack].techs.map(
              (tech, index) => (
                <motion.div
                  key={tech.name}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredTech(tech.name)}
                  onHoverEnd={() => setHoveredTech(null)}
                >
                  {/* Tech Card */}
                  <motion.div
                    className="relative p-4 rounded-lg bg-dark border border-primary/20
                           hover:border-primary/50 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    {/* Tech Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>

                    {/* Tech Name */}
                    <div className="text-center">
                      <h4 className="text-text-light font-medium mb-2">
                        {tech.name}
                      </h4>

                      {/* Progress Bar */}
                      <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-primary mt-1">
                        {tech.level}%
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <AnimatePresence>
                      {hoveredTech === tech.name && (
                        <>
                          {/* Glow Effect */}
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-lg blur-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            style={{
                              backgroundColor:
                                techStack[
                                  selectedCategory as keyof typeof techStack
                                ].color,
                            }}
                          />

                          {/* Circuit Lines */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute bg-primary/20"
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
              ),
            )}
          </motion.div>
        </AnimatePresence>

        {/* Background Grid Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>
      </div>
    </div>
  );
}
