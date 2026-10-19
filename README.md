# Tocek Investments

A Next.js App Router corporate website for Tocek Investments (Pvt) Ltd, built by Jaeger Media.

## Run locally

```powershell
npm.cmd ci
npm.cmd run dev
```

Local preview: http://localhost:3000. Build: `npm.cmd run build`. Type check: `npm.cmd run typecheck`.

## Content and maintenance

- `content/company.json`: company facts, contact details, approved markets, milestones and withheld people/news data.
- `src/lib/content.ts`: typed crop and variety records, resource entries, navigation and metadata. Add a variety only with an identifiable source and approval; optional specifications and technical PDFs are omitted when unavailable.
- `src/components/pages.tsx`: route compositions, fed by the content records.
- `src/components/approved-people.tsx`: unpublished leadership/legacy components with approval guards.
- `docs/CONTENT-SOURCES-AND-APPROVALS.md`: source register and exact outstanding approvals.
- `docs/ASSET-LICENSES.md`: asset provenance.

This is a clean structured content layer rather than a CMS dashboard. Updating these records and redeploying updates the website. There are no public administration routes. A future CMS can replace these records through a server-only adapter; see `docs/OPERATIONS.md`. No CMS account, credentials or storage were supplied, so no CMS service is claimed to be configured.

## Enquiries

The email endpoint is implemented with server validation, body limits, a honeypot, time checks and Cloudflare Turnstile. It uses Resend and returns success only after the provider accepts the message. No delivery credentials or recipient mailbox were provided. The live form therefore offers a clearly labelled copy-to-clipboard preparation flow and telephone contact; it does not simulate email delivery.

Configure the variables in `.env.example` in Vercel, verify the sending domain and recipient, configure Turnstile for the production hostname, redeploy, and perform an authorised real-delivery test before treating forms as operational. Never commit secrets.

## Deployment

Repository: https://github.com/RonanJaeger721/Tocek-Investments

Vercel project: `tocek-investments`, Next.js preset, repository root, default Next output. `NEXT_PUBLIC_SITE_URL` defaults to https://tocek-investments.vercel.app; set it to an approved custom domain if one is connected later. Canonical links, sitemap and schema use this value.

No fabricated leaders, partners, foreign offices, statistics or performance specifications are published.
