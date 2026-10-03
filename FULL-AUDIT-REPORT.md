# SEO and Mobile UX Audit — Edit and Proofread

**Site:** https://www.editandproofread.com

**Project:** `my-editing-and-proofreading-desk`

**Audit date:** 2026-10-03

**Search Console export:** 2026-06-09 through 2026-09-26 (110 daily rows; export folder dated 2026-09-29)

**Evidence:** local Next.js source, site metadata/routes, saved mobile captures, and supplied Search Console CSVs.

## Summary

**Scope:** Full-site source and content review, GSC export analysis, and review of saved mobile captures.

**Overall score:** Not assigned; production crawl, field performance, and post-change visual evidence are missing. **Score confidence: low.**

**Top issues:** homepage CTR is 0.14% at average position 53.84; mobile captures show viewport overflow being clipped; inbound email attachments were omitted from admin threads.

**Top opportunities:** clarify search snippets for existing impression-bearing pages; build supporting content around thesis editing and document-formatting queries; route large files directly to storage or the original Resend attachment.

The site has a strong technical foundation: server-rendered pages, page-level metadata, canonical helpers, a dynamic sitemap, a robots route, and private customer/admin sections. The current work focuses on the homepage's low click-through, blog pages already earning impressions, mobile overflow that was hidden by global clipping, and support attachments that were sent through the application server as multipart files.

Search Console records **47 clicks from 15,721 impressions** in the supplied 110-day chart. The homepage received **5 clicks from 3,515 impressions (0.14% CTR, average position 53.84)**. The result indicates both ranking and snippet opportunity; metadata alone cannot resolve the low average position. Checklist content has stronger positions and offers a nearer-term opportunity to improve relevance and snippet clarity.

No current live crawl, production Lighthouse run, or field Core Web Vitals export was available for this pass. Findings below separate code-confirmed issues from performance and ranking questions that need production data.

## Search Console opportunities

| Page or query | Evidence in supplied export | Finding and action |
|---|---:|---|
| Homepage | 5 clicks / 3,515 impressions; 0.14% CTR; position 53.84 | Homepage snippet was updated to state core document types and human review clearly. The low position remains a content, relevance, authority, and competition issue to investigate with a fresh GSC export. |
| `/blog/thesis-tables-figures-references-checklist` | 3 / 1,059; 0.28% CTR; position 14.25 | Updated title and description to state the practical checklist value. |
| `/blog/dissertation-proofreading-checklist` | 9 / 535; 1.68% CTR; position 13.84 | Tightened snippet around 15 final checks and submission readiness. |
| `/blog/ai-proofreading-thesis-dissertation` | 7 / 374; 1.87% CTR; position 11.47 | Existing high-performing page retained; no unnecessary rewrite. |
| `/blog/ai-proofreading-vs-human-proofreading` | 3 / 283; 1.06% CTR; position 17.39 | Updated title and description to make the comparison and limits explicit. |
| `/blog/apa-7-reference-list-mistakes` | 3 / 269; 1.12% CTR; position 19.55 | Updated snippet to name common reference-list checks directly. |
| `/document-formatting` | 2 / 556; 0.36% CTR; position 20.05 | Added two informational support articles that link to the existing service page. |
| “regulatory document formatting services” | 192 impressions; position 13.45; no clicks | Added a cautious final-file checklist. It explicitly avoids implying that formatting alone establishes regulatory compliance. |
| “document formatting services” | 191 impressions; position 24.02; no clicks | Added a practical preparation guide that links to the service page. |
| “thesis editing services” / “thesis editing service” | 240 / 238 impressions; positions 54.14 / 48.55; no clicks | Added an informational scope guide and editor-selection checklist to support the existing thesis editing landing page. |

The supplied query export shows many thesis-related commercial queries ranking beyond position 40. New blog posts support the relevant existing service pages; they do not replace the need to assess service-page relevance, external authority, and competitive results.

## Findings

| Area | Severity | Confidence | Finding | Evidence | Impact and fix |
|---|---|---|---|---|---|
| Homepage CTR | Warning | Confirmed | The homepage receives many impressions but few clicks. | GSC: 3,515 impressions, 5 clicks, 0.14% CTR, average position 53.84. | A clearer title and description may improve result relevance and CTR; ranking position remains a broader content/authority question. Updated homepage metadata. |
| Blog snippets | Warning | Confirmed | Several posts around positions 10–20 have low CTR. | Thesis checklist: 1,059 impressions, 0.28% CTR; APA 7 list: 269 impressions, 1.12% CTR. | Make the search snippet's benefit specific without exaggerating the article. Updated four existing posts. |
| Mobile UX | Warning | Confirmed | Saved narrow-screen captures show content extending beyond the viewport and being clipped. | `output/playwright/seo-recovery-2026/after/mobile-home.png` and `mobile-contact.png`; global horizontal overflow clipping in `app/globals.css`. | Fix text wrapping and component widths instead of relying on clipping. Updated public headers, contact artwork, hero carousel, and footer. A new live capture remains outstanding. |
| Inbound PDF handling | Warning | Confirmed | The inbound Resend webhook saved email text but ignored attachment IDs. | `app/api/webhooks/inbound/route.ts` previously only extracted text/html and wrote message/reply content; Resend SDK exposes a receiving attachments API. | Save the Resend attachment reference and refresh its download URL only after admin authorization. Implemented. |
| Contact-form file transfer | Warning | Confirmed | Contact attachments were sent as multipart data through the app route, which also buffered them before storage. | `components/ContactForm.tsx` previously posted `FormData`; `/api/contact` accepted and uploaded the file from the server. | Use a signed direct-to-storage upload and verify the object before saving the message. Implemented; resumable transfer remains an option if field uploads fail. |
| Production performance | Info | Unknown | Current Core Web Vitals and mobile PageSpeed are unavailable in the supplied files. | No PageSpeed/CrUX export or current production run was available. | Capture field or lab data after deployment before assigning a performance score. |

