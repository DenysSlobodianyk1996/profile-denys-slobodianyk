# 09: Set up Search Console and Bing (human step)

**What to build:** The site is verified in Google Search Console and Bing Webmaster Tools, the sitemap is submitted to both, and the three routes are queued for indexing. Without this, crawlers never find the sitemap, because the sub-path robots.txt is ignored.

**Blocked by:** 07, deployed to `main`.

**Status:** ready-for-human

- [ ] In Search Console, a URL-prefix property is added for the site's sub-path URL, using the "HTML tag" verification method; the token is handed to the agent to set as a constant, then deployed and verified
- [ ] `sitemap.xml` is submitted in Search Console, and "Request indexing" is clicked for all 3 URLs under URL Inspection
- [ ] The site is imported into Bing Webmaster Tools from Search Console (or verified there with its own meta tag), and the sitemap is submitted
- [ ] Bing's "AI Performance" report is bookmarked for the monthly prompt-panel check
