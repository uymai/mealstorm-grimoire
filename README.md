# Mealstorm Grimoire

A collection of recipes to help me keep my stuff together — an installable, offline-capable recipe browser built with Next.js.

Migrated from the recipes feature of [uymai/home](https://github.com/uymai/home).

## Features

- Search and tag-filter across all recipes
- "Recipe of the Moment" spotlight
- Full-screen recipe detail view with a pinned "cook mode" queue
- Screen Wake Lock while a recipe is open, so the screen doesn't sleep mid-cook
- Copy recipe as Markdown or copy a shareable link (`/?recipe=<slug>`)
- Installable PWA with offline support (service worker caches the app shell and recipe data)

## Commands

```bash
npm install         # Install dependencies
npm run dev          # Start dev server (Turbopack)
npm run build        # Run tests then build for production
npm run start         # Start production server
npm run test          # Run Vitest tests (also runs before build)
npm run test:watch    # Watch mode tests
npm run lint           # ESLint
```

## Architecture

- `app/page.tsx` — the recipe browser (search, filtering, detail modal, cook-mode queue)
- `app/api/recipes/route.ts` — API route serving all recipes as JSON
- `lib/recipes.ts` — recipe loader and schema validator
- `data/recipes/*.json` — recipe data, one file per recipe (source of truth)
- `public/manifest.json`, `public/sw.js` — PWA manifest and service worker
- `test/` — Vitest tests for the recipe loader/validator
- `skills/recipe-dev/` — Claude Code skill documenting the recipe contribution workflow

## Adding a recipe

See `data/recipes/README.md` for the JSON schema and tag vocabulary, or use the `recipe-dev` Claude Code skill.
