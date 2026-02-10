

# New Tabbed Programs Section

## Overview
Create a new `ProgramsTabsSection` component with three tabs (Filmmaking, Writing, Creators), each displaying a split-layout card inspired by the reference image. The section will sit between the existing ForgeSection and StudentLogosSection.

## Layout per tab
Each tab content area is a large rounded dark card (`bg-[hsl(0_0%_7%)]`) with a two-column split:
- **Left (40-50%)**: Heading, description paragraph, and a "Learn more" button (white bg, dark text, rounded-full -- matching the reference)
- **Right (50-60%)**: An image carousel using the existing Embla setup, showing 2-3 images per tab with dot indicators

## Tab navigation
- Horizontal tab bar centered above the card
- Inactive tabs: `text-muted-foreground`, active tab: `text-foreground font-bold` with a subtle bottom border/underline in primary orange
- Uses Radix Tabs primitives (already installed)

## Content for each tab
- **Filmmaking**: Heading about the filmmaking bootcamp, description about hands-on short film creation, carousel using `forge-filmmaking-banner.jpg` and existing forge images
- **Writing**: Heading about writing retreats, description about storytelling craft, carousel using `forge-writing-banner.jpg` and existing assets
- **Creators**: Heading about creator workshops, description about building and shipping creative work, carousel using `forge-creators-banner.jpg` and existing assets

## Placement
Insert between ForgeSection and StudentLogosSection in `Index.tsx`, lazy-loaded like other sections.

## Technical details

### New file: `src/components/ProgramsTabsSection.tsx`
- Import Radix `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `@/components/ui/tabs`
- Import `useEmblaCarousel` and `Autoplay` for each tab's image carousel
- Import existing forge banner images as placeholders
- Use `framer-motion` for entrance animation (fade-in on scroll)
- Each tab content renders a flex/grid row: left text block + right carousel
- "Learn more" button styled as `bg-white text-background rounded-full px-6 py-3 font-medium`
- Mobile: stack vertically (image carousel above or below text)

### Modified file: `src/pages/Index.tsx`
- Add lazy import for `ProgramsTabsSection`
- Place it after `ForgeSection` and before `StudentLogosSection`

### Styling
- Section: `py-12 md:py-16` matching existing spacing
- Card: `bg-[hsl(0_0%_7%)] rounded-2xl p-8 md:p-12`
- Tab bar: custom styled with `bg-transparent` list, triggers with hover/active states using primary color
- Carousel dots: orange active dot, muted inactive dots (same pattern as ForgeCarousel)
- All fonts use existing `font-serif-display` for headings, `font-sans-body` for body text
