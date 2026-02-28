

## Revamp: Impact Bento Grid + Student Logos Section

### Problems with current design
- Bento grid uses `rounded-2xl` instead of site-standard `rounded-sm`
- Warm dark cards use inline `hsl(24 30% 12%)` instead of the established card surface color (`hsl(25 8% 10%)`)
- Orange cards feel flat — no texture, no depth, no cinematic quality
- No entrance animations (staggered `whileInView` were removed earlier)
- Logo marquee heading "Our students come from:" is plain, lacks the editorial quality of other section headlines
- No section divider/transition between bento grid and logos
- No ambient glow or grain texture that the rest of the site uses
- Gap/padding doesn't follow site standard (`px-6 md:px-12`, `py-12 md:py-16`, `max-w-7xl`)
- Community card's orange overlay is too heavy — loses the photo mosaic beauty
- No `FadeInSection` or `whileInView` stagger on any element

### Design direction
Cinematic, dark, textural — matching the site's award-winning feel. Think: restrained luxury with subtle ambient lighting.

### Changes to `ImpactBentoGrid.tsx`

1. **Container**: Switch to `max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16` (site standard)
2. **Border radius**: All cards from `rounded-2xl` to `rounded-sm` (site standard for rectangular components)
3. **Dark cards**: Use `bg-[hsl(25_8%_10%)]` with `border border-primary/15` (subtle, not `border-primary/25`)
4. **Orange cards**: Add noise texture overlay (`.noise-overlay` class already exists), subtle inner glow via `box-shadow: inset 0 1px 0 hsl(30 90% 60% / 0.2)`
5. **Community card**: Reduce orange overlay from `bg-primary/60` to `bg-primary/30`, strengthen bottom gradient for text readability
6. **Typography**: Remove `font-serif-display` and `font-sans-body` utility classes — use raw `font-semibold tracking-tight` matching the site's Sora usage
7. **Entrance animations**: Wrap each card in `m.div` with `whileInView={{ opacity: 1, y: 0 }}` and `initial={{ opacity: 0, y: 24 }}` with staggered `transition.delay`
8. **Hover**: Refine to `scale: 1.015, y: -2` (subtler, more sophisticated) with `box-shadow` glow on hover matching `hover:shadow-[0_0_30px_4px_hsl(30_80%_45%/0.15)]`
9. **Grid gaps**: Tighten to `gap-2 md:gap-3` for a tighter, more editorial grid feel
10. **Ambient glow**: Add a subtle radial amber glow behind the grid using the existing `--gradient-amber-glow` token

### Changes to `StudentLogosSection.tsx`

1. **Section divider**: Add the standard thin gradient line between bento grid and logos (matching `WhyLevelUp`'s top divider pattern)
2. **Heading**: Change "Our students come from:" to a more editorial treatment — smaller uppercase tracking-wider label above, then the brand logos. Or keep text but style as `text-muted-foreground text-sm uppercase tracking-widest`
3. **Container padding**: Align to `py-12 md:py-16` site standard
4. **Remove unused `stats` const** (dead code from lines 31-44)

### Files to edit
1. `src/components/ImpactBentoGrid.tsx` — full styling overhaul
2. `src/components/StudentLogosSection.tsx` — divider, heading style, cleanup

