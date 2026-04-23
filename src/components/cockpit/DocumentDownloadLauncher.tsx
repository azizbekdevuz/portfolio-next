"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { FileDown, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import {
  type DownloadCategory,
  type DownloadLens,
  DOWNLOAD_LENSES,
  getDownloadCell,
} from "@/content/downloads";
import { useI18n } from "@/components/i18n/I18nProvider";
import { FOCUS_RING } from "@/lib/ui-focus";
import { setCustomCursorSuppressed } from "@/lib/custom-cursor";

/**
 * Page-level: two compact triggers. Overlay: focused pick (stack → language) → download / unavailable.
 * Desktop: centered dialog. Mobile: bottom sheet (see layout classes).
 */
export function DocumentDownloadLauncher() {
  const { messages, locale: defaultLocale } = useI18n();
  const d = messages.downloads;
  const [open, setOpen] = useState<DownloadCategory | null>(null);
  const [lens, setLens] = useState<DownloadLens>("fullstack");
  const [fileLocale, setFileLocale] = useState<Locale>(defaultLocale);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const actionId = useId();

  const close = useCallback(() => {
    setOpen(null);
  }, []);

  const openWith = useCallback(
    (category: DownloadCategory) => {
      setLens("fullstack");
      setFileLocale(defaultLocale);
      setOpen(category);
    },
    [defaultLocale],
  );

  useEffect(() => {
    if (open == null) return;
    setCustomCursorSuppressed(true);
    closeBtnRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setCustomCursorSuppressed(false);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const cell = useMemo(
    () => (open == null ? null : getDownloadCell(open, lens, fileLocale)),
    [open, lens, fileLocale],
  );

  const canDownload = cell != null && cell.href != null && cell.href.length > 0;
  const title =
    open === "resume" ? d.categoryResume : open === "portfolio" ? d.categoryPortfolio : "";

  return (
    <>
      <div
        className="inline-flex flex-wrap items-center gap-2"
        role="group"
        aria-label={d.triggerGroupLabel}
      >
        <button
          type="button"
          onClick={() => openWith("resume")}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent/40 md:px-4 md:text-sm"
          aria-label={d.triggerResumeAria}
        >
          <FileDown className="h-3.5 w-3.5 shrink-0 text-muted md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
          {d.triggerResume}
        </button>
        <button
          type="button"
          onClick={() => openWith("portfolio")}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent/40 md:px-4 md:text-sm"
          aria-label={d.triggerPortfolioAria}
        >
          <FileDown className="h-3.5 w-3.5 shrink-0 text-muted md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
          {d.triggerPortfolio}
        </button>
      </div>

      {open != null && cell && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px] dark:bg-black/55"
            aria-label={d.closeOverlayBackdrop}
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${actionId}-title`}
            className="relative z-10 flex w-full max-w-md cursor-auto flex-col rounded-t-2xl border border-border bg-card shadow-2xl sm:max-h-[min(85dvh,520px)] sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-2.5 sm:px-4 sm:py-3">
              <h2
                id={`${actionId}-title`}
                className="pr-2 text-sm font-semibold leading-tight text-fg sm:text-base"
              >
                {title}
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-card-muted hover:text-fg"
                aria-label={d.closeOverlay}
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="max-h-[min(70dvh,480px)] cursor-auto space-y-4 overflow-y-auto overscroll-contain px-4 py-3 sm:max-h-[min(60dvh,420px)] sm:px-4 sm:py-4">
              <p className="text-xs leading-snug text-muted">{d.pickerSubtitle}</p>

              <fieldset>
                <legend className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-subtle">
                  {d.stepFocus}
                </legend>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={d.stepFocus}>
                  {DOWNLOAD_LENSES.map((k) => {
                    const active = lens === k;
                    const label = open === "resume" ? d.lens[k].resume : d.lens[k].portfolio;
                    return (
                      <button
                        key={k}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setLens(k)}
                        className={`max-w-full rounded-lg border px-2.5 py-1.5 text-left text-[11px] font-medium leading-snug transition-colors sm:text-xs ${
                          active
                            ? "border-primary bg-primary/10 text-fg"
                            : "border-border bg-page-elevated/80 text-muted hover:border-border-strong hover:text-fg dark:bg-card/60"
                        } ${FOCUS_RING}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-subtle">
                  {d.stepLanguage}
                </legend>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={d.stepLanguage}>
                  {locales.map((loc) => {
                    const active = fileLocale === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setFileLocale(loc)}
                        className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:text-xs ${
                          active
                            ? "border-primary bg-primary/10 text-fg"
                            : "border-border bg-page-elevated/80 text-muted hover:border-border-strong hover:text-fg dark:bg-card/60"
                        } ${FOCUS_RING}`}
                      >
                        {d.localeName[loc]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <div className="shrink-0 border-t border-border bg-card-muted/20 px-4 py-3 dark:border-border-strong/80">
              {canDownload ? (
                <a
                  href={cell.href!}
                  download={cell.filename}
                  onClick={close}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-[filter] hover:brightness-110 ${FOCUS_RING}`}
                >
                  <FileDown className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {d.download}
                </a>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-page-elevated/50 px-3 py-2.5 text-center dark:border-border-strong/60">
                  <p className="text-xs font-medium text-fg">{d.unavailableTitle}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-muted">
                    {d.pdfPending} <span className="font-mono text-[10px] text-subtle">{cell.filename}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
