

## Add Amber Accent Line + Glow to Live + Mentor-Led Section

Copy the same amber accent line and radial glow treatment from the Masterclass section (lines 74-90 of `MasterclassSection.tsx`) into the Live Programs section for visual consistency.

### What changes

**File: `src/components/LiveProgramsSection.tsx`**

Add two decorative elements right after the opening `<section>` tag (line 17), before the section header:

1. **Amber accent line** -- A 2px horizontal line at the top with a centered amber gradient that fades out on both edges
2. **Subtle radial glow** -- A tall, soft amber radial glow emanating from the top center, creating depth

Both use the exact same HSL values and gradient structure as the Masterclass section:
- Line: `linear-gradient(90deg, transparent 10%, hsl(38 75% 55% / 0.5) 50%, transparent 90%)`
- Glow: `radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)`

No new dependencies, no CSS changes -- just two absolutely-positioned `<div>` elements.
