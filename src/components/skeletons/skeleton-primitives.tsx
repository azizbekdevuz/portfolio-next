import type { ReactNode } from "react";

/** Muted fill blocks — no motion here; parent may apply `skeleton-pulse`. */
export const skBlock = "rounded-md bg-card-muted/45 dark:bg-card-muted/40";

export const skLine = `${skBlock} h-3`;

export const skLineStrong = "rounded-md bg-card-muted/55 dark:bg-card-muted/50";

export function SkeletonRegion({
  label,
  busy = true,
  className,
  children,
}: {
  label: string;
  busy?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" aria-busy={busy} className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
