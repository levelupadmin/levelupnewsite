

## Plan: Redesign Footer CTA to Match Reference

The current footer CTA is an orange gradient card with text + sitting instructor image side by side. The reference (first image) shows a completely different design:

### Target Design
- **Dark rounded card** (dark background, subtle orange border)
- **Hero image** at top occupying ~60% of the card, with "G VENKAT RAM" name overlaid in large serif text
- **Heading**: "Learn from the Ace art director" (white, bold, left-aligned)
- **CTA button**: Full-width orange gradient pill button labeled "BUY NOW AT ₹ 2499"
- **Subtext**: "Enroll now and get bonuses worth Rs.19,999 for free. There was never a better time to grab this on-demand program."

### Changes in `src/pages/MasterclassDetail.tsx` (lines 610–648)

1. **Replace the orange gradient card** with a dark card (`bg-[#1a1a1a]` or similar) with a subtle orange/amber border (`border border-primary/30`), `rounded-2xl`, `overflow-hidden`
2. **Top section**: Use the existing hero background image (`data.heroImage`) filling the top portion with the instructor's name overlaid in large Bebas Neue / serif-display text
3. **Bottom section**: Dark area with:
   - Heading: "Learn from the Ace art director"
   - Full-width orange gradient button: "BUY NOW AT ₹ 2499" linking to `data.ctaLink`
   - Muted subtext about bonuses
4. **Remove** the separate sitting instructor image (`gvrSittingImg`) from this section
5. **Update `ctaText`** in `src/data/masterclassPages.ts` to "BUY NOW AT ₹ 2499"

### Changes in `src/data/masterclassPages.ts`
- Update `ctaText` to `"BUY NOW AT ₹ 2499"`
- Add a new field (e.g., `footerHeading`) for "Learn from the Ace art director" or hardcode it in the component

