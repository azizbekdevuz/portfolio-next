"use client";

import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Compass, Globe, Layers, type LucideIcon } from "lucide-react";
import { BioContext } from "../sections/AboutSection";

const BIO_ICONS: Record<string, LucideIcon> = {
  build: Layers,
  approach: Compass,
  context: Globe,
};

export function InteractiveBio() {
  const bioSections = useContext(BioContext);
  const [selectedId, setSelectedId] = useState("");
  const ids = bioSections.map((s) => s.id);
  const activeId = selectedId && ids.includes(selectedId) ? selectedId : (ids[0] ?? "");
  const active = bioSections.find((s) => s.id === activeId);

  if (bioSections.length === 0) {
    return (
      <div className="mb-16 grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="h-40 animate-pulse rounded-xl border border-border bg-surface-soft dark:bg-card-muted/40" />
        <div className="h-64 animate-pulse rounded-xl border border-border bg-surface-soft dark:bg-card-muted/40" />
      </div>
    );
  }

  return (
    <div className="mb-16 grid gap-8 md:grid-cols-[1fr_2fr]">
      <div className="flex flex-col gap-3">
        {bioSections.map((section) => {
          const Icon = BIO_ICONS[section.id] ?? Layers;
          const on = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => setSelectedId(section.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                on
                  ? "border-border-strong bg-card shadow-sm ring-1 ring-accent/20"
                  : "border-border bg-page-elevated hover:border-border-strong dark:bg-card/80"
              }`}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                <span className="font-medium text-fg">{section.title}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative min-h-[200px] rounded-2xl border border-border bg-surface-soft p-6 dark:border-border-strong dark:bg-card-muted/40 md:min-h-[240px] md:p-8">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = BIO_ICONS[active.id] ?? Layers;
                return (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-lg font-semibold text-fg">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{active.content}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
