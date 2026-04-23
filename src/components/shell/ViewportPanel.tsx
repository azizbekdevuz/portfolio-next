"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { SectionPrimaryNav } from "@/components/navigation/SectionPrimaryNav";
import { useHomeShell } from "@/components/shell/HomeShellContext";
import type { HomeShellView } from "@/components/shell/HomeShellContext";
import { FOCUS_RING } from "@/lib/ui-focus";

export function ViewportPanel({
  shellKey,
  children,
}: {
  shellKey: Exclude<HomeShellView, "cockpit">;
  children: ReactNode;
}) {
  const { messages } = useI18n();
  const { goCockpit } = useHomeShell();
  const s = messages.shell;

  const navKey =
    shellKey === "projects"
      ? "projects"
      : shellKey === "about"
        ? "about"
        : shellKey === "skills"
          ? "skills"
          : shellKey === "contact"
            ? "contact"
            : "in-progress";

  const title = messages.nav.sections[navKey];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goCockpit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goCockpit]);

  const sectionId = navKey;

  // Bounded viewport height so the scroll body is a real scroll owner (Issue B); same model for all depth panels.
  const sectionLayoutClass = "flex h-dvh min-h-0 flex-col bg-page";

  return (
    <motion.section
      id={sectionId}
      aria-label={title}
      className={sectionLayoutClass}
      initial={{ opacity: 0.94, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="sticky top-0 z-30 flex shrink-0 flex-col gap-3 border-b border-border bg-page/90 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-page/78 dark:bg-page/92 dark:supports-[backdrop-filter]:bg-page/82">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={goCockpit}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border-strong bg-card px-3 py-2 text-sm font-semibold text-fg shadow-sm transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`}
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {s.backToProof}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
              {s.optionalDepth}
            </p>
            <p className="truncate text-sm font-bold text-fg md:text-base">{title}</p>
          </div>
        </div>
        <div className="min-w-0 rounded-xl border border-border/70 bg-card-muted/40 p-2 md:p-2.5">
          <SectionPrimaryNav layout="panel" />
        </div>
      </header>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </motion.section>
  );
}
