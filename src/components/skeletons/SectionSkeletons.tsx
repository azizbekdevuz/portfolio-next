"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { CockpitStageSkeleton } from "@/components/skeletons/CockpitStageSkeleton";
import { ProjectsIdeSkeleton } from "@/components/skeletons/ProjectsIdeSkeleton";
import { SkeletonRegion, skBlock, skLineStrong } from "@/components/skeletons/skeleton-primitives";

function OptionalDepthHeading({ embedded }: { embedded?: boolean }) {
  if (embedded) return null;
  return (
    <div className="mb-12 flex flex-col items-center md:mb-16">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <div className={`h-6 w-12 ${skBlock}`} />
        <div className={`h-10 w-56 md:w-64 ${skLineStrong}`} />
        <div className={`h-6 w-12 ${skBlock}`} />
        <div className={`h-6 w-20 ${skBlock}`} />
      </div>
      <div className="h-1 w-20 rounded-full bg-accent/45" />
    </div>
  );
}

export function HeroSkeleton() {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className="skeleton-pulse relative min-h-dvh scroll-mt-24 border-b border-border bg-page"
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

export function ProjectsSkeleton({ embedded = false }: { embedded?: boolean }) {
  return <ProjectsIdeSkeleton embedded={embedded} />;
}

export function SkillsSkeleton({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className={`skeleton-pulse px-4 ${embedded ? "min-h-0 py-4 md:py-6" : "py-20"}`}
    >
      <OptionalDepthHeading embedded={embedded} />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.5fr_2.5fr]">
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-full rounded-lg border border-border p-5 ${skBlock}`}>
              <div className="mb-3 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${skLineStrong}`} />
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 h-6 w-32 ${skLineStrong}`} />
                  <div className={`h-4 w-24 rounded-md bg-primary/15`} />
                </div>
              </div>
              <div className={`mb-3 h-12 w-full ${skBlock}`} />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className={`h-6 w-16 rounded-full ${skBlock}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`min-h-[420px] rounded-lg border border-border p-6 md:min-h-[500px] md:p-8 ${skBlock}`}>
          <div className={`mb-6 h-8 w-48 ${skLineStrong}`} />
          <div className="mb-8 grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`rounded-lg border border-border p-3 ${skBlock}`}>
                <div className={`mx-auto mb-2 h-10 w-10 ${skLineStrong}`} />
                <div className={`mx-auto h-4 w-full ${skBlock}`} />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <div className={`mb-3 h-6 w-36 ${skLineStrong}`} />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-8 w-28 rounded-lg bg-primary/12`} />
                ))}
              </div>
            </div>
            <div>
              <div className={`mb-3 h-6 w-32 ${skLineStrong}`} />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`h-8 w-24 rounded-full ${skBlock}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}

