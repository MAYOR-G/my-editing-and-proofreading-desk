# Comprehensive SEO Audit & Content Optimization Report — My Editing and Proofreading Desk

**Site:** https://www.editandproofread.com  
**Project:** `my-editing-and-proofreading-desk` (Next.js 14 App Router)  
**Audit Date:** 16 November 2026  
**GSC Baseline Export:** 9 June 2026 – 26 September 2026 (`https___www.editandproofread.com_-Performance-on-Search-2026-09-29/`)  
**Design Preservation Rule:** Zero visual, CSS, layout, typography, or UI component changes were made.

---

## 1. Executive Summary & Audit Scorecard

This audit evaluated all **71 indexable routes** across the public marketing pages, 10 dedicated service pages, 4 paginated `/blog/page/*` archive routes, and 44 editorial guides (`41` existing + `3` newly added), cross-referencing repository source code, Google Search Console (GSC) CSV exports, Reddit academic community search trends, and automated crawler/quality scripts.

### Key Findings Resolved
1. **SERP Snippet Truncation & Metadata Overflows (22 Routes Fixed):** The homepage, 3 high-priority academic service pages (`/academic-proofreading`, `/dissertation-proofreading`, `/thesis-editing`), 10 blog `metaTitle` values (`> 60` characters), and 8 blog `metaDescription` values (`> 155` characters) exceeded crawler/SERP bounds, risking Google snippet truncation on high-impression queries.
2. **Banned String Leakage (`crawler-verify.mjs` Compliance):** Found `"Edit and Proofread"` inside the visible title of `/blog/how-to-edit-literature-review` (which also rendered on `/blog` and `/blog/page/2`) and `"Flawless"` in `lib/blog-can-ai-edit-research-paper.ts`. Both were replaced so all 71 pages pass strict crawler verification.
3. **Thin Content on Page 1–3 GSC-Ranking Blog Posts (`lib/requested-blog-posts.ts`):** Nine impression-bearing guides ranking between positions `7.85` and `34.65` contained only `144–374` body prose words and lacked institutional E-E-A-T reviewer boxes (`reviewer`, `editorialDesk`, `styleStandards`), `trackedChanges` before/after demonstrations, and actionable verification checklists.
4. **Incomplete Schema on `/editors`:** `app/editors/page.tsx` previously emitted only `BreadcrumbList` JSON-LD while `editorialTeamJsonLd()` and `webPageJsonLd()` helpers existed in `lib/site.ts`.
5. **High-Intent Content Gaps Identified via Reddit & GSC:** Researchers across `r/AskAcademia`, `r/GradSchool`, and `r/PhD`—and GSC queries ranking on Pages 1–2—showed strong unmet demand for (a) **Revise-and-Resubmit / Reviewer 2 rebuttal letter guides**, (b) **PhD/Master's Academic CV vs. Industry Resume conversion & proofreading**, and (c) **University third-party proofreading ethics policies**.

### Post-Implementation Audit Scorecard

| Audit Pillar | Status | Verified Result |
|---|---|---|
| Crawlability & Indexation | Pass | `/robots.txt` + `/sitemap.xml` valid; 71 indexable URLs return HTTP `200`; `/nonexistent-test-page-404` returns HTTP `404` with `noindex`. |
| Title & Meta Description Bounds | Pass | 71/71 indexable pages comply with `30–60` char titles and `70–155` char descriptions (`0` errors in `crawler-verify.mjs`; `0` templated pages in `claude-seo` `metadata_template.py`). |
| Structured Data (JSON-LD) | Pass | Valid `Organization`, `WebSite`, `ItemList`/`SiteNavigationElement`, `Service`, `BlogPosting`, `CollectionPage`, `WebApplication`, `WebPage`, `BreadcrumbList`, and `editorialTeamJsonLd` on `/editors`. Zero banned claims in JSON-LD. |
| Content Depth & E-E-A-T | Upgraded | All 10 `requested-blog-posts.ts` guides expanded to `874–1,236` total rendered words with `reviewer`, `editorialDesk`, `styleStandards`, `trackedChanges`, `checklist`, and `table` blocks; `8` Oct-20/Oct-26 guides upgraded with full E-E-A-T cards. |
| Internal Link Graph | Pass | 71/71 sitemap pages have `>= 3` distinct incoming internal links; all `16` tracked `ZERO_16` priority targets link from service pages, blog posts, and `/blog`. |
| AI Search / GEO Readiness | Upgraded | `public/llms.txt` updated with the 3 new guides; `app/robots.ts` explicitly allows major AI search crawlers while excluding `/admin/`, `/api/`, `/auth/`, `/dashboard/`. |

