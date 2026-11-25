# 05: Structured data: ProfilePage with education

**What to build:** The education entry visibly names the university: Vinnytsia National Technical University (VNTU), Software Engineering, bachelor's and master's with honors (5.0), 2013–2019. The build's JSON-LD becomes a `ProfilePage` whose `mainEntity` is the existing Person, with an `@id`. The Person gains `description` (the home bio), `alumniOf` (VNTU), `knowsLanguage` (English, Ukrainian) and `sameAs` (LinkedIn, GitHub), and the ProfilePage gains `dateModified`. Per Google's structured-data policy, every fact in the markup must also be visible on the page.

**Blocked by:** 03 (the bio supplies the `description`).

**Status:** done

- [x] The education entry on the home page shows the university name and the years
- [x] JSON-LD is a ProfilePage with `mainEntity` Person carrying the properties above; existing `knowsAbout`, address, image and email are kept
- [x] `dateModified` does not change on every build: use a fixed date or the data's last change, not the build time (same reasoning as the sitemap's missing `lastmod`)
- [x] The JSON-LD stays escaped against closing the `<script>` early
- [x] The prerendered home page JSON-LD passes the schema.org validator (validator.schema.org) with no errors
- [x] `npm run build`, `npm run type-check` and `npm run lint` pass
