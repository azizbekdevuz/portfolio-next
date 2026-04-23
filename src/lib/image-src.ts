/**
 * Guards `next/image` and `<img src>` from empty or whitespace-only values.
 * URL shape checks are minimal — callers still ensure remote patterns in next.config if needed.
 */
export function isUsableImageSrc(
  value: string | null | undefined,
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
