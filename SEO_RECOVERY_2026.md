# SEO Recovery 2026

Date: 2026-08-10
Site: https://www.editandproofread.com/
Project: `my-editing-and-proofreading-desk`

## Baseline

- Framework: Next.js 14 App Router.
- Rendering: static public pages and SSG blog/service pages, with dynamic API, auth, dashboard, admin, upload, and payment routes.
- Production canonical host: `https://www.editandproofread.com`.
- Sitemap: `app/sitemap.ts`, built from static routes, SEO service pages, blog posts, and paginated blog archive routes.
- Robots: `app/robots.ts`, allows public pages and blocks admin, API, auth, and dashboard routes.
- Canonicals/metadata: centralized in `buildPageMetadata()` in `lib/site.ts`.
- Structured data: Organization, WebSite, navigation ItemList, WebPage, Service, BlogPosting, CollectionPage, BreadcrumbList, and FAQPage helpers in `lib/site.ts`.
- Redirects: `next.config.js`, including legacy service redirects, duplicate legal URL redirects, and apex-to-www canonical redirect.
- Current GSC examples treated as quality/internal-authority issues, not robots blocking: `/blog/ai-proofreading-vs-human-proofreading`, `/blog/how-long-does-dissertation-proofreading-take`, and `/pricing`.

## Baseline Checks

- `npm run build`: passed. Local build still logs pre-existing missing Supabase server environment variable warnings during static generation.
- `npx tsc --noEmit`: passed before edits. During a later parallel run with `next build`, it hit transient `.next/types` missing-file errors; rerunning after build passed.
- `npm run lint`: blocked by existing interactive `next lint` setup prompt.
- `npm run test:seo`: passed for 44 sitemap URLs, robots.txt, JSON-LD, and permanent redirects after starting the local production server with approval.

## Visual Regression Screenshots

Captured before and after screenshots at desktop `1440x1200` and mobile `390x1200`.

Routes:

- `/`
- `/about`
- `/pricing`
- `/contact`
- `/editing-services`
- `/thesis-editing`
- `/dissertation-proofreading`
- `/document-formatting`
- `/blog`
- `/blog/ai-proofreading-vs-human-proofreading`

Artifacts:

- Baseline: `output/playwright/seo-recovery-2026/baseline/` with 20 PNG files.
- After: `output/playwright/seo-recovery-2026/after/` with 20 PNG files.

Notes:

- Chrome was used in headless screenshot mode because Playwright was available but its bundled Chromium binary was not installed.
- Homepage, About, Contact, service pages, blog archive, and protected shared UI were not redesigned.
- `/pricing` intentionally gained below-calculator explanatory content and FAQs; calculator logic and pricing values were not changed.
- Final mobile spot-check found and fixed long public-hero heading overflow on the AI proofreading article.

## Issues Found

- `/pricing` had a working calculator and metadata but limited crawlable explanatory content for pricing intent.
- `/pricing` had breadcrumb schema but no page-specific WebPage/FAQ structured data.
- `/blog/ai-proofreading-vs-human-proofreading` was useful but relatively short for a sensitive AI-vs-human proofreading query and needed more distinctive risk, policy, and manual-review guidance.
- `/blog/how-long-does-dissertation-proofreading-take` needed more concrete planning detail and stronger internal links to dissertation service/checklist pages.
- Long public-page hero titles could overflow on narrow mobile screenshots.
- Sitemap freshness still reflected the prior 2026-08-04 implementation date.
- Standalone linting remains blocked by the existing Next/ESLint 9 configuration prompt.

## Changes Made

