

## Plan: Hero text color swap, prominent CTAs, em dash removal

### 1. Hero rotating words: make orange, "are made" white

**File: `src/components/HeroSection.tsx`**

- On the `<m.span>` (line 105) that renders the rotating word, change `text-white` to `text-gradient-amber` (the existing amber gradient class used site-wide)
- On the `<em>` (lines 113-120) that says "are made", remove `text-gradient-amber` and replace with `text-white` (or `text-hero-headline`), keep `not-italic font-medium`

### 2. "Sign In / Sign Up" button — orange background

**File: `src/components/Navbar.tsx`**

- Desktop button (line 210-216): Replace the outlined style with a solid orange background: `bg-primary text-primary-foreground` (or `bg-primary text-black`), remove `border border-[#5c5c5c]`, add `hover:bg-primary/90`
- Mobile button (line 518): Same treatment — solid orange background instead of border-only

### 3. "See all Programs" CTA — orange

**File: `src/components/HeroSection.tsx`**

- Line 139: Replace the outlined border style with solid orange: `bg-primary text-primary-foreground hover:bg-primary/90`, remove the inline `border: 1px solid #5c5c5c` style

### 4. Remove em dash from CredibilityCues

**File: `src/components/CredibilityCues.tsx`** (lines 43-44)

- Change `{" "}— every layer designed for the serious creator.` to remove the em dash, making it read naturally as one sentence: `From masterclasses to residencies, from community to career, every layer designed for the serious creator.` (comma instead of em dash)

### 5. Remove em dashes from visible user-facing content across the site

Scan and clean em dashes in **rendered text content** (not code comments). Key files:
- `src/components/FAQSection.tsx` (lines 7, 65): Replace em dashes in FAQ answer text with commas or periods
- `src/components/about/WhyUsSection.tsx` (lines 13, 19): Replace em dashes in description text
- `src/components/Footer.tsx`: No em dash in visible text (already clean)
- `src/pages/Reviews.tsx` (line 275): testimonial text — replace em dash
- `src/components/why-levelup/LiveProjectsCard.tsx` (line 27): "Mumbai Film Festival — Selected!" — replace with colon or remove
- `src/components/impact/CollaborationsScene.tsx` (line 158): "— {project}" — replace with comma or remove

Note: Em dashes in code comments will be left as-is since they're not user-facing.

