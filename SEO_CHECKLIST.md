# SEO Checklist

## Production URLs

- Domain: https://www.editandproofread.com/
- Sitemap: https://www.editandproofread.com/sitemap.xml
- Robots: https://www.editandproofread.com/robots.txt
- Preferred hostname: `www.editandproofread.com`
- Redirect: `editandproofread.com` permanently redirects to the matching `www` URL with HTTP 301.

## Sitemap

The sitemap contains only public, indexable pages:

- `/`
- `/about`
- `/services`
- `/services/academic-editing`
- `/services/non-academic-editing`
- `/services/express-service`
- `/services/manuscript-formatting`
- `/services/translation`
- `/services/writing-support`
- `/pricing`
- `/ai-editing-tool`
- `/editors`
- `/faq`
- `/contact`
- `/privacy-policy`
- `/refund-policy`
- `/terms-and-conditions`

`lastmod` values use the most recent Git content dates available for these routes. Update a route's date in `app/sitemap.ts` when its visible content changes.

## Excluded Routes

The following route groups are excluded from the sitemap and protected with `X-Robots-Tag: noindex, nofollow, noarchive` where applicable:

- `/admin/*`
- `/api/*`
- `/auth/*`
- `/dashboard/*`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- Error, test, callback, payment-result, and other non-public utility routes

The private route groups are also disallowed in `robots.txt`. Public pages remain allowed.

## Metadata

All public pages use:

- A unique title
- A unique meta description
- A self-referencing canonical URL
- Open Graph title, description, URL, site name, locale, and image
- Twitter/X large-image card title, description, and image
- Explicit index/follow directives with large image previews enabled

| Page | SEO title | Meta description |
| --- | --- | --- |
| `/` | My Editing and Proofreading Desk \| Professional Editing & Proofreading Services | Professional editing and proofreading services for authors, students, businesses, and professionals who need clear, polished, error-free writing. |
| `/about` | About Our Professional Editing and Proofreading Services | Learn how My Editing and Proofreading Desk provides human-led editing for academic, business, application, manuscript, and professional documents. |
| `/services` | Professional Editing and Proofreading Services | Compare academic editing, business editing, proofreading, manuscript editing, translation review, and writing support services. |
| `/pricing` | Editing and Proofreading Service Pricing | Estimate editing, proofreading, formatting, translation, and writing support pricing by service, word count, and turnaround. |
| `/ai-editing-tool` | Free AI Editing Tool for a Quick First Pass | Try a free AI-assisted first pass for short text, then use human editing for high-stakes academic, business, and professional documents. |
| `/editors` | Human Editors for Academic, Business, and Book Editing | Learn how documents are matched with human editors who consider subject, purpose, audience, tone, structure, and delivery standards. |
| `/faq` | Editing and Proofreading FAQs | Answers about document uploads, word counts, pricing, turnaround options, privacy, AI editing, accepted files, and support. |
| `/contact` | Contact My Editing and Proofreading Desk | Contact support about editing services, project fit, document expectations, timelines, pricing, uploads, and business inquiries. |
| `/privacy-policy` | Privacy Policy | Read how My Editing and Proofreading Desk collects, uses, protects, retains, and handles personal information and uploaded documents. |
| `/refund-policy` | Refund Policy | Review refund eligibility, non-refundable situations, duplicate payment handling, service delivery issues, and refund request timing. |
| `/terms-and-conditions` | Terms and Conditions | Read the terms for using My Editing and Proofreading Desk editing, proofreading, payment, confidentiality, and delivery services. |
| `/services/[slug]` | `[Service name] Service \| Professional Editorial Support` | Uses the matching service's unique description from `lib/content.ts`. |

## Canonical Rules

- Canonicals always use `https://www.editandproofread.com`.
- The canonical host does not depend on local, preview, or staging environment variables.
- Every public page canonicalizes to its own absolute URL.
- Service pages canonicalize to their individual service URLs.
- Unknown service slugs return 404 instead of creating crawlable duplicate pages.

