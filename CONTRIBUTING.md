# Contributing

This repository is a **personal portfolio**. External contributions are **optional** and accepted when they are small, clear, and easy to review.

## Before you open a PR

- **Open an issue first** for non-trivial changes (behavior, structure, or large refactors) so the owner can confirm direction.
- **One topic per PR** (e.g. fix a typo, update a dependency, or one UI improvement)—avoid mixing unrelated edits.
- **Match the existing code style**: TypeScript strictness, component patterns, Tailwind + semantic tokens (`text-fg`, `border-border`, `theme-tokens.css`), and i18n (all user-visible strings in `src/messages/`, with **ko** / **uz** when adding English copy).

## Local checks

From the repository root (Node 20):

```bash
npm install
npm run lint
npm run tsc
npm run build
```

Fix **lint and typecheck** failures before submitting. A failing `build` is only acceptable if you document an environment-specific blocker in the PR.

## Content and accuracy

- Do not **invent** metrics, clients, or employment history. Project and site text should stay truthful to what the owner can verify.
- **Locale changes**: if you add or change keys in `src/messages/en.ts`, add matching entries to **`ko.ts`** and **`uz.ts`** (or note clearly that localization is follow-up work).

## What this repo is not

- It is not a product with SLAs, release trains, or paid support.
- Drive-by refactors, broad dependency upgrades without motivation, and “cleanup” that touches many files without an agreed issue are likely to be declined.

## Questions

For small questions, open a **Discussion** (if enabled) or an **issue** with a concrete question. For **security issues**, use **SECURITY.md**—do not file public issues with exploit details.
