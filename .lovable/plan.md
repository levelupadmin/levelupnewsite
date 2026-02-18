

# Update Forge Section Text Content

## What Changes
Replace the headline and description in the Forge section's left column with the new copy provided.

## Current Text (to be replaced)
- Headline: "Where you *become*"
- Description: "A filmmaking bootcamp for aspiring filmmakers, writers, creators, and storytellers -- where in 12 days we teach you filmmaking hands-on and you create your very own short film."

## New Text
- Headline: "Where you *become*" (kept as-is based on the image reference)
- Description split into two paragraphs:
  1. "The Forge is an offline, immersive learning experience that brings together travel, hands-on creation, and a like-minded community."
  2. "Built for filmmakers, writers, founders, builders, artists, and creators, The Forge is designed for people who want to learn by doing in an environment built for growth."
  3. "Over an intensive week with practicing creators and mentors, participants move beyond theory. They apply what they learn in real time, collaborate with peers, and build a complete project of their own."

## Technical Details

### File: `src/components/ForgeSection.tsx`
- Lines 145-154: Replace the single `<p>` description with the three paragraphs above, each in its own `<p>` tag styled consistently with the existing `font-sans-body text-sm md:text-base text-hero-subtext leading-relaxed` classes.
- The headline "Where you *become*" stays unchanged.
- Spacing between paragraphs will use `mt-3` for a comfortable reading flow.

### No other files change.

