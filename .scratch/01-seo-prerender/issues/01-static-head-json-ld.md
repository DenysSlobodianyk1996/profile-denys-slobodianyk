# 01: Static head and JSON-LD baked into index.html

**What to build:** `dist/index.html` carries full SEO markup without JavaScript, so crawlers and link previewers see it.

**Blocked by:** None.

**Status:** done (shipped in PR #5; facts moved to JSON in PR #6)

- [x] `src/static/seo.ts` is the single source of SEO copy (canonical origin, title, description, keywords, per-route title and description), importable from the Vite config
- [x] A Vite plugin (`build/seo-plugin.ts`) reads `personal-info.json` and `skills.json` and injects into the head: title, description, keywords and canonical
- [x] The plugin injects Open Graph tags with `property=`, an absolute `og:url` and `og:image`, and a Twitter `summary` card (live: `og:url` is absolute)
- [x] The plugin injects a JSON-LD `Person`: name, `jobTitle`, `knowsAbout`, `address`, `email`, `sameAs` (LinkedIn, GitHub), `image`, `url` (live: present)
- [x] The favicon href respects the base path (live: `/profile-denys-slobodianyk/favicon.ico`)
- [x] Hardcoded title, description and keywords removed from `App.vue`
- [x] `npm run build` passes, and `dist/index.html` contains the tags with absolute URLs
- [ ] JSON-LD validated at https://validator.schema.org (not recorded; ticket 05 of 02-geo re-checks it)
