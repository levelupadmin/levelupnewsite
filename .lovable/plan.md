

# Hero Headline Layout Fix

## What changes

Two adjustments to the hero headline in `HeroSection.tsx`:

1. **Keep "Where India's next big" on a single line**: Remove the `<br />` between the static text and the rotating word container. Instead, use `white-space: nowrap` on the first line wrapper so it never wraps, even on smaller screens.

2. **Center the rotating word**: Since the rotating word now sits on its own visual line, remove the `justify-start` and `left-0` positioning. Instead, center the container and the animated word within it. Remove the fixed `8.5ch` width and let the container use `text-center` with inline-block sizing. The longest word ("cinematographers") is ~16ch, so the container width will be set to `auto` with the word itself centered.

## Visual result

```text
Line 1:  Where India's next big
Line 2:       cinematographers      (centered, rotating)
Line 3:          become             (centered, italic orange)
```

## Technical details

### File: `src/components/HeroSection.tsx`

**Line 47**: Wrap "Where India's next big" in a `whitespace-nowrap` span to prevent wrapping on any screen size.

**Lines 49-63**: Update the rotating word container:
- Remove `style={{ width: "8.5ch" }}`
- Change `justify-start` to `justify-center`
- Change the inner `m.span` from `absolute left-0` to `absolute left-1/2 -translate-x-1/2` for centering
- Set container width to `16ch` (length of "cinematographers", the longest word) to prevent layout shift
- The invisible sizer span stays to maintain line height

**Line 57**: Update animated word class from `absolute left-0` to `absolute left-1/2 -translate-x-1/2 text-center`

