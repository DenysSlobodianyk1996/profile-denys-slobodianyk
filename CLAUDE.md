# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working rules

- Follow the existing code style and patterns.
- Use npm for running project commands.
- Keep code in TypeScript unless migration is required.
- Do not commit or push automatically. Leave changes uncommitted in the working tree and commit or push only when explicitly asked.
- Do not work in a git worktree. Make changes directly in the main checkout, on the branch that is currently checked out.

## Commands

```bash
npm run dev          # Vite dev server on http://localhost:4200/profile-denys-slobodianyk
npm run build        # type-check + vite build in parallel, then copies dist/index.html to dist/404.html
npm run build-only   # vite build without type-check
npm run type-check   # vue-tsc --build --force
npm run lint         # eslint (eslint-config-vuetify, TS enabled)
npm run lint:fix
npm run preview      # serve the built dist/
```

There is no test runner and no tests. `npm run type-check` and `npm run lint` are the only automated checks.

## Deployment

Every push to `main` runs `.github/workflows/deployment-pipeline.yml`, which builds and deploys `dist/` to GitHub Pages. There is no staging step, so `main` is production.

Two things exist only because of GitHub Pages hosting:

- `base: '/profile-denys-slobodianyk'` in `vite.config.mts`. The site is served from that sub-path, and the router uses `createWebHistory(import.meta.env.BASE_URL)`.
- The `cp dist/index.html dist/404.html` step in `npm run build`. It is the SPA fallback that makes deep links such as `/skills` work with history-mode routing.

`import.meta.env.BASE_URL` has no trailing slash here, so code builds asset URLs as `` `${BASE_URL}/data/...` ``. Anything in `public/` must be referenced through `BASE_URL`, never by a root-relative path.

## Architecture

A single-page personal profile site: Vue 3 (`<script setup>`, TypeScript), Vuetify 4, Tailwind CSS 4, Pinia, vue-router, vue-i18n. There is no backend.

### Bootstrap

`src/main.ts` creates the app and calls `registerPlugins` from `src/plugins/index.ts`, which installs head, i18n, pinia, router and vuetify. Each plugin is configured in its own file under `src/plugins/`. `src/App.vue` composes the shell from `src/layout/` (header, navigation rail, main with `<router-view>`, footer), sets the SEO/Open Graph meta tags, and persists theme and locale to `localStorage` (keys in `src/static/storage-keys.ts`). The vuetify and i18n plugins read those same keys on startup to restore the choice.

### Content is data, not code

All profile content lives in JSON files in `public/data/` and is fetched at runtime:

1. `src/services/data-service.ts` — an axios instance pointed at `${BASE_URL}/data`, one method per JSON file.
2. `src/stores/data-store.ts` — a single Pinia store (`useDataStore`) holding every dataset, with plain setters.
3. Each page (or `InfoAction.vue` for `used-libs.json`) fetches in `onMounted`, skips the request when the store is already populated, and reads via `storeToRefs`.

The TypeScript shape of each JSON file is declared in that page's `models/` folder (`src/pages/<page>/models/`), and the service and store both import those types.

### Routes and navigation

`src/static/navigation-items.ts` (`NAVIGATION_ITEMS`) is the single source for pages: the router looks up each item by `id` to get its `path` and title, and the navigation rail renders the same array. An item's `title` is an i18n key, not display text. Adding a page means adding an entry there, a route in `src/plugins/router.ts`, and a folder under `src/pages/`.

### Page folders

Each page is a folder under `src/pages/` with the page component, `components/`, `models/`, and `index.ts` barrels that default-export the main component, so pages are imported as `@/pages/skills`. `src/layout/header` and `src/layout/navigation` follow the same barrel pattern. `@` aliases `src/`.

### Styling: Vuetify and Tailwind together

Vuetify components are auto-imported by `vite-plugin-vuetify`; do not import them manually. Vuetify's own utility classes and color pack are turned off (`utilities: false` in `src/plugins/vuetify.ts`, `$utilities: false` / `$color-pack: false` in `src/styles/settings.scss`), so layout and spacing use Tailwind utility classes on Vuetify components.

- `src/styles/layers.css` fixes the CSS cascade-layer order that lets the two libraries coexist: Tailwind utilities sit above Vuetify's components and below `vuetify-final`. Project overrides go in the `vuetify-overrides` layer (`src/styles/main.scss`).
- `src/styles/tailwind.css` maps Tailwind theme colors to Vuetify's `--v-theme-*` variables and defines `light:` / `dark:` variants keyed to Vuetify's theme classes, so theme switching stays driven by Vuetify.
- Breakpoints are declared three times and must stay identical: `display.thresholds` in `src/plugins/vuetify.ts`, `$grid-breakpoints` in `src/styles/settings.scss`, and `--breakpoint-*` in `src/styles/tailwind.css`.

### i18n

Two locales, `en` and `ua`, in `src/plugins/i18n/`. Only UI strings are translated; the JSON content in `public/data/` is English only. The language button cycles through `availableLocales`, so a new locale only needs a file and an entry in `messages`.

## Updating profile content

Most changes to this repo are content updates, and they usually need no component changes:

- Edit the relevant file in `public/data/` (`personal-info.json`, `skills.json`, `work-timeline.json`, `used-libs.json`). If the shape changes, update the matching interface in `src/pages/<page>/models/`.
- `skills.json` is a map: each top-level key becomes a tab, its title derived from the key by splitting on `_` and capitalizing. The `angular` key is selected by default.
- `personal-info.json` entries use the property name `desciption` (spelled that way in the model and the data); a new entry must match it.
- The CV is `public/data/CV_Denys_S_Angular_React_Vue.pdf`. Its filename is hardcoded in `src/layout/header/DownloadCVAction.vue`, so replace the file under the same name or update that path.
- The headline description and keywords used for SEO are hardcoded in `src/App.vue` and are not read from the JSON, so update them alongside a positioning change.
- Any new UI string needs a key in both `src/plugins/i18n/en.ts` and `src/plugins/i18n/ua.ts`.
