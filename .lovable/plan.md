

## Replace Community Section Images with Forge People Photos

### What Changes
Replace the current local asset images (masterclass-1..6, forge-1..4, carousel-1) with real people-focused photographs sourced from the Forge by LevelUp websites. The bento grid layout, text, and styling remain identical -- only the image sources change.

### Image Sources
11 images will be sourced directly from the Forge websites (framerusercontent.com CDN). These are high-resolution photos showing people collaborating, learning, creating content, and mentoring -- perfect for a community section.

Selected images (all featuring people):
1. Behind-the-scenes creators collaborating (6000x4000)
2. Group learning session
3. People creating content together
4. Outdoor creator challenge
5. Workshop/mentoring moment
6. Collaborative filming
7. Team discussion
8. Creator in action
9. Core learning session photo
10. Behind-the-feed session photo
11. Discover your niche / group activity photo

### What Stays the Same
- Bento grid layout (5 columns desktop, 2 mobile)
- Row span assignments for tall/short images
- Header text, eyebrow, subtitle
- Arrow navigation buttons
- Hover scale effect
- All styling, colors, dark theme
- Responsive behavior

### Technical Details

**File: `src/components/CommunitySection.tsx`**

1. Remove all local asset imports (masterclass-1..6, forge-1..4, carousel-1)
2. Replace `gridItems` array entries with external URLs from framerusercontent.com CDN, keeping the same `className` (col-span/row-span) values and updating `alt` text to be descriptive of the actual photo content
3. Update `alt` text to describe the people activities shown (e.g., "Creators collaborating on set", "Group mentoring session", "Content creation workshop")

No other files change. No new assets need to be downloaded -- images are loaded directly from the Forge CDN URLs.