- Preserved `SITE_LAST_MODIFIED` as the prior general site-content date and moved sitemap freshness to explicit per-route and per-service dates.
- Strengthened `/pricing` metadata description for pricing-calculator search intent.
- Added crawlable `/pricing` guidance about pricing factors, review scope, long-document complexity, and next-step guide links.
- Added visible `/pricing` FAQ content.
- Added WebPage and FAQPage JSON-LD to `/pricing`, preserving existing breadcrumb schema.
- Expanded `/blog/ai-proofreading-vs-human-proofreading` with document-risk matching, a document-type comparison table, and a manual acceptance checklist for AI proofreading suggestions.
- Added a stronger internal link from `/blog/ai-proofreading-vs-human-proofreading` to `/blog/ai-proofreading-thesis-dissertation`.
- Expanded `/blog/how-long-does-dissertation-proofreading-take` with example timeline planning by dissertation condition.
- Added a stronger internal link from `/blog/how-long-does-dissertation-proofreading-take` to `/blog/dissertation-proofreading-checklist`.
- Updated modified dates for changed blog/cluster content to `2026-08-10`.
- Added mobile-only public hero text wrapping and a narrower mobile text measure in `components/PublicPageShell.tsx` so long content titles and descriptions do not clip on 390px screens. Desktop/tablet hero scale remains unchanged.
- Added a dissertation proofreading planning estimator to `/blog/how-long-does-dissertation-proofreading-take` with non-numeric planning guidance only.
- Added an AI vs Human Proofreading Study structure to `/blog/ai-proofreading-vs-human-proofreading` without fake results.
- Improved priority-page metadata/linking for document formatting, research paper revision checklist, thesis checklist, dissertation checklist, proofreading cost, editing-vs-proofreading, thesis editing, and dissertation proofreading.
- Created `SEO_INTERNAL_LINK_AUDIT_2026.md`, `CONTENT_PRUNING_REPORT_2026.md`, `SEO_OUTREACH_ASSETS.md`, and `DIGITAL_PR_PLAN.md`.

## URLs Affected

- `/pricing`
- `/blog/ai-proofreading-vs-human-proofreading`
- `/blog/how-long-does-dissertation-proofreading-take`
- `/blog/ai-proofreading-thesis-dissertation` date freshness only
- `/document-formatting`
- `/thesis-editing`
- `/dissertation-proofreading`
- `/blog/research-paper-editing-checklist-before-submission`
- `/blog/dissertation-proofreading-checklist`
- `/blog/thesis-proofreading-checklist`
- `/blog/thesis-tables-figures-references-checklist`
- `/blog/how-much-does-proofreading-cost`
- `/blog/editing-vs-proofreading`
- `/sitemap.xml` through updated last-modified values

## Keyword Targets

- `/pricing`: editing and proofreading pricing calculator, editing rates, proofreading rates, proofreading quote, dissertation proofreading cost planning.
- `/blog/ai-proofreading-vs-human-proofreading`: AI proofreading vs human proofreading, what AI proofreading misses, human proofreading for important documents.
- `/blog/how-long-does-dissertation-proofreading-take`: dissertation proofreading turnaround, how long dissertation proofreading takes, dissertation proofreading timeline.
- `/document-formatting`: document formatting services, professional document formatting, Word styles, headings, tables, figures, references, final PDF consistency.
- `/thesis-editing`: thesis editing services, PhD thesis editing, thesis editor, academic thesis editing.
- `/dissertation-proofreading`: dissertation proofreading service, final dissertation proofread, formatting and reference checks.
- `/blog/research-paper-editing-checklist-before-submission`: research paper revision checklist before journal submission.
- `/blog/thesis-proofreading-checklist`: PhD thesis proofreading checklist.
- `/blog/dissertation-proofreading-checklist`: master's dissertation proofreading checklist before submission.
- `/blog/how-much-does-proofreading-cost`: how much does proofreading cost, proofreading price per word/page/project.

## Internal-Link Changes

- `/pricing` now links to:
  - `/blog/how-much-does-proofreading-cost`
  - `/blog/how-long-does-dissertation-proofreading-take`
  - `/blog/editing-vs-proofreading`
- `/blog/ai-proofreading-vs-human-proofreading` now links to:
  - `/blog/ai-proofreading-thesis-dissertation`
- `/blog/how-long-does-dissertation-proofreading-take` now links to:
  - `/blog/dissertation-proofreading-checklist`
- Full contextual link map recorded in `SEO_INTERNAL_LINK_AUDIT_2026.md`.

## Indexing Decisions

