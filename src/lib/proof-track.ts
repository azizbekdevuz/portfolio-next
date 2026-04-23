import type { RoleTrack } from "@/models/Project";

export type ProofTrackFilter = "all" | RoleTrack;

/**
 * Canonical track filter values (session restore, UI state). Must stay aligned with `RoleTrack` plus `"all"`.
 * Import this instead of duplicating string sets elsewhere.
 */
export const PROOF_TRACK_FILTERS = ["all", "frontend", "fullstack", "ai"] as const satisfies readonly ProofTrackFilter[];

const PROOF_TRACK_SET = new Set<string>(PROOF_TRACK_FILTERS);

export function isProofTrackFilter(v: unknown): v is ProofTrackFilter {
  return typeof v === "string" && PROOF_TRACK_SET.has(v);
}
