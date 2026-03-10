

## Replace Live Programs Section with "LevelUp LIVE" Section

### Overview
Replace the current `LiveProgramsSection.tsx` (sidebar + video showcase layout) with a new full-width, vertically stacked section matching the detailed design spec provided. The new section is self-contained and uses the existing design system (Sora font, orange/amber accent, dark background).

### Structure (top to bottom)

1. **Section Intro** -- "LevelUp LIVE" label (yellow pill), headline "Stop Watching. Start Making.", subheadline, and a horizontal stats strip (5 Active Programs, 12,000+ Hours, 50+ Mentors, 80%+ Completion, Weekends Only) using `AnimatedCounter` for number animations.

2. **Audience Filter ("Find Your Track")** -- "I want to..." prompt with 5 pill buttons (Make Films, Edit Videos, Build a Creator Brand, Design Products, Write Stories). Clicking a pill smooth-scrolls to the corresponding card and applies a brief yellow border pulse highlight. Active pill gets yellow bg.

3. **5 Program Cards** -- Full-width, stacked vertically with ~80px gap. Each card is a two-column layout (60/40 split; stacks on mobile with image on top):
   - Left: tag, headline, one-liner, stats pills, 3 bullet points, CTA button (yellow, scale on hover)
   - Right: program image with gradient overlay
   - Card data: BFP, Video Editing, Creator Academy, UI/UX, Screenwriting (exact copy from spec)
   - Each card uses `FadeInSection` for scroll-triggered fade-up
   - Cards have subtle border glow on hover

4. **Social Proof Marquee** -- Auto-scrolling horizontal strip with 6 testimonial cards (quote + name + program). Pauses on hover. CSS `@keyframes` marquee animation.

5. **Bottom CTA** -- "Not Sure Which Program Fits?" with two buttons: "Book a Free Call" (yellow) and "Explore All Programs" (text link).

### Files Changed

- **`src/components/LiveProgramsSection.tsx`** -- Complete rewrite with new layout. Remove sidebar/video showcase pattern. Keep the `CareerQuizDialog` import and YouTube dialog. Keep JSON-LD schema. Use existing `FadeInSection`, `AccentLine`, `AnimatedCounter` components.

- **`src/data/programs.ts`** -- Update program data to match the 5 cards in the spec (add `tag`, `oneLiner`, `bullets` fields; update links to match spec). Add Creator Academy as a new entry.

### Technical Details
- Uses existing CSS variables and Tailwind classes (no new fonts needed -- Sora is already the display font)
- Intersection Observer via `FadeInSection` for card animations
- Stats counter uses existing `AnimatedCounter` component
- Pill filter uses `useRef` + `scrollIntoView` to target card IDs
- Highlight animation: brief `ring-2 ring-primary` class added/removed via timeout
- Marquee: duplicated content in a flex row with CSS `translateX` keyframe animation
- All external links open in new tab
- Mobile: cards stack (image above content), stats wrap to 2x3 grid, pills wrap naturally
- Keeps existing `id="live-programs"` for deep-linking compatibility
- Preserves JSON-LD structured data for SEO