- Keep `/pricing` indexable as the live commercial pricing-calculator page.
- Keep `/blog/ai-proofreading-vs-human-proofreading` indexable after quality expansion.
- Keep `/blog/how-long-does-dissertation-proofreading-take` indexable after quality expansion.
- No noindex tags were added to public ranking pages.
- No canonical consolidations were made because the affected pages serve distinct intents.

## Redirects

- No new redirects were added.
- Existing redirect configuration in `next.config.js` was preserved.

## Sitemap Changes

- Static route last-modified dates are explicit and are not automatically stamped with deployment time.
- Service pages now store `dateUpdated` values; changed service pages use `2026-08-10`, unchanged service pages retain `2026-08-04`.
- Changed blog posts expose updated `dateUpdated` values that flow into sitemap last-modified entries.
- Sitemap URL count remains 44 public canonical URLs.

## Structured Data Changes

- `/pricing` now emits BreadcrumbList, WebPage, and FAQPage JSON-LD.
- Service WebPage JSON-LD now uses each service page's stored `dateUpdated` value.
- Existing Organization, WebSite, navigation, BlogPosting, WebPage, Service, CollectionPage, BreadcrumbList, and FAQPage schema systems were preserved.

## Executive Summary

This pass focused on pages Search Console already showed Google had discovered, crawled, or ranked: `/pricing`, the AI vs human proofreading article, the dissertation timing article, document formatting, research paper revision, thesis/dissertation checklists, proofreading cost, thesis editing, and dissertation proofreading. The implementation improved rendered text depth, schema, truthful lastmod handling, internal authority flow, CTR metadata, and mobile heading stability without redesigning the site or changing business workflows.

## Indexing Problems Discovered

- The known crawled/not-indexed examples were crawlable but needed stronger perceived value and internal context.
- `/pricing` looked more like a functional calculator than a fully crawlable pricing resource.
- Several priority informational pages had useful content but needed stronger commercial routing to the relevant service pages.
- The original sitemap implementation used one global date for many URLs, which was less precise than the prompt requested.

## Indexing Problems Fixed

- Expanded weak/recent content on the known crawled/not-indexed article examples.
- Added pricing-page explanatory content and FAQ schema.
- Added a dissertation planning estimator that gives supported planning guidance without unsupported turnaround guarantees.
- Improved sitemap lastmod rules for static, service, and article pages.

## Redirect Decisions

No redirects were changed. Existing permanent redirects remain intentional. Redirect sources are not intentionally listed in the sitemap, and public internal links reviewed in the edited content point to final canonical URLs.

## Lastmod Implementation

- Articles use genuine `dateUpdated` from content data.
- Service pages now store `dateUpdated`.
- Static pages use explicit known content-update dates.
- No build time, deployment time, or automatic "today" date is used.

## Canonical Changes

No canonical targets were changed. The site continues to use `https://www.editandproofread.com` and self-referencing canonicals for indexable public pages.

## Robots Changes

No robots changes were needed. Public pages remain crawlable; private/admin/API/auth/dashboard areas remain blocked or noindexed as previously configured.

## Quick-Win Pages

- `/pricing`
- `/blog/ai-proofreading-vs-human-proofreading`
- `/blog/how-long-does-dissertation-proofreading-take`
- `/blog/research-paper-editing-checklist-before-submission`
- `/blog/how-much-does-proofreading-cost`

## Commercial Authority Pages

- `/document-formatting`
- `/thesis-editing`
- `/dissertation-proofreading`
- `/proofreading-services`
- `/editing-services`
- `/academic-proofreading`

## CTR Changes

- `/document-formatting` title/meta updated around "Document Formatting Services for Academic & Professional Files".
- `/blog/research-paper-editing-checklist-before-submission` title/meta repositioned to "Research Paper Revision Checklist Before Journal Submission".
- Existing truthful title/meta patterns were preserved where already aligned.

## Content Updates

- AI proofreading article: added practical risk matching, AI suggestion checks, and future study structure.
- Dissertation timing article: added planning guidance and interactive estimator.
- Pricing page: added concise pricing factors and FAQ content.
- Service pages: strengthened thesis editing, dissertation proofreading, and document formatting scope language.
- Priority articles: added contextual links and updated truthful modification dates.

## Cannibalisation Decisions

