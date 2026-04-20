import { cache } from "react";
import { isLocale, defaultLocale } from "@/i18n/config";
import type { Messages } from "./en";
import type { LocalizedOverrides } from "./overrides/types";

export const getMessages = cache(async (locale: string): Promise<Messages> => {
  const loc = isLocale(locale) ? locale : defaultLocale;
  switch (loc) {
    case "ko":
      return (await import("./ko")).messages;
    case "uz":
      return (await import("./uz")).messages;
    default:
      return (await import("./en")).messages;
  }
});

export const getLocalizedOverrides = cache(
  async (locale: string): Promise<LocalizedOverrides | null> => {
    const loc = isLocale(locale) ? locale : defaultLocale;
    if (loc === "en") return null;
    if (loc === "ko") return (await import("./overrides/ko")).koOverrides;
    if (loc === "uz") return (await import("./overrides/uz")).uzOverrides;
    return null;
  },
);
