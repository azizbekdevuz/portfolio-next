export const locales = ["en", "ko", "uz"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Manual choice — takes precedence over Accept-Language until cleared. */
export const LOCALE_COOKIE = "PORTFOLIO_LOCALE";

/** Forwarded to root layout for `<html lang>`. */
export const LOCALE_HEADER = "x-next-locale";

export const localeLabels: Record<Locale, { short: string; native: string }> = {
  en: { short: "EN", native: "English" },
  ko: { short: "KO", native: "한국어" },
  uz: { short: "UZ", native: "Oʻzbekcha" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
