"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme-constants";

type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference | null;
  resolved: ResolvedTheme;
  /** True after client layout has read storage + system preference (SSR-safe toggle). */
  themeMounted: boolean;
  toggleTheme: () => void;
  useSystemTheme: () => void;
  /** Explicit light, dark, or follow OS (clears storage for system). */
  setThemeMode: (mode: ThemePreference | "system") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredPreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(THEME_STORAGE_KEY);
  if (v === "light" || v === "dark") return v;
  return null;
}

function computeResolved(pref: ThemePreference | null, sysDark: boolean): ResolvedTheme {
  if (pref === "light") return "light";
  if (pref === "dark") return "dark";
  return sysDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /** Intentionally match SSR: avoids hydration mismatch; sync in useLayoutEffect. */
  const [preference, setPreference] = useState<ThemePreference | null>(null);
  const [systemDark, setSystemDark] = useState(false);
  const [themeMounted, setThemeMounted] = useState(false);

  const resolved = computeResolved(preference, systemDark);

  useLayoutEffect(() => {
    setPreference(readStoredPreference());
    setSystemDark(getSystemDark());
    setThemeMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", resolved === "dark" ? "#040b14" : "#f0f4f8");
    }
  }, [resolved]);

  const toggleTheme = useCallback(() => {
    const next: ThemePreference = resolved === "dark" ? "light" : "dark";
    setPreference(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }, [resolved]);

  const useSystemTheme = useCallback(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    setPreference(null);
    const sys = getSystemDark();
    setSystemDark(sys);
    document.documentElement.classList.toggle("dark", sys);
  }, []);

  const setThemeMode = useCallback((mode: ThemePreference | "system") => {
    if (mode === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
      setPreference(null);
      const sys = getSystemDark();
      setSystemDark(sys);
      return;
    }
    setPreference(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const value = useMemo(
    () => ({
      preference,
      resolved,
      themeMounted,
      toggleTheme,
      useSystemTheme,
      setThemeMode,
    }),
    [preference, resolved, themeMounted, toggleTheme, useSystemTheme, setThemeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
