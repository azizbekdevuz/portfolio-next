"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectUnavailable from "./ProjectUnavailable";
import { useI18n } from "@/components/i18n/I18nProvider";

const EMBED_CACHE_PREFIX = "live-embed:";
const EMBED_CACHE_TTL_MS = 60 * 60 * 1000;

function readEmbedCache(url: string, origin: string): boolean | null | undefined {
  if (typeof sessionStorage === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(EMBED_CACHE_PREFIX + url + "|" + origin);
    if (!raw) return undefined;
    const { v, t } = JSON.parse(raw) as { v: boolean | null; t: number };
    if (Date.now() - t > EMBED_CACHE_TTL_MS) return undefined;
    return v;
  } catch {
    return undefined;
  }
}

function writeEmbedCache(url: string, origin: string, value: boolean | null) {
  try {
    sessionStorage.setItem(
      EMBED_CACHE_PREFIX + url + "|" + origin,
      JSON.stringify({ v: value, t: Date.now() }),
    );
  } catch {
    /* private mode / quota */
  }
}

interface ProjectPreviewProps {
  liveLink?: string;
  title: string;
  /** Data override: never iframe (e.g. meta-only CSP or odd CORP/COEP cases). */
  forceExternalOnly?: boolean;
}

export default function ProjectPreview({
  liveLink,
  title,
  forceExternalOnly = false,
}: ProjectPreviewProps) {
  const { messages } = useI18n();
  const pv = messages.projectPreview;
  const [isLoading, setIsLoading] = useState(true);
  const [embedAllowed, setEmbedAllowed] = useState<boolean | null>(null);
  const [checkDone, setCheckDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const runEmbedCheck = useCallback(async (url: string) => {
    if (forceExternalOnly) {
      setEmbedAllowed(false);
      setCheckDone(true);
      setIsLoading(false);
      return;
    }

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const cached = readEmbedCache(url, origin);
    if (cached !== undefined) {
      setEmbedAllowed(cached === true ? true : cached === false ? false : null);
      setCheckDone(true);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/live-embed-check?url=${encodeURIComponent(url)}&origin=${encodeURIComponent(origin)}`,
      );
      if (!res.ok) {
        setEmbedAllowed(null);
        writeEmbedCache(url, origin, null);
        setCheckDone(true);
        setIsLoading(false);
        return;
      }
      const data = (await res.json()) as { embeddable?: boolean | null };
      const next =
        data.embeddable === true ? true : data.embeddable === false ? false : null;
      setEmbedAllowed(next);
      writeEmbedCache(url, origin, next);
    } catch {
      setEmbedAllowed(null);
    } finally {
      setCheckDone(true);
      setIsLoading(false);
    }
  }, [forceExternalOnly]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!liveLink || !isMounted) return;

    setIsLoading(true);
    setCheckDone(false);
    setEmbedAllowed(null);
    void runEmbedCheck(liveLink);
  }, [liveLink, isMounted, runEmbedCheck]);

  const showIframe = embedAllowed !== false && checkDone;
  const showBlockedPanel = embedAllowed === false && checkDone;

  if (!isMounted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card-muted/35"
      >
        <span className="sr-only">{pv.loadingPreview}</span>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-[0.12] dark:opacity-[0.18]"
          aria-hidden
        />
        <div
          className="absolute inset-[10%] rounded-md border border-border/70 bg-page/50 dark:bg-card-muted/25"
          aria-hidden
        />
        <div className="absolute bottom-3 left-3 right-3 h-2 rounded bg-card-muted/60 dark:bg-card-muted/50" aria-hidden />
      </div>
    );
  }

  if (!liveLink) {
    return <ProjectUnavailable />;
  }

  const openHref = liveLink;
  const openLabel = pv.openLiveAria.replace("{title}", title);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border bg-card-muted/30">
      <div className="absolute right-2 top-2 z-20">
        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={openLabel}
          title={openLabel}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card/95 text-fg shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
        </a>
      </div>

      <AnimatePresence>
        {isLoading && !checkDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-page/85 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="font-mono text-xs text-muted">{pv.checkingEmbed}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBlockedPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[15] flex items-center justify-center bg-gradient-to-b from-page/95 via-card-muted/90 to-page/95 p-6 text-center backdrop-blur-sm"
          >
            <div className="max-w-sm space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card-muted/80 text-muted">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-fg">{pv.blockedTitle}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{pv.blockedBody}</p>
              </div>
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-blue-500 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20 transition-[filter] hover:brightness-110"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                {pv.openLiveSite}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showIframe && (
        <iframe
          src={liveLink}
          title={pv.livePreviewTitle.replace("{title}", title)}
          className="h-full w-full bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}
