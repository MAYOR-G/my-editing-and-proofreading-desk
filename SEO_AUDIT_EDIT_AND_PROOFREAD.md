# SEO Audit — My Editing and Proofreading Desk

Audit date: 18 July 2026  
Production site: https://www.editandproofread.com/  
Repository: Next.js 14 App Router  
Status: audit completed before implementation; implementation and verification results are recorded in `SEO_CHANGELOG.md`.

## Executive summary

The site has a sound server-rendered SEO foundation: public pages expose titles, descriptions, H1s, canonicals, links, and JSON-LD in initial HTML; robots and sitemap endpoints are reachable; and all 31 pre-change sitemap URLs returned HTTP 200. The largest organic opportunity is not another broad service page. It is stronger differentiation, trustworthy copy, better hub-to-spoke linking, and two narrow editorial guides.

The most urgent release risk was security rather than SEO. Repository policies allowed authenticated users to update the profile row containing their `role`, insert arbitrary project/payment-state fields through Supabase, and insert messages into projects they did not own if a UUID was known. A production migration is included, but it must be applied and verified in Supabase before release.

### Scores before implementation

| Area | Score | Summary |
|---|---:|---|
| Crawlability and index control | 94/100 | Valid robots and sitemap; private routes excluded; all listed URLs 200. |
| Metadata and canonicals | 90/100 | Central builder and self-canonicals; edge apex redirect and 404 inheritance needed correction. |
| Structured data | 77/100 | Useful Organization, WebSite, Service, WebPage, BlogPosting, FAQ, and breadcrumb data; several entities/offers did not match visible functionality precisely. |
| Content quality and intent | 68/100 | Good service coverage, but template similarity, checklist overlap, unsupported claims, and inaccurate cost content reduced trust. |
| Internal linking | 70/100 | Crawlable navigation and blog cards; weak contextual service-to-guide links. |
| Performance evidence | 55/100 | No field data available; custom mobile lab showed a serious LCP warning. |
| Security and privacy | 38/100 | Three authorization flaws, public diagnostics, dependency advisories, incomplete AI disclosure, and unsupported retention copy. |

## Evidence used

