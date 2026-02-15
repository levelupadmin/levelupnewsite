

# Hero Section: Faster Rotating Words, More Professions, and Better Spacing

## Changes

### 1. Expand the rotating words list (5 to 13 words)
Current list: filmmakers, editors, storytellers, artists, writers

New list: **filmmakers, editors, storytellers, artists, writers, creators, animators, screenwriters, cinematographers, designers, producers, directors, musicians**

### 2. Speed up the rotation
- Reduce interval from **2000ms to 1400ms** so words cycle faster and feel more energetic
- Reduce animation duration from **0.4s to 0.25s** for snappier transitions

### 3. Fix spacing between rotating word and "become"
- Increase the fixed-width container from `5.5ch` to `7ch` to accommodate longer words like "cinematographers"
- Add a right margin to the rotating word container (`mr-[0.15em]`) for breathing room before "become"
- This eliminates the cramped feel between the dynamic word and the italic "become"

### 4. Suggestions for making the section even better
Here are ideas to consider for future improvements:
- **Add a subtle underline or highlight on the rotating word** -- a thin animated orange underline that slides in with each word to draw the eye
- **Stagger the subheadline** -- use the existing `SplitTextReveal` component on the subtitle text for a polished entrance
- **Add a second CTA** -- e.g., a ghost-style "Watch the reel" button next to the primary CTA for users who want a quick preview
- **Typing cursor effect** -- add a blinking cursor after the rotating word for a typewriter feel

## Technical Details

### File: `src/components/HeroSection.tsx`
- Line 7: Expand `rotatingWords` array to 13 entries
- Line 14: Change `setInterval` delay from `2000` to `1400`
- Line 50: Update container width from `5.5ch` to `7ch` and add spacing class
- Line 57: Reduce `duration` from `0.4` to `0.25`

