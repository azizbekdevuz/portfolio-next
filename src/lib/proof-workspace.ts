/** In-viewport proof canvas modes (no page scroll). */
export type ProofWorkspaceMode = "project" | "stack" | "journey" | "achievements" | "contact";

export const proofWorkspaceModes: readonly ProofWorkspaceMode[] = [
  "project",
  "stack",
  "journey",
  "achievements",
  "contact",
] as const;
