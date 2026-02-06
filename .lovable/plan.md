

# Pull Real Assets from leveluplearning.in

## Overview

Your existing website at leveluplearning.in has real mentor images, course banners, testimonials, FAQs, and stats that should replace the placeholder content currently in the Lovable project. Here's how we'll bring everything across.

## What We'll Pull

### 1. LevelUp Logo (SVG)
Replace the current PNG logo with the crisp SVG version from your site. This will be used in both the Navbar and Footer.
- Source: `leveluplogo 1.svg` from your Webflow CDN

### 2. Masterclass Mentor Images and Data
Replace the 6 placeholder mentors with your real mentors and their course banner images:
- **Lokesh Kanagaraj** -- Filmmaker
- **Karthik Subbaraj** -- Filmmaker
- **G Venket Ram** -- Photographer
- **Anthony Gonsalvez** -- Film Editor
- **DRK Kiran** -- Art Director
- **Ravi Basrur** -- Music Director
- Plus the new mentor banner (NM)

### 3. Hero Carousel
Update the carousel slides with the real course banner images from your site, using the actual mentor names and course titles.

### 4. Credibility Stats
Update the numbers to match your live site:
- "57,660+" Learners Enrolled
- "4.85" Rating (15,000+ ratings)

### 5. Testimonials
Replace the 4 placeholder testimonials with the real ones from your site:
- **Janani** (Director)
- **Karthik** (Filmmaker)
- **Neera** (Editor)
- **Kishore** (Photographer)
- **Mithun** (Music Composer)
- **Lokesh** (Art Director)

### 6. FAQ Content
Update the FAQ section with the real Q&A from your website (what is LevelUp, what do I get, which classes are right for me, timeframe, where to watch).

### 7. Movie Poster Marquee
Replace the plain-text "Students are from" brand marquee with the actual movie poster images from "Our Mentors have Worked In" section (KGF, Jailer, Master, Bigil, Theri, etc.).

## Technical Approach

- All images will be referenced directly from your existing Webflow CDN URLs (`cdn.prod.website-files.com`), so no download/upload step is needed -- they're already hosted and publicly accessible.
- The SVG logo will also be fetched from the CDN.
- Component data arrays (mentors, testimonials, FAQs) will be updated to match the real content.

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Navbar.tsx` | Update logo to use SVG from CDN |
| `src/components/Footer.tsx` | Update logo to use SVG from CDN |
| `src/components/HeroCarousel.tsx` | Replace slides with real course banners and mentor names |
| `src/components/MasterclassSection.tsx` | Replace placeholder mentors with real mentors + CDN images |
| `src/components/CredibilityCues.tsx` | Update stats to 57,660+ learners, 4.85 rating |
| `src/components/TestimonialsSection.tsx` | Replace with real testimonials and photos from the site |
| `src/components/FAQSection.tsx` | Update Q&A content to match the live site |
| `src/components/StudentLogosSection.tsx` | Replace text brands with real movie poster images in marquee |

## What Stays the Same

- The overall design, layout, and cinematic visual identity of the new site
- The Forge section (since this appears to be new/different from the live site)
- The "Why LevelUp" section design
- The Live Programs section structure
- All animations and interaction patterns

