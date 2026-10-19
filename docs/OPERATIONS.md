# Operations and activation

## Current content workflow

The website uses a typed, version-controlled content layer. It meets the brief's structured-content option without an unsecured admin or simulated CMS. Public pages and administration remain separate; no `/admin` or `/studio` route exists. Update company JSON and typed records, review a local preview, run the build and push to main.

Future CMS integration: use a separate Sanity project or Payload service, with staff authentication, role-based editing and draft review. Define documents matching `Crop`, `Variety`, `Article`, `Market`, `Partner`, `ApprovedLeader` and `ApprovedLegacy`. Keep public queries restricted to approved/published records. Add a server-only adapter returning the existing frontend shapes; validate remote data and preserve the current routes. Do not expose a CMS write token to the browser. Configure signed preview access and authenticated revalidation webhooks before enabling drafts. No CMS infrastructure has been provisioned here.

## Email activation

1. Confirm Tocek's recipient email. Do not select a mailbox on its behalf.
2. Configure a verified sending domain in Resend and add `RESEND_API_KEY`, `ENQUIRY_FROM` and `ENQUIRY_TO` to the intended Vercel project.
3. Create a Cloudflare Turnstile widget restricted to approved production/preview hostnames; configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
4. Review privacy wording and actual retention/access arrangements with the company.
5. Redeploy. All five settings must exist before the UI enables Send enquiry.
6. Submit an authorised test. Verify the recipient received it, reply-to is correct, validation errors work and failed security checks cannot produce a success message. Resend acceptance establishes handoff, not guaranteed inbox arrival.

Until then, forms are explicitly copy-only and the server returns 503 for otherwise-valid requests. No enquiry information is persisted by the app, no fake success occurs, and phone contact remains available. Native client validation includes required fields, email format, consent, message length and organisation for partnership forms. Server validation is authoritative for submitted requests.

## Adding content

- Varieties: add approved name, crop slug and source. Add only verified optional values. Store genuine technical sheets under `public/resources/` and set `technicalPdf` only when the file exists.
- Markets: model `operating`, `distribution`, `partner` and `target` distinctly. Map does not infer countries from enquiries. Add approved geographic markers and legend entries when confirmed.
- Leadership: only publish current approved profiles; memorial content uses a separate model with family and company approvals. Add routes/navigation only when content is complete.
- News: add genuine dated announcements with image rights and sources to `content/news.json`. Set `approved: true` only after review. Existing list/detail templates, metadata and sitemap consume these records. The current newsroom does not contain fake articles.
- Translations: add genuine translated routes before introducing hreflang; no fake country pages exist.

## Production safeguards

Security headers: nosniff, DENY framing and strict-origin referrer policy. No payment, checkout, public admin or browser-exposed email secret. Enquiry body size is bounded; server validates origin, fields and security token, checks token hostname, and sets network timeouts. Add provider-level rate limits and monitoring as traffic warrants. Rotate secrets in the provider dashboard if needed; never in source control.

Confirm the official logo, current contact information, proposed marketing copy and catalogue against `CONTENT-SOURCES-AND-APPROVALS.md` before a major campaign. Deployment does not resolve these factual approvals.
