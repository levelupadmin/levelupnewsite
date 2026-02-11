

## Convert FAQ Section to Accordion Style

Replace the current bento-style card grid with a clean accordion layout using the existing Radix UI Accordion component.

### Changes

**File: `src/components/FAQSection.tsx`**

1. Import `Accordion, AccordionItem, AccordionTrigger, AccordionContent` from `@/components/ui/accordion`
2. Remove the masonry grid layout (`columns-1 sm:columns-2 lg:columns-3`)
3. Remove the `cardStyles`, `featuredStyle` variables and per-card styling
4. Replace the card-based layout with a single `<Accordion type="single" collapsible>` containing `AccordionItem` for each FAQ
5. Style the accordion to match the dark premium aesthetic:
   - Dark border colors using existing theme tokens
   - Sora font for questions (semi-bold) and answers (regular weight, muted color)
   - Comfortable padding and spacing
6. Keep the section header and "Still have questions?" footer unchanged

No new dependencies -- the Accordion component from Radix is already installed and configured.

