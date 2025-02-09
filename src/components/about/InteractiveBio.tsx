"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const bioSections = [
  {
    id: "intro",
    icon: "👋",
    title: "Introduction",
    content:
      "Hey there! I'm Azizbek Arzikulov, a sophomore at Sejong University, passionate about Computer Science and Engineering.",
  },
  {
    id: "journey",
    icon: "🚀",
    title: "Journey",
    content:
      "Born and raised in Uzbekistan, I jumped into university life at 17, eager to pursue my dream of becoming a web developer.",
  },
  {
    id: "experience",
    icon: "💼",
    title: "Experience",
    content:
      "In just over a year, I've dabbled in everything from website design to social media management and graphic design, freelancing along the way.",
  },
  {
    id: "vision",
    icon: "🎯",
    title: "Vision",
    content:
      "Now, my focus is on mastering web development and building a career I'm proud of, turning my passion into a profession, one line of code at a time!",
  },
];

export function InteractiveBio() {
  const [activeSection, setActiveSection] = useState("intro");

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
