"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, Trophy } from "lucide-react";
import { AchievementsContext } from "../sections/AboutSection";
import { useI18n } from "@/components/i18n/I18nProvider";

function CertificateFrame({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="group relative mx-auto w-full max-w-lg">
      {/* Ambient glow — theme-aware */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70 dark:opacity-30 dark:group-hover:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Gradient bezel (cutting-edge frame) */}
      <div className="relative rounded-2xl p-px shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
        <div
          className="rounded-[15px] p-px"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 55%, transparent) 0%, var(--color-border-strong) 45%, color-mix(in srgb, var(--color-accent) 40%, transparent) 100%)",
          }}
        >
          <div className="relative overflow-hidden rounded-[14px] bg-card dark:bg-page-elevated">
            {/* Inner glass edge */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-fg/5 dark:ring-white/8"
              aria-hidden
            />

            {/* L-corner brackets */}
            <span
              className="pointer-events-none absolute left-3 top-3 z-[1] h-5 w-5 border-l-2 border-t-2 border-accent/70"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute right-3 top-3 z-[1] h-5 w-5 border-r-2 border-t-2 border-accent/70"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-3 left-3 z-[1] h-5 w-5 border-b-2 border-l-2 border-accent/50"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 z-[1] h-5 w-5 border-b-2 border-r-2 border-accent/50"
              aria-hidden
            />

            {/* Scan-line sheen (subtle, on hover) */}
            <div
              className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--color-accent) 12%, transparent) 50%, transparent 60%)",
              }}
              aria-hidden
            />

            <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain p-3 sm:p-4"
                sizes="(max-width: 640px) 100vw, 28rem"
                quality={92}
              />
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-subtle">
        <Award className="h-3 w-3 text-accent/80" strokeWidth={2} aria-hidden />
        {caption}
      </figcaption>
    </figure>
  );
}

export function Achievements() {
  const { messages } = useI18n();
  const achievements = useContext(AchievementsContext);
  const [selectedId, setSelectedId] = useState("");
  const ids = achievements.map((a) => a.id);
  const activeId = selectedId && ids.includes(selectedId) ? selectedId : (ids[0] ?? "");

  if (achievements.length === 0) {
    return (
      <div className="mb-16">
        <div className="mb-8 h-8 w-48 rounded-md bg-card-muted/50 dark:bg-card-muted/40" />
        <div className="h-40 rounded-xl border border-border bg-surface-soft/90 dark:bg-card-muted/35" />
      </div>
    );
  }

  return (
    <section className="relative mb-20" aria-labelledby="achievements-heading">
      {/* Section backdrop — ties block together */}
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2rem] bg-gradient-to-b from-surface-soft/80 via-transparent to-transparent dark:from-card-muted/25 md:-inset-x-8"
        aria-hidden
      />

      <div className="relative">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-px flex-1 max-w-[3rem] bg-gradient-to-r from-transparent to-accent/50" aria-hidden />
          <Award className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden />
          <div className="h-px flex-1 max-w-[3rem] bg-gradient-to-l from-transparent to-accent/50" aria-hidden />
        </div>

        <motion.div
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              {messages.achievements.recognition}
            </p>
            <h3 id="achievements-heading" className="mt-1 text-2xl font-bold tracking-tight text-fg md:text-3xl">
              {messages.achievements.heading}
            </h3>
            <p className="mt-1 text-sm text-muted">{messages.achievements.subtitle}</p>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {achievements.map((category) => {
            const on = activeId === category.id;
            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => setSelectedId(category.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  on
                    ? "border-accent/40 bg-card font-semibold text-fg shadow-md shadow-accent/10 ring-1 ring-accent/25 dark:bg-card-muted/80"
                    : "border-border bg-page-elevated/80 text-muted hover:border-border-strong hover:text-fg dark:bg-card/60"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy className={`h-4 w-4 ${on ? "text-accent" : "text-subtle"}`} strokeWidth={1.75} aria-hidden />
                {category.title}
              </motion.button>
            );
          })}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              {achievements
                .find((cat) => cat.id === activeId)
                ?.items.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="overflow-hidden rounded-3xl border border-border bg-page-elevated/90 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.2)] dark:border-border-strong dark:bg-card/90 dark:shadow-[0_24px_56px_-20px_rgba(0,0,0,0.45)]"
                  >
                    <div
                      className={`grid gap-0 ${item.certificateMedia ? "lg:grid-cols-12" : ""}`}
                    >
                      <div
                        className={`flex flex-col justify-center border-border p-6 md:p-8 dark:border-border-strong/80 ${
                          item.certificateMedia ? "lg:col-span-7 lg:border-r" : ""
                        }`}
                      >
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">
                            {item.highlight}
                          </span>
                          <span className="rounded-full border border-border bg-surface-soft px-2.5 py-0.5 font-mono text-xs text-muted dark:bg-card-muted">
                            {item.year}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold tracking-tight text-fg md:text-2xl">{item.title}</h4>
                        <p className="mt-2 text-sm font-medium text-accent/90">{item.subtitle}</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted md:max-w-prose">{item.description}</p>
                      </div>

                      {item.certificateMedia ? (
                        <div className="flex flex-col justify-center border-t border-border bg-gradient-to-b from-surface-soft/90 to-page-elevated p-6 dark:border-border-strong/80 dark:from-card-muted/40 dark:to-card/50 lg:col-span-5 lg:border-l-0 lg:border-t-0 lg:p-8">
                          <CertificateFrame
                            src={item.certificateMedia}
                            alt={`Certificate: ${item.title}`}
                            caption={messages.achievements.credentialCaption}
                          />
                        </div>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
