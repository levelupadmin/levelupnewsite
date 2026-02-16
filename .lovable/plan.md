

# About Page Glow-Up: From "Meh" to Cinematic

The page has decent structure but still feels flat and text-heavy. Here's a focused set of high-impact upgrades to inject life, depth, and visual storytelling.

---

## 1. Hero -- Add floating creator portrait collage

Right now the hero is stars + rings + text. It's atmospheric but impersonal. Add a subtle grid of floating creator portraits (using existing masterclass/testimonial assets) behind the text with heavy blur and low opacity -- giving it a "faces of the community" vibe without competing with the headline.

**Assets to use**: `masterclass-1.jpg` through `masterclass-6.jpg` arranged in a loose scattered grid behind the text.

---

## 2. Problem Section -- Full-bleed split layout with overlay text on image

The cinematic image is hidden on mobile and feels like a sidebar on desktop. Instead, make it a full-width background image with a dark gradient overlay, and float the problem cards on top with a glassmorphism treatment (backdrop-blur + semi-transparent bg). This creates a dramatic, editorial magazine feel.

---

## 3. Ecosystem Journey -- Add a large background photo strip

The 4 small thumbnail squares feel like clip-art. Replace them with larger card-style panels where each step has a half-image, half-text layout (image on top, text below), creating a visual storyboard feel. Use the existing images at a much larger size.

---

## 4. Manifesto Section -- Add a large hero-style image break before the tenets

Insert a full-width cinematic image divider (using `forge-filmmaking-banner.jpg` or `all-masters.png`) between the manifesto intro text and the tenet cards. This creates a visual breathing moment and breaks up the wall of cards.

---

## 5. Why Us Section -- Add relevant imagery to each pillar card

Each card is just an icon + text. Add a small relevant photo to each card (e.g., `all-masters.png` for Mentor IP, a community photo for Community Flywheel, logo collage for Brand Partners) to make them visually richer.

---

## 6. Closing Vision -- Add a background texture/image

The solid orange gradient is fine but flat. Layer a subtle dark cinematic background image (`hero-cinematic.jpg`) with an orange overlay blend, giving it depth and texture instead of a flat color block.

---

## 7. Featured In -- Make logos bigger and add a subtle card treatment

The press logos are tiny (h-4 to h-5) and nearly invisible. Increase to h-8 with better spacing and wrap in a subtle card/band for more presence.

---

## Technical Details

### Files to modify:
- `src/components/about/AboutHero.tsx` -- floating portrait collage behind text
- `src/components/about/ProblemSection.tsx` -- full-bleed image bg with glassmorphism cards
- `src/components/about/EcosystemJourney.tsx` -- larger image-card panels for each step
- `src/components/about/ManifestoSection.tsx` -- full-width image divider before tenets
- `src/components/about/WhyUsSection.tsx` -- add photos to pillar cards
- `src/components/about/ClosingVision.tsx` -- textured background with image + orange overlay
- `src/components/about/FeaturedInSection.tsx` -- larger logos, card treatment

### No new dependencies needed
All changes use existing Tailwind utilities, existing image assets, and Framer Motion (already installed).

