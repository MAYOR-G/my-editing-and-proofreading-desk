# SEO, Content, and Security Changelog

## 3 October 2026 — Homepage cleanup, mobile fixes, and large attachments

- Removed the homepage's Submit Your Paper and Clear Pricing promotional sections while preserving the `/submit` and `/pricing` routes used elsewhere in customer journeys.
- Updated homepage search title and description; refreshed snippets for the GSC-impression-leading dissertation, thesis tables/references, AI-proofreading comparison, and APA 7 posts.
- Added four Search Console-informed articles on thesis editing scope, choosing a thesis editor, document-formatting preparation, and regulatory-document final-file checks.
- Added these articles to the existing blog collection, sitemap input, and `llms.txt` guide list.
- Tightened mobile wrapping for public-page headers and contact artwork; compacted the footer with mobile disclosures for office addresses and navigation.
- Changed public support attachment handling to direct signed uploads to private Supabase Storage, then stored verified attachment metadata with the message so the admin thread can open the file.
- Fixed the inbound email webhook to retain the first supported attachment's Resend reference and let admins obtain a fresh download link from the authenticated attachment route. This addresses the body-without-PDF behavior for emailed support requests without copying large attachment bytes through the webhook.
- GSC baseline (9 June–26 September): 15,721 impressions and 47 clicks; homepage 3,515 impressions, 5 clicks, 0.14% CTR, average position 53.84.
- No production crawl, Core Web Vitals export, deployed Supabase smoke check, or post-change mobile capture was available in this pass.

Implementation date: 18 July 2026.

## Completed in the repository

### Technical SEO

- Updated homepage title and description around human editing/proofreading and real document types.
- Repositioned `/services` metadata as a comparison directory.
- Removed nonexistent blog SearchAction, unsupported founding location, misleading service price range, fake Person author, duplicate FAQ entities inside BlogPosting, and invalid one-item homepage breadcrumb.
- Added accurate blog CollectionPage/ItemList schema.
- Added dedicated noindex metadata for 404 pages.
- Corrected Open Graph image MIME values by extension.
- Removed sitemap `priority` and `changefreq`; added both new canonical blog URLs automatically from content data.
- Added explicit permanent legacy redirects in `next.config.js`, including `/services/manuscript-formatting`.
- Added an automated runtime SEO regression crawler covering sitemap URLs, status, titles, descriptions, H1s, canonicals, JSON-LD, blog discovery, robots, and redirect `Location` headers.
- Added opt-in, explicit-URL IndexNow key endpoint and submission script.

### Homepage and trust

- Retained the verified 30,000-client, 110-country, 15-year, and named-institution association claims at the owner&apos;s direction; supporting references from the former website are pending publication.
- Preserved the existing visual system and trust-stat presentation.
- Removed the hidden duplicate animated specialist string that appeared twice to crawlers.

### Service pages

- Added differentiated scope, “not included” boundaries, and contextual guide links for editing, proofreading, academic proofreading, thesis editing, dissertation proofreading, and manuscript editing.
- Removed “universities” from the academic-proofreading H1 because institutional clients were not verified.
- Replaced the unsupported claim that editing “usually costs more” with live-calculator guidance.

### Content

- Added exactly two new complete blog posts:
  - `/blog/research-paper-editing-checklist-before-submission`
  - `/blog/thesis-tables-figures-references-checklist`
- Added two original, inspected, optimised WebP hero images with descriptive alt text.
- Updated the dissertation checklist title to exactly 15 checks and softened claims about rejection, misconduct, file format, and fixed turnaround.
- Removed incidental dissertation targeting from the thesis checklist and linked both long-document checklists to the specialist tables/references guide.
- Rewrote the proofreading-cost article's inaccurate generalisations to match the actual calculator: selected services, word count, eligible turnaround rate, $10 minimum, 5% service charge, and custom review above 50,000 words.
- Linked the existing manuscript-submission guide to the new focused research-paper checklist.

### Security and privacy

- Added a production Supabase migration that removes profile-role updates and direct project inserts and restricts message inserts to owned projects.
- Hardened the base Supabase schema for new environments.
- Restricted checkout health diagnostics to authenticated admins.
- Closed the auth callback open redirect.
- Added authentication/rate/size/signature checks to document parsing.
- Added file-signature checks to project uploads.
- Added archive expansion and rate limits to AI DOCX extraction.
- Added password-reset rate limiting, non-enumerating responses, and a minimum new-password length.
- Updated Resend and pinned `ws` to resolve four production dependency advisories; two Next.js/PostCSS advisories remain and require a tested major upgrade.
- Requested OpenRouter zero-data-retention routing.
- Rewrote AI/privacy disclosure and removed the unsupported 30-day file-retention promise.

## Verification

- `npx tsc --noEmit`: passed.
- `npm run build`: passed; 79 routes generated, including both new static articles.
- `npm run test:seo`: passed for all 33 sitemap URLs, both new articles, robots, JSON-LD parsing, blog discovery, and permanent redirect headers.
- `git diff --check`: passed.
- Signed-out security smoke tests: checkout health `401`, document parser `401`, disabled IndexNow key `404`, unknown route `404`, and legacy manuscript-formatting route `308` with `Location: /manuscript-editing`.
- `npm audit --omit=dev`: two production advisories remain (1 high Next.js, 1 moderate bundled PostCSS); npm's fix requires a Next.js 16 major upgrade.
- `npm run lint`: not completed because the existing script opens Next.js's interactive “configure ESLint” prompt; the repository does not contain an ESLint configuration. No lint policy was generated implicitly.

## Required production actions

- Apply `supabase/migration_20260718_harden_authorization.sql` and audit production roles/activity.
- Change the Vercel/domain apex redirect from temporary 307 to a direct permanent 301/308.
- Set all app/site/payment callback and webhook URLs to `https://www.editandproofread.com`.
- Configure `INDEXNOW_KEY` after deployment and submit only the changed canonical URLs.
- Perform signed-in staging tests for upload, quote, checkout, webhook, dashboard, contact, password reset, and AI tool.
- Plan a dedicated supported Next.js major upgrade for the two remaining audit advisories.
