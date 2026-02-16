

# Adapt About Page to Match Investor Deck Branding

## Deck Color Analysis

The investor deck uses a distinct visual system that differs from the current warm/earthy theme:

- **Background**: Very light warm white (almost pure white with a subtle peachy warmth) -- not the current strong cream/beige
- **Text**: Near-black headlines (not warm brown) -- bold, high-contrast
- **Accent orange**: Bright, vivid orange (matching the site's main `hsl(24, 95%, 53%)`) -- not the toned-down `hsl(24, 80%, 45%)` currently in `.theme-warm`
- **Cards**: White backgrounds with light borders; some stat cards use solid orange fills with white text
- **Decorative elements**: Concentric orange ring patterns, orange underlines/highlights on key words, hand-drawn orange circles and arrows
- **Typography**: Bold, large sans-serif (matches the Sora font already in use)

## Changes Required

### 1. Update `.theme-warm` CSS tokens (src/index.css)

Shift the palette from cream/earthy to match the deck:

| Token | Current | New (deck-matched) |
|-------|---------|-------------------|
| background | `40 30% 95%` (warm cream) | `20 20% 97%` (light warm white) |
| foreground | `30 15% 15%` (warm brown) | `0 0% 8%` (near black) |
| card | `40 25% 97%` | `0 0% 100%` (pure white) |
| card-foreground | `30 15% 15%` | `0 0% 8%` |
| primary | `24 80% 45%` (muted orange) | `24 95% 53%` (bright vivid orange, same as site main) |
| secondary | `35 15% 90%` | `20 10% 93%` |
| muted | `35 15% 90%` | `20 10% 93%` |
| muted-foreground | `30 8% 45%` | `0 0% 45%` (neutral gray) |
| border | `35 12% 85%` | `20 5% 90%` (lighter, less warm) |
| hero-headline | `30 15% 12%` | `0 0% 5%` (near black) |
| hero-subtext | `30 8% 40%` | `0 0% 35%` (neutral dark gray) |

### 2. Update OpportunityStats component (src/components/about/OpportunityStats.tsx)

Match the deck's bold orange stat cards -- some cards should use solid orange backgrounds with white text (as seen in the deck's page 3 grid).

### 3. Update ProblemSection component (src/components/about/ProblemSection.tsx)

Adjust card styling to match the deck's cleaner white cards with subtle shadows instead of visible borders.

### 4. Update EcosystemJourney component (src/components/about/EcosystemJourney.tsx)

Brighten the timeline circles and step labels to use the vivid orange.

### 5. Update WhyUsSection component (src/components/about/WhyUsSection.tsx)

Same card treatment -- pure white backgrounds, lighter borders, slightly more shadow.

### 6. Update SuccessStories component (src/components/about/SuccessStories.tsx)

Same card treatment as above.

### 7. Update AboutHero component (src/components/about/AboutHero.tsx)

Ensure the headline text is near-black and the gradient amber accent uses the vivid orange.

### 8. Update FeaturedInSection component (src/components/about/FeaturedInSection.tsx)

Remove grayscale filter since the warm-white background already provides sufficient contrast for the logos.

### 9. Navbar consideration

The Navbar sits inside the `.theme-warm` wrapper on the About page, so it will inherit the light palette. No separate changes needed -- it should automatically adapt via CSS variable overrides.

## Technical Details

- All changes are scoped to the `.theme-warm` class, so the rest of the site remains unaffected
- The primary change is shifting from a "cream/earthy" interpretation to the deck's actual "light warm white + vivid orange + near-black text" palette
- Card styling shifts from bordered to shadow-based (matching the deck's cleaner look)
- Total files modified: 8 (index.css + 7 About sub-components)

