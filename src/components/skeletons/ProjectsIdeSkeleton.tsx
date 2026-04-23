"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { SkeletonRegion, skBlock, skLine, skLineStrong } from "@/components/skeletons/skeleton-primitives";

/**
 * Layout-faithful placeholder for the VS Code–style projects IDE (desktop + embedded).
 * Matches `DesktopProjectsSection` chrome: title bar, explorer rail, tab strip, editor body.
 */
export function ProjectsIdeSkeleton({ embedded = false }: { embedded?: boolean }) {
  const { messages } = useI18n();
  const label = messages.shell.pageLoading;

  return (
    <SkeletonRegion
      label={label}
      className={`skeleton-pulse relative z-10 mx-auto w-full max-w-7xl px-4 ${embedded ? "min-h-0 py-3 md:py-4" : "py-12 md:py-20"}`}
    >
      {!embedded ? (
        <div className="mb-10 flex flex-col items-center md:mb-12">
          <div className={`mb-2 h-3 w-40 ${skLine}`} />
          <div className={`h-9 w-72 max-w-full ${skLineStrong}`} />
          <div className={`mt-3 h-3 w-64 max-w-full ${skLine}`} />
          <div className="mt-4 h-1 w-20 rounded-full bg-accent/40" />
        </div>
      ) : null}

      <div className="flex h-12 items-center justify-between rounded-t-lg border border-b-0 border-border bg-card/95 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 ${skBlock}`} />
          <div className={`h-4 w-44 ${skLine}`} />
        </div>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]/70" />
        </div>
      </div>

      <div className="flex overflow-hidden rounded-b-lg border border-border shadow-lg">
        <div className="hidden max-h-[min(70vh,640px)] w-[250px] shrink-0 flex-col border-r border-border bg-card-muted/90 backdrop-blur-sm md:flex">
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-4">
            <div className={`mb-3 h-3 w-24 ${skLine}`} />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-8 w-full ${skBlock}`} />
            ))}
          </div>
          <div className="shrink-0 border-t border-border bg-card-muted/95 p-2">
            <div className={`mx-auto h-8 w-[90%] ${skBlock}`} />
          </div>
        </div>

        <div
          className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-card-muted/70 backdrop-blur-sm ${
            embedded ? "min-h-[min(520px,65dvh)]" : "min-h-[600px]"
          }`}
        >
          <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border bg-card-muted/80 px-1 py-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-9 min-w-[7rem] shrink-0 rounded-md ${skBlock}`} />
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:gap-6">
            <div className="space-y-3">
              <div className={`h-6 w-full max-w-[12rem] ${skLineStrong}`} />
              <div className={`h-24 w-full ${skBlock}`} />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-7 w-20 rounded-full ${skBlock}`} />
                ))}
              </div>
              <div className={`h-40 w-full rounded-lg ${skBlock}`} />
            </div>
            <div className={`aspect-video w-full rounded-lg ${skBlock}`} />
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}
