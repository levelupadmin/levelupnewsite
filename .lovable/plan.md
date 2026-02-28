

## Add New Community Images to Carousel

### Steps

1. **Copy 9 uploaded images** to `src/assets/community/` as `community-7.jpg` through `community-15.jpg`

2. **Update `src/components/CommunitySection.tsx`**:
   - Add imports for all 9 new images
   - Redistribute all 15 images (6 existing + 9 new) across the 3 marquee rows (5 per row)
   - Update alt text for each new image

### Technical Details

Row distribution (5 images each):
- Row 1 (scroll-left): community-1, community-7, community-8, community-9, community-10
- Row 2 (scroll-right): community-2, community-3, community-11, community-12, community-13
- Row 3 (scroll-left): community-4, community-5, community-6, community-14, community-15

Files changed: `src/components/CommunitySection.tsx`, 9 new image assets

