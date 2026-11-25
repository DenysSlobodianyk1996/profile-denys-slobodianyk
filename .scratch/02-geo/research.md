# GEO research: getting this profile into AI-assistant answers

Researched 2026-11-25. Target site: https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/

Each claim carries its source inline. The tags mean:
- **[primary]**: read directly on the owner's page.
- **[snippet]**: seen only in a search-result snippet of the owner's page, because the page itself could not be fetched. Treat these as likely but unverified.
- **[measured]**: checked directly with `curl` on 2026-11-25.
- **[speculative]**: my own inference, with no source behind it.

---

## TL;DR

1. **A model can know about you in two ways: from its training data or from a live search.** Accuracy on a fact depends on how many training documents mention the entity, and models struggle with long-tail entities ([Kandpal et al., ICML 2023](https://arxiv.org/abs/2211.08411); [Mallen et al., ACL 2023](https://arxiv.org/abs/2212.10511)). An individual developer is a long-tail entity, so the realistic route is **retrieval**: ChatGPT search (OAI-SearchBot index plus third-party providers, including Microsoft), Perplexity (PerplexityBot), Claude (Claude-SearchBot), and Gemini / Google AI features (the Google Search index). Retrieval also helps long-tail entities the most ([Mallen et al.](https://arxiv.org/abs/2212.10511)).
2. **Crawling is already allowed.** The `robots.txt` this repo emits sits at the sub-path, and crawlers ignore it. The host root `https://denysslobodianyk1996.github.io/robots.txt` returns **404** [measured]. Under [RFC 9309 §2.3.1.3](https://www.rfc-editor.org/rfc/rfc9309.html) and [Google's docs](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt), a 4xx means "no restrictions", so every bot may crawl. The cost is that the `Sitemap:` line is never discovered, so the sitemap must be submitted by hand.
3. **Google says outright that AI Overviews and AI Mode need nothing special.** No special schema, and no "AI text files" such as llms.txt ([Google: AI features](https://developers.google.com/search/docs/appearance/ai-features)).
4. **No major AI provider documents consuming llms.txt.** The only first-party "consumer" I found is a Lighthouse audit, and it checks the domain root, which this project site cannot write to ([Chrome docs](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)).
5. **Content matters more than markup.** In the GEO paper, adding quotations, statistics and cited sources raised visibility by roughly 30–40%, and keyword stuffing lowered it ([arXiv 2311.09735](https://arxiv.org/html/2311.09735v3)). The live home page has only about 600 characters of visible text and no prose bio [measured]. That is the biggest on-site gap.
6. **Off-site signals probably dominate for a "top N developers" query** [speculative, but consistent with the long-tail papers]. GitHub lets every major AI bot crawl it. LinkedIn blocks GPTBot, ClaudeBot, Claude-SearchBot and PerplexityBot outright, though it allows OAI-SearchBot, Googlebot and Bingbot on `/in/` profiles [measured robots.txt]. A LinkedIn profile is therefore not visible to most AI search bots.
7. **There are official ways to measure.** Google Search Console counts AI Overviews and AI Mode traffic under "Web" ([Google](https://developers.google.com/search/docs/appearance/ai-features)). Bing Webmaster Tools has an "AI Performance" citation report covering Copilot and Bing AI summaries ([Bing blog, Feb 2026](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)). For everything else, use a manual prompt panel.

---

## 1. How each assistant gets its answer, and which crawlers feed it

### Training data compared with live retrieval

- **Models have a knowledge cutoff.** Anthropic publishes a "reliable knowledge cutoff" and a "training data cutoff" for each model; for the current Claude 5.5 models both are Jun 2026 ([Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview)) [primary]. OpenAI and Google list cutoffs on their per-model pages; I did not check specific values.
- **Parametric (training-data) recall of rare entities is weak.** QA accuracy is correlated with, and causally linked to, the number of pre-training documents about the entity. Scaling the model barely helps, while retrieval augmentation "reduces a model's dependence on relevant pre-training information" ([Kandpal et al. 2023](https://arxiv.org/abs/2211.08411)) [primary]. "LMs struggle with less popular factual knowledge", and retrieval-augmented models beat much larger models without retrieval on long-tail entities ([Mallen et al. 2023](https://arxiv.org/abs/2212.10511)) [primary].
- **When does each model search?**
  - **Claude:** it searches for "information about specific organizations, people, or products that might have changed" and for recent events, and answers directly from stable knowledge ([Claude web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)) [primary]. The docs do **not** name the underlying search index.
  - **Gemini, with Grounding with Google Search:** the model "analyzes the prompt and determines if a Google Search can improve the answer", then "automatically generates one or multiple search queries and executes them" ([Gemini API: Google Search grounding](https://aistudio.google.com/docs/google-search)) [primary].
  - **Perplexity:** it works by "searching the web, identifying trusted sources, and synthesizing information" ([Perplexity help](https://www.perplexity.ai/help-center/en/articles/10354917-what-is-an-answer-engine-and-how-does-perplexity-work-as-one)) [primary]. The page does not say whether that is its own index or live search.
  - **ChatGPT:** ChatGPT search "sometimes partners with other search providers", and the provider privacy policies it lists include Microsoft's and Shopify's. ChatGPT rewrites queries before sending them to providers, and "Placement is not guaranteed" ([OpenAI help: ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search)) [primary].
- **The "ChatGPT uses Bing" claim** is primary-sourced only for 2023: Microsoft announced "Bing is coming to ChatGPT as the default search experience" ([Microsoft blog, 2023-05-23](https://blogs.microsoft.com/blog/2023/05/23/microsoft-build-brings-ai-tools-to-the-forefront-for-developers/)) [primary via snippet]. OpenAI's current help page does not name Bing, only "Microsoft" among the provider privacy policies. So Microsoft or Bing is *a* provider, but how far ChatGPT depends on the Bing index today is not documented. Treat it as **partly supported**.

### Crawlers and user agents

| Token | Owner | Feeds | Obeys robots.txt? | Source |
|---|---|---|---|---|
| `OAI-SearchBot` | OpenAI | ChatGPT search results. "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers" | Yes. Changes take about 24 h | [OpenAI bots](https://developers.openai.com/api/docs/bots) [primary] |
| `GPTBot` | OpenAI | Training. Disallowing it means content "should not be used in training generative AI foundation models" | Yes | same |
| `ChatGPT-User` | OpenAI | Fetches made on a user's request. "not used to determine whether content may appear in Search" | "robots.txt rules may not apply" | same |
| `PerplexityBot` | Perplexity | "surface and link websites in search results on Perplexity"; not used for training | Yes. Perplexity recommends allowing it | [Perplexity bots](https://docs.perplexity.ai/guides/bots) [primary] |
| `Perplexity-User` | Perplexity | Fetches made on a user's request | "generally ignores robots.txt rules" | same |
| `ClaudeBot` | Anthropic | Model training | Yes (Crawl-delay is also supported) | [Anthropic crawler FAQ](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) [primary] |
| `Claude-SearchBot` | Anthropic | Search indexing. Blocking it "may reduce your site's visibility and accuracy in user search results" | Yes | same |
| `Claude-User` | Anthropic | Fetches made on a user's request. Blocking it "may reduce your site's visibility for user-directed web search" | Yes (the page says the bots honor robots.txt) | same |
| `Google-Extended` | Google | A control token only, not a separate crawler. It governs Gemini training **and grounding**. "does not impact a site's inclusion in Google Search" | Yes | [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) [primary] |
| `Googlebot` | Google | Google Search, including AI Overviews and AI Mode. Those features only need the page to be "indexed and eligible to be shown in Google Search with a snippet" | Yes | [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) [primary] |
| `Bingbot` | Microsoft | The Bing index, which feeds Copilot and Bing AI summaries. "Bing respects all content owner preferences expressed through robots.txt" | Yes | [Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) [primary] |

The OpenAI help page also says the host or CDN must allow traffic from OpenAI's published searchbot IPs ([OpenAI help](https://help.openai.com/en/articles/9237897-chatgpt-search)). The same applies to Perplexity's published IP ranges ([Perplexity bots](https://docs.perplexity.ai/guides/bots)). GitHub Pages is not a WAF you configure, so there is nothing to do here.

### robots.txt on a GitHub Pages project site

- **Location rules.**
  - RFC 9309: rules "MUST be accessible in a file named "/robots.txt" … in the top-level path of the service" ([RFC 9309 §2.3](https://www.rfc-editor.org/rfc/rfc9309.html)).
  - Google: a robots.txt in a subdirectory is "Not a valid robots.txt file. Crawlers don't check for robots.txt files in subdirectories" ([Google robots.txt spec](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)) [primary].
- **What is live [measured 2026-11-25].**
  - `https://denysslobodianyk1996.github.io/robots.txt` returns **404**. It is the "Site not found" page, because no `denysslobodianyk1996.github.io` user-site repo exists.
  - `https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/robots.txt` returns 200 and contains `Allow: /` and a `Sitemap:` line. Crawlers ignore this file.
- **How crawlers treat that 404.**
  - RFC 9309 §2.3.1.3: for 4xx responses "the crawler MAY access any resources on the server" ([RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)).
  - Google: "Google's crawlers treat all 4xx errors, except 429, as if a valid robots.txt file didn't exist" ([Google](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)).
  - **Result:** every bot in the table above may crawl the site today. Nothing is blocked.
- **The consequence that matters is the sitemap.**
  - The `Sitemap:` directive is only read from the root robots.txt, so nobody discovers it from there.
  - Google: "unless you submit your sitemap through Search Console, a sitemap affects only descendants of the parent directory" ([Google: build sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)) [primary]. The sitemap at `/profile-denys-slobodianyk/sitemap.xml` covers exactly the right URLs (its descendants), but it has to be **submitted** in GSC and Bing Webmaster Tools.
- **Option to own the host root.** A user site must live in a repo named `<owner>.github.io` and is served at `http(s)://<owner>.github.io` ([GitHub Pages docs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)) [primary]. Creating the repo `DenysSlobodianyk1996.github.io` would let the owner publish a real root `robots.txt` (with the Sitemap line), root verification files, an IndexNow key and a root `llms.txt`. A custom domain would do the same. I did not fetch GitHub's custom-domain docs, so that part is unverified here.
- **Should the sub-path robots.txt be removed?** It does no harm. Keep it or drop it; it changes nothing.

---

## 2. llms.txt

- **The spec.**
  - Proposed by Jeremy Howard on 2024-09-03. The page is now marked v2, modified 2026-08-10.
  - It is a Markdown file. The only required element is an H1. After that come an optional blockquote summary, optional body text, H2 "file list" sections made of `[name](url): notes` items, and an "Optional" H2 section an agent may skip.
  - A file can sit **at the root or at any sub-path** and covers the URLs under its path. Agents should prefer the most specific file. The spec is meant mainly for inference-time use, not training ([llmstxt.org](https://llmstxt.org/)) [primary].
- **Who consumes it.**
  - The spec page names **no** LLM provider that reads llms.txt. It notes only that OpenAI, Anthropic and Google publish llms.txt files *for their own developer docs*, and publishing one is not the same as consuming them ([llmstxt.org](https://llmstxt.org/)).
  - Google Search says the opposite: "You don't need to create new machine readable files, AI text files, or markup to appear in these features" ([Google AI features](https://developers.google.com/search/docs/appearance/ai-features)) [primary].
  - None of the crawler pages for OpenAI, Perplexity or Anthropic cited above mention llms.txt.
  - Chrome Lighthouse has an "llms.txt" audit in its agentic-browsing category. A 404 is marked N/A, and only server errors are flagged. It looks at `https://example.com/llms.txt`, **the domain root** ([Chrome Lighthouse docs](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)) [primary]. That is an auditing tool, not evidence that any model consumes the file.
- **Verdict:** there is no documented ranking or visibility benefit. It is cheap to add at `/profile-denys-slobodianyk/llms.txt`, which the spec allows. It might help an agent that is already on the site and fetches it. Benefit: **speculative and low**.

---

## 3. Structured data

### schema.org

- **Person properties.** All of these exist on [schema.org/Person](https://schema.org/Person) [primary]:
  - `knowsAbout` (Text/Thing/URL; it "suggests possible expertise without confirming it")
  - `jobTitle` (Text/DefinedTerm)
  - `hasOccupation` (Occupation; use Role for past professions with dates)
  - `alumniOf` (EducationalOrganization/Organization)
  - `worksFor`, `hasCredential`, `knowsLanguage`, `award`, `identifier`, `nationality`, `homeLocation`, `address`
  - `sameAs` (inherited from Thing: "A reference page that unambiguously identifies the item, such as a Wikipedia or Wikidata entry")
  - `description`, `image`, `url`, `subjectOf`, `mainEntityOfPage`
- **ProfilePage.** It sits at Thing > CreativeWork > WebPage > ProfilePage, and takes `mainEntity` (from Thing) ([schema.org/ProfilePage](https://schema.org/ProfilePage)) [primary].

### What Google documents

- **ProfilePage rich result** ([Google ProfilePage docs](https://developers.google.com/search/docs/appearance/structured-data/profile-page)) [primary]:
  - **Eligibility.** "The primary focus of the page must be a single person or organization that is affiliated with the overall website." An "About Me" page on a blog is a listed valid example, so a personal profile site qualifies.
  - **Required.** `mainEntity` (a Person or Organization), and `name` on that Person (`alternateName` can stand in for it).
  - **Recommended on ProfilePage.** `dateCreated` and `dateModified` (ideally human edits only).
  - **Recommended on Person.** `alternateName`, `identifier`, `image` (no placeholders), `description` ("byline or credentials"), `sameAs`, `interactionStatistic` and `agentInteractionStatistic`. The statistics may only describe activity on the hosting platform, so they do not apply here.
  - **Guidelines.** "Images must represent the marked up content", and image URLs must be crawlable.
- **General policies** ([Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)) [primary]:
  - "Don't mark up content that is not visible to readers of the page"
  - "Your structured data must be a true representation of the page content"
  - "Google does not guarantee that your structured data will show up in search results"
- **Why Google uses structured data.** To "understand the content of the page" and to gather "information about the people, books, or companies". JSON-LD is recommended ([Google intro to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)) [primary].
- **For AI features specifically.** "There's also no special schema.org structured data that you need to add". Basics include "Making sure your structured data matches the visible text on the page" ([Google AI features](https://developers.google.com/search/docs/appearance/ai-features)). The [Google Search Central blog, May 2025](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) repeats this and adds that "all the content in your markup is also visible on your web page" [primary].

### Do AI providers document using JSON-LD?

- **OpenAI** ([bots](https://developers.openai.com/api/docs/bots), [ChatGPT search help](https://help.openai.com/en/articles/9237897-chatgpt-search)), **Perplexity** ([bots](https://docs.perplexity.ai/guides/bots)) and **Anthropic** ([crawler FAQ](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)): **none of the pages I read mention structured data or JSON-LD.**
- **Bing.** The AI Performance announcement gives content guidance (headings, tables, FAQ, evidence, freshness, IndexNow) and **does not mention structured data** ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)).
- **Google** uses structured data for Search understanding and rich results, as above, but says it is not required for AI features.
- **Verdict.** JSON-LD is a documented input for Google's understanding of entities and for the ProfilePage result. Any effect on LLM answers is **undocumented**. Keep it accurate and consistent with the visible text, but do not expect it to move AI answers by itself.

### What the current build emits [measured / code]

- `build/seo-plugin.ts` emits a bare `Person` with `name`, `jobTitle`, `url`, `image`, `email`, `address`, `sameAs` (LinkedIn, GitHub) and `knowsAbout`, and the same block goes on every route. There is no `ProfilePage` wrapper, `description`, `@id`, `alumniOf`, `knowsLanguage`, `worksFor` or `dateModified`.
- The live site still shows `"addressCountry": "Ukraine"`, while the repo now emits `'UA'`, so the live build predates the latest code. That is harmless.

---

## 4. Evidence on what content raises visibility in generative answers

**GEO: Generative Engine Optimization.** Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande. arXiv 2311.09735, accepted to **KDD 2024** ([abstract](https://arxiv.org/abs/2311.09735), [HTML v3](https://arxiv.org/html/2311.09735v3)) [primary]. The abstract claims GEO "can boost visibility by up to 40%".

Results on GEO-bench with a GPT-3.5 engine. The baseline scores 19.3 on both metrics (PAWC = position-adjusted word count, SI = subjective impression). The percentages are computed from the paper's Table 1.

| Method | PAWC Δ | SI Δ |
|---|---|---|
| Quotation Addition | +41% | +28% |
| Statistics Addition | +31% | +23% |
| Fluency Optimization | +28% | +13% |
| Cite Sources | +27% | +13% |
| Technical Terms | +18% | +11% |
| Easy-to-Understand | +14% | +6% |
| Authoritative tone | +10% | +19% |
| Unique Words | +6% | +6% |
| **Keyword Stuffing** | **−8%** | +5% |

Other findings from the same paper:
- **Lower-ranked sources gain the most.** Cite Sources raised visibility by **115.1% for sites ranked 5th**, while visibility of the top-ranked site *fell* by 30.3%. That is relevant for a small personal site.
- **Real engine (Perplexity.ai, 200 samples).** Quotation Addition was best on PAWC (about +22%), Statistics Addition reached about +37% on SI, and Keyword Stuffing was about 10% worse than baseline.
- **Domain effects.** Quotation Addition worked best for **People & Society** queries, Statistics for Law/Government and opinion queries, and Authoritative tone for debate and history queries.

Caveats [my assessment]:
- The engines were 2023-era (GPT-3.5 and Perplexity).
- The test measures how much of a source that was *already retrieved* ends up in the answer. It does not measure whether a page gets retrieved in the first place. GEO tactics only help once the page is in the candidate set.

Corroborating guidance from first parties:
- **Bing** recommends "clear headings, tables, and FAQ sections", supporting claims "with examples, data, and cited sources", freshness, and consistent entities across formats ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)) [primary].
- **Google** recommends "unique, non-commodity content", page experience, a 200 status and indexable content ([Search Central blog](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)) [primary].

**What this means for the site [measured].**
- The prerendered home page has about **618 characters** of visible text: a list of labels (positions, location, English level, contacts, education). It has no prose summary and no `<h1>`.
- `/skills/` has about 500 characters.
- `/work-timeline/` has about 4,700 characters and is the only page with substantive content.
- There is little here for a retriever to match "senior Angular developer" against, and little for an answer to quote.

---

## 5. On-site compared with off-site signals; how realistic "top N developers" is

### Entity recognition

- **Google knowledge panels** "are automatically generated" from many web sources. You cannot request one; you can only claim an existing one and suggest edits ([Google Knowledge Panel help](https://support.google.com/knowledgepanel/answer/9163198)) [primary].
- **Wikidata notability.** An item qualifies with (1) a Wikimedia sitelink, (2) a "clearly identifiable conceptual or material entity" that can be described using serious and publicly available references, or (3) a structural need ([Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability)) [primary]. A self-created item for a private developer with no independent references would likely fail criterion 2 [my reading]. The policy page links to separate "Living people" and "Autobiography" policies that I did not read. **Do not** create a self-promotional Wikidata item until independent references exist, such as conference talks or articles about the person.
- **schema.org `sameAs`** is meant for pages that "unambiguously identify" the entity, with Wikipedia and Wikidata as the canonical examples ([schema.org/Person](https://schema.org/Person)).

### How realistic a place in "top N senior Angular developers" is

There are no primary sources on how assistants rank people in "top N" answers. Everything in this subsection is **[speculative]** reasoning from the evidence above.

- **Without search,** an assistant answers from training data. Long-tail entities are poorly recalled ([Kandpal](https://arxiv.org/abs/2211.08411); [Mallen](https://arxiv.org/abs/2212.10511)). A "top N" list from memory will name widely written-about people: Angular core team members, GDEs, prolific authors and speakers. Without many independent mentions on the web, an individual will not show up there.
- **With search,** the assistant issues queries such as "best senior Angular developers" and synthesizes from the pages it retrieves. Those are usually listicles, directories, and freelance or hiring marketplaces. A personal portfolio rarely ranks for that generic query. It is more likely to be retrieved for **qualified** queries, for example "senior Angular developer Ukraine remote Angular 21 migration Signals", or for queries that name the person.
- **Realistic goals, in order of achievability:**
  1. The assistant answers correctly when asked "who is Denys Slobodianyk, Angular developer".
  2. He appears for narrow, qualified queries (location, version, specialism).
  3. He appears in generic "top N" lists. This needs off-site authority (talks, articles, OSS, GDE-type recognition) and is not something on-site code can deliver.

### Off-site profiles: what the sources actually support

Checked by fetching each site's robots.txt on 2026-11-25 [measured]. The raw files can change.

- **GitHub** (`github.com/robots.txt`) has a dedicated group for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot and Perplexity-User. It sets `Crawl-delay: 1` with path-specific disallows and does not block profile or repo pages. **GitHub is visible to every AI crawler**, which makes a strong profile README and pinned repos valuable.
- **LinkedIn** (`www.linkedin.com/robots.txt`):
  - `User-agent: *` has `Disallow: /` (with "email whitelist-crawl@linkedin.com" to apply for access).
  - GPTBot, ClaudeBot, Claude-User, ChatGPT-User, PerplexityBot, Perplexity-User and Google-Extended all have `Disallow: /`.
  - Claude-SearchBot has `Disallow: /`.
  - OAI-SearchBot, Googlebot and Bingbot have specific groups that do **not** disallow `/in/` profiles.
  - **So:** LinkedIn profile content can reach Google, Bing (and through them Gemini and Copilot) and ChatGPT search, but **not** Perplexity or Claude search, and no model training except possibly through other routes.
- **Medium** (`medium.com/robots.txt`) disallows `/` for GPTBot, ClaudeBot, GoogleOther, Applebot-Extended and others (training bots). OAI-SearchBot, PerplexityBot and Claude-SearchBot fall under `*`, which allows content. **Medium posts are visible to AI search, not training.**
- **dev.to** (`dev.to/robots.txt`) has only `User-agent: *` with small path disallows. **It is visible to all.**
- **Stack Overflow.** The fetched file (generic UA) contained `Content-signal: search=no, ai-train=no` and `Disallow: /` for `*`. That looks odd and may be a bot-specific response. **Verify before relying on it.** If it is accurate, Stack Overflow content is not crawlable by any of these bots.
- **Google Developer Experts.** A global program of independent experts. Candidates are **nominated** by an active GDE or a Google employee, and there is a public directory ([Google Developers: Experts](https://developers.google.com/community/experts)) [primary]. An Angular GDE listing is the kind of authoritative third-party page "top N Angular" answers are likely to draw on [speculative].
- **Conference talks, podcasts, articles by others.** No primary source ties these to AI answers. They are the independent references Wikidata notability asks for, and they add training-data mentions, the factor the long-tail papers identify [inference from cited papers].

---

## 6. Getting indexed

### Google Search Console

- **Property type.** Use a **URL-prefix property** for `https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/`. A URL-prefix property "specifies the start of a URL. Any URLs that begin with this prefix are included in that property", with `https://www.example.com/france/` given as an example ([GSC property types](https://support.google.com/webmasters/answer/34592)) [primary]. A Domain property needs DNS, which is impossible on github.io.
- **Verification** ([GSC verification](https://support.google.com/webmasters/answer/9008080)) [primary]:
  - **HTML tag** (`<meta name="google-site-verification">`): "You must be able to insert a tag into the <head> tag on your homepage." This is the **method that fits this repo**: add it through `seoPlugin` so it is baked into `index.html` and every prerendered route.
  - **HTML file:** the page says "You must be able to upload a file to the root directory of your website". It is ambiguous whether that means the property root (the sub-path) or the host root, so prefer the meta tag.
- **Sitemap.** Submit `…/profile-denys-slobodianyk/sitemap.xml` in the Sitemaps report. That is required here, because the robots.txt `Sitemap:` line is not discovered ([Google: build sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).

### Bing Webmaster Tools

- **Verification options:** a BingSiteAuth.xml file at the site root, a meta tag on the homepage `<head>`, DNS, or **import from Google Search Console**, which adds sites and auto-verifies them ([Bing: add and verify site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b); [Bing blog 2019: import from GSC](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools)) [snippet, since the Bing help pages did not render for fetch]. The easiest path is to verify in GSC with a meta tag, then import into Bing. Alternatively, add `<meta name="msvalidate.01">`.
- **Why Bing matters.** It feeds Copilot and Bing AI summaries ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)) and is historically ChatGPT's search provider ([Microsoft 2023](https://blogs.microsoft.com/blog/2023/05/23/microsoft-build-brings-ai-tools-to-the-forefront-for-developers/)).

### IndexNow

- **Participants.** The FAQ lists endpoints for Amazon, Bing, Naver, Seznam.cz, Yandex and Yep, plus `api.indexnow.org`. A submission "will be shared across all IndexNow-enabled search engines". **Google is not listed** ([IndexNow FAQ](https://www.indexnow.org/faq)) [primary].
- **Key scope.** "the location of a key file determines the set of URLs that can be included with this key". A key at `/catalog/` covers only `/catalog/…`, and `keyLocation` must be sent with each notification. The docs "strongly recommend" the root, but a sub-folder works for that sub-folder ([IndexNow documentation](https://www.indexnow.org/documentation)) [primary].
- **Fit for this repo.** Put `public/<key>.txt` in the project, so it is served under `/profile-denys-slobodianyk/`. After deploy, POST the sitemap URLs with `keyLocation=https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/<key>.txt`. Every URL is under that prefix, so the scoping works.
- **Recommended by Bing.** Bing recommends IndexNow so "AI systems reference current versions" ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)).

---

## 7. Measuring

**Official tools**
- **Google Search Console.** AI Overviews and AI Mode traffic "is included in the Performance report under the 'Web' search type". It is not separated out ([Google AI features](https://developers.google.com/search/docs/appearance/ai-features)) [primary].
- **Bing Webmaster Tools → AI Performance** (public preview, Feb 2026) ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)) [primary]:
  - Covers Microsoft Copilot, Bing AI summaries and "select partner integrations" (not named).
  - Reports Total Citations, Average Cited Pages, sampled **grounding queries**, page-level citations and trends.
  - Shows citation frequency only, not ranking.
  - A June 2026 update added intent and topic grouping and citation share ([Bing blog, June 2026](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)) [snippet].
  - This is the only official report of **AI citations** I found.
- **ChatGPT referrals.** ChatGPT adds `utm_source=chatgpt.com` to outbound links, according to the OpenAI Publishers FAQ (help.openai.com/en/articles/12627856) [snippet; the fetch returned an unrelated article]. This needs analytics on the site; the site has none today.
- **Perplexity, Claude and Gemini app:** I found no official publisher analytics.

**Manual prompt panel** (no official methodology; this is my proposal)
- **Prompts.** Write a fixed set of about 15–20, in three tiers:
  1. Name queries, e.g. "Who is Denys Slobodianyk?"
  2. Qualified queries, e.g. "senior Angular developer Ukraine remote Signals NgRx Angular 21 migration".
  3. Generic queries, e.g. "top 10 senior Angular developers", "best middle/senior frontend developers to hire remote Ukraine". Phrase them in both English and Ukrainian.
- **Engines.** ChatGPT (search on and off), Perplexity, Claude (web search on and off), Gemini, Google AI Mode, Copilot.
- **Record:** mentioned (yes/no), position, whether the site URL is cited, which source URLs were cited, and factual accuracy.
- **Cadence.** Run monthly, in logged-out or incognito sessions with memory off, at least 3 runs per prompt, because outputs are non-deterministic. The cited-source column shows which third-party pages the engines trust for "top N" queries, and those are the off-site targets.

---

## Recommendations

Impact: **H** = high, **M** = medium, **L** = low. **Spec** = speculative (no primary evidence that it changes AI answers).

### (a) On-site code changes (this repo)

1. **Add a visible prose summary to the home page,** with an `<h1>` and a 3–5 sentence bio full of concrete facts: "8 years of Angular (v5–v21)", "migrated a production app from Angular 9 to 21", team and customer context, Signals/NgRx, remote from Ukraine. Optionally add a short quote, such as a client or lead testimonial with attribution, and a "Key numbers" block. Put it in `public/data/personal-info.json` (new field plus model) so it stays data-driven.
   - **Impact: H** (relative to the other on-site items).
   - **Sources:** GEO statistics and quotation gains, and the People & Society domain result ([arXiv 2311.09735](https://arxiv.org/html/2311.09735v3)); Bing's "examples, data" guidance ([Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)); Google's "unique, non-commodity content" ([Google blog](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)).
   - **Avoid** keyword stuffing, which was −8% in GEO.
2. **Add GSC and Bing verification meta tags** in `build/seo-plugin.ts`, for example from `VITE_GSC_TOKEN` and `VITE_BING_TOKEN` env vars or constants in `src/static/seo.ts`.
   - **Impact: H** (enables sitemap submission, indexing diagnostics and measurement).
   - **Sources:** [GSC verification](https://support.google.com/webmasters/answer/9008080); [Bing verify](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b).
3. **Wrap the JSON-LD in `ProfilePage`** on the home route. Use `mainEntity: Person` with an `@id`, and add `description` (the bio from item 1), `dateModified`, `knowsLanguage` (en, uk), `hasOccupation` or `worksFor` and `alumniOf` *only where the same facts are visible on the page*. The education entry currently names no institution, so add the university name visibly first.
   - **Impact: M for Google, L/Spec for LLMs.**
   - **Sources:** [Google ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page); [policies on visible content](https://developers.google.com/search/docs/appearance/structured-data/sd-policies); the [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) note that no special schema is needed.
4. **Extend `sameAs`** with every real off-site profile as it comes to exist: dev.to/Medium author page, Stack Overflow user, talk pages, and a Wikidata item *if* one is ever justified.
   - **Impact: L–M (Spec for LLMs).**
   - **Source:** [schema.org sameAs](https://schema.org/Person).
5. **Add IndexNow.** Put a key file in `public/` and add a post-deploy step in `.github/workflows/deployment-pipeline.yml` that POSTs the sitemap URLs with `keyLocation` under the sub-path.
   - **Impact: M** for Bing and Copilot freshness; ChatGPT benefit is Spec.
   - **Sources:** [IndexNow docs](https://www.indexnow.org/documentation); [Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview).
6. **Add `public/llms.txt`.** H1 name, a blockquote one-line positioning, and links to the three routes, the CV PDF and GitHub. The sub-path location is spec-valid.
   - **Impact: L / Spec.**
   - **Source:** [llmstxt.org](https://llmstxt.org/). No provider documents consuming it, and [Google says it is not needed](https://developers.google.com/search/docs/appearance/ai-features).
7. **Leave robots.txt as is.** Optionally comment in `buildRobots()` that the file is inert on a project site. Do not add per-bot rules expecting an effect; the root 404 already means everything is allowed.
   - **Impact: none**; this item is about correctness.
   - **Sources:** [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html); [Google](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt).
8. **Make sure `/skills/` has real text, not just chip labels.** Add one or two sentences per framework describing *what was built*.
   - **Impact: M (Spec).**
   - **Source:** the same content evidence as item 1.

### (b) Off-site actions for the owner

1. **Verify the site in Google Search Console** (URL-prefix property on the sub-path, meta tag), submit `sitemap.xml`, and request indexing of the 3 URLs. Then **import into Bing Webmaster Tools** and submit the sitemap there too.
   - **Impact: H**, a prerequisite for everything else.
   - **Sources:** [GSC property types](https://support.google.com/webmasters/answer/34592); [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap); [Bing import](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools).
2. **Optional: create the `DenysSlobodianyk1996.github.io` user-site repo** to own the host root. A root `robots.txt` with the Sitemap line, a root `llms.txt` (for Lighthouse), a root IndexNow key, and possibly a redirect or landing page to the profile.
   - **Impact: L–M.**
   - **Source:** [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
3. **Strengthen GitHub**, which every AI crawler can read [measured robots.txt]. Write a profile README that mirrors the site's bio and links to it, pin quality Angular repos, and make public contributions to Angular-ecosystem OSS.
   - **Impact: M–H (Spec on magnitude).**
4. **Publish technical write-ups on dev.to or Medium,** which AI search bots can crawl [measured]. Good topics are first-hand case studies like "Migrating Angular 9 → 21 in a production forecasting app" or "RxJS → Signals migration", with numbers and code. Link back to the site.
   - **Impact: M–H (Spec).**
   - **Sources:** GEO content tactics; the long-tail papers (more independent mentions means better recall: [Kandpal](https://arxiv.org/abs/2211.08411)).
5. **Keep LinkedIn's headline, title and summary identical to the site's positioning** ("Senior Angular Developer"). Note that LinkedIn is invisible to Perplexity and Claude search and to all training bots, but visible to Google, Bing and OAI-SearchBot on `/in/` pages [measured robots.txt].
   - **Impact: M** for ChatGPT, Copilot and Gemini.
   - **Source:** Bing's "consistency across formats" ([Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)).
6. **Build independent third-party mentions:** conference or meetup talks (Angular-focused events, Ukrainian JS communities), podcast guest spots, open-source credits, and over time a path toward a GDE nomination. These are the only route to generic "top N" lists, and the prerequisite for a defensible Wikidata item.
   - **Impact: H long-term, slow.**
   - **Sources:** [GDE program](https://developers.google.com/community/experts); [Wikidata notability](https://www.wikidata.org/wiki/Wikidata:Notability); long-tail papers.
7. **Do not create a self-sourced Wikidata item now.** It would likely fail notability criterion 2 without serious, public, independent references, and could be deleted.
   - **Source:** [Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability).
8. **Run the monthly prompt panel** (section 7). Use the cited-source column to find the third-party pages that "top N Angular developer" answers rely on, then target those: directories, hiring platforms, community lists.
   - **Impact: M**, a feedback loop.
   - **Source:** none (methodology proposal).

### Honest expectation

The on-site work (items a1–a3 and b1) should make the assistants describe Denys correctly when he is named, and should make the site retrievable for narrow, qualified queries. Appearing in a generic "top N senior Angular developers" answer depends almost entirely on off-site authority and independent mentions. No primary source suggests that markup, llms.txt or robots rules can produce that **[speculative, but consistent with [Kandpal](https://arxiv.org/abs/2211.08411), [Mallen](https://arxiv.org/abs/2212.10511), and Google's "no special optimizations" statement](https://developers.google.com/search/docs/appearance/ai-features)**.

### Gaps and unverified items

- **OpenAI Publishers FAQ** (help.openai.com/en/articles/12627856): the fetch returned an unrelated article, so the `utm_source=chatgpt.com` and noindex details are snippet-only.
- **Bing help pages** (verification) did not render. Their content comes from search snippets and the 2019 Bing blog.
- **The current split between Bing and OpenAI's own index in ChatGPT search** is not documented by OpenAI.
- **The search index behind Claude's web search** is not documented by Anthropic.
- **The Stack Overflow robots.txt result** looks anomalous and needs re-checking.
- **Knowledge cutoffs for OpenAI and Gemini models** were not checked.
