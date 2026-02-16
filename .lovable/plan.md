

## Update Pre-Footer CTA Section

The `TrustedCTASection` component already exists with teacher avatars and styling, but needs two changes:

### 1. Update the copy

Replace the current text with the requested copy:
- **Headline:** "Trusted by India's best"
- **Subline:** "It's time for you to take the leap."
- Remove the "India's Creative Career Infrastructure" badge and the stats row to keep the section focused and emotionally driven (aligned with the brand's tone of not leading with statistics)

### 2. Add the section to the page

The component is imported in `Index.tsx` but never rendered. It needs to be placed between `FAQSection` and `Footer`.

### Technical Details

**File: `src/components/TrustedCTASection.tsx`**
- Change the headline from "The most intentional way to learn the craft." to "Trusted by India's best"
- Change the subline to "It's time for you to take the leap."
- Remove the badge text and stats row for a cleaner, more emotional close
- Keep the teacher avatar row, amber accent line, radial glow, and CTA button as-is

**File: `src/pages/Index.tsx`**
- Add `<TrustedCTASection />` between `<FAQSection />` and `<Footer />` in the render order

