"use client";

import { memo, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { BookUser, Cpu, FolderKanban, Mail, Sparkles, Signpost } from "lucide-react";
import { MAIN_SECTION_IDS, type MainSectionId } from "@/lib/nav-sections";
import { useI18n } from "@/components/i18n/I18nProvider";
import { navSectionToShell, useHomeShell, type HomeShellView } from "@/components/shell/HomeShellContext";

const SECTION_ICONS: Record<MainSectionId, LucideIcon> = {
  hero: Sparkles,
  projects: FolderKanban,
  about: BookUser,
  skills: Cpu,
  contact: Mail,
  "in-progress": Signpost,
};

function shellToSectionId(shell: HomeShellView): MainSectionId {
  if (shell === "cockpit") return "hero";
  if (shell === "in-progress") return "in-progress";
  return shell;
}

type Layout = "cockpit" | "panel" | "mobileDrawer";

export const SectionPrimaryNav = memo(function SectionPrimaryNav({
  layout,
  className = "",
  onAfterNavigate,
}: {
  layout: Layout;
  className?: string;
  /** e.g. close mobile overlay after picking a section */
  onAfterNavigate?: () => void;
}) {
  const { messages } = useI18n();
  const { shell, setShell } = useHomeShell();
  const activeId = shellToSectionId(shell);

  const onPick = useCallback(
    (id: MainSectionId) => {
      setShell(navSectionToShell(id));
      onAfterNavigate?.();
    },
    [setShell, onAfterNavigate],
  );

  const isDrawer = layout === "mobileDrawer";
  const isPanel = layout === "panel";

  const listClass =
    layout === "cockpit"
      ? "flex min-w-0 max-w-full flex-wrap items-center gap-2 md:gap-2.5"
      : isPanel
        ? "flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2"
        : "flex w-full max-w-md flex-col gap-3";

  return (
    <nav
      className={`${layout === "cockpit" ? "w-full min-w-0 max-w-full " : ""}${className}`.trim()}
      aria-label={messages.nav.sectionSwitcherNavAria}
    >
      <ul className={listClass} role="list">
        {MAIN_SECTION_IDS.map((id) => {
          const active = activeId === id;
          const label = messages.nav.sections[id];
          const Icon = SECTION_ICONS[id];
          const base =
            "inline-flex items-center gap-2 rounded-xl border font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 active:scale-[0.98]";
          const size = isDrawer
            ? "w-full justify-start px-4 py-3 text-base"
            : isPanel
              ? "px-2.5 py-2 text-xs sm:px-3 sm:text-sm"
              : "px-3 py-2 text-sm md:px-3.5 md:py-2.5";
          const state = active
            ? "border-accent/55 bg-accent/18 text-fg shadow-sm ring-2 ring-accent/35 dark:bg-accent/22 dark:ring-accent/40"
            : "border-border bg-card-muted/70 text-muted hover:border-border-strong hover:bg-card hover:text-fg dark:border-border/60 dark:bg-card-muted/50";

          return (
            <li key={id} className={isDrawer ? "w-full" : ""}>
              <button
                type="button"
                aria-label={`${messages.nav.goTo} ${label}`}
                aria-current={active ? "true" : undefined}
                onClick={() => onPick(id)}
                className={`${base} ${size} ${state}`}
              >
                <Icon
                  className={`shrink-0 opacity-90 ${active ? "text-accent" : "text-muted"} ${isPanel ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-4 w-4"}`}
                  strokeWidth={2}
                  aria-hidden
                />
                <span className={isPanel ? "max-w-[7.5rem] truncate sm:max-w-[10rem]" : ""}>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
