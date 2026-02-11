

# Replace Live + Mentor-Led Section with New Design

## Overview
Replace the current `LiveProgramsSection` component with the new sidebar showcase layout provided. The new design features colored gradient accents per program, a three-column layout (sidebar list | center image | right details), and a "career quiz" mini-CTA banner in the sidebar.

## Changes

### 1. Add missing asset
- Add `career-quiz-banner.jpg` to `src/assets/` (needs to be uploaded or a placeholder used)

### 2. Rewrite `src/components/LiveProgramsSection.tsx`
Replace the entire component with the new design which includes:
- **Colored gradient system**: Each program gets a unique color gradient (orange, blue, purple, emerald, rose, indigo) for active states and hover effects
- **Three-column desktop layout**: Left sidebar with program list + mini CTA banner | Center image | Right details panel with gradient background
- **Active program indicators**: Arrow icon, gradient background with noise overlay on active item; colored hover gradient on inactive items
- **Mini CTA banner**: "Not sure which creator path fits you?" card with "Book a free call" link, using the career quiz banner image
- **Details panel**: Shows duration badge, status badge, spots-left indicator (with pulsing dot), program title, description, format, start date, instructor, and dual CTAs (Enroll Now + Learn More)
- **Separator lines** between sidebar items
- Uses `Link` from react-router-dom (will need to verify route targets or convert to `<a>` tags)

### 3. Add noise overlay CSS
- Ensure the `noise-overlay` CSS class exists in `src/index.css` (or App.css) for the active sidebar item texture effect

### Technical Notes
- The provided code references `careerQuizBanner` from `@/assets/career-quiz-banner.jpg` -- this image will need to be uploaded, or a placeholder will be used
- The `Link` components from react-router-dom used for CTAs will be converted to `<a>` tags pointing to `https://www.leveluplearning.live/bfp` to match the existing pattern
- The mobile accordion layout will be removed in favor of the new design (or kept as a responsive fallback -- the provided code doesn't include mobile handling, so I'll add basic responsive behavior)
- The amber accent line and radial glow at the top will be retained for visual consistency

