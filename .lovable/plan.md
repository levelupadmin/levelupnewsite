

## Revamp: "The Most Intentional Way to Learn the Craft" Section

The current "Trusted by India's best" section works but feels generic and light. Using insights from the investor deck, here's a stronger, more emotionally resonant version that positions LevelUp as creative career infrastructure -- not just another course platform.

### Copy Direction

Three options to consider (all aligned with the brand voice -- emotional, grounded, not salesy):

**Option A (Recommended): Identity-driven close**
- Headline: "The most intentional way to *learn the craft.*"
- Subline: "From first shot to first paycheck -- and beyond."
- CTA: "Start Your Journey"

**Option B: Aspiration-driven close**
- Headline: "Built for creators who *take it seriously.*"
- Subline: "Not tutorials. Not shortcuts. A real path forward."
- CTA: "Explore Programs"

**Option C: Community-driven close**
- Headline: "9,000 creators didn't wait. *Neither should you.*"
- Subline: "Across 821 cities, they chose to invest in their craft."
- CTA: "Join Them"

### Visual Layout (applies to all options)

The section will be more visually rich than the current version:

1. **Teacher portrait row** -- keep the 7 overlapping circular avatars (already working well), but increase size slightly on desktop (w-16 to w-20) for more presence
2. **Journey keywords** -- a subtle horizontal line of text chips below the headline showing the breadth of the ecosystem: "Filmmaking / Photography / Editing / Music / Writing / Design" in muted text, separated by dots or slashes
3. **Single understated proof line** -- one line like "9,000+ learners across 821 cities" in small muted text, positioned just above the CTA (not as badges -- just a quiet confidence line)
4. **Refined CTA** -- slightly larger button with the sweep + glow effects already in use

### What Changes

**File: `src/components/TrustedCTASection.tsx`**
- Replace headline and subline with the chosen copy direction
- Add a row of discipline keywords (Filmmaking, Photography, etc.) styled as subtle muted text with separators
- Add a single understated social proof line above the CTA
- Increase avatar size on desktop from w-16/h-16 to w-20/h-20 for more visual weight
- Increase section padding to py-16 md:py-24 for more breathing room (this is the closing section, it deserves gravitas)

No new files or page-level changes needed -- the component is already rendered in `Index.tsx` between FAQ and Footer.

### Responsive Behavior

- Desktop: Avatars at w-20/h-20, headline at text-5xl, disciplines inline with dot separators
- Mobile: Avatars at w-12/h-12, headline at text-2xl, disciplines wrap naturally, proof line stays single-line

