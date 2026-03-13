

## Plan: Build Careers Page + Nav Link

### New Files

**1. `src/pages/Careers.tsx`** — Full standalone page with its own nav, hero, marquee, positions grid, and footer CTA. Does NOT use the main site Navbar — has its own minimal nav per the design spec.

- **Fonts**: Import Bebas Neue (already available), Space Mono, DM Sans, Syne from Google Fonts via `@import` in component or index.css
- **Colors**: Navy `#1C2333`, dark navy `#131929`, gold `#D4AF5A`, white `#FFFFFF`
- **Section 1 — Nav**: Simple bar with LevelUp logo left, "Careers · 2025" right, bottom border gold at 20% opacity
- **Section 2 — Hero**: Dark navy bg, eyebrow text, 3-line Bebas Neue headline (MAKE solid white, YOUR outlined gold with gold bar, MOVE. solid white), 2-col grid with body text left and 3 stats right
- **Section 3 — Marquee**: Gold bg, dark navy text, Space Mono, CSS animation scrolling left infinitely
- **Section 4 — Open Positions**: 3×3 grid of role cards with gold borders at 15% opacity. Hover: gold fill from bottom (scaleY), text flips to navy, arrow appears. 9 roles as specified
- **Section 5 — Footer CTA**: Left headline + body, right gold "Apply Now →" button, top gold border at 20%

### Existing File Changes

**2. `src/index.css`** — Add Google Fonts imports for Space Mono, DM Sans, and Syne

**3. `src/App.tsx`** — Add lazy route: `const Careers = lazy(() => import("./pages/Careers"))` and `<Route path="/careers" element={<Careers />} />`

**4. `src/components/navbarData.ts`** — Add "Careers" to `navLinks` array as a simple link (no dropdown items):
```ts
{ label: "Careers", href: "/careers", description: "", items: [] }
```

**5. `src/components/Navbar.tsx`** — Add "Careers" to the `navLabels` fallback array

**6. `src/components/Footer.tsx`** — Update the Careers link from external URL to `/careers`

### Technical Details

- Marquee uses CSS `@keyframes` with duplicated content for seamless loop
- Role card hover uses CSS `::before` pseudo-element with `transform: scaleY(0)` → `scaleY(1)` from bottom, 0.35s ease
- The outlined "YOUR" text uses `-webkit-text-stroke` with transparent fill
- Gold horizontal bar on line 2 is an absolutely positioned `div` stretching from after "YOUR" to the right edge
- All "Apply Now" CTAs link to a Tally form or mailto (will use a placeholder `#apply` or ask user for the link)

