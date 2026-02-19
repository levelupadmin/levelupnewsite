

## Use Uploaded Community Images in Bento Grid

### What Changes
Replace the 11 broken CDN URLs in the Community Section with the 6 uploaded images. The grid will be adjusted from 11 items to 6, with updated row/column spans to maintain a visually balanced bento layout.

### Image Mapping
The 6 uploaded images will be copied to `src/assets/community/` and used as follows:

| Image | Description | Grid Position |
|-------|-------------|---------------|
| image-60.png | Group photo at venue | col-span-2, row-span-1 (wide) |
| image-61.png | Cafe learning session | col-span-1, row-span-2 (tall) |
| image-62.png | Group selfie indoors | col-span-1, row-span-1 |
| image-63.png | Hilltop group photo | col-span-2, row-span-1 (wide) |
| image-64.png | Campfire circle session | col-span-1, row-span-2 (tall) |
| image-65.png | Night bonfire moment | col-span-1, row-span-1 |

### Grid Layout (Desktop - 5 columns)
```text
Row 1: [wide group photo (2 cols)] [tall cafe (1 col)] [selfie (1 col)] [tall campfire (1 col)]
Row 2: [hilltop wide (2 cols)]     [tall cafe cont.]   [bonfire (1 col)] [tall campfire cont.]
```

### Technical Details

**New files (copy uploads):**
- `src/assets/community/community-1.png` (image-60)
- `src/assets/community/community-2.png` (image-61)
- `src/assets/community/community-3.png` (image-62)
- `src/assets/community/community-4.png` (image-63)
- `src/assets/community/community-5.png` (image-64)
- `src/assets/community/community-6.png` (image-65)

**File: `src/components/CommunitySection.tsx`**
1. Add local imports for all 6 community images
2. Replace the `gridItems` array with 6 entries using the local imports, with updated `className` values for the new grid spans
3. Update `alt` text to match photo content
4. Adjust grid to work well with 6 items (keep `grid-cols-5` desktop, `grid-cols-2` mobile)

### What Stays the Same
- Header text, eyebrow, subtitle
- Arrow navigation buttons
- Hover scale effect, rounded corners
- Dark background, responsive behavior

