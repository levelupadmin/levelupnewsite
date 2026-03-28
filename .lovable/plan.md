

## Rebuild Testimonials Section as Bento Grid

Replace the current horizontal carousel testimonials section with the bento grid layout shown in the reference image and HTML file.

### Layout Structure

```text
┌──────────────┬──────────────────┬──────────────────┐
│              │  Text Card       │  Text Card       │
│  Portrait    │  (★★★★★ review) │  (★★★★★ review) │
│  Video Card  │  Online Cohort   │  Forge tag       │
│  (9:16)      ├──────────────────┴──────────────────┤
│  spans 2     │  Small Horizontal Video Card        │
│  rows        │  (thumbnail + quote + meta)         │
├──────────────┴─────────────────────────────────────┤
│  Text Card (Online Cohort)  │  Text Card (Forge)   │
├─────────────────────────────┴──────────────────────┤
│       CTA: "Read our student stories →"            │
└────────────────────────────────────────────────────┘
```

### What Changes

**File: `src/components/TestimonialsSection.tsx`** — Full rewrite:

1. **Header**: Orange accent line + "WHAT STUDENTS SAY" eyebrow, "Real stories. Real results." serif heading, star rating subtitle ("Rated 4.8+ by 2,100+ masterclass students across India")

2. **Main Grid** (3-column CSS grid):
   - **Left column (spans 2 rows)**: Portrait video card with 9:16 aspect ratio, gradient scrim overlay, "VIDEO STORY" badge, duration badge, "Masterclass" tag, centered play button, quote text overlay at bottom, avatar + name + role
   - **Top-right two cells**: Text review cards with 5 stars, program tag (Online Cohort / Forge) in top-right corner, italic quote text, avatar + name + role at bottom
   - **Bottom-right (spans 2 cols)**: Small horizontal video card with thumbnail, play button, "VIDEO STORY" label, quote title, metadata

3. **Bottom Row** (2-column grid): Two more text review cards with same structure

4. **CTA**: "Curious what the journey looks like?" + bordered "Read our student stories →" button linking to `/student-stories`

5. **Remove**: Embla carousel, autoplay, scroll snaps, prev/next navigation, modal system

### Data

Hardcode the 7 testimonials directly in the component matching the reference content (Amirtha Fazina, Swetha, Prasath, Hari, Rahul Mehta, Hari). Use existing testimonial images from `src/assets/` as avatar placeholders. The portrait video card and small video card will be static (no actual video playback — just visual cards with play buttons).

### Styling

- Dark card backgrounds (`bg-[#111]`, `bg-[#181818]`) with subtle borders
- Program tags: Masterclass (amber), Online Cohort (teal), Forge (violet) — matching reference colors
- Orange stars, serif italic quotes
- Rounded-xl cards with hover border transitions
- Responsive: stack to single column on mobile

### Files Modified
- `src/components/TestimonialsSection.tsx` — full rewrite (no other files touched)

