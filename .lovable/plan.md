

# Accessibility: ARIA Landmarks, Floating Support Button, and Improved Alt Text

## 1. ARIA Landmarks and Labels (all sections)

Add proper semantic landmarks so screen readers can navigate between sections:

**`src/pages/Index.tsx`**
- Add a visually hidden "Skip to main content" link as the first element
- Wrap all content below Navbar in a `<main id="main-content">` element

**`src/components/Navbar.tsx`**
- Add `aria-label="Main navigation"` to the `<nav>` element (currently `<motion.nav>`)

**`src/components/HeroSection.tsx`**
- Add `aria-label="Hero"` to the section

**`src/components/CredibilityCues.tsx`**
- Add `aria-label="Key stats and credibility"` to the section

**`src/components/WhyLevelUp.tsx`**
- Add `aria-label="Why choose LevelUp"` to the section

**`src/components/MasterclassSection.tsx`**
- Add `aria-label="Masterclasses"` to the section

**`src/components/LiveProgramsSection.tsx`**
- Add `aria-label="Live programs"` to the section

**`src/components/ForgeSection.tsx`**
- Add `aria-label="The Forge residency"` to the section

**`src/components/StudentLogosSection.tsx`**
- Add `aria-label="Our students are from"` to the section

**`src/components/TestimonialsSection.tsx`**
- Add `aria-label="Creator testimonials"` to the section

**`src/components/FAQSection.tsx`**
- Add `aria-label="Frequently asked questions"` to the section

**`src/components/Footer.tsx`**
- Add `aria-label="Site footer"` to the footer element

---

## 2. Floating Support Button

Create a new `FloatingSupport.tsx` component:

- A small pill-shaped button fixed to the bottom-right corner
- Uses a chat/message icon (from Lucide) with "Need help?" label
- Links to WhatsApp with a pre-filled message (e.g., `https://wa.me/919876543210?text=Hi...`) -- using a placeholder number the user can swap
- Only appears after scrolling 600px past the hero (uses framer-motion for a smooth slide-up entry)
- Styled in the dark cinematic theme: dark card background, primary accent border, subtle glow on hover
- Includes `aria-label="Chat with us on WhatsApp"` for screen reader accessibility
- On mobile: slightly smaller to avoid blocking content

**`src/pages/Index.tsx`**
- Import and render `FloatingSupport` inside the Suspense boundary

---

## 3. Improved Alt Text (Hero Carousel)

**`src/components/HeroCarousel.tsx`**

Update the generic `alt` text on each slide from "Cinematic reel one/two/..." to descriptive content:

| Current | Proposed |
|---|---|
| "Cinematic reel one" | "Behind the scenes of a LevelUp filmmaking session" |
| "Cinematic reel two" | "Students collaborating on a short film set" |
| "Cinematic reel three" | "A creator reviewing footage during an editing workshop" |
| "Cinematic reel four" | "Live mentoring session with a working filmmaker" |
| "Cinematic reel five" | "Camera and lighting setup for a practical exercise" |
| "Cinematic reel six" | "Storytelling workshop in progress at a LevelUp retreat" |

Also add `aria-label="Go to slide X: [description]"` to the progress dot buttons for better screen reader context.

---

## Files Summary

| File | Change |
|---|---|
| `src/pages/Index.tsx` | Skip-to-content link, `<main>` landmark, add FloatingSupport |
| `src/components/FloatingSupport.tsx` | New -- floating WhatsApp/contact button |
| `src/components/Navbar.tsx` | Add `aria-label` to nav |
| `src/components/HeroSection.tsx` | Add `aria-label` to section |
| `src/components/HeroCarousel.tsx` | Descriptive alt text, better aria-labels on dots |
| `src/components/CredibilityCues.tsx` | Add `aria-label` to section |
| `src/components/WhyLevelUp.tsx` | Add `aria-label` to section |
| `src/components/MasterclassSection.tsx` | Add `aria-label` to section |
| `src/components/LiveProgramsSection.tsx` | Add `aria-label` to section |
| `src/components/ForgeSection.tsx` | Add `aria-label` to section |
| `src/components/StudentLogosSection.tsx` | Add `aria-label` to section |
| `src/components/TestimonialsSection.tsx` | Add `aria-label` to section |
| `src/components/FAQSection.tsx` | Add `aria-label` to section |
| `src/components/Footer.tsx` | Add `aria-label` to footer |
| `src/index.css` | Add `.sr-only` utility class for the skip link |

