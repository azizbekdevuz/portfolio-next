"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useHomeShell } from "@/components/shell/HomeShellContext";

const segmentDefs: { id: "light" | "dark" | "system"; labelKey: "light" | "dark" | "system"; Icon: typeof Sun }[] = [
  { id: "light", labelKey: "light", Icon: Sun },
  { id: "dark", labelKey: "dark", Icon: Moon },
  { id: "system", labelKey: "system", Icon: Monitor },
];

function ThemeToggleDesktop() {
  const { messages } = useI18n();
  const { preference, resolved, themeMounted, setThemeMode } = useTheme();
  const { shell } = useHomeShell();
  const mode: "light" | "dark" | "system" =
    preference === "light" || preference === "dark" ? preference : "system";

  const floatingCockpit = "fixed right-6 top-6 z-[100] hidden md:block";
  const shellLane =
    "relative z-40 mx-auto hidden w-full max-w-[5.75rem] shrink-0 px-0.5 md:block";

  return (
    <div
      className={shell === "cockpit" ? floatingCockpit : shellLane}
      role="group"
      aria-label={messages.theme.groupAria}
      aria-busy={!themeMounted}
    >
      <div
        className={`flex flex-col gap-1 rounded-2xl border bg-card/95 p-1 shadow-lg backdrop-blur-md transition-[opacity,box-shadow,border-color] duration-300 ease-out ${
          themeMounted
            ? "border-border opacity-100 shadow-lg"
            : "border-accent/30 opacity-[0.93] shadow-md ring-1 ring-accent/20 ring-offset-0"
        }`}
      >
        <p
          className={`px-2 pt-1 text-[10px] font-medium uppercase tracking-wider transition-colors duration-300 ${
            themeMounted ? "text-subtle" : "text-fg/55"
          }`}
        >
          {messages.theme.label}
        </p>
        <div
          className={`flex rounded-xl bg-card-muted/60 p-0.5 transition-opacity duration-300 ease-out ${
            themeMounted ? "opacity-100" : "opacity-95"
          } ${shell === "cockpit" ? "flex-row" : "flex-col"}`}
        >
          {segmentDefs.map(({ id, labelKey, Icon }) => {
            const active = themeMounted && mode === id;
            const label = messages.theme[labelKey];
            const title =
              id === "system" ? messages.theme.useSystemMode : id === "light"
                ? messages.theme.useLightMode
                : messages.theme.useDarkMode;
            const inactiveTone = themeMounted ? "text-muted hover:text-fg" : "text-fg/65 hover:text-fg";
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setThemeMode(id === "system" ? "system" : id)}
                aria-pressed={active}
                aria-label={`${label}${id === "system" ? ` (${messages.theme.matchDevice})` : ""}`}
                title={title}
                className={`flex min-w-0 flex-1 items-center justify-center gap-0.5 rounded-lg py-1.5 font-semibold transition-[color,background-color,box-shadow,opacity] duration-300 ease-out ${
                  shell === "cockpit"
                    ? "flex-row px-2 text-[10px] sm:gap-1 sm:px-2.5 sm:text-xs"
                    : "flex-col px-1 text-[9px]"
                } ${active ? "bg-card text-fg shadow-sm ring-1 ring-border" : inactiveTone}`}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                <span className="truncate">{label}</span>
              </motion.button>
            );
          })}
        </div>
        {themeMounted && mode === "system" && (
          <p className="px-2 pb-1 text-[10px] text-subtle">
            {messages.theme.followingDevice}{" "}
            <span className="font-medium text-muted">{resolved}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function ThemeToggleMobile() {
  const { messages } = useI18n();
  const { preference, themeMounted, setThemeMode } = useTheme();
  const { shell } = useHomeShell();
  const mode: "light" | "dark" | "system" =
    preference === "light" || preference === "dark" ? preference : "system";

  const dockCockpit =
    "fixed left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-[55] flex -translate-x-1/2 md:hidden";
  const dockPanel =
    "fixed left-1/2 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[55] flex -translate-x-1/2 md:hidden";

  return (
    <div
      className={shell === "cockpit" ? dockCockpit : dockPanel}
      role="group"
      aria-label={messages.theme.groupAria}
      aria-busy={!themeMounted}
    >
      <div
        className={`flex items-center gap-0.5 rounded-full border bg-card/95 px-1 py-1 shadow-md backdrop-blur-md transition-[opacity,box-shadow,border-color] duration-300 ease-out ${
          themeMounted
            ? "border-border opacity-100"
            : "border-accent/35 opacity-[0.93] ring-1 ring-accent/25 ring-offset-0"
        }`}
      >
        {segmentDefs.map(({ id, labelKey, Icon }) => {
          const active = themeMounted && mode === id;
          const label = messages.theme[labelKey];
          const inactiveTone = themeMounted ? "text-muted active:bg-card-muted" : "text-fg/70 active:bg-card-muted";
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => setThemeMode(id === "system" ? "system" : id)}
              aria-pressed={active}
              aria-label={`${label}${id === "system" ? messages.theme.systemHint : ""}`}
              title={label}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-[color,background-color,box-shadow,opacity] duration-300 ease-out ${
                active ? "bg-card-muted text-fg ring-1 ring-border-strong" : inactiveTone
              }`}
              whileTap={{ scale: 0.94 }}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function ThemeToggle() {
  return (
    <>
      <ThemeToggleMobile />
      <ThemeToggleDesktop />
    </>
  );
}