---

## 2. Google Search Console Performance & CTR Opportunity Analysis

From the supplied GSC export (`2026-06-09` through `2026-09-26`, 110 daily rows):
- **Sitewide Baseline:** `15,721` impressions, `47` clicks (`0.30%` overall CTR).
- **Device Split:** Desktop generated `30` clicks from `13,223` impressions (`0.23%` CTR, avg pos `42.08`); Mobile generated `17` clicks from `2,421` impressions (`0.70%` CTR, avg pos `33.89`); Tablet generated `0` clicks from `77` impressions.

### Priority Impression-Bearing URLs & Actions Taken

| URL | GSC Clicks / Impr. | CTR | Avg. Pos. | Audit Issue & Action Taken |
|---|---:|---:|---:|---|
| `/` | 5 / 3,515 | 0.14% | 53.84 | Meta description was 177 chars (truncated). Tightened to 148 chars highlighting human editing, tracked changes, and `$0.030/word` starting rate. |
| `/thesis-editing` | 1 / 3,897 | 0.03% | 64.11 | Meta description was 164 chars. Tightened to 146 chars; added contextual link to the new university ethics guide. |
| `/dissertation-proofreading` | 0 / 770 | 0% | 65.33 | Meta description was 180 chars. Tightened to 148 chars; linked to the new university proofreading rules guide. |
| `/blog/ai-proofreading-thesis-dissertation` | 7 / 374 | 1.87% | 11.47 | Page 2 cusp with only 374 body prose words. Expanded to 1,152 total words with Turnitin burstiness/perplexity table, Track Changes box, and compliance checklist. |
| `/blog/apa-7-reference-list-mistakes` | 3 / 269 | 1.12% | 19.55 | Thin guide (252 prose words). Expanded to 1,047 total words with APA 6 vs. APA 7 diffs, 20-author rule, `https://doi.org/` examples, and tracked-change bibliography fix. |
| `/blog/british-vs-american-english-academic-writing` | 0 / 261 | 0% | 13.77 | Page 2 ranking with 0 clicks (292 prose words). Expanded to 1,049 total words with 6-row orthography matrix, quotation punctuation rules, and CTR-focused snippet. |
| `/blog/format-thesis-in-microsoft-word` | 0 / 224 | 0% | 27.99 | Thin guide (271 prose words). Expanded to 1,234 total words targeting Reddit pain points: `Next Page` Section Breaks, `Link to Previous` unlinking, Roman/Arabic pagination, TOC refresh, and ProQuest PDF/A export. |
| `/blog/how-long-does-dissertation-proofreading-take` | 0 / 223 | 0% | 7.85 | Page 1 position with 0% CTR and 300 prose words. Rewrote title/description for word-count timeframe clarity and expanded to 1,116 total words. |
| `/blog/cv-proofreading-checklist` | 0 / 155 | 0% | 34.65 | Only 152 prose words + generic `/assets/og-image.jpg` hero. Expanded to 916 total words, swapped to blog hero WebP, and cross-linked to the new PhD/Master's CV vs. Resume guide. |
| `/blog/business-proposal-proofreading-checklist` | 0 / 122 | 0% | 11.48 | Near Page 1 with 0 clicks and 144 prose words. Expanded to 883 total words covering RFP compliance matrices, pricing-table reconciliation, and Track Changes. |

