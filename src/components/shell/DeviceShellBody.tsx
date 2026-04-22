"use client";

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { OptimizedCursor } from "@/components/ui/Cursor";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useHomeShell } from "@/components/shell/HomeShellContext";

/**
 * Desktop non-cockpit: 3-column shell — left chrome (language), center stage (children), right chrome (theme).
 * Primary section nav lives in the proof header (cockpit) and viewport panel headers (depth), not the right rail.
 */
export function DeviceShellBody({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceDetection();
  const { shell } = useHomeShell();
  const isDesktopPanel = !isMobile && shell !== "cockpit";

  return (
    <>
      {!isMobile && <OptimizedCursor />}
      <BackgroundGradient />
      {isDesktopPanel ? (
        <div className="grid min-h-dvh w-full grid-cols-[var(--shell-chrome-left)_minmax(0,1fr)_var(--shell-chrome-right)] bg-page">
          <aside className="sticky top-0 z-40 flex h-dvh max-h-dvh flex-col items-center border-r border-border/50 bg-page/90 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-page/80">
            <LanguageSwitcher />
          </aside>
          <div className="relative min-h-0 min-w-0">{children}</div>
          <aside className="sticky top-0 z-40 flex h-dvh max-h-dvh min-h-0 flex-col items-center border-l border-border/50 bg-page/90 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-page/80">
            <ThemeToggle />
          </aside>
        </div>
      ) : (
        <>
          <LanguageSwitcher />
          <ThemeToggle />
          {isMobile ? <MobileNavigation /> : null}
          <div className="relative min-h-dvh">{children}</div>
        </>
      )}
    </>
  );
}
