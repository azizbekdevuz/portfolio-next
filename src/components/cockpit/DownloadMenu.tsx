"use client";

import { ChevronDown, FileDown } from "lucide-react";
import type { DownloadLens } from "@/content/downloads";
import { DOWNLOAD_LENSES, portfolioDownloads, resumeDownloads } from "@/content/downloads";
import { useI18n } from "@/components/i18n/I18nProvider";

export function DownloadMenu({ variant }: { variant: "resume" | "portfolio" }) {
  const { messages } = useI18n();
  const d = messages.downloads;
  const entries = variant === "resume" ? resumeDownloads : portfolioDownloads;
  const title = variant === "resume" ? d.resumeTitle : d.portfolioTitle;
  const summary = variant === "resume" ? d.resumeSummary : d.portfolioSummary;

  const lensLabel = (key: DownloadLens) =>
    variant === "resume" ? d.lens[key].resume : d.lens[key].portfolio;

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border-strong bg-card px-3 py-2 text-xs font-semibold text-fg shadow-sm transition-colors hover:border-accent/40 md:px-4 md:text-sm [&::-webkit-details-marker]:hidden">
        <FileDown className="h-3.5 w-3.5 shrink-0 text-muted md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
        <span>{title}</span>
        <ChevronDown
          className="ml-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-open:rotate-180"
          strokeWidth={1.75}
          aria-hidden
        />
      </summary>
      <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[13.5rem] rounded-xl border border-border bg-page-elevated py-1 shadow-lg">
        <p className="border-b border-border px-3 py-2 text-[10px] leading-snug text-muted">{summary}</p>
        <ul className="py-1" role="listbox" aria-label={title}>
          {DOWNLOAD_LENSES.map((key) => {
            const item = entries[key];
            const label = lensLabel(key);
            if (item.href) {
              return (
                <li key={key}>
                  <a
                    href={item.href}
                    download={item.filename}
                    className="block px-3 py-2 text-sm text-fg transition-colors hover:bg-card-muted"
                  >
                    {label}
                  </a>
                </li>
              );
            }
            return (
              <li key={key} className="px-3 py-2 text-xs text-muted">
                <span className="font-medium text-fg/80">{label}</span>
                <span className="mt-0.5 block text-[10px] text-subtle">{d.pdfPending}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
