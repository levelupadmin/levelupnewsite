

# Mobile-First UX Fixes — Implementation Plan

## Overview
Seven targeted fixes addressing tap target sizes, layout breaks, and element overlaps identified in the mobile audit. All changes are CSS/class-level — no structural refactors.

---

## Changes by File

### 1. `src/components/Navbar.tsx` (line 209)
**Hamburger tap target: 32px → 44px**
- Change `w-8 h-8` to `w-11 h-11` on the mobile hamburger button
- Increase icon from `size={16}` to `size={18}` for visual balance

### 2. `src/components/HeroCarousel.tsx` (lines 131–140)
**Carousel dot tap targets**
- Add `py-4 px-1 flex items-center` to each dot `<button>` so the visual dot stays small but the touch zone reaches 44px vertically
- Dot styling classes remain inside a child `<span>` element

### 3. `src/components/TestimonialsSection.tsx`
**A. Carousel dot tap targets (lines 246–255)**
- Same pattern as hero dots: wrap dot styling in a child `<span>`, add `py-4 px-1` padding to button

**B. Modal vertical stacking on mobile (line 93)**
- Change `flex flex-row` to `flex flex-col md:flex-row`
- Change image column (line 103) from `w-[260px] shrink-0` to `w-full md:w-[260px] shrink-0 h-48 md:h-auto`
- Add `overflow-y-auto` to the content column to allow scrolling on small screens

### 4. `src/components/WhyLevelUp.tsx` (line 157)
**Expand/close button: 36px → 44px**
- Change `w-9 h-9` to `w-11 h-11` on the icon button

### 5. `src/components/FloatingSupport.tsx`
**Prevent overlap with footer links**
- Add an IntersectionObserver that watches the footer element
- When the footer is in view, shift the button up with `bottom-20` on mobile, or hide it with an opacity transition
- Simpler alternative: just change `bottom-5` to `bottom-16 md:bottom-8` to permanently sit above footer legal links on mobile

### 6. `src/components/Footer.tsx` (lines 72–84)
**Footer link tap targets**
- Add `py-2` padding to each footer link `<a>` tag
- Reduce `space-y-3` to `space-y-1` on the `<ul>` to compensate for the added padding, keeping visual spacing consistent

---

## Files Changed Summary

| File | Change |
|------|--------|
| `Navbar.tsx` | Hamburger `w-11 h-11`, icon `size={18}` |
| `HeroCarousel.tsx` | Dot buttons get `py-4 px-1` padding wrapper |
| `TestimonialsSection.tsx` | Dot padding + modal `flex-col md:flex-row` stack |
| `WhyLevelUp.tsx` | Expand button `w-11 h-11` |
| `FloatingSupport.tsx` | `bottom-16 md:bottom-8` to clear footer |
| `Footer.tsx` | Link `<a>` gets `py-2`, `<ul>` `space-y-1` |

No new dependencies. No structural changes. All fixes are additive class modifications.

