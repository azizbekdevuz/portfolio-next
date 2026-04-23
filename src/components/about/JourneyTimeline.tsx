"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, GraduationCap, Layers, type LucideIcon } from "lucide-react";
import { JourneyContext } from "../sections/AboutSection";

const JOURNEY_ICONS: Record<string, LucideIcon> = {
  j1: Layers,
  j2: Building2,
  j3: Briefcase,
  j4: GraduationCap,
};

export function JourneyTimeline() {
  const journeyData = useContext(JourneyContext);

  if (journeyData.length === 0) {
    return (
      <div className="relative mb-16">
        <div className="mb-8 flex items-center gap-3 font-mono">
          <span className="text-accent/50">{"/**"}</span>
          <h3 className="text-2xl font-bold text-fg">Journey</h3>
          <span className="text-accent/50">{"*/"}</span>
        </div>
        <div className="rounded-xl border border-border bg-surface-soft p-8 dark:bg-card-muted/40">
          <p className="text-sm text-muted">No journey entries.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-16">
      <motion.div
        className="mb-8 flex items-center gap-3 font-mono"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-accent/50">{"/**"}</span>
        <h3 className="text-2xl font-bold text-fg">Journey</h3>
        <span className="text-accent/50">{"*/"}</span>
      </motion.div>

      <div className="space-y-6">
        {journeyData.map((item, index) => {
          const id = item.id ?? `j${index + 1}`;
          const Icon = JOURNEY_ICONS[id] ?? Layers;
          return (
            <motion.article
              key={id}
              className="rounded-2xl border border-border bg-page-elevated p-5 shadow-sm dark:border-border-strong dark:bg-card md:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-soft text-accent dark:bg-card-muted">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{item.date}</p>
                  <h4 className="mt-1 text-lg font-semibold text-fg">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-fg dark:bg-page-elevated/50"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      View link
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