### High-Opportunity GSC Queries Driving New Content
- **CV / Resume Cluster (`Pages 2–3`):** `cv proofreading service` (71 impr, pos 32.07), `cv proofreading services` (69 impr, pos 34.93), `cv editing services` (66 impr, pos 60.58), `cover letter editing service` (64 impr, pos 44.17), `professional cv proofreading services for masters` (16 impr, pos 15.56), `professional resume proofreading services for phd` (14 impr, pos 16.64), `professional cv proofreading services for phd` (12 impr, pos 17.25), `academic cv editing services` (11 impr, pos 19.27).
- **Ethical Editing Boundaries (`Page 2`):** `"where can i find editing services that focus on structure and content clarity instead of reshaping ideas?"` (8 impr, pos 12) alongside `thesis editing` (503 impr, pos 63), `thesis editing services` (240 impr, pos 54.14), and `phd thesis editing services` (172 impr, pos 61.22).

---

## 3. Reddit & Web Search Demand Research

Live searches across `reddit.com` (`r/AskAcademia`, `r/GradSchool`, `r/PhD`) surfaced four recurring high-intent researcher pain points:
1. **Navigating "Revise and Resubmit" (R&R) & "Reviewer 2" Critiques:** Authors struggle to format point-by-point response matrices, push back politely on out-of-scope experimental demands, and respond to *"The manuscript requires professional English language editing"* critiques without triggering Round 2 rejections.
2. **Third-Party Thesis Editing Ethics & Supervisor Etiquette:** Graduate students worry whether hiring an editor violates university misconduct policies—and need explicit reassurance around copyediting vs. ghostwriting, supervisor disclosure, and MS Word Track Changes provenance.
3. **Turnitin AI Detection & Grammarly Paraphrasing Traps:** Researchers report self-written papers getting flagged by Turnitin/Grammarly after accepting automated fluency rewrites; they prioritize retaining draft history and human Track Changes audit trails.
4. **Microsoft Word Dissertation Formatting Failures:** Breaking Roman (`i, ii, iii`) vs. Arabic (`1, 2, 3`) numbering via `Link to Previous`, updating automated Tables of Contents, avoiding Word's buggy Master Document feature, and exporting ProQuest PDF/A files cleanly.

---

## 4. Technical & Metadata Fixes Implemented

### Core Routes & Service Pages
- **`lib/site.ts`:** Updated `SITE_LAST_MODIFIED` from `"2026-08-04"` to `"2026-11-16"`.
- **`app/page.tsx`:** Shortened homepage `metaDescription` from 177 to **148 characters** (`Human editors for Academic & Graduate Research, theses, dissertations, and papers. Tracked changes, secure upload, and rates from $0.030/word.`). Zero JSX/layout modifications.
- **`app/editors/page.tsx`:** Added `editorialTeamJsonLd()` and `webPageJsonLd()` to `<JsonLd data={[...]} />` alongside `breadcrumbJsonLd()`. Zero visual modifications.
- **`lib/seo-service-pages.ts`:** Shortened `metaDescription` to `<= 155` chars and updated `dateUpdated` to `"2026-11-16"` on:
  - `/academic-proofreading` (168c → 151c)
  - `/dissertation-proofreading` (180c → 148c)
  - `/thesis-editing` (164c → 146c)

