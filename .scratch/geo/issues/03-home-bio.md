# 03: Home page heading and bio

**What to build:** The home page opens with a visible main heading, "Denys Slobodianyk: Senior Angular Developer", followed by the agreed bio paragraph (word for word in `decisions.md`). The bio is content, so it lives in the personal-info JSON (a new field and a model update), not in a component.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] The home page has exactly one `<h1>`, containing the name and "Senior Angular Developer"
- [ ] The bio renders from the personal-info data; the page shows nothing broken if the field is missing
- [ ] Any new UI string (e.g. a section label) has keys in both the English and Ukrainian locale files
- [ ] The layout works on mobile and desktop, in light and dark themes
- [ ] `npm run build` passes, and the prerendered home page HTML contains the heading and the full bio text
- [ ] `npm run type-check` and `npm run lint` pass
