

## Redesign "Grab the offer" Pricing Section to Match Reference

### Current vs. Reference Differences

1. **Student count row**: Currently uses a pill with `Users` icon. Reference shows **overlapping avatar circles** with bold text.
2. **"What you'll get..." heading**: Should be **orange/amber colored**, currently white.
3. **Pricing points list**: Currently simple text rows with `ChevronRight` icons. Reference shows each point in a **bordered card-like row** with an **orange checkmark circle** icon.
4. **Instructor card border**: Reference shows a subtle **amber/orange gradient border** around the card.
5. **Image scaling**: Reference shows the image filling naturally without the `scale-[0.85]` — remove that scaling and let it display at full size with `object-cover object-top`.

### Changes in `src/pages/MasterclassDetail.tsx` (lines 514–558)

1. **Student avatars** (line 523–527): Replace the pill component with 3 overlapping circular avatar images (use testimonial images already imported in the page) + bold "1800+ Students" text + subtitle.

2. **"What you'll get..." heading** (line 530): Add `text-primary` (amber) class.

3. **Pricing points** (lines 531–538): Wrap each `<li>` in a bordered card row (`bg-card border border-border rounded-lg px-4 py-3`). Replace `ChevronRight` with a filled orange checkmark circle (use `CheckCircle` from lucide-react with `text-primary`).

4. **Instructor card border** (line 543): Change `border-primary/20` to a gradient amber border effect using a wrapper div with amber gradient background + inner div with `bg-card` to simulate a gradient border.

5. **Image** (line 545): Remove `scale-[0.85]`, keep `object-cover object-top`.

### Files Modified
- `src/pages/MasterclassDetail.tsx` — pricing section only (lines ~513–558)

