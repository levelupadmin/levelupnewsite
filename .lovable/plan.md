
# Community Section

A new full-width section placed immediately before the "Our students come from" logos marquee inside `StudentLogosSection.tsx`. It recreates the network-graph visual from the reference image.

## What gets built

**New component**: `src/components/CommunitySection.tsx`

- **Eyebrow**: "THE COMMUNITY" in orange, uppercase, letter-spaced
- **Headline**: "Come for learning," (white) + "Stay for the community" (orange, italic, serif)
- **Subheading**: Muted grey, centered, max-w-2xl
- **CTA button**: "Join the community" with ArrowRight icon, orange gradient background, hover lift
- **Stats row**: 4-column grid -- 12,000+ MEMBERS | 850+ PROJECTS | 200+ MENTORS | 50+ MASTERCLASSES (using AnimatedCounter)
- **Floating avatars**: 8 circular profile images (reusing existing testimonial assets) positioned absolutely around the content, with gentle CSS floating animation (staggered delays)
- **Activity badges**: Small dark pill labels near avatars ("Invited to The Forge", "Recommended: Arjun", "Connected: 12 new peers", etc.) with lucide icons and orange accents
- **Profile cards**: Two larger cards (left: "Priya Sharma / UX Designer / Learning Motion Design", right: "Arjun Mehta / Filmmaker / Interested in Documentary Craft") with dark card background, subtle border
- **Connecting lines**: SVG overlay with low-opacity orange/white diagonal strokes linking avatar positions
- **Dark background** matching the hero/main site bg (`bg-background`)

**Updated file**: `src/pages/Index.tsx`
- Lazy-import `CommunitySection` and render it directly before `StudentLogosSection`

## Technical details

- Avatars use existing `testimonial-*.jpg` and `masterclass-*.jpg` assets (no new images needed)
- Floating animation via Tailwind keyframes: a subtle `translateY` oscillation with staggered `animation-delay`
- Two new keyframes added to `tailwind.config.ts`: `float-slow` (6s ease-in-out infinite, 10px range)
- Connecting lines rendered as a single absolute-positioned SVG with `stroke-opacity: 0.08`
- Stats use the existing `AnimatedCounter` component with `hasComma: true`
- CTA uses inline gradient style matching the site's orange palette (`#FF6B35` to `#F7931E`)
- Section padding: `py-20 md:py-28` with `overflow-hidden` to contain floating elements
- Mobile: avatars and lines hidden below `md` breakpoint; profile cards stack vertically; stats go 2x2 grid
- Badge tooltips shown persistently (not on hover) to match the reference image's always-visible labels
