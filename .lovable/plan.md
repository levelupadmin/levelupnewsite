

## Make Problem Points Match Reference Design

The reference image shows a different layout and style for the three problem point cards compared to what's currently on the page.

### Key Differences

1. **Layout**: Reference uses a 2-column top row + 1 centered card below (stacked layout), not 3 cards in a single row
2. **Card sizing**: Cards are larger with more padding (approx `px-10 py-6` vs current `px-5 py-3`)
3. **Text size**: Larger text inside cards (~`text-lg` or `text-xl`)
4. **Third card text**: "And you're doing it all alone" is in purple gradient text
5. **Timeline**: Has a playhead/scrubber icon at the top (purple rectangle/trapezoid shape), and a ruler with tick marks. Vertical line extends both above and below the ruler
6. **Cards have rounded-xl** with slightly more visible borders

### Changes

**File: `src/components/live-ve/VEProblem.tsx`** (timeline + cards section, ~lines 23-39)

- Replace the timeline with a video-editor-style scrubber: purple playhead icon at top, vertical line, ruler with tick marks
- Change card layout from `flex-row` to a grid: first two cards side by side, third centered below
- Increase card padding and text size
- Make the third card's text purple
- Extend the vertical line below the cards
- Cards get `rounded-xl` styling with slightly more padding

No data changes needed -- only the component layout/styling in `VEProblem.tsx`.

