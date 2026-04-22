"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

const LANG_ORDER = ["en", "ko", "uz", "ru"] as const;
const ICONS: Record<(typeof LANG_ORDER)[number], string> = {
  en: "/icons/uk.svg",
  ko: "/icons/kr.svg",
  uz: "/icons/uz.svg",
  ru: "/icons/ru.svg",
};
const PROFICIENCY: Record<(typeof LANG_ORDER)[number], number> = {
  en: 95,
  ko: 60,
  uz: 100,
  ru: 50,
};

function getProficiencyColor(proficiency: number): string {
  if (proficiency >= 90) return "bg-emerald-500";
  if (proficiency >= 70) return "bg-blue-500";
  if (proficiency >= 50) return "bg-amber-500";
  return "bg-rose-500";
}

export const LanguageSection: React.FC = () => {
  const { messages } = useI18n();
  const lm = messages.languageMatrix;
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);

  const languages = LANG_ORDER.map((code) => {
    const L = lm.languages[code];
    return {
      code,
      icon: ICONS[code],
      proficiency: PROFICIENCY[code],
      name: L.name,
      level: L.levelLabel,
      domains: [...L.domains],
      keywords: [...L.keywords],
    };
  });

  const getProficiencyLabel = (proficiency: number): string => {
    if (proficiency >= 90) return lm.levels.expert;
    if (proficiency >= 70) return lm.levels.advanced;
    if (proficiency >= 50) return lm.levels.intermediate;
    return lm.levels.beginner;
  };

  const getBarHeights = (proficiency: number) =>
    Array.from({ length: 10 }, () => {
      const base = proficiency * 0.7;
      const variance = Math.random() * 20 - 10;
      return Math.max(10, Math.min(100, base + variance));
    });

  return (
    <section className="mt-16 py-6">
      <motion.div
        className="mb-12 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 font-mono">
          <span className="text-primary/50">{lm.prelude}</span>
          <h3 className="text-2xl font-bold text-fg">{lm.title}</h3>
          <span className="text-primary/50">{lm.implements}</span>
        </div>
        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="flex h-full flex-col rounded-lg border border-primary/20 bg-card-muted p-6 transition-all duration-300"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderColor: "rgba(20, 157, 221, 0.4)",
              }}
              onHoverStart={() => setActiveLanguage(lang.code)}
              onHoverEnd={() => setActiveLanguage(null)}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={lang.icon}
                    alt=""
                    fill
                    className="rounded-sm object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-fg">{lang.name}</h3>
                  <div className="text-sm text-primary/90">{lang.level}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>{lm.proficiency}</span>
                  <span>{lang.proficiency}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-card-muted">
                  <motion.div
                    className={`h-full ${getProficiencyColor(lang.proficiency)}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-1">
                {lang.domains.slice(0, 3).map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {domain}
                  </span>
                ))}
                {lang.domains.length > 3 && (
                  <span className="rounded-full bg-primary/5 px-2 py-0.5 text-xs text-primary">
                    +{lang.domains.length - 3} {lm.moreDomains}
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <AnimatePresence>
                  {activeLanguage === lang.code && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-4 overflow-hidden text-sm text-fg/90"
                    >
                      <h4 className="mb-2 font-medium">{lm.keywordsHeading}</h4>
                      <div className="flex flex-wrap gap-2">
                        {lang.keywords.map((keyword) => (
                          <span key={keyword} className="text-muted">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`rounded-full px-2 py-1 ${
                      activeLanguage === lang.code ? "bg-primary/20 text-primary" : "bg-card-muted text-muted"
                    }`}
                  >
                    {getProficiencyLabel(lang.proficiency)}
                  </span>

                  <div className="flex h-6 items-end gap-0.5">
                    {getBarHeights(lang.proficiency).map((height, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-t ${getProficiencyColor(lang.proficiency)} opacity-50`}
                        initial={{ height: "20%" }}
                        animate={{
                          height: activeLanguage === lang.code ? `${height * 0.4}%` : "20%",
                        }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
