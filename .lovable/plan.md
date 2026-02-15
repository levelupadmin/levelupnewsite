

# Performance Optimization Plan for LevelUp Learning

## Current Issues Identified

After a thorough audit of the codebase, here are the key performance bottlenecks causing the site to feel slow and laggy:

---

## 1. Heavy Video Loading

**Problem:** The Hero Carousel loads 3 videos (including one from an external Google storage URL), and the Live Programs section loads 4 more videos. That's 7 videos total, all competing for bandwidth.

**Fix:**
- Add `loading="lazy"` behavior to hero carousel videos -- they already use Intersection Observer but the external video (`ElephantsDream.mp4`) is a large file from a remote server
- Consider replacing the external placeholder video with a local lightweight clip or removing it entirely
- Add `fetchpriority="low"` to non-active videos in the Live Programs section

---

## 2. Framer Motion Bundle Size

**Problem:** Full `framer-motion` is imported directly in multiple components (Navbar, HeroSection, HeroCarousel, SplitTextReveal). The Navbar alone uses `motion`, `AnimatePresence`, `useMotionValueEvent`, and `useScroll` -- this is a heavy import for a component that renders immediately.

**Fix:**
- Switch to `LazyMotion` with `domAnimation` features in `App.tsx` to reduce the Framer Motion bundle by ~50%
- Use `m` (lightweight motion component) instead of `motion` throughout
- The SplitTextReveal component is imported but doesn't appear to be actively used on the page -- remove or lazy-load it

---

## 3. Masterclass Images from External CDN

**Problem:** The MasterclassSection loads 7 images from `cdn.prod.website-files.com` (an external Webflow CDN). Each requires a DNS lookup, TCP connection, and TLS handshake. These are also not optimized sizes.

**Fix:**
- Download these images locally and serve them from the project's own assets (same as other sections do)
- Alternatively, add `<link rel="preconnect">` for this CDN in `index.html` (a quick win)

---

## 4. Lenis Smooth Scroll Overhead

**Problem:** The `useLenis` hook creates a custom smooth scroll engine that runs `requestAnimationFrame` continuously -- even when the user isn't scrolling. This consumes CPU on every frame.

**Fix:**
- Remove Lenis entirely. The site already has `scroll-behavior: smooth` in CSS, which handles smooth scrolling natively with zero JS overhead
- Lenis is most useful for complex scroll-linked animations, but those have been intentionally removed from this project

---

## 5. Student Logos Marquee Duplicating DOM Elements

**Problem:** The `StudentLogosSection` renders each logo row 4 times (`[...row, ...row, ...row, ...row]`), creating 48 `<img>` elements for what is essentially a CSS animation. This is excessive DOM weight.

**Fix:**
- Reduce duplication to 2x (the minimum needed for seamless looping), cutting DOM nodes in half

---

## 6. Navbar Scroll Listener Running on Every Pixel

**Problem:** `useMotionValueEvent(scrollY, "change", ...)` fires on every scroll frame. Inside it, `setScrolled` and `setActiveIndex(null)` are called, causing re-renders even when the values haven't changed.

**Fix:**
- Guard state updates: only call `setScrolled` when the value actually changes
- Remove the `setActiveIndex(null)` call from the scroll handler (it closes dropdowns on any scroll, even tiny ones) -- move it to a threshold-based check

---

## 7. MasterclassCard 3D Tilt Effect

**Problem:** Each `MasterclassCard` uses `onMouseMove` to apply a `perspective/rotateX/rotateY` transform on every mouse movement. With 8 cards on screen, this creates continuous style recalculations.

**Fix:**
- Throttle the `handleMouseMove` using `requestAnimationFrame` to limit updates to 60fps
- Add `will-change: transform` (already present) and use CSS `contain: layout style` for better compositing

---

## 8. Missing Image Optimization

**Problem:** Many images are PNGs and JPGs served at their original resolution. No `width`/`height` attributes are set, causing layout shifts (CLS).

**Fix:**
- Add explicit `width` and `height` attributes to key images (hero background, logo, program images)
- This prevents layout shift and helps the browser allocate space before images load

---

## Implementation Order (by impact)

| Priority | Change | Impact |
|----------|--------|--------|
| 1 | Remove Lenis (constant rAF loop) | High -- eliminates continuous CPU usage |
| 2 | Switch to LazyMotion + `m` components | High -- reduces JS bundle ~30-50KB |
| 3 | Guard Navbar scroll state updates | Medium -- reduces unnecessary re-renders |
| 4 | Reduce logo marquee duplication (4x to 2x) | Medium -- halves DOM nodes |
| 5 | Throttle MasterclassCard tilt with rAF | Medium -- reduces style recalculations |
| 6 | Add preconnect for external image CDN | Low -- quick network win |
| 7 | Add width/height to key images | Low -- reduces layout shift |
| 8 | Remove/replace external placeholder video | Low -- saves bandwidth |

---

## Technical Details

### Removing Lenis
- Delete `src/hooks/use-lenis.tsx`
- Remove any imports/usage (currently it's defined but may not be called -- will verify)
- CSS `scroll-behavior: smooth` already handles anchor scrolling

### LazyMotion Setup
```text
App.tsx:
  import { LazyMotion, domAnimation } from "framer-motion"
  Wrap app in <LazyMotion features={domAnimation}>

All components using motion:
  import { m } from "framer-motion" (instead of motion)
```

### Navbar Scroll Guard
```text
// Only update when crossing threshold
const newScrolled = latest > 40;
if (newScrolled !== scrolledRef.current) {
  scrolledRef.current = newScrolled;
  setScrolled(newScrolled);
}
```

### rAF Throttle for Tilt
```text
let rafId: number | null = null;
const handleMouseMove = (e) => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    // apply transform
    rafId = null;
  });
};
```

