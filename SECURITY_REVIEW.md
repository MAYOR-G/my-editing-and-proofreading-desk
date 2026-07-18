# Security and Privacy Review

Review date: 18 July 2026. This is a focused application review, not a formal penetration test or legal opinion.

## Release decision

Do not deploy the content/SEO release without applying and verifying `supabase/migration_20260718_harden_authorization.sql`. The repository's original Supabase policies contained three authorization vulnerabilities.

## Findings

| Severity | Finding | Risk | Remediation status |
|---|---|---|---|
| P0 | Users could update their own entire `profiles` row, including `role` | Self-promotion to admin because middleware and admin APIs trust `profiles.role` | Base schema fixed; production migration included. Apply immediately and audit roles/logs. |
| P0 | Authenticated clients could insert arbitrary `projects` rows | Bypass server pricing/payment/status validation through direct PostgREST requests | Client INSERT policy removed; production migration revokes INSERT. |
| P0 | Message INSERT checked only `sender_id` | A user knowing another project UUID could insert a message into it | Policy now requires the project to belong to the sender. |
| High | Public `/api/checkout/health` disclosed environment modes, URLs, bucket names, schema errors, and provider reachability | Operational reconnaissance and privileged health checks on demand | Endpoint now requires an authenticated admin and returns only 401/403 to others. |
| High operational | Public app/site and Paystack endpoints used apex while canonicals use `www` | Webhook/callback inconsistency; providers may not follow a temporary 307 reliably | Production environment and payment dashboard must be updated manually to `https://www.editandproofread.com`. |
| Medium | Auth callback accepted absolute/protocol-relative `next` values | Open redirect after successful session exchange | Restricted to single-slash relative paths. |
| Medium | Document parser was public and unbounded | Resource exhaustion and unauthorised parsing | Requires authentication, rate limits requests, caps files at 50 MB, and validates DOCX/text signatures. |
| Medium | AI DOCX extraction inflated archive content without expansion bounds | Small zip bomb could exhaust memory | Added entry-count, uncompressed-size, compression-ratio, and request-rate limits. |
| Medium | Upload validation trusted extension/client MIME | Content-type spoofing | Added magic-byte checks and server-selected content types for DOCX, DOC, and TXT. Malware scanning remains a recommended production control. |
| Medium | AI text processor was not disclosed and provider retention could vary | Users might paste confidential material without informed context | OpenRouter zero-data-retention routing requested; AI page and privacy policy disclose processing and warn against sensitive material. |
| Medium | Privacy/dashboard claimed retention behaviour not implemented by a deletion job | Misleading promise and compliance risk | Removed the 30-day claim; policy now describes category-based operational retention and deletion requests. |
| Medium/high | Production dependency audit initially reported 2 high and 4 moderate advisories | Known vulnerabilities in Next.js and transitive dependencies | Resend/Svix/uuid and `ws` were updated, leaving 1 high and 1 moderate advisory in Next.js/bundled PostCSS. A tested framework major upgrade is still required. |
| Low/medium | Password-reset email requests lacked rate limiting and returned provider errors | Abuse/email flooding and account-state leakage | Added per-email limiting, generic responses, and an 8-character update minimum. Turnstile and durable Redis configuration remain recommended. |
| Low/medium | Payment reference generation includes `Math.random()` and browser verification is unauthenticated | Guessability/metadata exposure is low but avoidable | Open follow-up: cryptographic reference and ownership/session check where provider flow permits. |
| Medium | CSP includes `unsafe-inline` and `unsafe-eval` | Reduces XSS mitigation strength | Open follow-up. Tighten with nonces/hashes only after payment, Turnstile, chat, and Next runtime testing. |

## Dependency evidence

`npm audit --omit=dev` initially reported six production vulnerabilities: two high and four moderate. Resend was updated to 6.17.2 and the `ws` tree was pinned to 8.21.1, resolving the Resend/Svix/uuid and `ws` findings. The final audit reports two production advisories: one high in Next.js and one moderate in Next.js's bundled PostCSS. npm proposes Next.js 16.2.10, a major upgrade that was not forced because it could break routing, authentication, payments, or deployment behaviour. Plan a dedicated upgrade branch with full integration testing. Relevant primary advisory: [Next.js RSC denial of service](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3).

## AI privacy

The free AI tool sends user text to OpenRouter and an eligible downstream model provider. OpenRouter states that prompts are not logged by OpenRouter by default, while provider policies can differ; zero-data-retention routing can be requested. See [OpenRouter provider logging](https://openrouter.ai/docs/guides/privacy/provider-logging/) and [ZDR routing](https://openrouter.ai/docs/guides/features/zdr). The implementation now sends `provider: { zdr: true }` and warns users not to submit confidential, unpublished, privileged, or personally sensitive text.

The application does not intentionally insert AI-tool input into the project database. Network/provider processing still occurs, so “private” or “confidential” must not be used as an absolute promise for the AI feature.

## Upload and storage controls

- Main project upload requires a valid user session.
- Allowed automatic document types are DOCX, DOC, and TXT with a 50 MB cap.
- Server now compares file signatures with the extension and ignores client-supplied MIME for storage metadata.
- Supabase upload and delivery buckets are intended to be private; delivery uses short-lived signed URLs.
- Recommended follow-up: malware scanning/quarantine, decompression sandboxing for all archive-based formats, download `Content-Disposition: attachment`, and automated retention/deletion jobs.

## Payment controls reviewed

- Paystack webhook verifies HMAC and re-verifies transaction state with the provider.
- Amount/currency/reference checks and idempotent payment records are present.
- Placeholder inactive provider webhooks do not process payments.
- Do not log full provider payloads, secret keys, card details, uploaded text, or document contents.

## Production checklist

1. Apply the Supabase migration.
2. Confirm authenticated users cannot update `profiles.role`, insert projects directly, or message projects they do not own.
3. Audit all current admin roles and recent project/message/payment changes.
4. Rotate Supabase service-role and payment secrets if policy abuse is found or cannot be ruled out.
5. Confirm `/api/checkout/health` returns 401 signed out and 403 for a normal user.
6. Set `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`, Paystack callback, and webhook endpoints to the final `www` origin.
7. Test signup, login, reset, upload, quote, checkout, webhook, dashboard delivery, contact, and AI-tool flows in staging.
8. Schedule a supported Next.js major upgrade and rerun `npm audit --omit=dev`.
