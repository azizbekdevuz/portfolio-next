"use client";

import { Award, Briefcase, FolderKanban, Layers, Mail } from "lucide-react";
import { TechIconTile } from "@/components/ui/TechIconTile";
import type { SiteProfile } from "@/content/site";
import type { JourneyData } from "@/models/Journey";
import type { Achievement } from "@/models/Achievement";
import type { TechCategory } from "@/models/TechStack";
import type { Project } from "@/models/Project";
import type { ProofTrackFilter } from "@/lib/proof-track";
import type { ProofWorkspaceMode } from "@/lib/proof-workspace";
import { useProofBrowse } from "@/components/brand/ProofBrowseContext";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useHomeShell } from "@/components/shell/HomeShellContext";
import { ProofPanel } from "./ProofPanel";
import { FOCUS_RING } from "@/lib/ui-focus";
import { ABOUT_TECH_CARD_SHELL } from "@/lib/about-tech-surface";

function techCategoryOrder(track: ProofTrackFilter): string[] {
  const full = ["frontend", "backend", "languages", "tools"] as const;
  if (track === "frontend") return ["frontend", "languages", "backend", "tools"];
  if (track === "fullstack") return ["backend", "frontend", "languages", "tools"];
  if (track === "ai") return ["languages", "backend", "frontend", "tools"];
  return [...full];
}

const modeIcons: Record<ProofWorkspaceMode, typeof FolderKanban> = {
  project: FolderKanban,
  stack: Layers,
  journey: Briefcase,
  achievements: Award,
  contact: Mail,
};

export function ProofWorkspaceSurface({
  project,
  lensBlurb,
  techStack,
  journeyData,
  achievements,
  site,
  track,
}: {
  project: Project | null;
  lensBlurb?: string;
  techStack: Record<string, TechCategory>;
  journeyData: JourneyData[];
  achievements: Achievement[];
  site: SiteProfile;
  track: ProofTrackFilter;
}) {
  const { messages } = useI18n();
  const { setShell } = useHomeShell();
  const { workspaceMode, setWorkspaceMode } = useProofBrowse();
  const w = messages.cockpitWorkspace;

  const modes: { id: ProofWorkspaceMode; label: string }[] = [
    { id: "project", label: w.modeProject },
    { id: "stack", label: w.modeStack },
    { id: "journey", label: w.modeJourney },
    { id: "achievements", label: w.modeAchievements },
    { id: "contact", label: w.modeContact },
  ];

  const orderedKeys = techCategoryOrder(track);
  const flatAchievements = achievements.flatMap((a) => a.items.map((it) => ({ cat: a.title, ...it })));

  const lensTrackLabel =
    track === "all" ? messages.cockpit.allProof : messages.roleTracks[track].label;
  const lensSummaryLine = messages.cockpit.trackLensSummary[track];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
      <div
        className={`rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 ${
          track === "all"
            ? "border-border-strong bg-card-muted/40"
            : "border-accent/35 bg-accent/[0.07] ring-1 ring-accent/15 dark:bg-accent/[0.1]"
        }`}
      >
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] md:text-[11px]">
          <span className="font-mono font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
            {messages.cockpit.lens}
          </span>
          <span className="font-semibold text-fg">{lensTrackLabel}</span>
        </p>
        <p className="mt-1 text-[10px] leading-snug text-muted md:text-[11px]">{lensSummaryLine}</p>
      </div>
      <div
        className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={w.workspaceAria}
      >
        {modes.map(({ id, label }) => {
          const Icon = modeIcons[id];
          const active = workspaceMode === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setWorkspaceMode(id)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[11px] font-semibold transition-colors active:scale-[0.99] md:px-3 md:text-xs ${FOCUS_RING} ${
                active
                  ? "border-accent/45 bg-accent/10 text-fg ring-1 ring-accent/20"
                  : "border-border bg-card-muted/60 text-muted hover:border-border-strong hover:text-fg"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-85" strokeWidth={1.75} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      {workspaceMode === "project" ? (
        <ProofPanel project={project} lensBlurb={lensBlurb} />
      ) : (
        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-border-strong bg-card/40 shadow-sm">
          <div className="max-h-[min(52svh,520px)] overflow-y-auto overscroll-contain lg:max-h-[min(58svh,580px)]">
          {workspaceMode === "stack" && (
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-xs leading-snug text-muted">{w.stackBlurb}</p>
              <div className="space-y-4">
                {orderedKeys.map((key) => {
                  const cat = techStack[key];
                  if (!cat) return null;
                  return (
                    <div key={key}>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
                        {cat.title}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {cat.techs.slice(0, 8).map((t) => (
                          <li
                            key={t.name}
                            className={`flex items-center gap-2 px-2 py-1.5 ${ABOUT_TECH_CARD_SHELL}`}
                          >
                            <TechIconTile src={t.icon} alt="" size="sm" />
                            <span className="text-xs font-medium text-fg">{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShell("skills")}
                className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
              >
                {w.openFullStack}
              </button>
            </div>
          )}

          {workspaceMode === "journey" && (
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-xs leading-snug text-muted">{w.journeyBlurb}</p>
              <ul className="space-y-3">
                {journeyData.slice(0, 4).map((j) => (
                  <li key={j.id ?? j.title} className="border-l-2 border-accent/35 pl-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-subtle">{j.date}</p>
                    <p className="text-sm font-semibold text-fg">{j.title}</p>
                    <p className="text-xs text-muted line-clamp-2">{j.subtitle}</p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShell("about")}
                className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
              >
                {w.openFullAbout}
              </button>
            </div>
          )}

          {workspaceMode === "achievements" && (
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-xs leading-snug text-muted">{w.achievementsBlurb}</p>
              <ul className="space-y-3">
                {flatAchievements.slice(0, 4).map((it, i) => (
                  <li key={`${it.title}-${i}`} className="rounded-lg border border-border bg-page-elevated/60 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-accent">{it.highlight}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-fg">{it.title}</p>
                    <p className="mt-1 text-xs text-muted line-clamp-2">{it.subtitle}</p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShell("about")}
                className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
              >
                {w.openFullAchievements}
              </button>
            </div>
          )}

          {workspaceMode === "contact" && (
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-xs leading-snug text-muted">{w.contactBlurb}</p>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  {site.email}
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  {messages.cockpit.github}
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  {messages.cockpit.linkedin}
                </a>
              </div>
              <p className="text-xs text-subtle">{site.availability}</p>
              <button
                type="button"
                onClick={() => setShell("contact")}
                className="w-full rounded-xl border border-border-strong bg-card px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {w.openContactForm}
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
