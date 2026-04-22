"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Pencil, Keyboard, Zap } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

function RoadmapStages() {
  const { messages } = useI18n();
  const icons = [
    <Pencil key="p" className="h-10 w-10" />,
    <Keyboard key="k" className="h-10 w-10" />,
    <Zap key="z" className="h-10 w-10" />,
  ];
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {messages.inProgress.stages.map((stage, index) => (
        <motion.div
          key={`${stage.title}-${index}`}
          className="rounded-lg border border-border bg-surface-soft p-6 dark:bg-card-muted/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="mb-4 text-4xl">{icons[index]}</div>
          <h4 className="mb-2 font-bold text-primary">{stage.title}</h4>
          <p className="mb-4 text-sm text-muted">{stage.description}</p>
          <span className="inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs text-primary">
            {stage.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function DesktopInProgressSection({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const d = messages.inProgress.desktop;
  const detailColumns = [
    { title: d.columnInProgressTitle, items: d.columnInProgressItems },
    { title: d.columnPlannedTitle, items: d.columnPlannedItems },
    { title: d.columnNearTitle, items: d.columnNearItems },
  ];
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
      className={`relative overflow-hidden ${embedded ? "min-h-0 py-8" : "min-h-screen py-20"}`}
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
          style={{ y }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h2 className="relative mb-5 flex items-center text-4xl font-bold text-fg md:text-5xl">
                  <span className="text-primary/70">[</span>
                  <span>{messages.inProgress.title}</span>
                  <span className="text-primary/70">]</span>
                  <motion.span
                    className="ml-1 text-primary"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.8,
                      repeatDelay: 0.2,
                    }}
                  >
                    _
                  </motion.span>
                </h2>

                <div className="mt-3 flex items-center gap-2 font-mono text-sm text-muted">
                  <span className="text-primary">●</span>
                  <span>{messages.inProgress.subtitle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Interactive Construction Metaphor */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="bg-surface-soft dark:bg-card-muted/60 backdrop-blur-sm border border-border rounded-lg p-8"
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

                <h3 className="mb-4 text-2xl font-bold text-fg md:text-3xl">{d.nextHeading}</h3>
                <p className="mx-auto mb-6 max-w-2xl text-muted">{d.nextBody}</p>

                {/* Construction Stages */}
                <RoadmapStages />

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
                    {isConstructing ? d.toggleHide : d.toggleShow}
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
                      <div className="mt-4 rounded-lg bg-card-muted/50 p-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          {detailColumns.map((column, index) => (
                            <motion.div
                              key={column.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 }}
                              className="text-left"
                            >
                              <h4 className="mb-3 font-bold text-primary">{column.title}</h4>
                              <ul className="space-y-2 text-muted">
                                {column.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-center gap-2 transition-colors hover:text-primary"
                                  >
                                    <span className="h-2 w-2 rounded-full bg-primary" />
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
                  <div className="mb-2 text-sm text-muted">{d.progressLabel}</div>
                  <div className="h-2.5 w-full rounded-full bg-surface-soft dark:bg-card-muted/60">
                    <motion.div
                      className="h-2.5 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-muted">
                    <span>{d.progressValue}</span>
                    <motion.div
                      className="font-bold text-primary"
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
                      {d.stayTuned}
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