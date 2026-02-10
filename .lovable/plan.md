

# Recreate Brand Marquee to Match Reference Image

## What changes
Redesign the brand marquee rows to match the reference image exactly: each brand gets an inline SVG placeholder icon alongside its name, the font becomes a rounded/friendly bold style, text is white on dark background, and the layout mimics the reference's spacing and visual weight.

## Details

### Visual style (matching reference)
- Each brand displayed as: [icon] + [name] side by side
- Generate simple unique SVG placeholder icons inline for each brand (circles, shields, arrows, etc. -- similar to BuildPro/Bitwise/LogiTech/BluePeak style icons in the reference)
- Font: bold, white, slightly rounded feel -- use Inter with font-bold or font-extrabold at a larger size (text-lg md:text-xl lg:text-2xl)
- Remove uppercase and tight tracking -- use normal casing to match the reference (e.g., "FTII" stays caps since it's an acronym, but others like "Whistling Woods" use title case)
- Increase gap between items for breathing room (gap-8 md:gap-12)
- Keep the two-row opposite-direction scroll with pause-on-hover

### Headline update
- Change subtitle text to bold serif: **"Our students come from:"** matching the reference's "Our grads work here:" style
- Make it larger and bolder (text-2xl md:text-3xl font-bold)

### Technical approach
- Create a simple mapping of brand name to a small inline SVG icon component
- Each icon is a ~24px simple geometric shape (shield, circle-arrow, hexagon, etc.)
- Update the brand span to be a flex row with icon + text
- All changes in `src/components/StudentLogosSection.tsx` only

## File
- `src/components/StudentLogosSection.tsx`

