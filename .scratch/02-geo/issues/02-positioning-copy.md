# 02: Positioning in the SEO copy and position list

**What to build:** Every route's title, description and keywords, and the position list on the home page, present the agreed positioning: Senior Angular Developer → Senior Frontend Developer → Middle React Developer → Junior Vue Developer. Crawlers and visitors see the same titles in the same order.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] The home page's position list shows the four titles in positioning order
- [ ] Route titles and descriptions lead with "Senior Angular Developer" and mention the React and Vue levels where relevant; no "Middle Angular"
- [ ] The keyword list adds "Middle React developer" and "Junior Vue developer" without repeating near-duplicate terms (no keyword stuffing)
- [ ] The JSON-LD `jobTitle` still reads "Senior Angular Developer"
- [ ] `npm run build` passes; the prerendered HTML for all three routes carries the new titles and descriptions
- [ ] `npm run lint` passes
