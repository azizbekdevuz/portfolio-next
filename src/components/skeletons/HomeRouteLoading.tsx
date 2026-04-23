"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { CockpitStageSkeleton } from "@/components/skeletons/CockpitStageSkeleton";
import { SkeletonRegion } from "@/components/skeletons/skeleton-primitives";

/** Instant route-level fallback while the locale page shell streams in. */
export function HomeRouteLoading() {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className="skeleton-pulse relative min-h-dvh bg-page"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-[var(--cockpit-hero-stage-max-width)] px-4 pb-10 pt-12 md:px-5 md:pb-14 md:pt-12 lg:pb-16 lg:pt-14">
        <CockpitStageSkeleton />
      </div>
    </SkeletonRegion>
  );
}
