"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import type { SiteProfile } from "@/content/site";
import { setCustomCursorSuppressed } from "@/lib/custom-cursor";
import { useI18n } from "@/components/i18n/I18nProvider";

export function ProfileIdentityExpandable({ site }: { site: SiteProfile }) {
  const { messages } = useI18n();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setCustomCursorSuppressed(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setCustomCursorSuppressed(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block rounded-2xl border border-border-strong bg-card shadow-sm ring-offset-2 ring-offset-page transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={messages.profile.expandProfile}
        >
          <span className="relative block h-20 w-20 overflow-hidden rounded-2xl md:h-24 md:w-24">
            <Image
              src="/assets/img/profile-img.webp"
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.99]"
              sizes="96px"
              priority
            />
          </span>
          <span className="pointer-events-none absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-md border border-border bg-card/95 text-muted shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:opacity-100">
            <Maximize2 className="h-3 w-3" strokeWidth={2} aria-hidden />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 sm:p-6" role="presentation">
            <motion.button
              type="button"
              aria-label={messages.profile.closeProfile}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] dark:bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-card-name"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-lg p-2 text-muted transition-colors hover:bg-card-muted hover:text-fg"
                aria-label={messages.profile.close}
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div className="relative aspect-[4/3] w-full bg-surface-soft dark:bg-card-muted">
                <Image
                  src="/assets/img/profile-img.webp"
                  alt=""
                  fill
                  className="object-cover object-center full-image"
                  sizes="400px"
                />
              </div>
              <div className="border-t border-border p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{site.headlineRole}</p>
                <h2 id="profile-card-name" className="mt-1 text-xl font-bold tracking-tight text-fg">
                  {site.name}
                </h2>
                <p className="mt-2 text-xs text-muted">
                  {site.location} · {site.availability}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {site.heroProofTags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-page-elevated px-2 py-0.5 text-[10px] font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
