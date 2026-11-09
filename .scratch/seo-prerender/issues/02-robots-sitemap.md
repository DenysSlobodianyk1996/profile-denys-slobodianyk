# 02 — robots.txt + sitemap.xml

**Blocked by:** 01 (uses the canonical origin from `src/static/seo.ts`)

## Tasks
- In the same Vite plugin (`generateBundle` / `closeBundle`), emit:
  - `robots.txt`: allow all, plus a `Sitemap:` line with the absolute sitemap URL;
  - `sitemap.xml`: one `<url>` per `NAVIGATION_ITEMS` path, absolute and with a trailing slash as GitHub Pages serves it, plus a build-date `lastmod`.
- Note: GitHub Pages serves the project at a sub-path, so Google reads robots.txt only at the domain root, which this site doesn't control. The sitemap still works when submitted through Search Console (ticket 05).

## Done when
- `dist/robots.txt` and `dist/sitemap.xml` exist with the correct absolute URLs.
