import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

/**
 * Resume and portfolio PDFs: reviewer focus × site language.
 * Set `href` to a public path (e.g. `/downloads/Azizbek-Resume-FullStack-en.pdf`) when the file is added under `public/`.
 * UI copy lives in `messages.downloads` per locale.
 */
export type DownloadCategory = "resume" | "portfolio";
export type DownloadLens = "fullstack" | "frontend" | "backend";

export const DOWNLOAD_CATEGORIES: DownloadCategory[] = ["resume", "portfolio"];
export const DOWNLOAD_LENSES: DownloadLens[] = ["fullstack", "frontend", "backend"];

const LOCALE_CODE: Record<Locale, string> = {
  en: "en",
  ko: "ko",
  uz: "uz",
};

function defaultFilename(
  category: DownloadCategory,
  lens: DownloadLens,
  locale: Locale,
): string {
  const kind = category === "resume" ? "Resume" : "Portfolio";
  const lensPart =
    lens === "fullstack" ? "FullStack" : lens === "frontend" ? "Frontend" : "Backend";
  return `Azizbek-${kind}-${lensPart}-${LOCALE_CODE[locale]}.pdf`;
}

export type DownloadCell = { filename: string; href: string | null };

function makeGrid(): Record<
  DownloadCategory,
  Record<DownloadLens, Record<Locale, DownloadCell>>
> {
  const out = {} as Record<
    DownloadCategory,
    Record<DownloadLens, Record<Locale, DownloadCell>>
  >;
  for (const category of DOWNLOAD_CATEGORIES) {
    out[category] = {} as Record<DownloadLens, Record<Locale, DownloadCell>>;
    for (const lens of DOWNLOAD_LENSES) {
      out[category][lens] = {} as Record<Locale, DownloadCell>;
      for (const locale of locales) {
        out[category][lens][locale] = {
          filename: defaultFilename(category, lens, locale),
          href:`/downloads/${defaultFilename(category, lens, locale)}`
        };
      }
    }
  }
  return out;
}

/**
 * Single source for download targets. `href: null` means the file is not yet in `public/`.
 */
export const downloadGrid = makeGrid();

export function getDownloadCell(
  category: DownloadCategory,
  lens: DownloadLens,
  locale: Locale,
): DownloadCell {
  return downloadGrid[category][lens][locale];
}
