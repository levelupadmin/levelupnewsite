

## "The Most Intentional Way to Learn the Craft" -- Pre-Footer CTA Section

A cinematic, high-conviction closing section placed just before the Footer. Informed by brand positioning from the investor deck, this section replaces the previously discussed "Trusted by India's Best" concept with a more emotionally resonant version.

### Copy

**Badge:** India's Creative Career Infrastructure

**Headline:** The most intentional way to *learn the craft.*

**Subline:** From first shot to first paycheck -- and beyond. Join 9,000+ creators across 821 cities who chose to take their craft seriously.

**CTA Button:** "Explore Programs" (links to #masterclasses or the main programs page)

### Visual Layout

- **Teacher portrait row**: 7 circular avatars of all masterclass teachers (Karthik Subbaraj, Anthony Gonsalvez, G Venket Ram, DRK Kiran, Ravi Basrur, Lokesh Kanagaraj, Nelson Dilipkumar) displayed in an overlapping horizontal strip
- **Proof stats row** (subtle, below the headline): "9,000+ Learners", "821 Cities", "4.86/5 Rating" displayed as small inline badges or a single line of text -- understated, not loud
- Consistent amber accent line at the top of the section
- Subtle radial amber glow behind the headline
- Section padding matching the rest of the site (py-16 md:py-24)

### Responsive Behavior

- **Desktop**: Avatars at w-16/h-16, headline at text-4xl/5xl, stats inline
- **Mobile**: Avatars scale to w-12/h-12, headline at text-2xl, stats stack or wrap

### Technical Details

1. **New file**: `src/components/TrustedCTASection.tsx`
   - Imports teacher images from existing assets and CDN URLs (reusing the same sources as MasterclassSection and navbarData)
   - Renders circular overlapping avatars, headline, subline, stats, and CTA
   - Uses existing design tokens: `font-serif-display`, `font-sans-body`, `text-hero-headline`, `text-hero-subtext`, `bg-background`
   - CTA button uses primary styling consistent with existing buttons

2. **Update**: `src/pages/Index.tsx`
   - Add lazy import for `TrustedCTASection`
   - Place between `FAQSection` and `Footer`

