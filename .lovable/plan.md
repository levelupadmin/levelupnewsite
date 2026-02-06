

# Redesign "The Forge" Section to Match Reference Composition

## What Changes

The current Forge section uses a centered-headline-over-collage layout. The reference shows a fundamentally different composition: a **split content layout** with text and feature points side by side at the top, and a **large, dominant visual showcase** floating below.

---

## New Layout Structure

```text
+------------------------------------------------------------------+
|                                                                    |
|  [Left Column ~50%]              [Right Column ~50%]              |
|                                                                    |
|  Small label tag                 Icon + Feature headline 1        |
|  "The inner circle"              Supporting line                  |
|                                                                    |
|  Large bold headline:            Icon + Feature headline 2        |
|  "Where you become"              Supporting line                  |
|                                                                    |
|  Supporting paragraph            Icon + Feature headline 3        |
|  (one-liner about the            Supporting line                  |
|   residency experience)                                           |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|          +------------------------------------------+             |
|          |                                          |             |
|          |    Large floating cinematic visual        |             |
|          |    (forge collage / composite image)      |             |
|          |    with rounded corners, soft shadow,     |             |
|          |    and subtle overlapping screenshots      |             |
|          |    of Forge moments on left + right       |             |
|          |                                          |             |
|          +------------------------------------------+             |
|                                                                    |
|     [Left peek image]   [Center main]   [Right peek image]        |
|                                                                    |
|            "Invite-only"  "Limited cohorts"  "Offline"            |
|                                                                    |
|                      Enter The Forge -->                           |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Detailed Plan

### 1. Top Section: Split Two-Column Layout

**Left column (text block):**
- A small uppercase label/tag above the headline (e.g., "The inner circle" in primary/amber color, small tracked text)
- The existing emotionally charged headline: "Where you *become*"
- A supporting paragraph explaining the residency experience

**Right column (feature points):**
- 2-3 feature/benefit blocks, each containing:
  - A subtle icon (from lucide-react, e.g., `Flame`, `Users`, `MapPin`)
  - A bold, belief-driven headline (e.g., "Pressure that transforms", "Mentorship without filters", "Offline. Immersive. Real.")
  - A one-line supporting description
- These replace the current contextual cues ("Invite-only", "Limited cohorts", etc.) with richer, more descriptive blocks

**Responsive:** Stacks to single column on mobile.

### 2. Bottom Section: Large Floating Visual Showcase

Instead of the current 4-image asymmetric collage, create a **layered visual composition** inspired by the reference:

- A **large, centered main image** (forge-1.jpg) displayed as a prominent card with rounded corners and a cinematic shadow
- **Two flanking images** (forge-2.jpg on the left, forge-4.jpg on the right) partially visible/peeking from behind or beside the main image, creating depth
- The third image (forge-3.jpg) can appear as a subtle overlay or caption card within the main visual
- This creates a "floating product showcase" feel adapted to The Forge's documentary aesthetic

**Alternative approach (simpler, still matching the reference hierarchy):** A single wide hero image (spanning ~80% width) with two smaller overlapping/offset images on the sides, creating a layered editorial look.

### 3. Bottom Cues and CTA

- Keep the contextual cues ("Invite-only", "Limited cohorts", "Offline, immersive") as subtle tracked uppercase text beneath the visual
- Keep the quiet "Enter The Forge" CTA with arrow

---

## Technical Details

### File Modified
- `src/components/ForgeSection.tsx` -- complete rewrite of the component

### Implementation Notes
- Continue using `framer-motion` for staggered entrance animations (consistent with all other sections)
- Use `lucide-react` icons for the feature points (e.g., `Flame`, `Users`, `MapPin` or similar)
- Maintain the existing image imports (`forge-1.jpg` through `forge-4.jpg`)
- Use existing design tokens: `text-hero-headline`, `text-hero-subtext`, `text-primary`, `text-muted-foreground`, `bg-background`, `bg-card`, `font-serif-display`, `font-sans-body`
- The main visual card will use `shadow-cinematic` and `rounded-sm` for the premium editorial feel
- Feature point icons will use `text-primary` (amber) for warmth
- Responsive breakpoints: single-column stacked on mobile, two-column split on `md:` and above
- The layered image composition will use absolute positioning and negative margins/offsets for the flanking images, with `z-index` layering

### Content for Feature Points

| Icon | Headline | Supporting Line |
|------|----------|----------------|
| Flame | Pressure that transforms | Not comfort. Not theory. Real creative intensity, shoulder to shoulder. |
| Users | Mentorship without filters | Work directly with creators who've shaped the industry. No layers between you and the work. |
| MapPin | Offline. Immersive. Real. | Step away from screens. Live, create, and break through — together, in one place. |

