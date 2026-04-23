# portfolio-next

Personal engineering portfolio: **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**. The UI is a **single-page home** with a **shell** that switches between a **proof cockpit** (hero) and **full-height section panels** (projects, about, skills, contact, in-progress).

The app is **not** a generic template: routing, i18n, theme, and copy are tailored to this codebase.

## What it does

- **Localized UI** for `en`, `ko`, and `uz` under `/{locale}`; middleware negotiates locale and sets `html` `lang` via a request header.
- **Home shell**: `cockpit` shows the **proof cockpit** (identity, reviewer tracks, flagship projects, proof workspace). Other `shell` values mount **depth panels** in a bounded viewport (`ViewportPanel`) for projects, about, skills, contact, and roadmap.
- **Reviewer tracks** filter and re-weight flagship proof (lens summaries, tags, default selection) without a second app.
- **Theme**: `ThemeScript` runs before paint; `ThemeProvider` syncs preference, system scheme, and `document.documentElement` / `theme-color` on the client.
- **Background (global ambient)**: `BackgroundGradient` (`src/components/ui/BackgroundGradient.tsx`) mounts in `DeviceShellBody` as **`fixed inset-0 z-0`**, below shell `z-10`. The visual system is the **data-plane** stack in `src/app/ambient-background.css`: **linear depth** (not radial-blob wash), **dual-offset axial lattice**, **sparse nodal glints**, **diagonal scan traces**, a **horizon band**, and **edge vignette** — tuned per theme via **`--ambient-*`** tokens in `theme-tokens.css`. Motion is **CSS-only** on desktop (slow `background-position` / `transform` drift); **mobile** and **`prefers-reduced-motion`** keep the same structure **without** long-running animation. Desktop shell **rails** / depth **panel headers** stay slightly translucent so the field reads through blur without changing cards or layout.
- **Loading / skeletons**: `src/app/[locale]/loading.tsx` streams `HomeRouteLoading`; home section chunks use `next/dynamic` in `src/components/HomeContext.tsx` with layout-aligned skeletons under `src/components/skeletons/` (including `CockpitStageSkeleton`, `ProjectsIdeSkeleton`, and `SectionSkeletons.tsx`).
- **Content**: project and site data live in `src/content/` as TypeScript modules; non-English pages merge **localized overrides** from `src/messages/overrides/` where present. Document downloads are driven from content (`src/content/downloads.ts`) and the cockpit `DocumentDownloadLauncher` UI.

## Stack (from `package.json`)

| Area | Technology |
|------|------------|
| Runtime | Node **20.x** (see `engines`) |
| Framework | **Next.js 15**, **React 18** |
| Styling | **Tailwind CSS** 3, semantic tokens in `src/app/theme-tokens.css` and `globals.css` |
| Motion | **Framer Motion** |
| Icons | **lucide-react** |
| Email (contact) | **EmailJS** (public env keys) |
| Analytics (optional) | **@vercel/analytics**, **@vercel/speed-insights** |

**Not used in the current UI stack:** Three.js / React Three Fiber (older README references are obsolete).

**Optional / tooling (not required to run the static portfolio UI):**

- **MongoDB** client in `src/libs/mongodb.ts` — used by **scripts** (e.g. `src/scripts/setupIndexes.ts`), not the main `/{locale}` render path.
- **Redis** helpers in `src/libs/redis.ts` — optional caching; defaults to `localhost` if `REDIS_URL` is unset.

## Repository layout (concise)

```
src/app/              # Root layout, global CSS, theme tokens; App Router under [locale]/
src/components/       # UI: sections, shell, cockpit, i18n, navigation
src/content/          # Site and project data (and merge helpers)
src/i18n/             # Locale config and Accept-Language negotiation
src/messages/         # UI strings (en/ko/uz) and localized overrides
src/lib/              # Small shared utilities (nav, theme, proof state, locale persistence, etc.)
src/middleware.ts     # Locale redirect, static asset rules, cache headers
```

## Requirements

- **Node.js 20** (see `package.json` `engines`).

## Local development

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
```

Edit `.env.local` with real values. Keys in `.env.example` are the ones the app expects for **EmailJS** (contact) and any **MongoDB** usage you enable for scripts. Do not commit `.env.local`.

```bash
npm run dev
```

The dev server defaults to [http://localhost:3000](http://localhost:3000). Requests without a locale prefix are handled by **middleware** (redirect to a negotiated `/{locale}`).

### Quality commands

```bash
npm run lint
npm run tsc
npm run build
```

## Build and deployment

```bash
npm run build
npm run start
```

Deploy as a standard **Next.js** app (e.g. **Vercel**). `next.config.ts` enables CSS and import optimizations; production source maps are disabled.

## i18n behavior (short)

- Supported locales: **`en`**, **`ko`**, **`uz`** (`src/i18n/config.ts`).
- **Cookie** `PORTFOLIO_LOCALE` stores an explicit user choice; otherwise **Accept-Language** is used.
- **Locale switch** in the UI preserves shell and proof-related state where implemented (see `src/lib/locale-switch-persistence.ts`).

## License and contributing

See **LICENSE** and **CONTRIBUTING.md**. Security reports: **SECURITY.md**. Code of conduct: **CODE_OF_CONDUCT.md**.

## Disclaimer

This repository is a **personal portfolio**. It is not a product support channel; issues and PRs are welcome on a best-effort basis (see **CONTRIBUTING.md**).
