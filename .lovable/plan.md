

# Differentiate Each Section's Visual Identity (Option C)

## Goal
Make Masterclasses, Live Programs, and The Forge each look and feel visually distinct so that on mobile (and desktop), a user instinctively recognizes they've entered a new "chapter" of the LevelUp ecosystem as they scroll.

## What Changes

### 1. Masterclasses Section -- Warm Amber Identity
- Add a **thin amber accent line** at the top of the section (2px, primary color, fading from edges)
- Add a **section label** above the headline: a small uppercase tag reading **"On-demand"** in a muted amber chip/badge style
- Keep the existing dark background as-is -- this is the "baseline" visual language

### 2. Live Programs Section -- Cool Blue-Teal Identity
- Shift the background to a **subtly different dark tone** using a cool-charcoal color (e.g., `hsl(215 15% 7%)`) instead of the default `bg-background`, creating a visible but non-jarring contrast
- Replace the top divider with a **cool-toned accent line** (muted blue/teal, `hsl(200 30% 40%)`) instead of the current border color
- Add a **section label** above the headline: **"Live + Mentor-led"** in a muted teal chip
- Swap the radial glow from amber to a **subtle cool blue glow** at the top of the section

### 3. The Forge Section -- Warm Ember/Red-Orange Identity
- Shift the background to a **warm-tinted dark tone** (e.g., `hsl(15 12% 7%)`) -- slightly warm/reddish charcoal
- Replace the top divider with an **ember-toned accent line** (muted red-orange, `hsl(15 60% 45%)`)
- Add a **section label** above the headline: **"In-person Bootcamp"** in a muted ember chip
- Adjust the ambient glow to a **warm ember radial** instead of amber
- Add a subtle **noise/grain texture overlay** (CSS-only, using a pseudo-element with a tiny repeating SVG or gradient pattern) to reinforce the "physical, tactile" feel of an offline bootcamp

---

## Technical Details

### Files to Modify

**`src/index.css`**
- Add two new CSS custom properties for the section-specific background tones:
  - `--bg-live-programs: 215 15% 7%`
  - `--bg-forge: 15 12% 7%`

**`src/components/MasterclassSection.tsx`**
- Add a small format tag/badge above the `<h2>` heading: `"On-demand"` styled as a rounded pill with `border-primary/30 text-primary bg-primary/5`
- Keep the existing amber radial glow and dark background

**`src/components/LiveProgramsSection.tsx`**
- Change the section's `bg-background` to inline style `background: hsl(215 15% 7%)` for the cool charcoal tone
- Update the top divider line to use a teal-blue color: `hsl(200 30% 40%)`
- Add a cool-toned radial glow at top (replacing the current neutral border glow)
- Add a format tag above the heading: `"Live + Mentor-led"` in a teal-tinted pill

**`src/components/ForgeSection.tsx`**
- Change background to inline style `background: hsl(15 12% 7%)` for the warm ember tone
- Update top divider to ember color: `hsl(15 60% 45%)`
- Adjust the ambient radial glow to ember tones
- Add a format tag above the heading: `"In-person Bootcamp"` in an ember-tinted pill
- Add a CSS-only grain texture overlay using a pseudo-element approach (a div with a subtle noise gradient pattern at very low opacity)

No new files are created. No new dependencies needed.

