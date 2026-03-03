

## Plan: Remove bottom fade and enlarge masters image

**What changes:**
In `src/components/TrustedCTASection.tsx`:

1. **Remove the radial gradient mask** — the current `maskImage` / `WebkitMaskImage` style on the image wrapper creates the fade effect on all edges including the bottom. Remove it entirely.
2. **Increase image size** — change `max-w-md md:max-w-lg` to `max-w-lg md:max-w-2xl` so the group photo is significantly larger.

Single file edit, two property changes.

