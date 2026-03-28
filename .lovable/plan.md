

## Add Video Row to Testimonials Bento Grid

Add a new row with 2 video cards between the existing bottom text row and the CTA button.

### Layout

```text
existing grid...
├─────────────────────────────┴──────────────────────┤
│  Text Card (Online Cohort)  │  Text Card (Forge)   │  ← existing bottom row
├─────────────────────────────┴──────────────────────┤
│  Horizontal Video Card      │  Horizontal Video    │  ← NEW ROW
│  (Masterclass)              │  Card (Online Cohort) │
├────────────────────────────────────────────────────┤
│       CTA: "Read our student stories →"            │  ← existing CTA
└────────────────────────────────────────────────────┘
```

### Changes (single file: `TestimonialsSection.tsx`)

1. **Add 2 new video testimonial data objects** — different quotes/names/tags from existing ones, reusing available thumbnail images (`testimonial1`, `testimonial2`, `testimonial5`)

2. **Add a new `FadeInSection`** after the existing bottom row (line 355) and before the CTA (line 357), containing a 2-column grid with two `HorizontalVideoCard` components

3. No other files modified

