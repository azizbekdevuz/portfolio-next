"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LanguageFlagIcon } from "@/components/contact/LanguageFlagIcon";

const LANG_ORDER = ["en", "ko", "uz", "ru"] as const;

export const LanguageSection: React.FC = () => {
  const { messages } = useI18n();
  const lm = messages.languageMatrix;

  const languages = LANG_ORDER.map((code) => {
    const entry = lm.languages[code];
    return {
      code,
      name: entry.name,
      level: entry.levelLabel,
      blurb: String((entry as { context?: string }).context ?? "").trim(),
    };
  });

  return (
    <section className="mt-16 py-6" aria-labelledby="language-section-title">
      <div className="mb-10 flex flex-col items-center text-center">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
          {lm.kicker}
        </p>
        <h3 id="language-section-title" className="mt-2 text-2xl font-bold tracking-tight text-fg">
          {lm.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted">{lm.subtitle}</p>
        <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {languages.map((lang, index) => (
          <motion.article
            key={lang.code}
            className="flex h-full flex-col rounded-xl border border-border bg-card/60 p-5 shadow-sm transition-colors dark:border-border-strong/80 dark:bg-card/40"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="mb-4 flex items-start gap-3">
              <LanguageFlagIcon code={lang.code} label={lang.name} size={40} className="mt-0.5" />
              <div className="min-w-0">
                <h4 className="text-base font-semibold leading-tight text-fg">{lang.name}</h4>
                <p className="mt-1 text-sm font-medium text-primary/90">{lang.level}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted">{lang.blurb}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
