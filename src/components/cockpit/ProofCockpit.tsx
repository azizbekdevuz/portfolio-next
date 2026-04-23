"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Layers,
  Linkedin,
  Mail,
  MessageSquareQuote,
  MonitorSmartphone,
  Palette,
  Server,
} from "lucide-react";
import type { SiteProfile } from "@/content/site";
import type { Project } from "@/models/Project";
import { useProofBrowse } from "@/components/brand/ProofBrowseContext";
import { useHomeShell } from "@/components/shell/HomeShellContext";
import { getFeaturedProjectsForTrack } from "@/content/home-data";
import { PROOF_TRACK_FILTERS, type ProofTrackFilter } from "@/lib/proof-track";
import { getDefaultFeaturedSlugForTrack, sortExperienceItemsByTrack } from "@/lib/reviewer-track-view";
import type { HomeData } from "@/content/home-data";
import { experienceSnapshot } from "@/content/experience-snapshot";
import { useI18n } from "@/components/i18n/I18nProvider";
import { DocumentDownloadLauncher } from "./DocumentDownloadLauncher";
import { ProofWorkspaceSurface } from "./ProofWorkspaceSurface";
import { TestimonialsModal } from "./TestimonialsModal";
import { ProfileIdentityExpandable } from "./ProfileIdentityExpandable";
import { CockpitCredibilityStrip } from "./CockpitCredibilityStrip";
import { SectionPrimaryNav } from "@/components/navigation/SectionPrimaryNav";
import { FOCUS_RING } from "@/lib/ui-focus";

const trackIcons = {
  all: MonitorSmartphone,
  frontend: Palette,
  fullstack: Server,
  ai: Layers,
} as const;

