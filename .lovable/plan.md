

# Remove Category Filter Chips from Masterclass Section

## What changes
In `src/components/MasterclassSection.tsx`, remove the category filter chips (All, Filmmaking, Photography, Editing, Art Direction, Music) and the filtering logic. All masterclasses will always be shown.

## Details
- Remove the `categories` array
- Remove the `activeCategory` state
- Remove the category chips `motion.div` block (the flex-wrap container with buttons)
- Remove the filtering logic — just render `masterclasses` directly instead of `filtered`
- Keep everything else (heading, cards grid, CTA) exactly as-is

