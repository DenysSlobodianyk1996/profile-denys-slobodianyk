# 04: Prerender routes with Playwright

**What to build:** Every route is served as real HTML with HTTP 200, so search engines index it instead of getting the SPA's 404 fallback.

**Blocked by:** 01, 03 (prerender captures the per-route head).

**Status:** done (shipped in PR #5)

- [x] `playwright` is a devDependency
- [x] `scripts/prerender.mjs` starts `vite preview`, renders each route in Chromium, writes `dist/<route>/index.html`, and exits non-zero on failure
- [x] `npm run build` copies `404.html` before prerendering, so the fallback stays the empty shell
- [x] The deploy workflow installs Chromium before the build
- [x] `dist/skills/index.html` and `dist/work-timeline/index.html` contain real page text and the per-route title
- [x] After deploy, `/`, `/skills/` and `/work-timeline/` return 200, and an unknown path returns 404 (live check, 2026-11-25)
