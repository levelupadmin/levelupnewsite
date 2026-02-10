

# Restyle Brand Names in Scrolling Marquee

## What changes
Make the brand names bolder, larger, and remove the pill/border styling so they appear as strong standalone text that pops against the dark background.

## Details
- Remove `border border-border rounded-full px-5 py-2` (pill outline and padding)
- Increase font size from `text-xs md:text-sm` to `text-sm md:text-base lg:text-lg`
- Add `font-bold` or `font-semibold` for heavier weight
- Change text color from `text-foreground/70` to `text-foreground/90` for more contrast
- Keep hover effect (brighten to full `text-foreground`) and uppercase tracking
- Adjust gap between items to account for removed pill padding

## File
- `src/components/StudentLogosSection.tsx` — update the `<span>` className for brand items

