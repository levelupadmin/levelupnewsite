

# Add FAQ Section to LevelUp Learning Homepage

## What Already Exists

The homepage already has all six content sections built and styled consistently:

1. **Hero** (with carousel and credibility cues)
2. **Why LevelUp** (3 belief-driven cards)
3. **Masterclasses** (horizontal scroll row with category filters)
4. **LevelUp Live** (program cards grid)
5. **The Forge** (split-column with layered visuals)
6. **Testimonials** (documentary-style portrait cards)
7. **Student Logos** (infinite marquee)

The only missing section from your brief is **Section 7: FAQ**.

---

## What Will Be Built

### FAQ Section

A calm, clear FAQ section placed after the Testimonials section and before the Student Logos marquee. It will feel like a helpful, reassuring part of the experience -- not a legal appendix.

**Structure:**
- A centered headline: "Frequently asked questions" in the established serif display style
- A single-column layout of expandable accordion items, centered on the page (max-width constrained for readability)
- Each FAQ item uses a clean accordion pattern (click to expand/collapse) with smooth open/close animations
- A subtle closing prompt at the bottom: "Still have questions? Reach out to us" with a soft contact link

**Visual Style:**
- Consistent `py-12 md:py-16` section padding
- Subtle top divider gradient (matching other sections)
- Accordion items separated by thin border lines
- Questions in serif display font, answers in sans-serif body font
- Muted foreground colors, calm and readable
- Framer Motion fade-in entrance on scroll

**FAQ Content (placeholder -- ready for your copy):**
Since no specific FAQ copy was provided in this prompt, the section will include representative placeholder questions covering common topics:
- What is LevelUp Learning?
- Who are the masterclasses for?
- How do live programs work?
- What is The Forge?
- Do I need prior experience?
- How much does it cost?
- Can I access content after the program ends?
- How do I get invited to The Forge?

These can be swapped with your final copy at any time.

---

## Technical Details

### New File
- `src/components/FAQSection.tsx` -- The FAQ accordion component

### Modified Files
- `src/pages/Index.tsx` -- Import and render the FAQ section between TestimonialsSection and StudentLogosSection

### Implementation Approach
- Uses the existing Radix UI Accordion primitives (`@radix-ui/react-accordion`) already installed and configured in `src/components/ui/accordion.tsx`
- Wraps the section in `framer-motion` for a consistent scroll-triggered fade-in entrance
- Follows the established spacing system (`py-12 md:py-16`, `mb-10 md:mb-12` for headings)
- Uses the same subtle top divider gradient pattern used in other sections
- Accordion triggers styled with `font-serif-display`, content styled with `font-sans-body`
- Single-item-at-a-time open behavior for a focused reading experience
- Accordion animations use the existing `accordion-down` / `accordion-up` keyframes already in `tailwind.config.ts`
- Optional soft contact CTA at the bottom using the same link style as other section CTAs

### Section Order After Change

```text
Navbar
Hero (full viewport)
  Credibility Cues
Why LevelUp
Masterclasses
LevelUp Live
The Forge
Testimonials
FAQ  <-- NEW
Student Logos (marquee)
```

