

## Plan: Add "Other Masterclasses" Horizontal Scroll Section

Insert a new section between the footer CTA (line 650) and the back link (line 652) showing other masterclass posters in a horizontal scrollable row.

### Changes in `src/pages/MasterclassDetail.tsx`

1. **Import** all masterclass images (same ones from `MasterclassSection.tsx`: karthikImg, anthonyImg, venketImg, kiranImg, raviImg, lokeshImg, nelsonImg)

2. **Define** an inline `otherMasterclasses` array with name, image, and href for each masterclass

3. **Filter** out the current masterclass by matching `data.name`

4. **New section** (~30 lines of JSX) inserted after line 650:
   - Section with `py-16` dark background
   - Centered heading: "Check out our other masterclasses" (font-serif-display, amber gradient on "other masterclasses")
   - Horizontal scroll container: `overflow-x-auto`, `scrollbar-hide`, `snap-x`, `flex gap-6`
   - Cards: 3:4 aspect ratio (~200px wide mobile, ~220px desktop), rounded, image cover, hover glow shadow matching homepage style
   - Each card links to its respective masterclass page (internal Link or external anchor)

