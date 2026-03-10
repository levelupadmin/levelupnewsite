

## Plan: Forge Section Cards & Navbar Dropdown Overhaul

### 1. Update Forge card data (`src/components/ForgeSection.tsx`)

Replace the `forgeCards` array with simplified data:

| Card | Title | Description | Location badge (top-right) | CTA |
|------|-------|-------------|---------------------------|-----|
| Writing Retreat | Writing Retreat | A 6-day scenic retreat where writers unplug, immerse deeply, and learn from bestselling storytellers. | Coorg, July 2026 | REQUEST AN INVITE |
| Filmmaking Bootcamp | Filmmaking Bootcamp | An intensive 15-day bootcamp where filmmakers write, direct, and shoot short films with top mentors. | Goa, April 2026 | REQUEST AN INVITE |
| Forge Creators | Creator Residency | An invite-only 12-day residency where founders build personal brands through daily content and creator mentorship. | Goa, May 2026 · Bali, June 2026 | REQUEST AN INVITE |

- Remove `tag` field (the uppercase label above titles like "BOOTCAMP", "6-DAY RETREAT")
- Remove `learnMore` field and the "Learn More" button
- Replace `editions` array with a simple `locations` string array for the top-right badge
- Single CTA: "REQUEST AN INVITE" in full caps, orange background (`bg-primary`), linking to existing `cta` URLs

### 2. Update card rendering (`src/components/ForgeSection.tsx`)

In the carousel card template (lines 213-270):
- Remove the `{card.tag}` line (the small uppercase text above title)
- Remove the editions list (`flex flex-col gap-1.5 mb-4` block)
- Remove the "Learn More" button, keep only one CTA styled as `REQUEST AN INVITE` in uppercase
- Change the top-right badge from "X upcoming editions" to show location/date strings (e.g., "Goa, April 2026")

### 3. Update navbar Forge dropdown (`src/components/navbarData.ts`)

- Change description from `"India's first residency for filmmakers and storytellers."` to `"The world's only residency for filmmakers, creators, writers, and storytellers."`
- Update subtitles:
  - Filmmaking Residency → `"15 days · 24 filmmakers · 24 short films"`
  - Writing Retreat → `"20 writers · 6 days · 1 beautiful location"`
  - Creator Residency → `"Build your personal brand in 12 days"`

### 4. Images

The user mentioned they will provide images for both the cards and the navbar. Current images will remain as placeholders until they upload replacements.

