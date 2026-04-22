"use client";

import Image from "next/image";

export type TechIconTileSize = "xs" | "sm" | "md" | "lg";
export type TechIconTileSurface = "default" | "emphasis";

const shell: Record<
  TechIconTileSize,
  { outer: string; inner: string; box: string; sizes: string }
> = {
  xs: {
    outer: "h-5 w-5 rounded-[5px] p-px",
    inner: "h-full w-full rounded-[3px] p-px",
    box: "relative h-3.5 w-3.5",
    sizes: "14px",
  },
  sm: {
    outer: "h-7 w-7 rounded-md p-px",
    inner: "h-full w-full rounded-[5px] p-0.5",
    box: "relative h-5 w-5",
    sizes: "20px",
  },
  md: {
    outer: "h-10 w-10 rounded-lg p-px",
    inner: "h-full w-full rounded-[7px] p-1",
    box: "relative h-7 w-7",
    sizes: "28px",
  },
  lg: {
    outer: "h-12 w-12 rounded-lg p-px",
    inner: "h-full w-full rounded-[7px] p-1.5",
    box: "relative h-8 w-8",
    sizes: "32px",
  },
};

const surfaces: Record<TechIconTileSurface, { plate: string; well: string }> = {
  default: {
    plate:
      "border-border/55 bg-[var(--color-icon-plate)] shadow-[inset_0_0_0_1px_var(--color-icon-plate-ring),0_1px_2px_rgba(15,23,42,0.05)] dark:border-border/40 dark:shadow-[inset_0_0_0_1px_var(--color-icon-plate-ring),0_1px_2px_rgba(0,0,0,0.35)]",
    well:
      "bg-[var(--color-icon-well)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  },
  emphasis: {
    plate:
      "border-border/70 bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.08)] dark:border-white/20 dark:bg-slate-50 dark:shadow-[inset_0_0_0_1px_rgba(241,245,249,0.22),0_3px_10px_rgba(0,0,0,0.45)]",
    well:
      "bg-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
  },
};

type Props = {
  src: string;
  alt?: string;
  size?: TechIconTileSize;
  surface?: TechIconTileSurface;
  className?: string;
};

export function TechIconTile({
  src,
  alt = "",
  size = "md",
  surface = "default",
  className = "",
}: Props) {
  const s = shell[size];
  const tone = surfaces[surface];

  return (
    <div className={`relative flex shrink-0 items-center justify-center ${tone.plate} ${s.outer} ${className}`}>
      <div className={`flex items-center justify-center ${tone.well} ${s.inner}`}>
        <div className={s.box}>
          <Image src={src} alt={alt} fill className="object-contain" sizes={s.sizes} />
        </div>
      </div>
    </div>
  );
}