# 03: Per-route title and description at runtime

**What to build:** Each route sets its own title, description, canonical and Open Graph tags at runtime, from the same SEO source as the build.

**Blocked by:** 01.

**Status:** done (shipped in PR #5)

- [x] The `useHead` block in `App.vue` is route-driven (served through the `virtual:seo` module), with unknown routes falling back to the home copy
- [x] Titles follow the pattern `Skills — Angular, RxJS, Signals, NgRx | Denys Slobodianyk` (live on `/skills/`)
- [x] The tab `<title>` stays English; UI i18n doesn't affect SEO copy
- [x] `npm run type-check` and `npm run lint` pass
