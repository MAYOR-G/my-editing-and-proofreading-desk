# SEO, GEO, and AEO Action Plan

Goal: increase impressions, clicks, and customer conversions without breaking the site.

## Critical

None found that block indexing. The site is indexable, has canonicals, has sitemap/robots, and keeps private routes noindexed/blocked.

## High Priority

1. Validate production CSP across live flows.
   - Test contact form, signup/login, document upload, dashboard, Paystack checkout, payment verification, Tawk chat, and Turnstile.
   - Effort: 1-2 hours.

2. Create real social/entity profiles and add them to `siteConfig.socialLinks`.
   - Best first profiles: LinkedIn company page, YouTube channel if publishing editing advice, Facebook business page, Google Business/Profile if applicable.
   - Effort: 2-4 hours.

3. Add named editor/author bios.
   - Create an editor profile section or page with credentials, editing specialties, and editorial standards.
   - Then upgrade blog author schema from generic editorial team to named Person entities where truthful.
   - Effort: 1 day.

4. Add proof assets for conversion.
   - Add anonymized before/after examples, process screenshots, delivery sample, and testimonials if permission exists.
   - Do not add Review/AggregateRating schema until ratings are real and verifiable.
   - Effort: 1-2 days.

## Medium Priority

1. Replace the external Unsplash AI section image with a local optimized image.
   - Reduces external dependency and improves image control.
   - Effort: 30-60 minutes.

2. Add more answer-first blocks to commercial pages.
   - Example: “Professional proofreading is...” in the first 60 words of `/proofreading-services`.
   - Keep blocks self-contained and specific for AI citations.
   - Effort: 2-4 hours.

3. Add stronger blog-to-service conversion modules.
   - Especially on `/blog/editing-vs-proofreading`, `/blog/proofreading-rates`, and thesis/dissertation checklist posts.
   - Effort: 2-4 hours.

4. Automate sitemap lastModified.
   - Use content-level dates for blogs and a central edited date for static/service content, or generate from a content manifest.
   - Effort: 2-4 hours.

5. Run Lighthouse/PageSpeed on key pages.
   - Pages: `/`, `/pricing`, `/submit`, `/proofreading-services`, `/editing-services`, `/blog/editing-vs-proofreading`.
   - Effort: 1-2 hours.

## Low Priority

1. Add IndexNow support for Bing faster discovery.
2. Add a dedicated `/authors` or `/editorial-team` page if the team will publish regularly.
3. Add more internal links from service pages to relevant blog guides.
4. Consider replacing FAQPage schema on commercial pages if Google-rich-result cleanliness becomes more important than AI parsing.

## Already Completed In This Pass

- Added `/llms.txt`.
- Improved AI crawler access in robots.
- Added redirects for duplicate legal routes.
- Added CSP security header.
- Added stronger Organization, WebSite, ProfessionalService, Service, BlogPosting, WebPage, Person, Navigation, Breadcrumb, Offer, and SearchAction schema.
- Added language alternates.
- Updated sitemap date source to `SITE_LAST_MODIFIED`.
- Verified the app with `npm run build`.
