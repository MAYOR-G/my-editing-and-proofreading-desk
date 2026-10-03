# SEO and Mobile UX Action Plan

**Updated:** 2026-10-03

**Search data:** Search Console export through 2026-09-26.

## Completed in this pass

### High priority

- [x] Remove the “Submit Your Paper” and “Clear Pricing” promotional sections from the homepage. Preserve `/submit` and `/pricing` routes and the existing customer workflows.
- [x] Rewrite homepage title and description to clarify service and document coverage.
- [x] Fix identified narrow-screen layout problems in public page headers, contact visual, home hero carousel, and footer.
- [x] Replace the support-form server-side file transfer with a signed direct upload to private Supabase Storage, then verify the stored object before saving attachment metadata.

### Content and internal linking

- [x] Add four Search Console-informed supporting articles for thesis editing and document formatting.
- [x] Improve titles and descriptions on existing high-impression blog posts with low CTR.
- [x] Link new posts to the existing thesis editing, academic proofreading, document formatting, privacy, and editorial-policy pages.

## Next steps after deployment

1. **Check large attachments in staging.** Send a 20–25 MiB PDF to the support email and confirm it opens from the admin thread. Submit another through the website contact form and confirm the private Supabase attachment opens. Confirm Resend and Supabase credentials are configured and the `uploads` bucket remains private with a limit of at least 25 MiB.
2. **Capture phone layouts again.** Review the homepage, contact page, blog index, a blog article, and footer at 320 px and 390 px widths. Confirm headings, email addresses, cards, and links wrap without clipping or sideways page movement.
3. **Review GSC after 28–90 days.** Compare homepage CTR and position, plus CTR for the checklist and APA pages. Separate ranking changes from title/description changes.
4. **Inspect service pages.** The leading thesis service queries currently have impressions but average positions around 48–69. Compare `/thesis-editing`, `/dissertation-proofreading`, and `/document-formatting` with current search results and add only evidence-backed content or proof.
5. **Improve author evidence.** Publish verified editor names, credentials, and review responsibilities where available. Do not use fabricated author credentials, reviews, or star ratings.
6. **Check performance in production.** Run a mobile field/lab performance check after deployment; no current CWV or PageSpeed evidence was included in the supplied files.
7. **Consider resumable uploads if needed.** Direct-to-storage removes the application server from the file transfer. Supabase recommends TUS resumable uploads for files above 6 MB, especially where connections are unstable.

## Priorities supported by the export

- Homepage: 3,515 impressions, 5 clicks, 0.14% CTR, average position 53.84.
- Thesis tables, figures, and references checklist: 1,059 impressions, 3 clicks, 0.28% CTR, average position 14.25.
- Document formatting service: 556 impressions, 2 clicks, 0.36% CTR, average position 20.05.
- Regulatory document formatting services query: 192 impressions, no clicks, average position 13.45.
- Thesis editing services queries: 240 and 238 impressions; average positions 54.14 and 48.55.

These measurements identify opportunities, not guaranteed ranking outcomes. See [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md) for evidence and limitations.
