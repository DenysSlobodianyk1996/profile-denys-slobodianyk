# 08: IndexNow after deploy

**What to build:** After each successful deploy to GitHub Pages, the pipeline submits every sitemap URL to IndexNow (api.indexnow.org), so Bing and Copilot pick up changes quickly. The key file is published with the site under the sub-path, and the request passes `keyLocation` pointing to it, since the host root isn't ours (see the IndexNow section of `research.md`).

**Blocked by:** None (can start immediately).

**Status:** done

- [x] A key file (generated key, 8–128 hex characters) is served from the site sub-path after build
- [x] A post-deploy workflow step POSTs the URL list built from the same route list as the sitemap, with `host`, `key` and `keyLocation`
- [x] A failed IndexNow call logs a warning and doesn't fail the deploy
- [x] The workflow YAML is valid, and the step runs only on pushes to `main` after the deploy job succeeds
- [x] After the first deploy, the step's log shows HTTP 200 or 202: HTTP 202, 3 URLs submitted (run 45645435545, PR #8 merge, 2026-11-25)