## Confirmed findings and changes

### Homepage density and indexable pages

- The homepage contained a long “Submit Your Paper” promotion and a separate “Clear Pricing” card section. Both have been removed from the homepage composition.
- `/submit` and `/pricing` remain available and linked elsewhere. The secure upload and price-estimation journeys are still needed by customers and the submit route is part of the live service flow.
- The homepage title and description now name thesis, dissertation, research-paper, manuscript, and business-document support without the previous promotional phrasing.

### Mobile layout

- Saved mobile screenshots showed text and visual elements reaching beyond the viewport. Existing global `overflow-x: hidden` concealed overflow by cropping content rather than correcting layout.
- Public page headings and descriptions now use the available mobile width with explicit minimum-width and text-wrapping behavior.
- The contact visual uses smaller mobile padding, constrained inner widths, and shorter labels to avoid flex content pushing beyond the screen.
- The home hero's rotating phrases were shortened, and its text container can shrink on mobile.
- The footer now uses compact mobile padding, safe email wrapping, collapsed navigation groups, and a collapsed offices list. Desktop link columns remain visible at desktop sizes.

### Content and internal linking

- Added four original informational posts based on the Search Console topic families: thesis editing scope, choosing a thesis editor, document formatting preparation, and regulatory-document final-file checks.
- Each new post has a unique slug, page metadata, headings, FAQs, and links to the relevant existing service or policy pages.
- Refreshed titles and descriptions for the four existing pages with Search Console impressions and CTR opportunities: dissertation checklist, thesis tables/figures/references checklist, AI vs human proofreading, and APA 7 reference-list errors.
- New posts enter the existing blog collection and dynamic sitemap through `lib/blog.ts`; they do not create duplicate service routes.

### Large support PDFs

- **Confirmed email-path cause:** `/api/webhooks/inbound` saved the email body and ignored Resend's attachment metadata. This matches the reported symptom: the support message could appear in the admin thread while its emailed PDF did not.
- Email attachments now store their Resend email and attachment IDs with the message. The existing admin-only attachment route requests a fresh Resend download URL when an administrator opens the attachment, avoiding a large download-and-reupload through the Next.js webhook request. This follows [Resend's inbound attachment API flow](https://resend.com/blog/inbound-emails).
- The inbound thread links the first supported attachment (PDF, DOC, DOCX, or TXT) up to 25 MiB. If an email has multiple documents, the thread names the limitation and the original attachments remain available in Resend.
- For website contact-form uploads, the old multipart route placed the full file on the application-server path. The browser now requests a signed Supabase upload token from a metadata-only endpoint and uploads directly to the private `uploads` bucket. The contact API confirms the object exists before saving its path on the message.
- Supabase recommends resumable TUS uploads above 6 MB. Website form uploads currently use standard signed upload, which avoids the application-server request limit but does not resume an interrupted transfer. Add TUS with progress and retry/resume if field use shows interruptions. See [Supabase standard uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads) and [resumable uploads](https://supabase.com/docs/guides/storage/uploads/resumable-uploads).

## Technical checks and limitations

| Area | Status | Evidence / caveat |
|---|---|---|
| Metadata | Updated | Homepage plus four existing blog snippets; site-wide metadata helpers remain in place. |
| Sitemap inclusion | Implemented through shared collection | Sitemap maps all `blogPosts`; a live generated sitemap was not fetched in this pass. |
| Structured data | Existing implementation retained | JSON-LD and route metadata were not live-validated here. |
| Mobile overflow | Source fixes applied | Existing screenshots confirmed clipping; a fresh production-device capture was not available after edits. |
| PDF upload | Email attachment links and direct website uploads implemented | Production Resend/Supabase configuration was not accessible here. Confirm credentials and bucket settings, then open a large test PDF from each path. |
| Rankings / CWV | Not re-scored | No live crawl, PageSpeed/CrUX data, or updated Search Console data was available. |

## Remaining SEO work

1. After deployment, inspect GSC query/page trends over the next 28–90 days and compare CTR and position for the listed URLs.
2. Review the thesis-editing and document-formatting service pages against current search results for the queries they already receive; blog posts are supporting content, not substitutes for strong service pages.
3. Add named editor credentials and verifiable editorial experience where the business can substantiate them. Do not invent author qualifications, testimonials, or rating markup.
4. Run a production mobile crawl and Core Web Vitals check after the current source changes are deployed.
5. Consider resumable uploads if large-file transfers fail on weak connections despite the direct-to-storage path.

## Unknowns and follow-ups

- A live production crawl has not confirmed current HTTP status, canonical tags, robots, sitemap output, or structured data after this change.
- A post-change phone/tablet capture has not confirmed final rendering at 320 px and 390 px widths.
- Production Resend credentials and Supabase storage configuration were not accessible from this workspace. Exercise both large-file paths in staging before release.
- No post-deployment GSC data is available to measure CTR or ranking changes.
