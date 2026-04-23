"use client";

import { useEffect, useState } from "react";
import { TechIconTile } from "@/components/ui/TechIconTile";
import { ExternalLink, FolderGit2, Layers, ListChecks, Sparkles } from "lucide-react";
import type { Project } from "@/models/Project";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useHomeShell } from "@/components/shell/HomeShellContext";
import { ABOUT_TECH_CARD_SHELL } from "@/lib/about-tech-surface";
import { FOCUS_RING } from "@/lib/ui-focus";

export function ProofPanel({
  project,
  lensBlurb,
}: {
  project: Project | null;
  /** Shown when a reviewer track is active — explains the lens. */
  lensBlurb?: string;
}) {
  const { messages } = useI18n();
  const { setShell } = useHomeShell();
  const tabs = [
    { id: "summary" as const, label: messages.proofPanel.tabs.summary, Icon: Sparkles },
    { id: "owned" as const, label: messages.proofPanel.tabs.owned, Icon: ListChecks },
    { id: "stack" as const, label: messages.proofPanel.tabs.stack, Icon: Layers },
    { id: "links" as const, label: messages.proofPanel.tabs.links, Icon: ExternalLink },
  ];
  type TabId = (typeof tabs)[number]["id"];
  const [tab, setTab] = useState<TabId>("summary");

  useEffect(() => {
    setTab("summary");
  }, [project?.slug, lensBlurb]);

  if (!project) {
    return (
      <div
        className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card-muted/40 p-8 text-center md:min-h-[320px]"
        role="status"
      >
        <p className="text-sm font-medium text-fg">{messages.proofPanel.noProofTitle}</p>
        <p className="mt-2 max-w-xs text-xs text-muted">{messages.proofPanel.noProofHint}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border-strong bg-card shadow-sm">
      <div className="border-b border-border px-4 py-3 md:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {project.projectType && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{project.projectType}</p>
            )}
            <h2 className="text-lg font-semibold tracking-tight text-fg md:text-xl">{project.title}</h2>
            <p className="mt-1 text-sm font-medium leading-snug text-muted">{project.summary}</p>
            {lensBlurb ? (
              <p className="mt-2 border-l-2 border-accent/40 pl-2.5 text-xs font-medium leading-snug text-accent">
                {lensBlurb}
              </p>
            ) : null}
          </div>
          {project.featuredTier === "secondary" && (
            <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
              {messages.proofPanel.secondarySignal}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex gap-1 border-b border-border bg-page-elevated/80 px-2 py-2 md:px-3"
        role="tablist"
        aria-label={messages.proofPanel.tablistAria}
      >
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`proof-panel-${id}`}
            id={`proof-tab-${id}`}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors md:gap-2 md:text-sm ${FOCUS_RING} ${
              tab === id
                ? "cursor-default bg-card text-fg shadow-sm ring-1 ring-border"
                : "cursor-pointer text-muted hover:bg-card-muted/80 hover:text-fg"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-80 md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[200px] flex-1 p-4 md:min-h-[220px] md:p-5">
        {tab === "summary" && (
          <div id="proof-panel-summary" role="tabpanel" aria-labelledby="proof-tab-summary" className="space-y-4">
            {(() => {
              const impactLine = project.outcome ?? project.metrics ?? project.whyItMatters;
              const showGlance = project.problem || project.owned || impactLine;
              if (!showGlance) return null;
              return (
                <div className="rounded-xl border border-border bg-page-elevated/60 p-3 dark:border-border-strong dark:bg-card-muted/50">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-fg/80">
                    {messages.proofPanel.atAGlance}
                  </p>
                  <dl className="mt-2 space-y-2.5 text-sm">
                    {project.problem ? (
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {messages.proofPanel.scanProblem}
                        </dt>
                        <dd className="mt-0.5 leading-snug text-fg">{project.problem}</dd>
                      </div>
                    ) : null}
                    {project.owned ? (
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {messages.proofPanel.scanShipped}
                        </dt>
                        <dd className="mt-0.5 leading-snug text-fg">{project.owned}</dd>
                      </div>
                    ) : null}
                    {impactLine ? (
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {messages.proofPanel.scanImpact}
                        </dt>
                        <dd className="mt-0.5 leading-snug text-fg">{impactLine}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              );
            })()}
            {project.whyItMatters &&
            (project.outcome || project.metrics) &&
            project.whyItMatters !== project.outcome &&
            project.whyItMatters !== project.metrics ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-fg/80">
                  {messages.proofPanel.whyItMatters}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{project.whyItMatters}</p>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-1.5">
              {(project.proofTags ?? []).slice(0, 8).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-page-elevated px-2 py-0.5 text-[11px] text-fg/80 dark:text-fg/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {tab === "owned" && (
          <div id="proof-panel-owned" role="tabpanel" aria-labelledby="proof-tab-owned">
            {project.owned ? (
              <p className="border-l-2 border-accent/50 pl-3 text-sm leading-relaxed text-muted">{project.owned}</p>
            ) : (
              <p className="text-sm text-muted">{messages.proofPanel.ownershipFallback}</p>
            )}
          </div>
        )}

        {tab === "stack" && (
          <div id="proof-panel-stack" role="tabpanel" aria-labelledby="proof-tab-stack">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li
                  key={t.name}
                  className={`flex min-w-0 items-center gap-2 px-2.5 py-1.5 ${ABOUT_TECH_CARD_SHELL}`}
                >
                  <TechIconTile iconId={t.iconId} size="sm" />
                  <span className="text-xs font-medium text-fg">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "links" && (
          <div id="proof-panel-links" role="tabpanel" aria-labelledby="proof-tab-links" className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {messages.proofPanel.liveProduct}
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted underline-offset-4 hover:text-accent hover:underline"
                >
                  <FolderGit2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {messages.proofPanel.repository}
                </a>
              )}
            </div>
            {!project.liveLink && !project.githubLink && (
              <p className="text-sm text-muted">{messages.proofPanel.noPublicLinks}</p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-page-elevated/50 px-4 py-3 md:px-5">
        <button
          type="button"
          onClick={() => setShell("projects")}
          className={`w-full cursor-pointer rounded-xl border border-border-strong bg-card px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent md:w-auto ${FOCUS_RING}`}
        >
          {messages.proofPanel.openDeepDive}
        </button>
      </div>
    </div>
  );
}
