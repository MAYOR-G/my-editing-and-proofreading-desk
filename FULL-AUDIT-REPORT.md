# Full SEO, GEO, and AEO Audit Report

Analyzed site: https://www.editandproofread.com
Project: `my-editing-and-proofreading-desk`
Date: 2026-07-07
Business type: Professional service / online editing and proofreading service
Method: Codex SEO skill bundle review across `codex-seo/skills` plus local code audit of Next.js metadata, schema, sitemap, robots, content, performance, and AI-search readiness.

## Executive Summary

Overall SEO Health Score after fixes: 86 / 100, B+

The site already had a strong base: server-rendered Next.js pages, canonical metadata, robots/sitemap routes, noindex controls for private areas, solid service-page coverage, good internal linking, and substantial editorial content. The biggest pre-fix gaps were AI-search discovery, schema depth, duplicate legal URL handling, static sitemap freshness, and missing page/entity context for crawlers.

This pass improved the site without breaking the customer flow by changing shared metadata/schema helpers, `robots.ts`, `sitemap.ts`, `next.config.js`, and adding `/llms.txt`.

## Category Scores

| Category | Score | Notes |
|---|---:|---|
| Technical SEO | 89/100 | Strong crawl/index setup, HTTPS redirect, noindex private routes, security headers. Added CSP and duplicate legal redirects. |
| Content Quality | 84/100 | Strong service pages and blog guides. Still needs named expert bios, more original proof points, and more commercial trust evidence. |
| On-Page SEO | 88/100 | Titles, descriptions, headings, canonicals, internal links, and service landing pages are solid. Added explicit `en-US` alternate metadata. |
| Schema / Structured Data | 86/100 | Added `Person`, `WebPage`, `SiteNavigationElement`, service offers, richer BlogPosting fields, SearchAction, and homepage BreadcrumbList. |
| Performance | 78/100 | Next image optimization is good, but the homepage still has a large JS footprint, Tawk widget, motion code, and one external Unsplash dependency. |
| AI Search Readiness | 88/100 | Added `/llms.txt`, allowed major AI-search crawlers, improved entity clarity, author entity, and page-level schema. |
| Images | 78/100 | Good alt text and Next Image usage. Remaining issue: external Unsplash hero dependency and no fresh image-size audit from Lighthouse. |

## What Was Fixed

1. Added `/public/llms.txt` with core pages, service pages, guides, key facts, and citation guidance.
2. Updated `app/robots.ts` to allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, and PerplexityBot while keeping private routes blocked.
3. Removed the optional `host` field from robots output to keep robots simpler for mainstream crawlers.
4. Added canonical redirects from `/privacy-policy` to `/privacy` and `/terms-and-conditions` to `/terms`.
5. Added `Content-Security-Policy` alongside existing security headers.
6. Centralized `SITE_LAST_MODIFIED` and updated static/service sitemap dates to 2026-07-07.
7. Added `en-US` language alternates to generated metadata.
8. Added `Person` schema for the editorial team.
9. Added `SiteNavigationElement` schema as an `ItemList`.
10. Added `WebPage` schema on homepage, service pages, and blog posts.
11. Added homepage BreadcrumbList schema.
12. Added `SearchAction` to WebSite schema.
13. Added `knowsAbout`, founding location, and stronger service topics to Organization schema.
14. Added `ProfessionalService` address, `priceRange`, and an `OfferCatalog`.
15. Added `AggregateOffer` pricing signals to service schema.
16. Improved BlogPosting with editorial-team author reference, word count, keywords, and FAQ mainEntity.

## Key Findings

### Technical SEO

The public site is crawlable and has a sitemap, robots file, canonical metadata, and host redirect to `www.editandproofread.com`. Private routes such as `/admin`, `/api`, `/auth`, and `/dashboard` are blocked/noindexed appropriately.

Remaining technical risks:
- Runtime CSP validation is still needed on production payment, chat, Turnstile, and Supabase flows.
- Legacy `/services/[slug]` redirect routes still exist, but they are outside the sitemap and appear intentional.
- Sitemap dates are now centralized, but not yet calculated from file/content modification data.

### Content Quality and E-E-A-T

The site has good topical coverage for editing, proofreading, academic documents, dissertations, manuscripts, business documents, formatting, and translation review. Blog posts include useful tables, FAQs, source links, dates, and internal next steps.

What the site does not do well yet:
- No named human editor bios with credentials.
- No dedicated case studies, before/after outcomes, or public sample outcome pages.
- No public social/entity profiles connected through schema.
- No independent review/testimonial evidence that can support rating schema.

### On-Page SEO

Core pages are well structured, with service pages targeting specific commercial-intent queries. The service URLs are clean and sitemap-visible. Internal links from blog posts to service/pricing/submit pages support conversion.

Remaining opportunity:
- Add more intent-specific conversion blocks on blog posts, especially for “editing vs proofreading,” “proofreading rates,” and thesis/dissertation checklist queries.
- Add stronger above-fold proof points on commercial service pages.

### Schema and Structured Data

The schema layer is now much stronger. The site has Organization, WebSite, ProfessionalService, Service, BlogPosting, BreadcrumbList, FAQPage, WebPage, editorial-team Person, SiteNavigationElement, SearchAction, and Offer data.

What remains:
- `sameAs` is still empty because no verified public social URLs were found in the codebase.
- AggregateRating/Review schema was not added because there is no verified rating count or public review source in the site.
- FAQPage remains useful for AI parsing, but Google generally limits FAQ rich results to government and healthcare authority sites.

### GEO / AEO

AI-readiness improved significantly. `/llms.txt` now gives crawlers a clear map of the site. Robots allows major AI-search crawlers without exposing private routes. Schema now clarifies the brand, editorial team, service catalog, navigation, page context, and blog authorship.

Remaining opportunity:
- Build public brand mentions: LinkedIn, YouTube, Reddit discussions, partner citations, and reputable directory profiles.
- Add more answer-first 134-167 word blocks to money pages and blog intros.
- Add first-party data such as turnaround ranges, editorial quality standards, anonymized examples, and document-review checklists.

### Performance and Images

The app builds successfully and uses Next Image in important places. However, performance cannot be fully scored without Lighthouse/CrUX field data in this environment.

Remaining issues:
- Homepage first load is large at roughly 288 kB shared/page JS from the production build output.
- Tawk widget remains a third-party script, though deferred loading is better than blocking load.
- Unsplash is still used for the AI assistant section image.
- No live Core Web Vitals field data was available during this local audit.

## Validation

Production build passed:

```bash
npm run build
```

Build generated 75 routes successfully, including `/robots.txt` and `/sitemap.xml`.

## What We Did Not Do Well Yet

- No verified social profiles, so `sameAs` cannot be truthfully populated.
- No verified reviews/ratings, so Review or AggregateRating schema should not be added yet.
- No Search Console, GA4, PageSpeed Insights, or CrUX data was available for real impressions, clicks, CTR, rankings, or field CWV.
- CSP needs live smoke testing against contact, login, upload, dashboard, payment, Tawk, and Turnstile flows.
- Sitemap freshness is centralized but still manually dated.
- External Unsplash image remains a dependency.
- Service pages are good, but they need more trust assets: editor credentials, sample deliverables, guarantees/limits, and proof of process.

