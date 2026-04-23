"use client";

import { CircleFlagLanguage } from "react-circle-flags";

const LANGUAGE_CODES: Record<string, string> = {
  en: "en",
  ko: "ko",
  uz: "uz",
  ru: "ru",
};

type Props = {
  code: string;
  label: string;
  className?: string;
  size?: number;
};

/**
 * Circle flag marks from `react-circle-flags` (CDN `img` — not `inline`, which fetches
 * and replaces `outerHTML` and can throw after unmount: NoModificationAllowedError).
 */
export function LanguageFlagIcon({ code, label, className = "", size = 32 }: Props) {
  const languageCode = LANGUAGE_CODES[code] ?? "en";
  return (
    <span className={`inline-flex shrink-0 ${className}`} title={label}>
      <CircleFlagLanguage
        languageCode={languageCode}
        height={size}
        width={size}
        className="rounded-full shadow-sm ring-1 ring-black/5 dark:ring-white/10"
        title={label}
        aria-label={label}
        role="img"
      />
    </span>
  );
}
