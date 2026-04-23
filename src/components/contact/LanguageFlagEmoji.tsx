import React from "react";

/**
 * Library-free locale markers (Unicode regional symbols), not public SVG assets.
 * Keeps the language matrix and contact lists free of file-based flag images.
 */
const FLAG_EMOJI: Record<string, string> = {
  en: "🇬🇧",
  ko: "🇰🇷",
  uz: "🇺🇿",
  ru: "🇷🇺",
};

type Props = {
  code: string;
  label: string;
  className?: string;
};

export function LanguageFlagEmoji({ code, label, className = "" }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-xl leading-none ${className}`}
      role="img"
      aria-label={label}
    >
      {FLAG_EMOJI[code] ?? "🌐"}
    </span>
  );
}
