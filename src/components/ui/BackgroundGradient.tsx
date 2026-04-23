/**
 * Global ambient background — “data-plane” system (see `ambient-background.css`).
 * Linear depth + dual lattice + diagonal scan + horizon + vignette + sparse nodes.
 * CSS-only motion (desktop); static structure on mobile / prefers-reduced-motion.
 *
 * Mounted from `DeviceShellBody` as `fixed` / `z-0` under shell `z-10`.
 */
export function BackgroundGradient() {
  return (
    <div className="ambient-root" aria-hidden>
      <div className="ambient-depth" />
      <div className="ambient-field ambient-field-drift" />
      <div className="ambient-field-offset" />
      <div className="ambient-nodes" />
      <div className="ambient-scan ambient-scan-drift" />
      <div className="ambient-horizon" />
      <div className="ambient-vignette" />
    </div>
  );
}
