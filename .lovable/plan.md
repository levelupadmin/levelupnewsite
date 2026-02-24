

# Improve the Terms of Service Page

## Current Issues
- Wall of dense text with no visual breathing room
- No way to quickly navigate to specific sections (14 sections total)
- No "last updated" date shown
- Inconsistent section numbering (some have numbers, some don't)
- Long paragraphs with no visual breaks make it hard to scan
- No way to get back to top after scrolling deep

## Proposed Improvements

### 1. Add "Last Updated" date subtitle
- Add a subtitle below the title (same pattern as Privacy Policy's "Effective Date")

### 2. Add a clickable Table of Contents
- Render a styled box at the top listing all 14 sections as anchor links
- Each section gets an `id` attribute for smooth scrolling
- Styled with a card background (`bg-card border border-border rounded-lg p-6`)

### 3. Consistent section numbering
- Ensure all h2 headings have proper numbering (1-14)
- Subsections use dot notation (4.1, 4.2, etc.) -- already partially done

### 4. Visual section dividers
- Add `border-b border-border pb-8` to each `<section>` for clear separation between sections

### 5. Floating "Back to Top" button
- Small fixed button in bottom-right that appears after scrolling past the TOC
- Smooth scrolls back to the page top

### 6. Key callout styling for important notices
- The all-caps legal warnings (Sections 8, 9, 10) get a subtle card/callout treatment (`bg-muted/50 border-l-2 border-primary p-4 rounded`) to signal their importance

### Technical Changes
- **`src/pages/Terms.tsx`** -- restructure with TOC, section IDs, dividers, callout styling, back-to-top button, and last-updated date

No new dependencies required. All changes are in a single file.

