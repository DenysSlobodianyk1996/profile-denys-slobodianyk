# 02: robots.txt and sitemap.xml

**What to build:** The build emits `robots.txt` and `sitemap.xml` with absolute URLs for every route.

**Blocked by:** 01 (uses the canonical origin from `src/static/seo.ts`).

**Status:** done (shipped in PR #5)

- [x] `robots.txt` allows all and has a `Sitemap:` line with the absolute sitemap URL (live: 200)
- [x] `sitemap.xml` has one `<url>` per route, absolute and with a trailing slash (live: 200)
- [x] ~~Build-date `lastmod`~~: dropped on purpose in b1449e3, because a date that changes on every deploy teaches Google to ignore it
- [x] Noted that GitHub Pages serves the site at a sub-path, so crawlers ignore this robots.txt and the sitemap must be submitted by hand (see ticket 05; confirmed in `02-geo/research.md`)
