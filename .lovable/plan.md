

# Full Speed Audit — LevelUp Learning

## Summary

The site is well-architected with code-splitting, lazy loading, and Intersection Observer patterns already in place. The main bottlenecks are **image weight**, **CSS bloat**, **always-running canvas animations**, and **excessive DOM from duplicated marquee elements**. Below is a prioritized list.

---

## Critical (High Impact)

### 1. Images are not in modern formats (WebP/AVIF)
Most images are `.png` and `.jpg`. The masterclass cards alone load 7 large PNG/JPG portraits. Community section loads **15 images** (many `.png`), then **duplicates each 6× for marquee** (90 `<img>` tags rendered).

**Fix:** Convert all `.png` portraits and community photos to `.webp` (50-70% smaller). Use `<picture>` with AVIF fallback where possible. This is the single biggest win.

### 2. Community section renders 90 images
`repeat(row, 6)` creates 30 images per row × 3 rows = **90 `<img>` elements** for the scrolling marquee. Most are off-screen.

**Fix:** Reduce repeat count from 6 to 3 (still enough for seamless loop). That cuts DOM nodes and network requests in half.

### 3. StarField canvas runs continuously (750 stars)
The `StarField` component renders 750 stars with `requestAnimationFrame` running **forever**, even when scrolled past the hero. It also generates a grain texture via `toDataURL()`.

**Fix:** Pause the animation loop when the hero section is not in the viewport using Intersection Observer. Reduce star count to ~400 on mobile.

### 4. CredibilityParticles canvas also runs forever
40 particles + proximity line calculations (O(n²) = 780 pair checks per frame) + scroll listener for rect updates.

**Fix:** Pause when out of viewport. The scroll listener for `getBoundingClientRect` should be throttled or replaced with a cached approach on intersection.

---

## Important (Medium Impact)

### 5. StudentLogos section: 78 logo images loaded eagerly
All logo images have `loading="eager"` — but this section is far below the fold.

**Fix:** Change to `loading="lazy"`.

### 6. CSS file is ~1500 lines with many unused animation keyframes
`index.css` contains dozens of animation keyframes for the Impact scenes (`impact-*`, `collab-*`, `geo-*`) that only apply to lazy-loaded components. These all ship in the initial CSS bundle.

**Fix:** Move section-specific keyframes into their respective component files using `<style>` tags or CSS modules so they're code-split with the components.

### 7. Three hero videos load simultaneously
The HeroCarousel loads 3 videos. The first has `preload="auto"` and `fetchPriority="high"`. The effect then sets `preload="auto"` on the next slide too, so 2 videos buffer immediately.

**Fix:** Only preload slide 0 initially. Preload slide 1 after the first slide has loaded (via `canplaythrough` event) rather than immediately.

### 8. LiveProgramsSection loads ALL 4 videos at once when visible
When the section enters viewport, it calls `.load()` on all 4 videos simultaneously.

**Fix:** Only load the active video and prefetch the next one. Load others on tab switch.

### 9. Navbar data chunk loaded on hover — good, but images inside aren't lazy
`navbarData.ts` imports 14 images (nav thumbnails) that get bundled into this chunk. When the user hovers, all 14 images are fetched.

**Fix:** These are small thumbnails so impact is moderate, but consider using lower-resolution thumbnails or WebP.

---

## Nice-to-Have (Low Impact)

### 10. `body::after` film grain SVG filter re-renders
The `feTurbulence` SVG filter used as a CSS background is rendered by the browser on every composite. On some devices this can cause jank.

**Fix:** Replace with a pre-generated small PNG tile (already done in StarField's grain — reuse that pattern).

### 11. `App.css` is unused boilerplate
The file contains default Vite template styles (`.logo`, `.card`, `.read-the-docs`) that aren't used anywhere.

**Fix:** Delete `src/App.css`.

### 12. Font loading
Sora font is preloaded via `<link rel="preload">` which is good. However, `font-display: swap` isn't explicitly set in the Google Fonts URL.

**Fix:** Append `&display=swap` to the Google Fonts URL (it may already be included by default, but making it explicit ensures FOUT over FOIT).

---

## Estimated Impact Summary

| Fix | Effort | LCP Impact | TBT Impact |
|-----|--------|------------|------------|
| Convert images to WebP | Medium | High | — |
| Reduce community image duplication | Low | Medium | Low |
| Pause canvas when off-screen | Low | — | High |
| Lazy-load logo images | Trivial | Medium | — |
| Move CSS keyframes to components | Medium | Low | Low |
| Stagger video preloading | Low | High | — |
| Delete App.css | Trivial | — | — |

---

## Recommended Priority Order

1. Convert images to WebP (biggest payload reduction)
2. Pause StarField + CredibilityParticles when off-viewport
3. Change logo images from `eager` to `lazy`
4. Reduce community marquee repeats from 6→3
5. Stagger video preloading in HeroCarousel and LiveProgramsSection
6. Move impact/collab CSS keyframes out of index.css
7. Delete unused App.css

