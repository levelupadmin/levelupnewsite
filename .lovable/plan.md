

# Design Enhancements: Animated CTAs, Sticky Section Labels, and Mobile Polish

Three targeted improvements to elevate the site's interaction quality and mobile experience.

---

## 1. Animated CTA Button Upgrade

Upgrade the hero CTA ("Explore the ecosystem") and section-level CTAs with a more cinematic hover interaction.

**Hero CTA changes (`HeroSection.tsx`):**
- Add a background sweep animation: a gradient slides left-to-right behind the button text on hover
- Add a subtle ambient glow/shadow on hover using `box-shadow` with the primary amber color
- Keep the existing arrow translate animation
- Implementation: use a `::before` pseudo-element (via Tailwind's `before:` utilities and a custom keyframe) or an inner `<span>` with `translateX` transition for the sweep effect

**Section CTAs (Masterclass, Live Programs, Forge, Testimonials):**
- Add a subtle underline-grow effect: a thin line grows from left-to-right beneath the text on hover
- This uses the existing `.story-link` pattern already defined in the Tailwind config
- Alternatively, add a small `before:` pseudo-element that scales from `scaleX(0)` to `scaleX(1)` on hover

**New CSS in `index.css`:**
- A `.cta-sweep` utility class with a pseudo-element gradient background that translates on hover
- A `.cta-glow` utility class for the hero button's ambient box-shadow

---

## 2. Sticky Section Labels

A small, floating label that pins to the top-left corner of the viewport as you scroll through each major section, providing wayfinding context.

**New component: `SectionLabel.tsx`**
- Uses Framer Motion's `useScroll` and `useMotionValueEvent` to track which section is currently in view
- Renders a small label (e.g., "Masterclasses", "Live Programs", "The Forge", "Stories", "FAQs") that fades in/out based on the active section
- Positioned `fixed top-20 left-6` (below the navbar) with `z-50`
- Uses each section's accent color for the label text (amber for Masterclasses, teal for Live Programs, ember for The Forge)
- Hidden on mobile to avoid clutter -- only visible at `md` breakpoint and above
- Requires reading section `id` attributes to determine which section is active via `IntersectionObserver` or scroll position calculation

**Integration in `Index.tsx`:**
- Add `<SectionLabel />` as a sibling to the other components, outside the `<Suspense>` boundary since it needs to be always present

**Section data structure:**
```text
sections = [
  { id: "masterclasses", label: "Masterclasses", color: primary/amber },
  { id: "live-programs",  label: "Live Programs",  color: teal },
  { id: "forge",          label: "The Forge",      color: ember },
  { id: "testimonials",   label: "Stories",        color: primary/amber },
  { id: "faq",            label: "FAQs",           color: primary/amber },
]
```

Note: The Live Programs section currently lacks an `id` attribute -- one will be added (`id="live-programs"`).

---

## 3. Mobile-Specific Polish

Targeted spacing, sizing, and usability fixes for screens below the `md` breakpoint (768px).

**Hero CTA spacing (`HeroSection.tsx`):**
- Increase `mt-6` to `mt-8` on mobile for the CTA wrapper so there's more breathing room between the subheadline and the button

**Card grid gaps (`MasterclassSection.tsx`, `LiveProgramsSection.tsx`):**
- Increase mobile grid gap from `gap-5` to `gap-6` for better visual separation between cards on small screens

**FAQ section padding (`FAQSection.tsx`):**
- Increase card padding from `p-6` to `p-5` on mobile (already fine) but ensure the outer container has at least `px-5` instead of `px-6` for consistent edge spacing, and add `pr-1` inside cards if text is getting clipped

**Footer touch targets (`Footer.tsx`):**
- Increase social icon button size from `w-10 h-10` to `w-11 h-11` on mobile (meeting the 44x44px minimum touch target)
- Center the social icons row on mobile with `justify-center`
- Increase gap between social icons from `gap-4` to `gap-5` on mobile for easier tapping
- Increase bottom bar link gaps from `gap-6` to `gap-8` on mobile

---

## Technical Details

### Files to Create
- `src/components/SectionLabel.tsx` -- Sticky floating section indicator (desktop only)

### Files to Modify
- `src/index.css` -- Add `.cta-sweep` and `.cta-glow` utility classes with keyframes
- `src/pages/Index.tsx` -- Import and render `SectionLabel`
- `src/components/HeroSection.tsx` -- CTA button upgrade with sweep + glow, mobile spacing increase
- `src/components/MasterclassSection.tsx` -- Section CTA underline effect, mobile grid gap
- `src/components/LiveProgramsSection.tsx` -- Add `id="live-programs"`, section CTA underline, mobile grid gap
- `src/components/ForgeSection.tsx` -- Section CTA underline effect
- `src/components/TestimonialsSection.tsx` -- Section CTA underline effect
- `src/components/FAQSection.tsx` -- Mobile card padding check
- `src/components/Footer.tsx` -- Larger social icon touch targets, centered on mobile

### No New Dependencies
All changes use existing Framer Motion and Tailwind CSS capabilities.