export function ProofCockpit({
  site,
  projects,
  techStack,
  journeyData,
  achievements,
}: {
  site: SiteProfile;
  projects: Project[];
  techStack: HomeData["techStack"];
  journeyData: HomeData["journeyData"];
  achievements: HomeData["achievements"];
}) {
  const { messages } = useI18n();
  const {
    track,
    setTrack,
    selectedSlug,
    setSelectedSlug,
    setTestimonialsOpen,
    setWorkspaceMode,
  } = useProofBrowse();
  const { setShell } = useHomeShell();
  const prevTrackRef = useRef<ProofTrackFilter | null>(null);

  const flagshipList = useMemo(() => {
    const names = site.flagshipProjects as readonly string[];
    let list = projects.filter((p) => p.status !== "archived" && names.includes(p.title));
    if (track !== "all") {
      const inLens = list.filter((p) => p.roleTracks?.includes(track));
      if (inLens.length > 0) list = inLens;
    }
    return list;
  }, [projects, site.flagshipProjects, track]);

  const lensBlurb =
    track === "all" ? undefined : messages.roleTracks[track as keyof typeof messages.roleTracks].blurb;

  const filteredFeatured = useMemo(
    () => getFeaturedProjectsForTrack(projects, track),
    [projects, track],
  );

  useEffect(() => {
    const trackChanged = prevTrackRef.current !== null && prevTrackRef.current !== track;
    prevTrackRef.current = track;
    if (trackChanged) setWorkspaceMode("project");

    if (filteredFeatured.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (trackChanged) {
      const slug = getDefaultFeaturedSlugForTrack(projects, track);
      setSelectedSlug(slug ?? filteredFeatured[0].slug);
      return;
    }

    setSelectedSlug((prev) => {
      if (prev) {
        const sel = projects.find((p) => p.slug === prev && p.status !== "archived");
        const inFilter =
          sel && (track === "all" || (sel.roleTracks?.includes(track) ?? false));
        if (inFilter) return prev;
        return filteredFeatured[0].slug;
      }
      return filteredFeatured[0].slug;
    });
  }, [track, filteredFeatured, projects, setSelectedSlug, setWorkspaceMode]);

  const selectedProject = useMemo(() => {
    if (selectedSlug) {
      const p = projects.find((x) => x.slug === selectedSlug && x.status !== "archived");
      if (p) return p;
    }
    return filteredFeatured[0] ?? null;
  }, [selectedSlug, projects, filteredFeatured]);

  const trackOptions = useMemo((): { id: ProofTrackFilter; label: string }[] => {
    const labelById: Record<ProofTrackFilter, string> = {
      all: messages.cockpit.allProof,
      frontend: messages.roleTracks.frontend.label,
      fullstack: messages.roleTracks.fullstack.label,
      ai: messages.roleTracks.ai.label,
    };
    return PROOF_TRACK_FILTERS.map((id) => ({ id, label: labelById[id] }));
  }, [messages]);

  const experienceLines = useMemo(() => {
    const mapped = experienceSnapshot.items.map((item) => {
      const loc = messages.experience.items[item.id as keyof typeof messages.experience.items];
      if (!loc) return item;
      return { ...item, title: loc.title, detail: loc.detail };
    });
    return sortExperienceItemsByTrack(mapped, track);
  }, [messages, track]);

  const heroProofTags = useMemo(() => {
    if (track === "all") return site.heroProofTags;
    return messages.cockpit.trackHeroTags[track];
  }, [track, site.heroProofTags, messages]);

  return (
    <>
      <section
        id="hero"
        aria-label={messages.cockpit.proofCockpitAria}
        className="relative scroll-mt-24 border-b border-border bg-page"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full min-w-0 max-w-[var(--cockpit-hero-stage-max-width)] px-4 pb-10 pt-12 md:px-5 md:pb-14 md:pt-12 lg:pb-16 lg:pt-14">
          <div className="mb-8 min-w-0 rounded-2xl border border-border/80 bg-card-muted/35 p-3 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-card-muted/25 md:p-4">
            <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle md:text-[11px]">
              {messages.nav.sectionSwitcherCaption}
            </p>
            <SectionPrimaryNav layout="cockpit" className="min-w-0" />
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <div className="flex gap-5">
                <ProfileIdentityExpandable site={site} />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent md:text-xs">
                    {site.headlineRole}
                  </p>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-fg md:text-4xl lg:text-5xl">{site.name}</h1>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm leading-snug text-muted md:text-base">
                {site.heroSummaryLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {heroProofTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card/90 px-2.5 py-0.5 text-[11px] font-semibold text-fg backdrop-blur-sm dark:border-border-strong/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
                  {messages.cockpit.reviewerTrack}
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label={messages.cockpit.reviewerTrack}
                >
                  {trackOptions.map(({ id, label }) => {
                    const Icon = trackIcons[id];
                    const active = track === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTrack(id)}
                        aria-pressed={active}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-semibold shadow-sm transition-colors active:scale-[0.99] md:px-3.5 md:py-2.5 md:text-sm ${FOCUS_RING} ${
                          active
                            ? "border-accent/60 bg-accent/18 text-fg ring-2 ring-accent/40 dark:bg-accent/22"
                            : "border-border bg-card-muted/70 text-muted hover:border-border-strong hover:bg-card hover:text-fg dark:border-border/60"
                        }`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 shrink-0 md:h-4 md:w-4 ${active ? "text-accent" : "opacity-85"}`}
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span className="max-w-[10rem] truncate sm:max-w-none">{label}</span>
                      </button>
                    );
                  })}
                </div>
                {track !== "all" ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {messages.roleTracks[track].emphasisTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/40 bg-accent/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent dark:bg-accent/18"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
                  {messages.cockpit.flagship}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {flagshipList.map((p) => {
                    const active = selectedSlug === p.slug;
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedSlug(p.slug)}
                          aria-pressed={active}
                          className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors active:scale-[0.99] md:text-sm ${FOCUS_RING} ${
                            active
                              ? "border-accent/50 bg-accent/15 text-accent"
                              : "border-border-strong bg-card text-fg hover:border-accent/30"
                          }`}
                        >
                          {p.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card-muted/40 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-fg/70 dark:text-fg/75">
                  {messages.cockpit.experience}
                </p>
                <ul className="mt-2 space-y-2">
                  {experienceLines.map((item) => (
                    <li key={item.id} className="text-xs leading-snug text-muted md:text-sm">
                      <span className="font-medium text-fg">{item.title}</span>
                      <span className="text-subtle"> — </span>
                      {item.detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
                <DocumentDownloadLauncher />
                <button
                  type="button"
                  onClick={() => setTestimonialsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-3 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent/40 md:px-4 md:text-sm"
                >
                  <MessageSquareQuote className="h-3.5 w-3.5 text-muted md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
                  {messages.cockpit.testimonials}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent md:text-sm"
                >
                  <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {messages.cockpit.github}
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent md:text-sm"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {messages.cockpit.linkedin}
                </a>
                <button
                  type="button"
                  onClick={() => setShell("contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent md:text-sm"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {messages.cockpit.contact}
                </button>
              </div>

              <p className="mt-6 text-[11px] text-subtle md:text-xs">
                {site.location} · {site.availability}
              </p>
            </div>

            <div className="flex min-h-0 min-w-0 flex-col lg:col-span-7 lg:min-h-[min(640px,80svh)]">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent md:text-xs">
                {messages.cockpit.proofPanel}
              </p>
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <motion.div
                  key={`${track}-${selectedProject?.slug ?? "none"}`}
                  initial={{ opacity: 0.88 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.22 }}
                  className="flex min-h-0 min-w-0 flex-1 flex-col"
                >
                  <ProofWorkspaceSurface
                    project={selectedProject}
                    lensBlurb={lensBlurb}
                    techStack={techStack}
                    journeyData={journeyData}
                    achievements={achievements}
                    site={site}
                    track={track}
                  />
                </motion.div>
                <CockpitCredibilityStrip site={site} projects={projects} track={track} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsModal />
    </>
  );
}
