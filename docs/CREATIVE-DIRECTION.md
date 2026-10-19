# Tocek Investments — creative direction

Emotion: confidence, agricultural substance and quiet ambition. Audience: farmers, distributors, commercial agriculture and international business partners.

Three opening concepts considered:

1. **Golden field editorial (selected):** a real, licensed maize photograph, left-aligned serif statement and a clear seed portfolio action. Subtle image settling establishes atmosphere without blocking reading. Mobile uses an independently framed crop and compact type. Reduced motion shows the final image immediately.
2. **Botanical seed specimen:** a large illustrated seed study with an interactive crop index. Strong for discovery but insufficiently immersive as the principal corporate opening; adapted into the crop catalogue where photography is absent.
3. **International agricultural atlas:** geographic navigation as the primary hero. Not selected because the current operational country list is unavailable. A real geographic map is used later, highlighting only Zimbabwe.

Prominent methods: ST-01 editorial product presentation; ST-04 useful crop discovery; ST-05 cinematic opening. No WebGL or 3D was added because no authentic models or production sequences were supplied. The crop atlas connects changing imagery to the selected crop and a real category route, with buttons, tabs and keyboard navigation.

Identity: user confirmed Zadzamatura primary, with Tocek Investments as the corporate name. The client-approved PDF artwork now leads the site. Its embedded image is extracted directly, with supplied white presentation retained; compact ribbon and diamond crops support the header and icons. The client confirmed blue as the main colour: deep blue #123F7A, navy #091C38 and cool white, with restrained wheat accents. The logo retains its original red, green, grey, black and white colours. Typography: DM Serif Display and Manrope, self-hosted through Next Font.

Motion: one settled hero, a crop study transition, subtle view-based reveals, image hover feedback and directional navbar. Native scrolling, no scroll-jacking. Reduced-motion CSS removes movement and leaves all content visible. Crop gallery is vertical and touch friendly on mobile.

Images are explicitly illustrative, not represented as Tocek farms, personnel or facilities. No people, factories, fake laboratory photographs, awards, customer testimonials, capacity figures or partner logos are fabricated.

Reference review: Grandwalker Landscaping at outputs-five-steel.vercel.app (full-image opening, framed navigation, typographic rhythm, service/project imagery and dropdown/menu structure); Seed Co Zimbabwe field crops (crop navigation, varieties, technical information, farmer hub, FAQs, media, contact and distribution structure). The Tocek compositions and visual identity are independent.

## Image and scroll refinement

User requested more imagery and visible fade-ins/fade-outs while preserving the approved design. Added a three-frame seed-to-field image sequence, contextual seed and growth scenes, and imagery within text-heavy inner pages. The mobile sequence becomes a native swipe gallery. Replaced entry-only scroll timelines with reversible IntersectionObserver states, 750–850ms staggered entrances, 420ms fade-outs, opposite entry offsets for upward re-entry, and distinct enter/exit thresholds to avoid edge flicker. Default content is visible without JavaScript and all movement is disabled for reduced motion. No GPU-heavy masks or permanent compositor hints are used by the new reveal system.
