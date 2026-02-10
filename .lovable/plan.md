

# Restyle ProgramsTabsSection Tabs to Match Reference

## What changes
The tab navigation in `ProgramsTabsSection.tsx` needs minor styling tweaks to exactly match the reference image's tab format:

1. **Active tab underline**: Make the bottom border thicker (3px) and use the primary orange color, matching the reference's bold underline style
2. **Tab spacing**: Increase horizontal gap between tabs for a more spread-out look like the reference
3. **Tab text sizing**: Slightly larger text to match the reference's more prominent tab labels
4. **Separation**: Add more margin between the tab bar and the content card below

## Technical details

### File: `src/components/ProgramsTabsSection.tsx`

**Tab trigger styling changes:**
- Increase gap between tabs from `gap-1 md:gap-2` to `gap-4 md:gap-8`
- Increase bottom margin from `mb-6 md:mb-8` to `mb-8 md:mb-10`
- Change active border from `border-b-2` to `border-b-[3px]` for a thicker underline
- Bump text size to `text-base md:text-lg`
- Add more horizontal padding `px-5 md:px-8`

These are purely CSS class adjustments -- no structural or logic changes needed.

