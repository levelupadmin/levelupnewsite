

## Create Masterclass Detail Page — G Venket Ram Photography

### What
Build a new internal route `/masterclass/g-venket-ram` that renders a full landing page for the G Venket Ram Photography masterclass, matching the layout and sections visible in the reference screenshot. Update the masterclass card link to point to this internal route instead of the external URL.

### Sections (from the screenshot)

1. **Hero** — Large name "G VENKET RAM" in bold serif, background photo blurred, centered portrait with "Teaches Photography" badge, play button overlay, a pull-quote testimonial below
2. **Course Overview** — Two-column layout: left shows course preview card (thumbnail, chapter count, duration), right shows bullet points / key details
3. **Portfolio Showcase** — "Learn From The Photographer Behind These Splendid Shots" — 3-4 image grid of iconic works
4. **Who Is This Program For?** — Grid of 6 target audience pills (e.g., "Photographers", "Filmmakers", etc.) with a portrait on the left
5. **Why This Masterclass?** — 3 value-proposition blocks with image + text (lighting techniques, post-processing, creative direction)
6. **Certificate of Completion** — Certificate preview card with sample name
7. **Testimonials** — "This makes our heart beat faster every day" — star ratings marquee + review cards
8. **FAQ Section** — Accordion-style Q&A
9. **Pricing CTA** — "Grab the offer while it lasts" — pricing card with CTA button, gradient footer strip

### Implementation Plan

1. **Create data file** `src/data/masterclassPages.ts`
   - Define a `MasterclassPage` interface with all section content (hero, portfolio images, audience targets, value props, FAQs, pricing)
   - Export Venket Ram's page data as the first entry, keyed by slug

2. **Create page component** `src/pages/MasterclassDetail.tsx`
   - Route param: `:slug`
   - Look up data from `masterclassPages` by slug
   - Render each section using the project's existing design system (dark background, serif headings, amber accents, FadeInSection wrappers)
   - Reuse Navbar + Footer
   - Include SEO via `usePageSeo`

3. **Add route** in `src/App.tsx`
   - `<Route path="/masterclass/:slug" element={<MasterclassDetail />} />`
   - Lazy-load the component

4. **Update masterclass card link** in `src/components/MasterclassSection.tsx`
   - Change Venket Ram's `href` from external URL to `/masterclass/g-venket-ram`
   - Change the `<a>` to a React Router `<Link>` for internal routes (or keep `<a>` with relative path)

5. **Update navbar data** in `src/components/navbarData.ts`
   - Update Venket Ram's href to `/masterclass/g-venket-ram`

### Content Notes
- Since I don't have the exact copy from the external page, I'll craft content based on what's visible in the screenshot (photography techniques, lighting, post-processing, creative direction)
- Images: Will reuse existing `venket-ram.png` asset for the hero portrait; portfolio/showcase images will need placeholder treatment using existing assets or styled placeholder blocks
- The page will be built as a reusable template so other masterclass pages can be added later by just adding data entries

### Files Created/Modified
- **New:** `src/data/masterclassPages.ts` — page content data
- **New:** `src/pages/MasterclassDetail.tsx` — full landing page component
- **Modified:** `src/App.tsx` — add route
- **Modified:** `src/components/MasterclassSection.tsx` — update Venket Ram href
- **Modified:** `src/components/navbarData.ts` — update Venket Ram href

