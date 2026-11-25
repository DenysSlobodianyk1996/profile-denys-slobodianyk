# 09: Set up Search Console and Bing (human step)

**What to build:** The site is verified in Google Search Console and Bing Webmaster Tools, the sitemap is submitted to both, and the three routes are queued for indexing. Without this, crawlers never find the sitemap, because the sub-path robots.txt is ignored.

**Blocked by:** 07, deployed to `main`.

**Status:** done (2026-11-25; Google only, Bing skipped by choice)

- [x] In Search Console, a URL-prefix property is added for the site's sub-path URL with the "HTML tag" method; the token is set in `src/static/seo.ts` (shipped in PR #8) and ownership is verified
- [x] `sitemap.xml` is submitted in Search Console. The home page was already indexed; `/skills/` and `/work-timeline/` were sent for indexing
- [x] ~~Import into Bing Webmaster Tools and submit the sitemap~~: skipped by Denys. IndexNow already notifies Bing on every deploy (HTTP 202 on the first run), so Bing should crawl the pages anyway. It can be added later via "Import from Google Search Console"; leave `SEO_BING_SITE_VERIFICATION` empty until then
- [x] ~~Bookmark Bing's "AI Performance" report~~: not applicable without a Bing account; the monthly ChatGPT check (question 1) covers measurement
