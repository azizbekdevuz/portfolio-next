"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MainSectionId } from "@/lib/nav-sections";
import { consumeShellAfterLocaleSwitch } from "@/lib/locale-switch-persistence";

/** Primary home surface: proof cockpit vs full-viewport deep panels. */
export type HomeShellView = "cockpit" | "projects" | "about" | "skills" | "contact" | "in-progress";

export function navSectionToShell(id: MainSectionId): HomeShellView {
  return id === "hero" ? "cockpit" : id;
}

type Ctx = {
  shell: HomeShellView;
  setShell: (v: HomeShellView) => void;
  goCockpit: () => void;
};

const HomeShellContext = createContext<Ctx | null>(null);

export function HomeShellProvider({ children }: { children: ReactNode }) {
  const [shell, setShellState] = useState<HomeShellView>("cockpit");

  useLayoutEffect(() => {
    const restored = consumeShellAfterLocaleSwitch();
    if (!restored) return;
    setShellState(restored);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const setShell = useCallback((v: HomeShellView) => {
    setShellState(v);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const goCockpit = useCallback(() => setShell("cockpit"), [setShell]);

  const value = useMemo(() => ({ shell, setShell, goCockpit }), [shell, setShell, goCockpit]);
  return <HomeShellContext.Provider value={value}>{children}</HomeShellContext.Provider>;
}

export function useHomeShell() {
  const ctx = useContext(HomeShellContext);
  if (!ctx) throw new Error("useHomeShell requires HomeShellProvider");
  return ctx;
}
