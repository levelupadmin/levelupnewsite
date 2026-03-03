

## Plan: Thumbnail-only navbar dropdown cards

Remove the text overlay and bottom text panel from dropdown cards in both desktop and mobile views, showing only the thumbnail images.

### Changes in `src/components/Navbar.tsx`

**Desktop dropdown cards (lines 260-315):**
- Remove the `<div className="px-2.5 py-2">` block containing title, subtitle, and format badge
- Change aspect ratio from `aspect-[3/2]` to something slightly taller like `aspect-[4/3]` to give thumbnails more presence
- Add `rounded-md` to the card for cleaner edges

**Mobile dropdown cards (lines 402-456):**
- Remove the `<div className="px-2.5 py-2">` block containing title, subtitle, and badge
- Adjust aspect ratio similarly

Both desktop and mobile cards will become just clickable thumbnail images with hover scale effect, no text underneath.

