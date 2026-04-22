"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { ProofTrackFilter } from "@/lib/proof-track";
import type { ProofWorkspaceMode } from "@/lib/proof-workspace";
import { consumeProofBrowseAfterLocaleSwitch } from "@/lib/locale-switch-persistence";

type Ctx = {
  track: ProofTrackFilter;
  setTrack: (t: ProofTrackFilter) => void;
  selectedSlug: string | null;
  setSelectedSlug: Dispatch<SetStateAction<string | null>>;
  testimonialsOpen: boolean;
  setTestimonialsOpen: (open: boolean) => void;
  workspaceMode: ProofWorkspaceMode;
  setWorkspaceMode: (m: ProofWorkspaceMode) => void;
};

const ProofBrowseContext = createContext<Ctx | null>(null);

export function ProofBrowseProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<ProofTrackFilter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);
  const [workspaceMode, setWorkspaceMode] = useState<ProofWorkspaceMode>("project");

  useLayoutEffect(() => {
    const restored = consumeProofBrowseAfterLocaleSwitch();
    if (!restored) return;
    if (restored.track != null) setTrack(restored.track);
    if (restored.selectedSlug !== undefined) setSelectedSlug(restored.selectedSlug);
    if (restored.workspaceMode != null) setWorkspaceMode(restored.workspaceMode);
  }, []);

  const value = useMemo(
    () => ({
      track,
      setTrack,
      selectedSlug,
      setSelectedSlug,
      testimonialsOpen,
      setTestimonialsOpen,
      workspaceMode,
      setWorkspaceMode,
    }),
    [track, selectedSlug, testimonialsOpen, workspaceMode],
  );
  return <ProofBrowseContext.Provider value={value}>{children}</ProofBrowseContext.Provider>;
}

export function useProofBrowse() {
  const ctx = useContext(ProofBrowseContext);
  if (!ctx) throw new Error("useProofBrowse requires ProofBrowseProvider");
  return ctx;
}
