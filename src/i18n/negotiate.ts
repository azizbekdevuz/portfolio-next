import type { Locale } from "./config";
import { defaultLocale } from "./config";

/** BCP47-ish tag → supported locale (first match wins by q-value order). */
const TAG_MAP: Record<string, Locale> = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  ko: "ko",
  "ko-kr": "ko",
  uz: "uz",
  "uz-latn": "uz",
  "uz-uz": "uz",
};

function primaryLang(tag: string): string {
  return tag.trim().split("-")[0]?.toLowerCase() ?? "";
}

/**
 * Parse Accept-Language and pick en | ko | uz, else English.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage || !acceptLanguage.trim()) return defaultLocale;

  const candidates = acceptLanguage.split(",").map((part) => {
    const [rawTag, ...params] = part.trim().split(";");
    const tag = rawTag.trim().toLowerCase();
    let q = 1;
    for (const p of params) {
      const [k, v] = p.split("=").map((s) => s.trim());
      if (k === "q" && v) {
        const n = parseFloat(v);
        if (!Number.isNaN(n)) q = n;
      }
    }
    return { tag, q };
  });

  candidates.sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    if (TAG_MAP[tag]) return TAG_MAP[tag];
    const lang = primaryLang(tag);
    if (lang === "ko") return "ko";
    if (lang === "uz") return "uz";
    if (lang === "en") return "en";
  }

  return defaultLocale;
}
