

## Ultra-Fast Load Time: Performance Optimization Plan

We already fixed the duplicate Google Fonts loading. Here are the remaining high-impact optimizations, ordered from biggest win to smallest.

---

### 1. Defer Hero Carousel Videos (Biggest Win)

Right now, all **6 videos** load simultaneously with `preload="auto"` and `autoPlay`. This is by far the heaviest payload on the page -- each video is several MB.

**What changes in `HeroCarousel.tsx`:**
- Set `preload="none"` on all videos by default
- Only set `preload="auto"` and trigger `.play()` on the **active slide** and the **next slide** (for seamless transitions)
- Pause videos that are more than 1 slide away to free up bandwidth and memory
- Add a solid `bg-card` background so slides don't flash white while loading

---

### 2. Lazy-Load Below-the-Fold Sections (Big Win)

Every section component is eagerly imported and rendered. The browser must download, parse, and execute **all** component JS before anything appears -- even though only the Navbar and Hero are visible on first load.

**What changes in `Index.tsx`:**
- Use `React.lazy()` for all sections below the hero:
  - CredibilityCues, WhyLevelUp, MasterclassSection, LiveProgramsSection, ForgeSection, StudentLogosSection, TestimonialsSection, FAQSection, Footer
- Wrap them in `<Suspense fallback={null}>` so the hero renders instantly while the rest loads in the background
- This also defers the Framer Motion code bundled inside each lazy section, shrinking the critical JS path

---

### 3. Defer Lenis Smooth Scroll (Medium Win)

The Lenis library starts a perpetual `requestAnimationFrame` loop immediately on mount, competing with the browser's initial paint for CPU time.

**What changes in `use-lenis.tsx`:**
- Wrap Lenis initialization in a `requestIdleCallback` (with a `setTimeout` fallback) so the browser finishes rendering above-fold content first
- The scroll loop starts a fraction of a second later -- imperceptible to the user, but gives the browser breathing room for first paint

---

### 4. Add Resource Hints (Small Win)

Help the browser discover critical external resources earlier.

**What changes in `index.html`:**
- Add `<link rel="preload" as="image">` for the LevelUp logo SVG (used in the Navbar, always above fold)
- Add `<link rel="dns-prefetch">` for `cdn.prod.website-files.com` (masterclass images)
- Add `<link rel="dns-prefetch">` for `commondatastorage.googleapis.com` (hero videos)

---

### 5. Add Image Optimization Attributes (Small Win)

Images in below-fold sections already use `loading="lazy"`, which is good. But they're missing attributes that prevent layout shift and improve decode performance.

**What changes across section components:**
- Add `decoding="async"` to all `<img>` tags in MasterclassSection, LiveProgramsSection, TestimonialsSection, ForgeCarousel, and Footer
- Add explicit `width` and `height` attributes where possible to prevent Cumulative Layout Shift (CLS)

---

### Summary of Files Changed

| File | Change |
|---|---|
| `index.html` | Add preload and dns-prefetch hints |
| `src/pages/Index.tsx` | Lazy-load 9 below-fold sections |
| `src/components/HeroCarousel.tsx` | Defer video loading to active + next slide only |
| `src/hooks/use-lenis.tsx` | Defer initialization until after first paint |
| `src/components/MasterclassSection.tsx` | Add `decoding="async"` to images |
| `src/components/LiveProgramsSection.tsx` | Add `decoding="async"` to images |
| `src/components/TestimonialsSection.tsx` | Add `decoding="async"` to images |
| `src/components/ForgeCarousel.tsx` | Add `decoding="async"` to images |
| `src/components/Footer.tsx` | Add `decoding="async"` to logo images |

### Expected Impact

- **Initial network payload**: Drops dramatically -- from 6 simultaneous video downloads to 1-2
- **Largest Contentful Paint (LCP)**: Hero text and navbar appear without waiting for videos or below-fold JS
- **Total Blocking Time (TBT)**: Reduced by deferring Framer Motion parsing for 9 lazy sections
- **Time to Interactive (TTI)**: Faster -- Lenis deferred, below-fold code split out
- **Cumulative Layout Shift (CLS)**: Improved with `decoding="async"` on images

