"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, LayoutGrid, Server, Wrench } from "lucide-react";
import { TechIconTile } from "@/components/ui/TechIconTile";
import type { LucideIcon } from "lucide-react";
import { TechStackContext } from "../sections/AboutSection";
import { ABOUT_TECH_CARD_SHELL } from "@/lib/about-tech-surface";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  frontend: LayoutGrid,
  backend: Server,
  languages: Code2,
  tools: Wrench,
};

export function TechStack() {
  const techStack = useContext(TechStackContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const keys = Object.keys(techStack);
  const activeKey =
    selectedCategory && keys.includes(selectedCategory) ? selectedCategory : (keys[0] ?? "");

  if (Object.keys(techStack).length === 0) {
    return (
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-3 font-mono">
          <span className="text-accent/50">{"<"}</span>
          <h3 className="text-2xl font-bold text-fg">TechStack</h3>
          <span className="text-accent/50">{"/>"}</span>
        </div>
        <div className="rounded-xl border border-border bg-surface-soft p-8 dark:bg-card-muted/40">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <motion.div
        className="mb-8 flex items-center gap-3 font-mono"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-accent/50">{"<"}</span>
        <h3 className="text-2xl font-bold text-fg">TechStack</h3>
        <span className="text-accent/50">{"/>"}</span>
      </motion.div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {Object.entries(techStack).map(([key, category]) => {
          const CatIcon = CATEGORY_ICONS[key] ?? LayoutGrid;
          const active = activeKey === key;
          return (
            <motion.button
              key={key}
              type="button"
              className={`rounded-xl border p-4 text-left transition-colors ${
                active
                  ? "border-border-strong bg-card shadow-sm ring-1 ring-accent/20"
                  : "border-border bg-page-elevated hover:border-border-strong dark:bg-card/80"
              }`}
              onClick={() => setSelectedCategory(key)}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <CatIcon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                <span className="font-medium text-fg">{category.title}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative rounded-2xl border border-border bg-surface-soft p-6 dark:border-border-strong dark:bg-card-muted/35 md:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 dark:opacity-100"
          aria-hidden
        />
        <AnimatePresence mode="wait">
          {activeKey && techStack[activeKey] && (
            <motion.div
              key={activeKey}
              className="relative z-[1] grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {techStack[activeKey].techs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`p-4 ${ABOUT_TECH_CARD_SHELL}`}
                >
                  <div className="mb-3 flex items-center justify-center">
                    <TechIconTile iconId={tech.iconId} size="lg" />
                  </div>
                  <h4 className="text-center text-sm font-semibold text-fg">{tech.name}</h4>
                  {tech.level != null ? (
                    <>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-card-muted">
                        <motion.div
                          className="h-full bg-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                        />
                      </div>
                      <p className="mt-1 text-center text-xs text-muted">{tech.level}%</p>
                    </>
                  ) : (
                    <p className="mt-2 text-center text-[11px] text-subtle">In use</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
