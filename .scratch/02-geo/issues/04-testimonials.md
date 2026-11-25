# 04: Testimonials on the home page

**What to build:** Below the bio, the home page shows four short testimonials: 1–2 sentence excerpts quoted exactly from the LinkedIn recommendations of Oleksandr Baliev, Pavlo Tyshchenko, Anna Tymofieieva and Victor Medeiros (full texts in `testimonials.md`). Each shows the person's name, role and company, and the section links to the LinkedIn recommendations page. The testimonials live in the personal-info JSON.

**Blocked by:** 03 (the same page and data file; the edge prevents merge conflicts).

**Status:** done

- [x] Each excerpt is made of whole sentences copied exactly from the source, with "…" marking any cut; no rewording, and typos are left as written
- [x] Each testimonial shows the person's name, role and company (Victor Medeiros has no company in `testimonials.md`, so his caption shows name and role only; `company` is optional in the model)
- [x] A "Read on LinkedIn" link opens the recommendations page in a new tab
- [x] The section heading and link text have keys in both the English and Ukrainian locale files
- [x] Testimonials use semantic quote markup (`<blockquote>` / `<figure>` with `<figcaption>`)
- [x] `npm run build` passes, and the prerendered home page HTML contains all four excerpts
- [x] `npm run type-check` and `npm run lint` pass
