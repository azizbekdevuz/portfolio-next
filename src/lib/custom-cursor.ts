/** Dispatched when overlays need the system cursor (e.g. testimonials modal). */
export const CUSTOM_CURSOR_EVENT = "portfolio:custom-cursor" as const;

export type CustomCursorEventDetail = { suppress: boolean };

export function setCustomCursorSuppressed(suppress: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CustomCursorEventDetail>(CUSTOM_CURSOR_EVENT, { detail: { suppress } }),
  );
}
