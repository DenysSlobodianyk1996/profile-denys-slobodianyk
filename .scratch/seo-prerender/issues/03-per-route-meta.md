# 03 — Per-route title and description at runtime

**Blocked by:** 01

## Tasks
- Replace the `useHead` block in `src/App.vue` with route-driven head: title, description, canonical, `og:title`, `og:description` and `og:url` taken from `seo.ts` for the current route name. Use `@vueuse/head` (already installed).
- Titles look like: `Skills — Angular, RxJS, NgRx, Signals | Denys Slobodianyk`.
- Keep the tab `<title>` in English. The UI i18n doesn't affect SEO copy.

## Done when
- Navigating between routes in `npm run dev` updates `document.title`, the description and the canonical.
- `npm run type-check` and `npm run lint` pass.
