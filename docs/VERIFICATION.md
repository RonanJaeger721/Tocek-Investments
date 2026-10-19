# Verification record — 19 October 2026

## Local release checks

- Production build: `npm.cmd run build` passed with Next.js 16.4.2 and TypeScript.
- Type checking: `npm.cmd run typecheck` passed.
- 32 public routes checked through the browser at 375px and 1366px: one H1, unique page titles, canonical metadata, no horizontal overflow, no missing alt attributes or observed broken images.
- Additional breakpoint checks across homepage, catalogue, contact, global presence, variety and resource layouts: 320, 360, 390, 430, 768, 1024 and 1920px. A narrow crop-atlas intrinsic-width overflow at 320px was corrected and rechecked (scroll width 306px within a 320px viewport). A 1440px About composition was also visually inspected.
- HTTP crawl: all 32 sitemap routes returned 200 with page descriptions, canonical links and one H1. Every rendered internal destination matched a public route. Unknown route returned 404. Evidence: `local-http-qa.json`.
- Catalogue: Legumes returned four crop categories; ZS265 search returned one crop category with a matching variety link. Filters, clearing and empty-result controls are implemented.
- Crop atlas: selecting Sunflower changed image, crop description and category link; keyboard ArrowRight moved selection to Wheat. Previous/next controls share the same selected state.
- Resource centre: category filtering returned one seed-selection guide; unmatched search displayed the empty state; reset restored all three resources.
- Mobile navigation: opened/closed successfully, keyboard focus is trapped while open and background content is inert. Escape restores focus to the toggle. Code review verifies body scroll-lock cleanup.
- Navbar: downward scroll hides the header; upward scroll restores it. Direction comparison has no arbitrary pixel threshold. Light article/variety pages use dark navigation at the top.
- Product enquiry: `ZS265` and `Seed products` were preserved into the contact form. Empty copy action focused the required name field. Filling valid sample data and consent produced `Enquiry copied`. No email was sent. Browser error log was empty for that flow.
- Map: only Zimbabwe is geographically highlighted; focus button changes to `View the world`. No unconfirmed foreign offices or routes are shown.
- API: invalid fields -> 400; foreign origin -> 403; honeypot -> 400; oversized body -> 413; valid unconfigured delivery -> 503. Origin comparison was corrected to use the actual request Host rather than the development bind address.
- Security/accessibility review: labelled controls, skip link, semantic headings, focus visibility, keyboard tabs, image alt descriptions, bounded validation, security headers and reduced-motion CSS. Reduced-motion behavior was reviewed in source; no OS-level reduced-motion browser emulation or formal WCAG certification is claimed.

## Remaining integration and content limits

No genuine enquiry mailbox or delivery credentials were supplied. The public form is explicitly copy-only and offers the source-provided telephone. The endpoint is ready for Resend and Turnstile configuration, but real delivery has not been tested and is not claimed to be operational.

No CMS service is provisioned; the site has a clean typed content layer and integration notes. No current market list, technical PDFs, official news, approved leadership or legacy material was supplied. The public site does not invent these. Proposed editorial copy and identity still require client sign-off as documented in the approval register.

No measured Core Web Vitals, Lighthouse score, device-lab test or screen-reader certification is claimed. Responsive checks were performed in the desktop browser's viewport controls.

## Imagery and reversible motion refinement

User requested more images and fade-ins/fade-outs while preserving the design. Added three generated illustrative crop assets (see `IMAGERY-AND-PROMPTS.md`), a seed-to-field gallery, image-led production/research/farmer areas, and imagery in the corporate inner pages.

The new reveal system uses reusable viewport states with separate enter/exit thresholds and supports upward re-entry. Browser evidence: gallery heading opacity was 1 while visible, 0 after leaving above, and 1 again after upward scrolling; `data-enter-from="above"` confirmed the reverse entry direction. Mobile native gallery scrolling moved `scrollLeft` to approximately 120px, showed the next image, and did not create document overflow. No page scroll is intercepted.

Final local production-build checks: 100 route/viewport combinations passed. All 32 routes at 390px and 1366px, plus homepage/About/Values/Research/Partnerships/Contact at 320, 360, 430, 768, 1024 and 1920px. Checks covered heading structure, document overflow and observed broken images. Desktop gallery composition was visually inspected at the normal browser viewport. Viewport-override screenshot capture was unreliable, so responsive dimensions were checked in the rendered DOM. Build and type checking passed. Reduced motion remains a source-reviewed fallback, not a device-lab certification.
