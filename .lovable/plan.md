

## Fix: LiveProjectsCard overflowing its container

**Problem**: The notification toast (line 166) is absolutely positioned within the outer wrapper div but *outside* the inner rounded card (line 69). This causes it to visually overflow beyond the card boundaries visible in the WhyLevelUp section.

**Solution**: Move the notification toast *inside* the inner card container (the `w-[90%] h-[94%] rounded-xl overflow-hidden` div) so it gets properly clipped by its `overflow-hidden` and `rounded-xl` boundaries.

**Change in `src/components/why-levelup/LiveProjectsCard.tsx`**:

1. Move the notification toast div (lines 166-183) from being a sibling of the inner card to being a child inside it — place it just before the closing `</div>` of the inner card (before line 160).

2. Adjust positioning from `top-6 right-6` to `top-2 right-2` since it's now relative to the smaller inner card.

This keeps the exact same visual appearance while ensuring proper clipping within the card boundaries.

