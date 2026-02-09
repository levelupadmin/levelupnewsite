

# Improve Testimonials Carousel: Bigger Cards and Polish

## What Changes

The testimonial cards will be significantly enlarged and refined to create a more impactful, editorial feel. The current `680px` desktop width feels cramped -- the photo and quote panels don't have enough breathing room. Here's the full set of improvements:

## 1. Larger Card Dimensions

- **Desktop slide width**: Increase from `680px` to `820px`, giving each panel more horizontal space
- **Mobile slide width**: Keep at `85vw` (already fills the screen well)
- **Photo panel height**: Set a minimum height of `420px` on desktop (currently relies on content, which can feel short)
- **Quote panel padding**: Increase from `p-5 md:p-7` to `p-6 md:p-10` for more whitespace around the quote

## 2. Bigger Quote Typography

- **Pull quote text**: Scale up from `text-lg md:text-xl lg:text-2xl` to `text-xl md:text-2xl lg:text-3xl` so the quote feels like a real editorial headline
- **Line height**: Adjust leading to `leading-[1.25]` for the larger text to stay legible

## 3. Better Visual Separation Between Cards

- **Gap between slides**: Increase from `pr-4 md:pr-6` to `pr-5 md:pr-8` so cards don't feel crowded together
- **Card border**: Add a subtle `border border-border/50` to each card so they visually separate from the dark background
- **Quote panel background**: Add a very subtle left border accent (`border-l-2 border-primary/20`) on the quote panel to tie it to the brand color

## 4. Photo Panel Improvements

- **Hover zoom**: Add a subtle `group-hover:scale-105` transform on the image for interactivity
- **Aspect ratio on mobile**: Change from `aspect-[3/4]` to `aspect-[4/5]` on mobile for a slightly less tall crop that fits better on small screens
- **Name typography**: Bump name text from `text-base md:text-lg` to `text-lg md:text-xl` for stronger presence

## 5. Quote Panel Refinements

- **Decorative quote mark**: Add a large, semi-transparent opening quotation mark (using CSS or a styled span) above the quote text as a visual flourish
- **"Read the story" link**: Push to the bottom of the panel using `justify-between` (already done) and increase spacing

## 6. Navigation Improvements

- **Arrow buttons**: Increase from `w-10 h-10` to `w-11 h-11` with slightly larger icons for better touch targets
- **Counter text**: Add a small "01 / 10" style counter between the dots and arrows showing current position

## Visual Before/After

```text
BEFORE (680px wide, cramped):
+-------------+-------------+
| [Photo]     | "Quote..."  |
| Small text  |  small text |
| tight pad   |  tight pad  |
+-------------+-------------+

AFTER (820px wide, spacious):
+----------------+------------------+
|                |                  |
|   [Photo]      |   "             |
|                |   Quote text    |
|                |   much bigger   |
|   Name         |   and bolder    |
|   Role         |                 |
|   Context      |  Read story ->  |
+----------------+------------------+
```

## Technical Details

### File Modified
- **`src/components/TestimonialsSection.tsx`** -- adjustments to sizing, typography, and styling

### Specific Code Changes

**Slide container (line 185)**:
- Change `md:w-[680px]` to `md:w-[820px]`
- Change `pr-4 md:pr-6` to `pr-5 md:pr-8`

**Card wrapper (line 239)**:
- Add `border border-border/50` and `group` class for hover effects
- Set `min-h-[380px] md:min-h-[420px]` to prevent overly short cards

**Photo panel (lines 241-267)**:
- Add `group-hover:scale-105 transition-transform duration-700` on the `<img>` tag
- Change mobile aspect from `aspect-[3/4]` to `aspect-[4/5]`
- Increase name text to `text-lg md:text-xl`

**Quote panel (lines 269-282)**:
- Increase padding to `p-6 md:p-10`
- Add a decorative large quote mark: `<span className="font-serif-display text-5xl md:text-6xl text-primary/15 leading-none select-none block mb-3">"</span>`
- Scale quote text to `text-xl md:text-2xl lg:text-3xl`
- Add `border-l-2 border-primary/20` for visual accent

**Navigation (lines 194-229)**:
- Arrow buttons: change `w-10 h-10` to `w-11 h-11`
- Add a slide counter span between dots and arrows: `<span className="font-sans-body text-xs text-muted-foreground tabular-nums">{String(selectedIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>`

### No New Dependencies
All changes are CSS/Tailwind adjustments and minor JSX additions within the existing component.

