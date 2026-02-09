

# Redesign: Testimonials as Horizontal Carousel (8-10 Cards)

## What Changes

The current 4-card grid testimonial section will be completely replaced with a **horizontally scrollable Embla Carousel** featuring 8-10 testimonial cards in the TripleTen editorial style. Each card pairs a portrait photo with a large pull quote side-by-side.

## New Layout

### Header Row
- **Left**: Bold serif headline -- "Real transformations. No scripts, no exaggeration -- just **honest creative growth.**"
- **Right**: A filled CTA button "Read all stories" with an arrow icon, aligned bottom-right of the header

### Carousel (Embla-powered)
A horizontally scrolling carousel of 8-10 testimonial slides. Each slide is a two-panel card:

- **Left panel**: Portrait photo (aspect 3:4) with a dark gradient overlay at the bottom showing the person's name, role, and context
- **Right panel**: A dark `bg-card` block with a large serif pull quote and a "Read the story" link at the bottom

The carousel will loop and allow the next card to peek in from the right edge for visual continuity.

### Navigation
- **Arrow buttons** (bottom-right) -- two bordered square buttons with ChevronLeft / ChevronRight icons to scroll one slide at a time
- **Progress dots** -- a row of small dots below the carousel showing the current position

### Data: 10 Testimonials
Since only 4 portrait images exist (`testimonial-1.jpg` through `testimonial-4.jpg`), the images will be reused across 10 testimonial entries. Each entry will have unique name, role, context, and pull quote content.

```
Slide layout (desktop):
+---------------------------+---------------------------+
|                           |                           |
|     [Portrait Photo]      |   "I stopped waiting      |
|                           |    for permission to       |
|                           |    make what I wanted."    |
|     Arjun Mehta           |                           |
|     Filmmaker             |                           |
|     Was stuck between...  |   Read the story [->]     |
+---------------------------+---------------------------+

Slide layout (mobile):
+---------------------------+
|     [Portrait Photo]      |
|     Arjun Mehta           |
|     Filmmaker             |
+---------------------------+
|   "I stopped waiting      |
|    for permission..."     |
|                           |
|   Read the story [->]     |
+---------------------------+
```

## Technical Details

### File Modified
- **`src/components/TestimonialsSection.tsx`** -- complete rewrite

### Carousel Implementation
Uses **Embla Carousel** (already installed and used in HeroCarousel and ForgeCarousel) for consistency:
- `useEmblaCarousel` with `loop: true`, `align: "start"`, `slidesToScroll: 1`
- Each slide takes roughly `85vw` on mobile, `~680px` on desktop so the next card peeks in
- Manual navigation via `emblaApi.scrollPrev()` / `emblaApi.scrollNext()` on arrow button clicks
- Selected index tracked via `emblaApi.on("select", ...)` callback for dot indicator state

### Card Structure (per slide)
Each slide is a `flex` container:
- Mobile: `flex-col` (stacked -- photo on top, quote below)
- Desktop: `flex-row` (side by side -- photo left, quote right), each half roughly `50%`
- Photo panel: `aspect-[3/4]` with `object-cover`, bottom gradient overlay for text
- Quote panel: `bg-card` or `bg-secondary` background, large `font-serif-display text-lg md:text-xl` quote text, "Read the story" link with `ArrowUpRight` icon

### 10 Testimonial Entries
Images rotate through `testimonial-1.jpg` to `testimonial-4.jpg`. All names, roles, contexts, and quotes will be unique and fit the creative education theme:

| # | Name | Role | Image |
|---|------|------|-------|
| 1 | Arjun Mehta | Filmmaker | testimonial-1 |
| 2 | Sneha Iyer | Editor and Colourist | testimonial-2 |
| 3 | Rohan Kapoor | Writer and Director | testimonial-3 |
| 4 | Priya Sharma | Visual Designer | testimonial-4 |
| 5 | Vikram Desai | Cinematographer | testimonial-1 |
| 6 | Ananya Nair | Screenwriter | testimonial-2 |
| 7 | Kabir Malhotra | Sound Designer | testimonial-3 |
| 8 | Meera Joshi | Documentary Filmmaker | testimonial-4 |
| 9 | Siddharth Rao | Motion Graphics Artist | testimonial-1 |
| 10 | Tara Menon | Photographer and Director | testimonial-2 |

### Scroll Animations
- Section header animates in from the left using Framer Motion (consistent with other sections)
- The carousel container fades in as a whole
- No per-card stagger needed -- the horizontal scroll itself provides progressive reveal

### Removed Features
- Parallax effect on images (unnecessary for a scrolling carousel)
- Play button overlay (shifting to story/text focus)
- The 4-column grid layout
- The bottom "Watch more stories" underline link (replaced by header CTA)

### Styling
- Background stays `bg-background` with the same ambient glow and top divider
- Arrow buttons: `w-10 h-10 border border-border rounded-sm` with `ChevronLeft` / `ChevronRight` icons
- Progress dots: same style as HeroCarousel -- active dot is wider with `bg-primary`, inactive dots are small with `bg-foreground/20`
- Quote panel uses subtle border-left or slightly lighter background to separate from the photo visually