### Blog Metadata Length & Banned-String Remediation
- **`lib/eeat-audit-blog-posts.ts`:** Fixed `metaTitle` lengths (`<= 60c`) on 4 posts, fixed `metaDescription` lengths (`<= 155c`) on all 5 posts, updated `dateUpdated` to `"2026-11-16"`, and added an actionable `checklist` block to `ai-vs-human-editing-3500-word-experiment`.
- **`lib/blog-ai-vs-human-graduate-research.ts`:** Shortened `metaTitle` (61c → 58c) and `metaDescription` (169c → 147c); added `reviewer`, `editorialDesk`, `styleStandards`, `trackedChanges`, and `checklist`.
- **`lib/blog-formatting-challenges-phd.ts`:** Shortened `metaTitle` (62c → 55c) and `metaDescription` (184c → 151c); added `reviewer`, `editorialDesk`, `styleStandards`, `trackedChanges`, and `checklist`.
- **`lib/blog-can-ai-edit-research-paper.ts`:** Shortened `metaDescription` (194c → 150c); replaced `"Flawless"` with `"Thorough"`; added `reviewer`, `editorialDesk`, `styleStandards`, `trackedChanges`, and `checklist`.
- **`lib/strategic-seo-blog-posts.ts`:** Shortened `metaTitle` (`<= 60c`) on 4 posts; eliminated banned `"Edit and Proofread"` in `how-to-edit-literature-review` title and two `"flawless"` occurrences; added `reviewer`, `editorialDesk`, `styleStandards`, `trackedChanges`, and `checklist` to all 5 posts.

---

## 5. Previous Blog Thin-Content & E-E-A-T Expansion (`lib/requested-blog-posts.ts`)

Every guide in `lib/requested-blog-posts.ts` was expanded with comprehensive operational guidance, a `table`, a `trackedChanges` before/after comparison, an actionable `checklist`, and explicit `reviewer` / `editorialDesk` / `styleStandards` attribution (`dateUpdated: "2026-11-16"`):

| Slug | Before (Prose Words) | After (Total Rendered Words) | Meta Title / Desc | Key E-E-A-T & Content Upgrades |
|---|---:|---:|---|---|
| `ai-proofreading-vs-human-proofreading` | 777 | 1,236 | 52c / 145c | Added `reviewer`, `trackedChanges` empirical table/hedging example, and `checklist`. |
| `ai-proofreading-thesis-dissertation` | 374 | 1,152 | 57c / 152c | Added Turnitin burstiness/perplexity guidance, permitted vs. high-risk AI table, `trackedChanges`, and compliance checklist. |
| `how-long-does-dissertation-proofreading-take` | 300 | 1,116 | 58c / 154c | Added reading-speed benchmarks (1,800–3,000 wph), 5-pass breakdown, timeline table, `trackedChanges`, and backward-planning checklist. |
| `british-vs-american-english-academic-writing` | 292 | 1,049 | 60c / 153c | Expanded 6-row UK/US spelling matrix, quotation punctuation & serial comma rules, `trackedChanges`, and dialect-lock checklist. |
| `apa-7-reference-list-mistakes` | 252 | 1,047 | 51c / 149c | Added APA 6 → APA 7 updates, 20-author & sentence-case rules, `https://doi.org/` syntax, `trackedChanges` entry fix, and 10-point checklist. |
| `cv-proofreading-checklist` | 152 | 916 | 59c / 152c | Swapped generic `/assets/og-image.jpg` hero to WebP asset; added ATS & academic CV distinctions, `trackedChanges`, and sign-off checklist. |
| `business-proposal-proofreading-checklist` | 144 | 883 | 56c / 154c | Expanded RFP compliance matrix audit, commercial figure reconciliation, `trackedChanges`, and 15-minute pre-send gate. |
| `manuscript-editing-vs-copyediting` | 225 | 874 | 55c / 151c | Added substantive vs. copyediting vs. proofreading table, CMOS 17 `trackedChanges` sample, and stage-selection checklist. |
| `prepare-document-for-proofreading` | 254 | 903 | 53c / 153c | Added 5-step preparation table, Zotero/EndNote field hygiene, editorial brief `trackedChanges` sample, and pre-upload checklist. |
| `format-thesis-in-microsoft-word` | 271 | 1,234 | 55c / 154c | Expanded with `Next Page` Section Breaks, `Link to Previous` unlinking, Roman/Arabic pagination, ProQuest PDF/A export, troubleshooting table, `trackedChanges`, and checklist. |

---

## 6. Three New Trending Guides (`lib/trending-reddit-seo-blog-posts.ts`)

