"use client";

import { BrandIcon, type BrandIconId, type BrandIconVisualTone } from "@/lib/brand-icons";

export type TechIconTileSize = "xs" | "sm" | "md" | "lg";
export type TechIconChipSurface = "default" | "emphasis";

/**
 * Renders a registered vector mark. By default (no chip), only `BrandIcon` is drawn so parent
 * card/badge shells do not stack a second “plate” (legacy image-era look).
 * Set `chip` for a single frosted surface when the mark sits on a flat/minimal background.
 */
const sizeFrame: Record<TechIconTileSize, { root: string }> = {
  xs: {
    root: "h-5 w-5 rounded-[6px] p-[3px] min-h-[1.25rem] min-w-[1.25rem]",
  },
  sm: {
    root: "h-7 w-7 rounded-lg p-1",
  },
  md: {
    root: "h-10 w-10 rounded-lg p-1.5",
  },
  lg: {
    root: "h-12 w-12 rounded-xl p-2",
  },
};

const CHIP_SURFACE_STYLES: Record<TechIconChipSurface, string> = {
  default: [
    "border border-slate-200/90 bg-white/90 shadow-sm ring-1 ring-slate-900/[0.04]",
    "backdrop-blur-sm",
    "dark:border-white/12 dark:bg-slate-950/50 dark:ring-white/[0.06]",
    "dark:shadow-[0_1px_0_rgba(255,255,255,0.05),0_2px_10px_rgba(0,0,0,0.4)]",
  ].join(" "),
  emphasis: [
    "border border-slate-200 bg-white/95 shadow-md ring-1 ring-slate-900/[0.05]",
    "dark:border-white/14 dark:bg-slate-900/80 dark:ring-white/[0.08]",
    "dark:shadow-[0_1px_0_rgba(255,255,255,0.07),0_4px_16px_rgba(0,0,0,0.45)]",
  ].join(" "),
};

type Props = {
  iconId: BrandIconId;
  size?: TechIconTileSize;
  /**
   * Adds one frosted chip behind the mark. Off by default — most call sites already sit in
   * `border`/`bg-card` shells.
   */
  chip?: boolean;
  /** Only when `chip` is true */
  chipSurface?: TechIconChipSurface;
  visualTone?: BrandIconVisualTone;
  className?: string;
  "aria-label"?: string;
};

export function TechIconTile({
  iconId,
  size = "md",
  chip = false,
  chipSurface: surface = "default",
  visualTone = "brand",
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  const hidden = !ariaLabel;

  if (!chip) {
    return (
      <span
        className={`inline-flex items-center justify-center leading-none [&>svg]:block ${className}`}
      >
        <BrandIcon
          id={iconId}
          size={size}
          visualTone={visualTone}
          aria-label={ariaLabel}
          aria-hidden={hidden}
        />
      </span>
    );
  }

  const s = sizeFrame[size];
  const frame = CHIP_SURFACE_STYLES[surface];

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${s.root} ${frame} ${className}`}
    >
      <span className="flex h-full w-full items-center justify-center leading-none [&>svg]:block">
        <BrandIcon
          id={iconId}
          size={size}
          visualTone={visualTone}
          aria-label={ariaLabel}
          aria-hidden={hidden}
        />
      </span>
    </div>
  );
}
