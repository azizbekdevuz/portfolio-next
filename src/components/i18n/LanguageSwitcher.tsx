"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, LOCALE_COOKIE, type Locale, isLocale } from "@/i18n/config";
import { useProofBrowse } from "@/components/brand/ProofBrowseContext";
import { useHomeShell } from "@/components/shell/HomeShellContext";
import { stashStateBeforeLocaleSwitch } from "@/lib/locale-switch-persistence";
import { useI18n } from "./I18nProvider";

function setLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function useLocaleSwitch() {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const { shell } = useHomeShell();
  const { track, selectedSlug, workspaceMode } = useProofBrowse();

  return useCallback(
    (next: Locale) => {
      if (next === locale) return;
      stashStateBeforeLocaleSwitch({
        shell,
        proof: { track, selectedSlug, workspaceMode },
      });
      setLocaleCookie(next);
      const segments = pathname.split("/").filter(Boolean);
      const first = segments[0];
      const rest =
        first != null && isLocale(first) ? segments.slice(1).join("/") : "";
      router.push(rest ? `/${next}/${rest}` : `/${next}`);
      router.refresh();
    },
    [locale, shell, track, selectedSlug, workspaceMode, pathname, router],
  );
}

export function LanguageSwitcher() {
  const { locale, messages } = useI18n();
  const { shell } = useHomeShell();
  const switchTo = useLocaleSwitch();

  const floatingCockpit = "fixed left-6 top-6 z-[100] hidden md:block";
  const shellLane =
    "relative z-40 mx-auto hidden w-full max-w-[5.25rem] shrink-0 px-0.5 md:block";

  return (
    <div
      className={shell === "cockpit" ? floatingCockpit : shellLane}
      role="navigation"
      aria-label={messages.languageSwitcher.aria}
      title={messages.languageSwitcher.title}
    >
      <div className="rounded-2xl border border-border bg-card/95 p-1 shadow-lg backdrop-blur-md">
        <p className="px-2 pt-1 text-[10px] font-medium uppercase tracking-wider text-subtle">
          {messages.languageSwitcher.aria}
        </p>
        <div
          className={`flex rounded-xl bg-card-muted/60 p-0.5 ${
            shell === "cockpit" ? "flex-row" : "flex-col gap-0.5"
          }`}
        >
          {locales.map((code) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => switchTo(code)}
                aria-pressed={active}
                aria-label={`${localeLabels[code].native} (${code})`}
                className={`min-w-0 flex-1 rounded-lg py-1.5 text-center font-semibold transition-colors ${
                  shell === "cockpit"
                    ? "px-2 text-[10px] sm:text-xs"
                    : "px-1 text-[9px]"
                } ${active ? "bg-card text-fg shadow-sm ring-1 ring-border" : "text-muted hover:text-fg"}`}
              >
                <span className="block leading-tight">{localeLabels[code].short}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Compact row for mobile drawer / header. */
export function LanguageSwitcherInline({ className = "" }: { className?: string }) {
  const { locale, messages } = useI18n();
  const switchTo = useLocaleSwitch();

  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-full border border-border bg-card/95 px-1 py-1 shadow-md backdrop-blur-md ${className}`}
      role="group"
      aria-label={messages.languageSwitcher.aria}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              active ? "bg-card-muted text-fg ring-1 ring-border-strong" : "text-muted"
            }`}
          >
            {localeLabels[code].short}
          </button>
        );
      })}
    </div>
  );
}