1. **`/blog/how-to-respond-to-peer-reviewers-rebuttal-letter-guide`** (`1,470` words · `content_quality.py` score: **97**, filler: `0`, AI patterns: `0`)
   - **Target Topics:** Revise and Resubmit (R&R) package, Reviewer 2 pushback templates, point-by-point response matrix, resolving native-English editing requests.
   - **Internal Links In:** Linked from `/blog`, `/blog/page/2–4`, `/manuscript-editing`, and `/academic-proofreading`.
2. **`/blog/academic-cv-vs-industry-resume-phd-masters-guide`** (`1,200` words · `content_quality.py` score: **99**, filler: `0`, AI patterns: `0`)
   - **Target Topics:** PhD & Master's Academic CV vs. Industry Resume structure, publication formatting, grant framing, ATS safety, and cover letters (targets GSC `cv proofreading` & `academic cv editing` clusters).
   - **Internal Links In:** Linked from `/blog`, `/blog/page/2–4`, `/cv-resume-editing`, and `/blog/cv-proofreading-checklist`.
3. **`/blog/is-it-ethical-to-hire-a-thesis-editor-university-rules`** (`1,154` words · `content_quality.py` score: **90**, filler: `0`, AI patterns: `0`)
   - **Target Topics:** US, UK (Russell Group), Canada, and Australia (IPEd) university proofreading policies, copyediting vs. ghostwriting boundaries, and MS Word Track Changes authorship trails.
   - **Internal Links In:** Linked from `/blog`, `/blog/page/2–4`, `/thesis-editing`, `/dissertation-proofreading`, and `/blog/ai-proofreading-thesis-dissertation`.

All three guides were also added to `public/llms.txt` for AI search engine citation discovery.

---

## 7. Verification Summary

- **`npx tsc --noEmit`:** Passed with `0` errors.
- **`npm run build`:** Passed cleanly; generated **117 static/SSG pages**, including `/blog`, `/blog/page/2`–`/blog/page/4`, and all 44 blog posts.
- **`node scripts/seo-verify/crawler-verify.mjs` (against live local production server):** **PASSED with 0 errors across all 71 sitemap URLs**:
  - `71/71` HTTP `200` responses, valid canonicals, `30–60` char titles, `70–155` char meta descriptions, single `<h1>`, sequential heading hierarchy, valid JSON-LD with zero banned stats, zero banned strings, and alt attributes on all images.
  - `/nonexistent-test-page-404` returned `404` with `noindex`.
  - Every indexable page had `>= 3` incoming internal links; all `16` `ZERO_16` priority URLs passed.
  - Home Page Guard verified zero unintended changes to homepage layout or ordered heading structure (`20` headings preserved identically).
- **`claude-seo` `scripts/metadata_template.py`:** `pages_checked: 71`, `templated_count: 0`, `templated_ratio: 0.0`, `site_risk: "low"`.
- **Legacy Redirect Note (`scripts/seo-regression.mjs`):** `scripts/seo-regression.mjs` still asserts 301/308 redirects for `/services/manuscript-formatting` and `/privacy-policy`, which were intentionally converted in prior commit `3b404ce` to HTTP 200 pages carrying `<link rel="canonical">` tags toward `/document-formatting` and `/privacy`. All other sitemap/robots/JSON-LD checks pass cleanly.

---

## 8. Post-Deployment Next Steps

1. Deploy `seo-ux-overhaul` to production and verify `https://www.editandproofread.com/sitemap.xml` lists all 71 URLs.
2. Submit the 3 new URLs plus the 10 expanded `requested-blog-posts.ts` URLs via Google Search Console URL Inspection and `npm run indexnow`.
3. Re-export GSC Page & Query metrics after 28–60 days to track CTR gains on the shortened snippets (`/`, `/thesis-editing`, `/dissertation-proofreading`, `/blog/how-long-does-dissertation-proofreading-take`) and ranking movement on the expanded guides.
