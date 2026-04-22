import type { HomeShellView } from "@/components/shell/HomeShellContext";
import type { ProofTrackFilter } from "@/lib/proof-track";
import type { ProofWorkspaceMode } from "@/lib/proof-workspace";
import { proofWorkspaceModes } from "@/lib/proof-workspace";

const SHELL_KEY = "portfolio:localeSwitch:shell";
const PROOF_KEY = "portfolio:localeSwitch:proof";

const SHELL_SET = new Set<HomeShellView>(["cockpit", "projects", "about", "skills", "contact", "in-progress"]);

const TRACK_SET = new Set<ProofTrackFilter>(["all", "frontend", "fullstack", "ai"]);

function isShell(v: unknown): v is HomeShellView {
  return typeof v === "string" && SHELL_SET.has(v as HomeShellView);
}

function isTrack(v: unknown): v is ProofTrackFilter {
  return typeof v === "string" && TRACK_SET.has(v as ProofTrackFilter);
}

function isWorkspaceMode(v: unknown): v is ProofWorkspaceMode {
  return typeof v === "string" && (proofWorkspaceModes as readonly string[]).includes(v);
}

export type ProofBrowsePersisted = {
  track: ProofTrackFilter;
  selectedSlug: string | null;
  workspaceMode: ProofWorkspaceMode;
};

/** Mirrored by `ProjectsSection` (embedded) so locale switch can stash the active case study slug. */
export const DEEP_DIVE_SLUG_MIRROR_KEY = "portfolio:localeSwitch:deepDiveSlug";
export const PENDING_DEEP_DIVE_SLUG_KEY = "portfolio:pendingDeepDiveSlug";

/** Call immediately before `router.push` to a new locale. */
export function stashStateBeforeLocaleSwitch(args: { shell: HomeShellView; proof: ProofBrowsePersisted }): void {
  try {
    let deepDiveSlug: string | null = null;
    try {
      deepDiveSlug = sessionStorage.getItem(DEEP_DIVE_SLUG_MIRROR_KEY);
    } catch {
      /* ignore */
    }
    sessionStorage.setItem(PROOF_KEY, JSON.stringify({ ...args.proof, deepDiveSlug }));
    if (args.shell !== "cockpit") sessionStorage.setItem(SHELL_KEY, args.shell);
    else sessionStorage.removeItem(SHELL_KEY);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Apply once after locale navigation; clears storage. */
export function consumeShellAfterLocaleSwitch(): HomeShellView | null {
  try {
    const raw = sessionStorage.getItem(SHELL_KEY);
    sessionStorage.removeItem(SHELL_KEY);
    if (!raw || !isShell(raw) || raw === "cockpit") return null;
    return raw;
  } catch {
    return null;
  }
}

/** Apply once after locale navigation; clears storage. */
export function consumeProofBrowseAfterLocaleSwitch(): Partial<ProofBrowsePersisted> | null {
  try {
    const raw = sessionStorage.getItem(PROOF_KEY);
    sessionStorage.removeItem(PROOF_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as Record<string, unknown>;
    const out: Partial<ProofBrowsePersisted> = {};
    if (isTrack(o.track)) out.track = o.track;
    if (o.selectedSlug === null || typeof o.selectedSlug === "string") out.selectedSlug = o.selectedSlug;
    if (isWorkspaceMode(o.workspaceMode)) out.workspaceMode = o.workspaceMode;
    if (typeof o.deepDiveSlug === "string" && o.deepDiveSlug.length > 0) {
      try {
        sessionStorage.setItem(PENDING_DEEP_DIVE_SLUG_KEY, o.deepDiveSlug);
      } catch {
        /* ignore */
      }
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}
