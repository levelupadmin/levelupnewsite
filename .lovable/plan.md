

# Revert to Full Black Background Site-Wide

## Overview
Remove all light-themed sections so the entire site uses the dark black background consistently. Adjust text colors in those sections to ensure readability on the dark background.

## Changes

### 1. CSS: Remove or disable `section-light` class (src/index.css)
- Remove the `.section-light` block (lines 67-83) that overrides background to warm off-white and text to dark colors

### 2. Remove `section-light` class from components
These files currently apply `section-light` and need it removed:

- **src/components/WhyLevelUp.tsx** -- remove `section-light` from the section className
- **src/components/LiveProgramsSection.tsx** -- remove `section-light` from the section className
- **src/components/FAQSection.tsx** -- remove `section-light` from the section className
- **src/components/StudentLogosSection.tsx** -- remove `section-light` from the stats wrapper div

### 3. Fix text colors in affected sections
With the dark background, some text that was styled for light mode (e.g., dark text colors, white cards) may need adjusting:

- Card backgrounds that were `bg-white` or `bg-card` (which resolved to white in light mode) should use the dark card color (`bg-card` or `bg-[hsl(0_0%_7%)]`)
- Any hardcoded light-mode text colors (like `text-black`, `text-gray-900`, etc.) should be switched to use theme tokens (`text-foreground`, `text-muted-foreground`)
- Borders that were dark-on-light should use the standard `border-border` token

### 4. Credibility Cues bridge gradient
The gradient bridge between hero and the previously-light WhyLevelUp section may need simplification since both sections will now be the same dark color.

## Result
The entire website will have a consistent pure black (hsl(0 0% 4%)) background with light text throughout, matching the dark cinematic aesthetic.