export function InProgressSkeleton({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className={`skeleton-pulse px-4 ${embedded ? "min-h-0 py-4" : "py-20"}`}
    >
      {!embedded ? (
        <div className="mb-12 flex flex-col items-center md:mb-16">
          <div className="flex flex-col items-center">
            <div className={`mb-5 flex h-12 w-72 max-w-full items-center justify-center rounded-md ${skLineStrong}`} />
            <div className={`h-2 w-64 max-w-full rounded-full ${skBlock}`} />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent/50" />
              <div className={`h-4 w-48 ${skBlock}`} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative mx-auto max-w-6xl">
        <div className={`rounded-lg border border-border p-6 backdrop-blur-sm md:p-8 ${skBlock}`}>
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-primary/12`}>
                <div className={`h-12 w-12 rounded-md ${skBlock}`} />
              </div>
            </div>
            <div className={`mx-auto mb-4 h-8 w-64 max-w-full ${skLineStrong}`} />
            <div className="mx-auto mb-6 max-w-2xl space-y-2">
              <div className={`h-4 w-full ${skBlock}`} />
              <div className={`h-4 w-full ${skBlock}`} />
              <div className={`mx-auto h-4 w-3/4 ${skBlock}`} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`rounded-lg border border-border p-5 ${skBlock}`}>
                  <div className={`mx-auto mb-4 h-12 w-12 rounded-full ${skLineStrong}`} />
                  <div className={`mx-auto mb-2 h-6 w-32 rounded-md bg-primary/15`} />
                  <div className={`mb-4 h-12 w-full ${skBlock}`} />
                  <div className={`h-2.5 w-full rounded-full ${skBlock}`}>
                    <div className="h-2.5 rounded-full bg-accent/35" style={{ width: `${30 + i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`rounded-lg border border-border p-4 ${skBlock}`}>
                  <div className={`mb-2 h-8 w-full rounded-md bg-primary/15`} />
                  <div className={`h-4 w-full ${skBlock}`} />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className={`h-10 w-48 rounded-full border border-accent/25 bg-primary/8`} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}

export function ContactSkeleton({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className={`skeleton-pulse px-4 ${embedded ? "min-h-0 py-4" : "py-20"}`}
    >
      <OptionalDepthHeading embedded={embedded} />

      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <div className={`overflow-hidden rounded-lg border border-border p-8 backdrop-blur-sm ${skBlock}`}>
            <div className="relative z-10 space-y-4">
              <div className={`h-8 w-48 ${skLineStrong}`} />
              <div className={`h-5 w-40 ${skBlock}`} />
              <div className={`h-5 w-56 ${skBlock}`} />
              <div className="absolute right-4 top-4 hidden sm:block">
                <div className="h-24 w-24 rounded-lg border border-border bg-card/90 dark:bg-card-muted/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-border p-2">
              <div className={`h-10 w-full ${skBlock}`} />
            </div>
          ))}
          <div className="rounded-lg border border-border p-2">
            <div className={`h-32 w-full ${skBlock}`} />
            <div className={`ml-auto mt-2 h-4 w-16 ${skBlock}`} />
          </div>
          <div className={`h-12 w-full rounded-lg bg-primary/20`} />
        </div>
      </div>

      <div className={`mx-auto max-w-6xl rounded-lg border border-border ${embedded ? "mt-8" : "mt-16"}`}>
        <div className="flex items-center justify-between border-b border-border bg-card-muted/50 px-4 py-2">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]/60" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]/60" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]/60" />
          </div>
          <div className={`h-4 w-40 ${skBlock}`} />
          <div className={`h-4 w-4 rounded-full ${skBlock}`} />
        </div>
        <div className="h-28 p-4">
          <div className={`mb-3 h-6 w-full ${skBlock}`} />
          <div className={`h-4 w-3/4 ${skBlock}`} />
        </div>
        <div className="grid grid-cols-2 gap-3 bg-card-muted/25 p-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg border border-border p-4 ${skBlock}`}>
              <div className={`mx-auto mb-2 h-10 w-10 rounded-full ${skLineStrong}`} />
              <div className={`mx-auto mb-1 h-5 w-16 ${skBlock}`} />
              <div className={`mx-auto h-4 w-24 ${skBlock}`} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border bg-card-muted/50 px-4 py-2">
          <div className={`h-4 w-36 ${skBlock}`} />
          <div className={`h-4 w-20 ${skBlock}`} />
        </div>
      </div>

      {!embedded ? (
        <div className="mx-auto mt-16 max-w-5xl py-6">
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className={`h-6 w-64 ${skLineStrong}`} />
            <div className="h-px w-32 rounded-full bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`rounded-lg border border-border p-6 ${skBlock}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-sm ${skLineStrong}`} />
                  <div className="min-w-0 flex-1">
                    <div className={`mb-1 h-6 w-24 ${skBlock}`} />
                    <div className={`h-4 w-16 rounded-md bg-primary/15`} />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-1 flex justify-between">
                    <div className={`h-4 w-24 ${skBlock}`} />
                    <div className={`h-4 w-10 ${skBlock}`} />
                  </div>
                  <div className={`h-2 overflow-hidden rounded-full ${skBlock}`}>
                    <div className="h-full rounded-full bg-accent/40" style={{ width: `${50 + i * 10}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className={`h-6 w-16 rounded-full bg-primary/12`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </SkeletonRegion>
  );
}

export function AboutSkeleton({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  const inner = (
    <SkeletonRegion
      label={label}
      className={`skeleton-pulse px-4 ${embedded ? "" : "py-20"}`}
    >
      <OptionalDepthHeading embedded={embedded} />

      <div className={`mx-auto mb-12 max-w-6xl rounded-lg border border-border p-6 md:mb-16 ${skBlock}`}>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <div className={`mb-4 aspect-square w-full rounded-2xl ${skLineStrong}`} />
            <div className="space-y-2">
              <div className={`h-5 w-full ${skBlock}`} />
              <div className={`h-5 w-4/5 ${skBlock}`} />
            </div>
          </div>
          <div className="min-w-0 space-y-4 md:w-2/3">
            <div className={`h-8 w-48 rounded-md bg-primary/15`} />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-4 w-full ${skBlock}`} />
              ))}
              <div className={`h-4 w-4/5 ${skBlock}`} />
            </div>
            <div className="space-y-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-4 w-full ${skBlock}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-6xl md:mb-16">
        <div className={`mx-auto mb-8 h-8 w-48 ${skLineStrong}`} />
        <div className="relative space-y-12 border-l-2 border-accent/25 pl-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-0 h-8 w-8 rounded-full border-4 border-border bg-accent/20" />
              <div className={`mb-2 h-5 w-24 rounded-md bg-primary/15`} />
              <div className={`mb-3 h-7 w-48 ${skLineStrong}`} />
              <div className={`rounded-lg border border-border p-4 ${skBlock}`}>
                <div className="mb-3 space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className={`h-4 w-full ${skBlock}`} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className={`rounded-full px-3 py-1.5 ${skBlock}`}>
                      <div className={`h-4 w-16 ${skBlock}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-6xl md:mb-16">
        <div className={`mx-auto mb-8 h-8 w-56 ${skLineStrong}`} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className={`flex flex-col items-center rounded-lg border border-border p-4 ${skBlock}`}>
              <div className={`mb-3 h-16 w-16 ${skLineStrong}`} />
              <div className={`mb-2 h-5 w-24 ${skBlock}`} />
              <div className={`mb-2 h-4 w-full ${skBlock}`} />
              <div className="h-1 w-3/4 rounded-full bg-accent/35" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className={`mx-auto mb-8 h-8 w-64 ${skLineStrong}`} />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`rounded-lg border border-border p-6 ${skBlock}`}>
              <div className={`mx-auto mb-4 h-16 w-16 rounded-full bg-primary/15`} />
              <div className={`mx-auto mb-3 h-6 w-36 ${skBlock}`} />
              <div className="mb-3 space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className={`h-4 w-full ${skBlock}`} />
                ))}
              </div>
              <div className={`mx-auto h-6 w-24 rounded-full bg-primary/15`} />
            </div>
          ))}
        </div>
      </div>
    </SkeletonRegion>
  );

  if (embedded) {
    return <div className="min-h-0 min-w-0 border-t border-border py-4">{inner}</div>;
  }

  return inner;
}
