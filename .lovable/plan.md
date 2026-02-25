

## Remove "Read all stories" Button from Testimonials Section

### Change in `src/components/TestimonialsSection.tsx`

**Lines 212-218** — Delete the entire `<a>` element containing the "Read all stories" button:

```tsx
// Remove this block:
<a
  href="#testimonials"
  className="cta-sweep cta-glow inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide whitespace-nowrap transition-colors hover:bg-primary/90 shrink-0"
>
  Read all stories
  <ArrowRight className="w-4 h-4" />
</a>
```

The `ArrowRight` import can also be removed if it's no longer used elsewhere in the file.

