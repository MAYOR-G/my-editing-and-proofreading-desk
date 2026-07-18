# SEO, Content, and Security Changelog

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
