"use client";

import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import type { SiteProfile } from "@/content/site";
import type { Project } from "@/models/Project";
import type { ProofTrackFilter } from "@/lib/proof-track";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Desktop-only strip under the proof panel — complements the hero (no duplicate social/contact).
 * Surfaces live deployments and the OSS note, which are not shown in the left column.
 */
export function CockpitCredibilityStrip({
  site,
  projects,
  track,
}: {
  site: SiteProfile;
  projects: Project[];
  track: ProofTrackFilter;
}) {
  const { messages } = useI18n();

  const liveProducts = useMemo(() => {
    const flagshipTitles = new Set(site.flagshipProjects as readonly string[]);
    let filtered = projects.filter((p) => p.status !== "archived" && p.liveLink);
    if (track !== "all") {
      const inTrack = filtered.filter((p) => p.roleTracks?.includes(track));
      const rest = filtered.filter((p) => !p.roleTracks?.includes(track));
      filtered = [...inTrack, ...rest];
    }
    return filtered
      .sort((a, b) => {
        const fa = flagshipTitles.has(a.title) ? 0 : 1;
        const fb = flagshipTitles.has(b.title) ? 0 : 1;
        if (fa !== fb) return fa - fb;
        return a.order - b.order;
      })
      .slice(0, 4);
  }, [projects, track, site.flagshipProjects]);

  return (
    <div className="mt-4 hidden rounded-xl border border-border bg-surface-soft/90 px-4 py-3 shadow-sm dark:border-border-strong dark:bg-card-muted/50 lg:block">
      {liveProducts.length > 0 ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-subtle">
            {messages.credibilityStrip.liveProducts}
          </span>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {liveProducts.map((p) => (
              <li key={p.id}>
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent underline-offset-2 hover:underline"
                >
                  {p.title}
                  <ExternalLink className="h-3 w-3 opacity-70" strokeWidth={2} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p
        className={`text-[11px] leading-snug text-muted ${
          liveProducts.length > 0
            ? "mt-3 border-t border-border pt-2.5 dark:border-border-strong/80"
            : ""
        }`}
      >
        <span className="font-semibold text-subtle">{messages.credibilityStrip.openSource}</span>
        {messages.experience.ossNote}
      </p>
    </div>
  );
}