- Production HTTP and rendered-page checks on 18 July 2026.
- Initial HTML for homepage, service, blog, legal, account, and error routes.
- Repository routes, metadata, sitemap, robots, schema, content objects, navigation, pricing, uploads, payments, authentication, API handlers, Supabase schema, and dependency lockfile.
- Bing/Search Console figures transcribed in the supplied brief; no independent Search Console connector or backlink provider was available.
- Production screenshots at desktop and 390 px mobile widths.
- Official guidance: [Google redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects), [canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [Bing URL submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b), and [IndexNow protocol](https://www.indexnow.org/documentation).

The project knowledge-graph tools required by the parent `AGENTS.md` were not exposed in this session, so the audit used read-only repository inspection as the documented fallback.

## Crawl, status codes, and canonicalisation

### Verified strengths

- `robots.txt` and `sitemap.xml` returned 200 and advertised the canonical `www` HTTPS origin.
- All 31 pre-change sitemap URLs returned 200, were indexable, and used absolute URLs.
- Sampled public routes contained one title, one meta description, one H1, and one canonical in initial HTML.
- `/login` and anonymous `/dashboard` responses carried `X-Robots-Tag: noindex, nofollow, noarchive`.
- Unknown routes returned 404. Legacy service routes were absent from the sitemap.
- All 32 unique internal destinations found in the sampled sitemap pages returned non-error responses; no blank `href` values were found.

### Issues and actions

| Priority | Finding | Evidence | Action |
|---|---|---|---|
| P1 | HTTPS apex uses temporary 307 to `www`; HTTP apex takes two hops. | Live request chain on 18 July. | Configure the apex domain at the edge to issue a direct permanent 301/308 to the final `www` HTTPS URL. This is a Vercel/domain setting, not reliably fixable in application code. |
| P1 | `/services/manuscript-formatting` returned a body-level Next redirect without a `Location` header in the production static route. | Live raw HTTP response. | Added explicit `next.config.js` permanent redirects so the next deployment emits a genuine 308 with `Location`. |
| P2 | The 404 inherited indexable root metadata, homepage canonical, and global schema. | Live 404 HTML and `app/not-found.tsx`. | Added dedicated noindex metadata. Global Organization/WebSite schema remains site-wide and is not page-specific content. |
| P2 | Sitemap contained ignored `priority` and `changefreq` and shared a manual release date. | `app/sitemap.ts`. | Removed `priority` and `changefreq`; retained `lastmod` only from page/article source dates. |

### Redirect map

These legacy routes should return one permanent hop and remain absent from the sitemap:

| Legacy URL | Destination |
|---|---|
| `/services/academic-editing` | `/academic-proofreading` |
| `/services/express-service` | `/proofreading-services` |
| `/services/non-academic-editing` | `/business-proofreading` |
| `/services/manuscript-formatting` | `/manuscript-editing` |
| `/services/translation` | `/translation-review` |
| `/services/writing-support` | `/editing-services` |
| `/privacy-policy` | `/privacy` |
| `/terms-and-conditions` | `/terms` |

Google documents 301 and 308 as permanent redirects and strong canonical signals. Redirects, canonicals, sitemap entries, and internal links should all point to the same final URL.

## Metadata and structured data

### Findings corrected

- Homepage title changed to `Professional Editing & Proofreading Services | Human Editors` with a concrete description covering document types, secure upload, and pricing.
- `/services` changed from a competing broad commercial title to comparison/directory intent.
- Open Graph image MIME types now reflect PNG, WebP, or JPEG file extensions.
- Removed the nonexistent `/blog?query=` `SearchAction` from WebSite schema.
- Removed `foundingLocation`, which was not substantiated.
- Changed the generic editorial-team entity from a fake `Person` to the real business `Organization`; BlogPosting author now uses the Organization. Google permits an Organization author for Article markup.
- Removed generic `AggregateOffer` ranges from service schema because they omitted the fixed writing-support package and did not accurately describe page-specific pricing.
- Removed FAQ duplication inside BlogPosting while retaining separate visible FAQPage schema.
- Removed the one-item homepage breadcrumb; Google requires at least two breadcrumb items for a trail.
- Removed local-business-like ProfessionalService schema from the homepage and retained Organization/WebSite/WebPage entities.
- Added accurate CollectionPage/ItemList JSON-LD to the visible blog index.

### Validation rule

Schema is useful only when it matches visible content and real functionality. FAQPage is retained for semantic clarity, but Google currently limits FAQ rich results mainly to authoritative government and health sites; it is not treated as a commercial rich-result strategy.

## Content, intent, and overlap

### Homepage

The homepage contains `30,000+ clients`, `110+ countries`, `15+ years`, and a marquee naming Harvard, MIT Press, Stanford, Oxford, Nature, Elsevier, The Lancet, and Cambridge. The owner confirmed these claims are true and directed that they remain; supporting references from the former website are expected to be published. Preserve evidence showing the meaning of “associated with” and avoid changing this wording into institutional endorsement or partnership language unless that stronger relationship is separately documented.

The animated specialist label was duplicated in initial HTML and became blank in desktop/mobile screenshots after about seven seconds. The invisible duplicate was removed and a stable width applied. The separate focus animation still needs post-build browser verification.

### Commercial pages

The ten service pages had unique metadata and H1s but shared nearly all section headings and layout. Highest diagnostic content similarity pairs were:

- `/academic-proofreading` ↔ `/dissertation-proofreading`: 0.799
- `/academic-proofreading` ↔ `/thesis-editing`: 0.751
- `/editing-services` ↔ `/manuscript-editing`: 0.743

Six priority pages now have distinctive scope explanations, boundaries, and contextual guide links. `/academic-proofreading` no longer claims to serve universities without evidence.

### Blog cluster

Diagnostic body-content similarity:

- Dissertation checklist ↔ dissertation how-to: 0.647
- Thesis checklist ↔ dissertation how-to: 0.705
- Dissertation checklist ↔ thesis checklist: 0.592

This is content similarity, not measured SERP overlap. No reliable SERP-overlap or backlink dataset was available, so no redirect was made solely from similarity.

Decisions:

- Keep and protect `/blog/dissertation-proofreading-checklist`; it has the strongest supplied GSC evidence (188 impressions, 2 clicks, average position 18.3) and owns exactly 15 final checks.
- Keep and differentiate `/blog/thesis-proofreading-checklist`; remove incidental dissertation targeting and focus on thesis-specific final review.
- Retain `/blog/how-to-proofread-a-dissertation-before-submission` as workflow intent. A deeper rewrite into scheduling, versioning, pass order, and software workflow remains a content follow-up; consolidate only if that differentiation is not completed.
- Keep `/blog/editing-vs-proofreading` as the comparison owner.
- Rewrite inaccurate claims on `/blog/how-much-does-proofreading-cost` to match the actual calculator: selected services, word count, eligible turnaround, $10 minimum, 5% service charge, and custom review above 50,000 words.
- Publish the two required narrow opportunity pages. The existing manuscript-submission article should remain conceptual and link to the section-by-section research-paper checklist rather than compete for the full checklist intent.

See `SEO_CONTENT_OVERLAP.md` for the ownership map and `SEO_KEYWORD_MAP.md` for every indexable URL.

## Internal linking and navigation

- Desktop header, mobile menu, and footer expose real crawlable anchors and the same ten service set.
- Desktop and mobile menu copies both exist in initial HTML, which repeats navigation text. This was not changed because hiding the mobile links behind client state could reduce no-JavaScript accessibility; it is a low-priority implementation trade-off, not an indexing blocker.
- Added service-to-guide links for the six priority commercial pages.
- Added links from thesis/dissertation checklists and the existing manuscript article to the two new guides.
- Blog index automatically lists all article objects with crawlable links.

## Performance and mobile evidence

No PageSpeed Insights or CrUX score was available because the PSI API returned HTTP 429. A custom Chrome lab run is directional only:

| Profile | TTFB | FCP | LCP | Long-task excess (TBT-like, not INP) | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Mobile slow 4G + 4× CPU | 2,797 ms | 3,980 ms | 15,544 ms | 305 ms | 0 | ~807 KB |
| Desktop throttled Wi-Fi | 710 ms | 1,588 ms | 1,588 ms | 36 ms | 0 | ~824 KB |

The mobile LCP result is a significant warning. Likely contributors are the homepage video, remote Unsplash images, animation hydration, third-party chat, and response time. The homepage was visually stable with no horizontal overflow at 390 px, and its H1/primary CTA were above the fold. Performance remediation should be a dedicated follow-up with field data, because replacing media or deferring chat can affect design and support functionality.

## Bing and IndexNow

No IndexNow implementation existed. A safe opt-in implementation now includes:

- `INDEXNOW_KEY` environment variable.
- `/indexnow-key` verification endpoint, noindexed and disabled when the key is absent.
- `npm run indexnow -- <explicit canonical URLs>` submission script.
- Same-origin validation and no automatic whole-sitemap submission.

Run it only after a production deployment and only for added, materially updated, redirected, or removed URLs. IndexNow is a discovery signal and does not guarantee crawling or indexing.

## Prioritised roadmap

### P0 — before production release

1. Apply `supabase/migration_20260718_harden_authorization.sql` in production.
2. Audit `profiles.role`, project/payment fields, messages, and auth logs; rotate service credentials if misuse is suspected.
3. Confirm the public checkout-health endpoint now returns 401/403 to non-admin users.

### P1 — deployment configuration

1. Change Vercel/domain apex redirect to one permanent hop to `https://www.editandproofread.com`.
2. Set both public app/site URL environment values and payment-provider callback/webhook URLs to the final `www` origin.
3. Deploy and run the SEO regression crawler against production.
4. Configure `INDEXNOW_KEY`, verify the key endpoint, then submit only changed URLs.

### P2 — content and performance follow-up

1. Complete the procedural rewrite of the dissertation how-to article and shorten overlapping checklist sections to summaries with links.
2. Narrow the existing manuscript-submission article further to the why/when of two-stage review.
3. Collect field CWV through Search Console/CrUX and optimise video, remote images, chat loading, and animation hydration.
4. Add real named editor bios only after identities, qualifications, photos, and profile links are approved.

### Deliberately not changed

- No broad redesign.
- No fake reviews, editor biographies, credentials, outcomes, publication guarantees, or claims of institutional endorsement beyond the owner-confirmed association wording.
- No forced Next.js major upgrade during an SEO/content release.
- No sitemap-wide IndexNow blast.
- No deletion/retention promise that the application does not implement.
