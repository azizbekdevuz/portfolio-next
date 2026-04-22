"use client";

import { motion } from "framer-motion";
import { Pencil, Keyboard, Zap } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

export function MobileInProgressSection({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const icons = [
    <Pencil key="p" className="h-8 w-8" />,
    <Keyboard key="k" className="h-8 w-8" />,
    <Zap key="z" className="h-8 w-8" />,
  ];

  return (
    <section
      id="in-progress"
      className={`relative px-4 ${embedded ? "scroll-mt-0 py-4" : "scroll-mt-20 py-12"}`}
    >
      {!embedded && (
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-fg">
            <span className="text-primary">[</span>
            {messages.inProgress.title}
            <span className="text-primary">]</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-3 font-mono text-xs text-muted">{messages.inProgress.subtitle}</p>
        </motion.div>
      )}

      <div className="mx-auto max-w-lg space-y-4">
        <p className="text-center text-sm text-muted">{messages.inProgress.mobilePitch}</p>
        {messages.inProgress.stages.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-lg border border-border bg-surface-soft p-4 dark:bg-card-muted/50"
          >
            <div className="flex gap-3">
              <span className="text-2xl">{icons[index]}</span>
              <div>
                <h3 className="font-semibold text-fg">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <span className="mt-2 inline-block rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs text-primary">
                  {item.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
