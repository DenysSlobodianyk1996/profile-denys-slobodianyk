# AI visibility: decisions (grilling, 2026-11-25)

Sources: `research.md` (primary-source findings), `testimonials.md` (LinkedIn quotes), `/GLOSSARY.md` (terms).

## Goal
Raise AI visibility for narrower questions first ("senior Angular developer, Ukraine, remote"). Generic "top N worldwide" lists are a long-term goal that depends on off-site mentions; site changes alone won't get there (research §5).

## Positioning
Senior Angular Developer → Senior Frontend Developer → Middle React Developer → Junior Vue Developer. Used word for word on the site, in the structured data and on every off-site profile. No "Middle Angular".

## On-site changes (this repo)
1. **Home page bio**: a visible `<h1>` "Denys Slobodianyk: Senior Angular Developer" plus this approved bio, stored as data in `personal-info.json` with a model update:
   > Senior Angular developer with 8+ years of commercial frontend experience, working with every Angular version from 5 to 21. Led two production upgrades: Angular 9 → 21 on a retail forecasting platform, and 8 → 16 on an employee-assessment CRM he built from scratch. Currently moving a sales CRM from RxJS to Signals. Key frontend developer on long-running projects for US clients: mentoring, organising releases, estimates, and direct English communication with product owners and designers. Also works with React (middle level) and Vue (junior level). Remote, based in Kyiv region, Ukraine.
2. **Testimonials**: 1–2 sentence excerpts of whole sentences, quoted exactly, from Oleksandr Baliev, Pavlo Tyshchenko, Anna Tymofieieva and Victor Medeiros (`testimonials.md`). Show name, role and company, plus a "Read on LinkedIn" link to the recommendations page. Stored as data.
3. **Education, visible on the page**: VNTU (Vinnytsia National Technical University), Software Engineering, bachelor's and master's with honors (5.0), 2013–2019.
4. **Structured data**: wrap the existing Person JSON-LD in `ProfilePage` (`mainEntity` Person with `@id`), and add `description` (the bio), `alumniOf` VNTU, `knowsLanguage`, `dateModified`, and `sameAs` (LinkedIn, GitHub). Only facts that are also visible on the page.
5. **Verification meta tags** for Google Search Console and Bing, emitted by `build/seo-plugin.ts` from constants in `src/static/seo.ts`. Left out until Denys supplies the tokens.
6. **IndexNow**: a key file in `public/` and a post-deploy step in `.github/workflows/deployment-pipeline.yml` that submits the sitemap URLs with `keyLocation` under the sub-path.
7. **`/skills`**: 1–2 sentences per framework tab about what was built with it.
8. **SEO copy** in `src/static/seo.ts`: align titles and keywords with the positioning and add Middle React and Junior Vue. No keyword stuffing.
9. **robots.txt**: unchanged, plus a code comment that it has no effect on a sub-path site (the host-root 404 means everything is allowed).
10. Each new UI string gets keys in both `en.ts` and `ua.ts`.

Not doing: llms.txt, a custom domain, a `DenysSlobodianyk1996.github.io` root repo, a Wikidata item, an articles section.

## Off-site checklist (Denys)
- [ ] Add the site to Google Search Console as a URL-prefix property on the sub-path. Verify with the meta tag, submit `sitemap.xml`, and request indexing of the 3 URLs.
- [ ] Import the site into Bing Webmaster Tools and submit the sitemap there too.
- [ ] Make the LinkedIn headline and About section match the positioning word for word.
- [ ] Add a GitHub profile README that mirrors the bio and links to the site, and pin the best Angular repos.
- [ ] Write a dev.to post on the Angular 9 → 21 migration, with numbers, linking back to the site.
- [ ] Optionally tell the four recommenders that you quote them.
- [ ] Longer term: talks and meetups, open-source credits, other independent mentions.

## Prompt panel (run monthly in ChatGPT, Perplexity, Gemini and Claude; log in `.scratch/geo/panel-YYYY-MM.md`)
1. Top senior Angular developers in Ukraine
2. Recommend a remote senior Angular developer to hire
3. Top senior frontend developers from Ukraine open to remote work
4. Angular developers experienced in migrating Angular 9 → 21 / RxJS → Signals
5. Top 10 senior Angular developers (stretch goal)
6. Middle React developer from Ukraine, remote
7. Junior Vue developer from Ukraine, remote
8. Freelance senior Angular developer, Eastern Europe

For each run, record whether Denys is named, his position in the list, and which sources the AI cited. Also check Bing Webmaster Tools' "AI Performance" report.
