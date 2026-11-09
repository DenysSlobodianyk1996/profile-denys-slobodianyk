# SEO: static head + prerendered routes

## Problem

The site is a client-rendered SPA on GitHub Pages. What crawlers get today:

- `index.html` contains only `<title>Denys Slobodianyk Profile</title>` and an empty `#app`. Every meta tag is injected by `useHead` in `src/App.vue` at runtime, so crawlers and link previewers that don't run JS (LinkedIn, Telegram, Slack, Facebook) see nothing.
- Deep links (`/skills`, `/work-timeline`) are served from `dist/404.html`, so GitHub Pages answers them with **HTTP 404**. Google does not index 404 responses.
- The OG tags use `name="og:*"` instead of `property="og:*"`, `og:url` is the relative base path, and there is no canonical link.
- `index.html` points the favicon at `/favicon.ico`, which skips the `/profile-denys-slobodianyk` base path.
- There is no `robots.txt`, `sitemap.xml`, or JSON-LD structured data.

## Goal

Rank for searches such as "Angular developer", "Senior Angular developer Ukraine", and "remote Angular frontend engineer", and show proper link previews when the site is shared.

## Decisions (settled in grilling, 2026-11-09)

| # | Decision | Choice |
|---|----------|--------|
| Q1 | Depth | Static `<head>` **and** prerender every route to real HTML |
| Q2 | Canonical origin | `https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/` (no custom domain) |
| Q3 | Positioning | Angular first: "Senior Angular Developer", then Frontend Engineer, TypeScript, RxJS, NgRx and Signals. React and Vue come second. "Remote, Ukraine" |
| Q4 | Per-page meta | Each route gets its own title and description |
| Q5 | Prerender tool | Post-build Node script: `vite preview` + Playwright (Chromium). Not vite-ssg, which would need SSR-safe refactors |
| Q6 | Theme/locale flash | Accepted. The prerender uses the default theme and English, and Vue re-renders on load |
| Q7 | JSON-LD contact | Email, LinkedIn and GitHub (`sameAs`). No phone |
| Q8 | Search Console | The user verifies the site and submits the sitemap. The plan includes a slot for the verification file |

## Approach

1. **Build-time head.** A small Vite plugin in `vite.config.mts` (`transformIndexHtml`) reads `public/data/*.json` and writes these into `index.html`: title, description, keywords, canonical, OG (`property=`), Twitter card, and a JSON-LD `Person` (`jobTitle`, `knowsAbout` built from every skill in `skills.json`, `address` Ukraine, `sameAs`, `email`, `image`). The SEO copy lives in one module, e.g. `src/static/seo.ts`, so the plugin and the runtime share it. This also removes the hardcoded strings in `App.vue`.
2. **Runtime head.** Swap the `useHead` block in `App.vue` for per-route meta driven by `route.meta` (title and description per `NAVIGATION_ITEMS` id), using the same `seo.ts` source.
3. **robots.txt + sitemap.xml.** Generated at build from `NAVIGATION_ITEMS` paths and the canonical origin.
4. **Prerender.** `scripts/prerender.mjs` starts `vite preview`, opens each route in Chromium, waits for the data to load (network idle + `#app` content), and writes `dist/index.html`, `dist/skills/index.html` and `dist/work-timeline/index.html`. GitHub Pages then returns 200 for those paths. `404.html` stays as the fallback for unknown paths.
5. **CI.** Add `npx playwright install --with-deps chromium` to `.github/workflows/deployment-pipeline.yml` before the build.

## Constraints and caveats

- Asset and data URLs must keep using `import.meta.env.BASE_URL`, which has no trailing slash (see CLAUDE.md).
- The Skills page renders only the active tab (Angular by default), so the prerendered `/skills` HTML holds Angular content only. The other skills reach crawlers through JSON-LD `knowsAbout` and the page description. Hiding text for crawlers only would count as cloaking, so don't.
- Vue mounts with `createApp` (no hydration), so it replaces the prerendered markup. That is fine.
- The `ua` locale is UI-only, so there is no `hreflang`.
- There are no tests. Check with `npm run type-check`, `npm run lint`, `npm run build`, and by inspecting `dist/**/index.html`.

## Tickets

Work them in order, blockers first. See `issues/`.
