

# Smooth Page Load Transition (Curtain Reveal)

A full-screen dark overlay that fades away on page load, creating a cinematic "curtain rise" before the hero content appears.

---

## Changes

### 1. Add curtain overlay div (`src/pages/Index.tsx`)

Add a fixed, full-screen div as the first child inside the root container:

- `fixed inset-0 z-[100] bg-background pointer-events-none animate-curtain-rise`
- Sits above everything, fades out, then removes itself from interaction via the animation's `forwards` fill

### 2. Add keyframe animation (`src/index.css`)

```css
@keyframes curtain-rise {
  0% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}

.animate-curtain-rise {
  animation: curtain-rise 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
}
```

- 0.1s delay so the overlay is visible briefly before fading
- `visibility: hidden` at the end ensures it doesn't block clicks
- Uses the same easing curve as the hero stagger for consistency
- Respects `prefers-reduced-motion` by adding a media query that skips the animation

### 3. Reduced motion support (`src/index.css`)

```css
@media (prefers-reduced-motion: reduce) {
  .animate-curtain-rise {
    animation: none;
    opacity: 0;
    visibility: hidden;
  }
}
```

---

## How It Works

The hero stagger animations already have built-in delays (0ms, 200ms, 400ms, etc.). The curtain overlay starts opaque and fades out over ~1s. As the curtain lifts, the hero elements are mid-stagger, creating a seamless layered reveal where the dark curtain dissolves to reveal content already animating in underneath.

No JavaScript, no state management, no layout shifts -- pure CSS.

