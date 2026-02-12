

## Resize the Mini CTA Banner to Fill Sidebar Space

The Mini CTA banner at the bottom of the sidebar has a lot of empty space above it. The fix is to make it grow to fill that available space and increase its internal size.

### Changes (single file: `src/components/LiveProgramsSection.tsx`)

**1. Make the banner container fill available space**
- Change `mt-auto p-4` to `mt-auto p-4 flex-1 flex flex-col justify-end` so the banner wrapper stretches into the empty area

**2. Make the inner card taller**
- Add `flex-1` to the inner bordered card so it expands to fill the wrapper
- Change the inner layout to use flex-col with justify-end so content sits at the bottom while the image fills the space above

**3. Increase internal padding**
- Bump inner padding from `p-4` to `p-5` for a roomier feel

**4. Slightly larger text**
- Increase the question text from `text-xs` to `text-sm`
- Increase the CTA link from `text-xs` to `text-sm`

This keeps the same visual design but stretches the banner vertically to use the dead space between the last program item and the bottom of the sidebar.

