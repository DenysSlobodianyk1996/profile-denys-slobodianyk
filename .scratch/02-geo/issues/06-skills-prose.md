# 06: Text on the skills page

**What to build:** Each framework tab on the skills page (at least Angular, React and Vue) opens with 1–2 sentences on what Denys built with that framework. Pull concrete facts from the work timeline, such as the Angular 9 → 21 and 8 → 16 upgrades, the RxJS → Signals move, and the React JSX → TSX migration. The text lives in the skills JSON, so the page gets real prose rather than only chip labels.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] Each framework tab shows its description above the skill chips; tabs without one render as before
- [x] Descriptions match the seniority levels in the positioning (Angular senior, React middle, Vue junior) and only state facts found in the work timeline
- [x] The JSON-LD `knowsAbout` list is unchanged (the build plugin reads the same JSON)
- [x] `npm run build` passes, and the prerendered skills page HTML contains the text for the default (Angular) tab
- [x] `npm run type-check` and `npm run lint` pass
