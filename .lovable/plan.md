

## Increase the Featured Card Size in the Live Programs Section

The featured card (sidebar + image + content area) in the "Live + Mentor-Led" section will be made larger to accommodate more information.

### Changes

**File: `src/components/LiveProgramsSection.tsx`**

1. **Increase the image area** -- Change the image from `md:w-1/2` to `md:w-[45%]` and add a minimum height (`md:min-h-[420px] lg:min-h-[480px]`) so it's taller.
2. **Increase content padding** -- Bump padding from `p-6 md:p-8 lg:p-10` to `p-6 md:p-10 lg:p-12` for more breathing room.
3. **Increase sidebar button padding** -- Change `py-4 md:py-5` to `py-5 md:py-6` so the sidebar items stretch to fill the taller card.
4. **Increase overall container max-width** -- Optional: keep `max-w-7xl` but could be changed if needed.

These changes give you a taller, more spacious featured card with room to add more details like learning outcomes, pricing, or CTA buttons in the future.

