
## Testimonial Story Popup Modal

### What This Does
When a user clicks "Read the story" on any testimonial card, a modal dialog opens showing the student's portrait image at the top and a full ~200-word story below it.

### User Experience
1. User sees the testimonial carousel as normal
2. They click "Read the story" link on any slide
3. A centered modal overlays the page with:
   - The student's photo (top, full-width, with a subtle gradient overlay)
   - Name, role, and context beneath the image
   - A ~200-word detailed story in the body
   - A close (X) button in the top-right corner
4. Clicking outside the modal or pressing Escape closes it

### What Changes

**`src/components/TestimonialsSection.tsx`**

1. **Extend the `Testimonial` interface** — add a `fullStory: string` field (200-word text per student)

2. **Add full stories to each testimonial object** — write a ~200-word story for each of the 5 students (Janani, Karthik, Kishore, Avantika, Michael)

3. **Add modal state** — two pieces of state:
   - `selectedTestimonial: Testimonial | null` — which story is open
   - Pass `onReadStory` callback down to `TestimonialSlide`

4. **`TestimonialSlide` update** — change "Read the story" from an `<a>` tag to a `<button>` that calls `onReadStory(testimonial)` on click

5. **New `TestimonialModal` component** (inside the same file) — uses the existing `Dialog` / `DialogContent` from `src/components/ui/dialog.tsx`:
   - `DialogOverlay` with `bg-black/80` blur
   - Portrait image at top (aspect-[3/4], `object-cover`, with gradient fade at bottom)
   - Name + role + context row beneath the image
   - Decorative large `"` quote mark
   - `fullStory` paragraph text (200 words, `font-sans-body`, readable line-height)
   - Native `DialogClose` X button top-right

### Technical Details

```text
TestimonialsSection (state: selectedTestimonial)
  ├── carousel slides → TestimonialSlide (receives onReadStory prop)
  │     └── "Read the story" button → calls onReadStory(t)
  └── TestimonialModal (open={!!selectedTestimonial}, onClose)
        ├── portrait image (top)
        ├── name / role / context
        └── 200-word fullStory body
```

**Modal layout:**
```text
┌────────────────────────────────────┐
│  [portrait image, 3:4 aspect]      │
│  [gradient fade at bottom of img]  │
├────────────────────────────────────┤
│  Name · Role                       │
│  Context line                      │
│  ─────────────────────────────     │
│  " (decorative)                    │
│  200-word story paragraph...       │
│                                    │
└────────────────────────────────────┘  [X button top-right]
```

- Uses the existing `Dialog`, `DialogContent`, `DialogClose` from `@/components/ui/dialog`
- Max-width of `md` (448px), scrollable on small screens
- No new dependencies required
- The "Read all stories" header button stays as-is (it's a separate CTA)