- Kept thesis checklist, dissertation checklist, and dissertation how-to as separate informational intents.
- Kept commercial service pages separate from informational checklists.
- Kept general proofreading cost separate from any future academic-cost article.
- No pages were merged, noindexed, or redirected for cannibalisation.

## Entity Changes

- No fake editors, credentials, ratings, reviews, memberships, or social profiles were added.
- Existing organization and publisher schema were preserved.
- Outreach/editor bio templates require manual verification before publication.

## Link-Worthy Resources

- Improved proofreading pricing resource via `/pricing` and `/blog/how-much-does-proofreading-cost`.
- Added dissertation proofreading planning estimator.
- Added AI vs Human Proofreading Study architecture with manual-data requirements.
- Added downloadable checklist assets:
  - `/downloads/phd-thesis-submission-checklist.txt`
  - `/downloads/masters-dissertation-submission-checklist.txt`
  - `/downloads/research-paper-submission-checklist.txt`
- Checklist-pack outreach documented in `DIGITAL_PR_PLAN.md`.

## Digital PR Assets

- Created `SEO_OUTREACH_ASSETS.md`.
- Created `DIGITAL_PR_PLAN.md`.

## Performance Changes

- No performance-motivated visual or functionality removals were made.
- Mobile public hero text now wraps more reliably, reducing layout overflow risk on narrow screens.

## Content Decay Framework

- Created `CONTENT_DECAY_RECOVERY_FRAMEWORK.md` with review cadence, triage rules, refresh checklist, measurement steps, and guardrails.
- The framework separates keep/improve/consolidate/noindex/delete decisions and prevents automatic date stamping or fake freshness.

## Files Modified

- `app/(seo-services)/[slug]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/pricing/page.tsx`
- `app/sitemap.ts`
- `components/DissertationPlanningEstimator.tsx`
- `components/PublicPageShell.tsx`
- `lib/blog.ts`
- `lib/requested-blog-posts.ts`
- `lib/seo-opportunity-posts.ts`
- `lib/seo-service-pages.ts`
- `lib/site.ts`
- `public/downloads/phd-thesis-submission-checklist.txt`
- `public/downloads/masters-dissertation-submission-checklist.txt`
- `public/downloads/research-paper-submission-checklist.txt`
- `SEO_RECOVERY_2026.md`
- `SEO_INTERNAL_LINK_AUDIT_2026.md`
- `CONTENT_PRUNING_REPORT_2026.md`
- `CONTENT_DECAY_RECOVERY_FRAMEWORK.md`
- `SEO_OUTREACH_ASSETS.md`
- `DIGITAL_PR_PLAN.md`

## Final Verification

- `npm run build`: passed with the pre-existing missing Supabase environment variable warning.
- `npx tsc --noEmit`: passed after build.
- `npm run test:seo`: passed for 44 sitemap URLs, robots.txt, JSON-LD, and permanent redirects.
- `npm run lint`: blocked by existing interactive `next lint` configuration prompt.
- Baseline screenshots: 20 files captured.
- After screenshots: 20 files captured.

## Final Protection Check

- Pricing values, calculator behavior, upload flow, auth, payments, dashboard routes, AI editing tool, testimonials/reviews, and stats were not changed.
- No fake editors, fake study results, fake memberships, fake guarantees, fake ratings, or fake backlinks were added.
- No new public noindex rules, canonical consolidations, or redirects were added to ranking pages.
- Sitemap lastmod values are based on explicit route/content update dates, not automatic deployment time.
- Blog archive pagination, card layout, and public frontend structure were preserved.

## Remaining Manual Actions

- In Google Search Console, inspect and request validation for:
  - `/pricing`
  - `/blog/ai-proofreading-vs-human-proofreading`
  - `/blog/how-long-does-dissertation-proofreading-take`
- Submit the updated sitemap in Search Console after deployment.
- Consider using IndexNow only for changed canonical URLs after production deployment if `INDEXNOW_KEY` is configured.
- Configure ESLint for the current Next/ESLint setup if standalone `npm run lint` must run non-interactively.
- Provide production Supabase environment variables during local production builds if the payment-settings/examples warnings should be removed from local logs.