## Social Preview

- OG/Twitter image: `/public/assets/og-image.jpg`
- Public URL: https://www.editandproofread.com/assets/og-image.jpg
- Format: JPEG
- Dimensions: 1200 × 630
- Source: existing website brand artwork

## Structured Data

JSON-LD includes only information already present on the website:

- `Organization`
- `ContactPoint`
- `WebSite`
- `ProfessionalService`
- `Service` on each service detail page
- `BreadcrumbList` on public subpages
- `FAQPage` on `/faq`, where the same FAQ content is visibly rendered

The organization schema uses the existing business name, logo, support email, phone number, mailing address, and worldwide service area. No social profiles were added because none are configured on the website.

## Crawlability and Internal Links

- Next.js renders public routes directly; no SPA fallback rewrite is required.
- Dynamic service routes are statically generated.
- Existing navigation, service cards, buttons, and footer links use crawlable Next.js links or standard anchors.
- Private dashboard and admin routes remain protected by middleware.

## Image and Performance Improvements

- Enabled automatic AVIF and WebP image responses through Next.js.
- Added a long image optimization cache TTL.
- Converted eligible raw page images to `next/image` without changing their source artwork or layout.
- Added responsive `sizes` hints to full-width and split-column images.
- Preserved eager loading for the above-the-fold hero image.
- Preserved lazy loading for below-the-fold images.
- Added intrinsic dimensions to the decorative world map to reduce layout-shift risk.
- Improved descriptive alt text for meaningful editorial images; decorative and linked-logo images retain empty alt text where an accessible label already exists.
- Deferred the third-party chat widget and disabled it on localhost to avoid development-only console failures.
- Added permanent static security and indexing headers without changing frontend rendering.

## Google Search Console

1. Add and verify the Domain property for `editandproofread.com` using a DNS TXT record.
2. Confirm both `www` and non-`www` hostnames resolve and that non-`www` returns HTTP 301 to `www`.
3. Submit `https://www.editandproofread.com/sitemap.xml`.
4. Inspect the homepage and each service URL, then request indexing after deployment.
5. Review Page Indexing for blocked, duplicate, soft-404, and canonical-selection issues.
6. Review Core Web Vitals after enough field data is available.
7. Test `/faq` and a service page with Google's Rich Results Test.

## Bing Webmaster Tools

1. Add and verify `https://www.editandproofread.com/`.
2. Import the verified property from Google Search Console or verify through DNS.
3. Submit `https://www.editandproofread.com/sitemap.xml`.
4. Run Site Scan and URL Inspection after deployment.
5. Enable IndexNow only if future content publishing needs faster discovery.

## Manual Launch Tasks

- Update the production hosting environment so `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` are both `https://www.editandproofread.com`.
- Configure DNS/hosting so `www` serves the deployment and the apex domain redirects directly to `www`.
- Deploy and verify the final HTTP status and `Content-Type` headers from the public internet.
- Validate JSON-LD with Schema.org Validator and Google Rich Results Test.
- Test social previews with LinkedIn Post Inspector, Facebook Sharing Debugger, and X Card Validator or an equivalent card inspector.
- Request recrawling after the preferred-domain migration.
- Monitor Search Console for any URLs still indexed under `www`.
- Add real social profile URLs to `sameAs` only when the owner provides them.
- Add blog routes to the sitemap only when the owner launches real public blog content later.

## Final QA Commands

```bash
npm run build
curl -I https://www.editandproofread.com/
curl -I https://editandproofread.com/
curl -I https://www.editandproofread.com/sitemap.xml
curl -I https://www.editandproofread.com/robots.txt
```

Expected results:

- Public pages: HTTP 200
- Sitemap: HTTP 200 and `application/xml` or `text/xml`
- Robots: HTTP 200 and `text/plain`
- Apex/non-`www`: HTTP 301 to the same path and query on `https://www.editandproofread.com`
