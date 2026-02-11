
## Mobile Accordion for Live Programs Section

### What changes
On mobile screens, the current sidebar + featured card layout will be replaced with an accordion-style list. Each program becomes a collapsible item -- the first one opens by default, and users can tap any program title to expand its details. The desktop layout stays exactly the same.

### How it will look
- Each accordion item shows the program title as the trigger
- When expanded, it reveals the program image, description, badges (duration, status, format, start date), instructor info, and spots left
- First program ("Directing Intensive") is open by default
- Only one program is open at a time

### Technical details

**File: `src/components/LiveProgramsSection.tsx`**

1. Import the Accordion components from `@/components/ui/accordion`
2. Wrap the existing desktop layout (`flex-col md:flex-row` container) with `hidden md:flex` so it only shows on desktop
3. Add a new `md:hidden` block containing a Radix Accordion (`type="single"`, `collapsible`, `defaultValue="directing-intensive"`)
4. Each `AccordionItem` maps over `showcasePrograms`, using `prog.id` as the value
5. The `AccordionTrigger` shows the program title with status badge
6. The `AccordionContent` contains:
   - Program image (aspect ratio maintained)
   - Meta badges (duration, status)
   - Description text
   - Format and start date
   - Instructor and spots left indicator
7. Reuses existing `statusStyles` for consistent badge styling
