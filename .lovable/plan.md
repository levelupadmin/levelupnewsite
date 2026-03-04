

## Fix: Standardize Bottom Padding in Expanded Card to Match Other Cards

The expanded state uses `p-6 md:p-8` while the compressed state uses `p-7 md:p-10`. The illustration wrapper also has `pb-4` which creates inconsistent bottom spacing. The bottom of the expanded card content likely clips or sits too close to the card edge.

### Changes in `src/components/WhyLevelUp.tsx`

1. **Match expanded padding to compressed padding** — Change the expanded state wrapper (line 194) from `p-6 md:p-8` to `p-7 md:p-10` to match the compressed state's padding, ensuring consistent spacing across all states.

2. **Ensure illustration wrapper bottom padding is consistent** — The illustration wrapper (line 200) currently has `pb-4`. This is fine and matches the memory note about Expert Membership Card's `pb-4` breathing room.

### Single file change

| File | Change |
|------|--------|
| `src/components/WhyLevelUp.tsx` | Line 194: change `p-6 md:p-8` → `p-7 md:p-10` in expanded state wrapper |

