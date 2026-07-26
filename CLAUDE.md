# CLAUDE.md

## Project Overview

Mealstorm Grimoire — a standalone recipe browser PWA built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Migrated from the `/recipes` feature of the `uymai/home` personal homepage repo.

## Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Run tests then build
npm run test       # Run Vitest tests (also runs before build)
npm run test:watch # Watch mode tests
npm run lint       # ESLint
```

## Architecture

- `app/page.tsx` — the recipe browser: search, tag filtering, "Recipe of the Moment", card grid, detail modal, pin-for-cooking queue, Screen Wake Lock.
- `app/types.ts` — `Recipe`, `RecipeMacros`, `RecipeInspiredBy` interfaces.
- `app/api/recipes/route.ts` — API route serving all recipes as JSON (no filtering/business logic — that belongs in the client).
- `app/components/` — `Header`, `Footer`, `ServiceWorkerRegister`.
- `lib/recipes.ts` — recipe loader (`loadRecipesFromDirectory`) and schema validator (`isValidRecipe`).
- `data/recipes/*.json` — recipe data, source of truth. See `data/recipes/README.md` for schema and tags.
- `public/manifest.json`, `public/sw.js` — PWA manifest and hand-rolled service worker (stale-while-revalidate for `/api/recipes`, network-first for navigations, cache-first for static assets/icons).
- `test/` — Vitest tests for the recipe loader/validator.
- `skills/recipe-dev/` — Claude Code skill for the recipe contribution workflow; use it when adding recipes or changing the schema.

## Testing

Tests use Vitest. Run `npm test` before committing. The `prebuild` script runs tests automatically.

## PWA notes

The service worker (`public/sw.js`) is registered client-side via `app/components/ServiceWorkerRegister.tsx`. It precaches the app shell (`/`, manifest, icons) on install and keeps `/api/recipes` fresh with a stale-while-revalidate strategy, so the recipe list remains browsable offline after a first visit. Bump `CACHE_VERSION` in `sw.js` when the cached asset set changes, so old caches get cleaned up on activate.
