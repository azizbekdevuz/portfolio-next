/**
 * Resume and portfolio PDFs — three reviewer lenses.
 * Set href to a public path (e.g. `/downloads/resume-fullstack.pdf`) when files exist.
 * Filenames are used for the `download` attribute when href is set.
 * UI labels live in `messages.downloads` per locale.
 */
export type DownloadLens = "fullstack" | "frontend" | "backend";

export const resumeDownloads: Record<DownloadLens, { filename: string; href: string | null }> = {
  fullstack: {
    filename: "Azizbek-Arzikulov-Resume-FullStack.pdf",
    href: null,
  },
  frontend: {
    filename: "Azizbek-Arzikulov-Resume-Frontend.pdf",
    href: null,
  },
  backend: {
    filename: "Azizbek-Arzikulov-Resume-Backend.pdf",
    href: null,
  },
};

export const portfolioDownloads: Record<DownloadLens, { filename: string; href: string | null }> = {
  fullstack: {
    filename: "Azizbek-Arzikulov-Portfolio-FullStack.pdf",
    href: null,
  },
  frontend: {
    filename: "Azizbek-Arzikulov-Portfolio-Frontend.pdf",
    href: null,
  },
  backend: {
    filename: "Azizbek-Arzikulov-Portfolio-Backend.pdf",
    href: null,
  },
};

export const DOWNLOAD_LENSES: DownloadLens[] = ["fullstack", "frontend", "backend"];
