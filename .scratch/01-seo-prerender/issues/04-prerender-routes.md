# 04 — Prerender routes with Playwright

**Blocked by:** 01, 03 (prerender captures the per-route head)

## Tasks
- Add `playwright` as a devDependency.
- Write `scripts/prerender.mjs`. It should:
  - start `vite preview` on a free port;
  - for each `NAVIGATION_ITEMS` path, open `<origin>/profile-denys-slobodianyk<path>`, wait for network idle and page content, and save `page.content()` to `dist/<path>/index.html` (root → `dist/index.html`);
  - stop the server, and exit non-zero on any failure.
- Update `npm run build`: build → prerender → `cp dist/index.html dist/404.html`. Copy the 404 fallback **before** prerendering overwrites `index.html` with Home content, or decide that a prerendered Home is fine as the 404 body.
- `.github/workflows/deployment-pipeline.yml`: add `npx playwright install --with-deps chromium` before Build.

## Done when
- `dist/skills/index.html` and `dist/work-timeline/index.html` contain real page text and the per-route title.
- `npm run preview` → hard refresh on `/skills` works, and the app becomes interactive.
- After deploy: `curl -I .../profile-denys-slobodianyk/skills/` returns 200.
