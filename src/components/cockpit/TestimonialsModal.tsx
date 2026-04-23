"use client";

import { useEffect, useRef } from "react";
import { MessageSquareQuote, X } from "lucide-react";
import { useProofBrowse } from "@/components/brand/ProofBrowseContext";
import { getTestimonialsForLocale } from "@/content/testimonials-locales";
import { setCustomCursorSuppressed } from "@/lib/custom-cursor";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

export function TestimonialsModal() {
  const { messages, locale } = useI18n();
  const testimonials = getTestimonialsForLocale(locale);
  const { testimonialsOpen, setTestimonialsOpen } = useProofBrowse();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!testimonialsOpen) return;
    setCustomCursorSuppressed(true);
    closeBtnRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTestimonialsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setCustomCursorSuppressed(false);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [testimonialsOpen, setTestimonialsOpen]);

  if (!testimonialsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] dark:bg-black/55"
        aria-label={messages.testimonialsModal.closeBackdrop}
        onClick={() => setTestimonialsOpen(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonials-heading"
        className="relative z-10 flex max-h-[88dvh] w-full max-w-lg cursor-auto flex-col rounded-t-2xl border border-border bg-card shadow-2xl sm:max-h-[85vh] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden />
            <h2 id="testimonials-heading" className="text-base font-semibold text-fg">
              {messages.testimonialsModal.heading}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setTestimonialsOpen(false)}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-card-muted hover:text-fg"
            aria-label={messages.testimonialsModal.close}
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="cursor-auto overflow-y-auto px-4 py-4 md:px-5">
          <ul className="space-y-4">
            {testimonials.map((t) => (
              <li
                key={t.id}
                className="rounded-xl border border-border bg-page-elevated p-4 dark:bg-page-elevated/40 md:p-5"
              >
                <div className="flex gap-3">
                  <div
                    className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border-strong bg-surface-soft dark:bg-card-muted"
                    aria-hidden
                  >
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-fg">
                        {t.initials}
                      </div>
                    )}
                  </div>
                  <blockquote className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <footer className="mt-3 border-t border-border pt-3 pl-[52px]">
                  <p className="text-sm font-medium text-fg">{t.name}</p>
                  <p className="text-xs text-subtle">{t.context}</p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
