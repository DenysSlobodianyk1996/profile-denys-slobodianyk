# 07: Search engine verification tags and a robots.txt note

**What to build:** The build adds the `google-site-verification` and `msvalidate.01` meta tags to the page head whenever their tokens are set as constants beside the other SEO copy, and leaves them out while the tokens are empty. A code comment where robots.txt is generated explains that the file has no effect on a GitHub Pages sub-path site: crawlers only read the host-root robots.txt, which returns 404 there, meaning everything is allowed.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] With empty tokens, the built HTML has no verification tags
- [ ] With a dummy token set locally, the built HTML contains the matching tag on the home page; revert before commit
- [ ] The robots.txt output is unchanged; only the comment is added
- [ ] `npm run build`, `npm run type-check` and `npm run lint` pass
