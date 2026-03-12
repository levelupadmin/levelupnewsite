

## Add Profile Images to Testimonial Cards

### What Changes
Add the two uploaded profile images to the Lisa M and Prathyaksh testimonial cards in the masterclass reviews section.

### Technical Approach

1. **Copy assets** — Save `Ellipse-389ppp-p-130x130q80.png` as `src/assets/testimonial-lisa.png` and `new-boy-circle.png` as `src/assets/testimonial-prathyaksh.png`

2. **Update data model** (`src/data/masterclassPages.ts`) — Add optional `image` field to the Lisa M and Prathyaksh testimonial objects. Import the assets.

3. **Update testimonial card rendering** (`src/pages/MasterclassDetail.tsx`, ~lines 393-396) — Add an avatar image next to the name/role when `t.image` exists. Use a circular `img` element (~40px) in a flex row with the text.

### Files Modified
- `src/assets/testimonial-lisa.png` (new)
- `src/assets/testimonial-prathyaksh.png` (new)
- `src/data/masterclassPages.ts` (add image imports + fields)
- `src/pages/MasterclassDetail.tsx` (render avatar in testimonial card)

