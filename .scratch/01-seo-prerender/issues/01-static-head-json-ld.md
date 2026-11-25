# 01 — Static head + JSON-LD baked into index.html

**Blocked by:** none

## What
Make `dist/index.html` carry full SEO markup without JavaScript.

## Tasks
- Create `src/static/seo.ts` as the single source for: the canonical origin, site title, Angular-first description, keywords, and per-route `{ title, description }` keyed by `NAVIGATION_ITEMS` id. Use type-only or relative imports so `vite.config.mts` can import it.
- Add a Vite plugin (inline in `vite.config.mts`, or `build/seo-plugin.ts`) using `transformIndexHtml`. It should:
  - read `public/data/personal-info.json` and `skills.json`;
  - inject title, description, keywords, `<link rel="canonical">`, OG tags with `property=` (absolute `og:url`, absolute `og:image` → `/data/foto.png`), and a Twitter `summary` card;
  - inject a JSON-LD `Person`: name, `jobTitle` "Senior Angular Developer", `knowsAbout` (all skills, deduped), `address` (Bila Tserkva, Ukraine), `email`, `sameAs` (LinkedIn, GitHub), `image`, `url`.
- Fix the favicon href in `index.html` so it respects the base path.
- Remove the hardcoded title, description and keywords from `src/App.vue`. Ticket 03 takes over the runtime head.

## Done when
- `npm run build` passes, and `dist/index.html` contains the tags above with absolute URLs.
- The JSON-LD validates at https://validator.schema.org.
