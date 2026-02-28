

## Emoji Accents on Rotating Words

### Approach
Map each rotating word to a thematic emoji that floats at the top-right edge of the word. The emoji enters with the word (same slide-up animation) and has a subtle scale/rotate entrance for extra flair.

### Word-Emoji mapping
- filmmakers → 🎬
- editors → ✂️
- storytellers → 📖
- writers → ✍️
- cinematographers → 🎥
- designers → 🎨
- musicians → 🎵
- directors → 🎭

### Implementation
**File: `src/components/HeroSection.tsx`**

1. Add a `wordEmojis` map alongside `rotatingWords`
2. Inside the `AnimatePresence` block, render the emoji as a sibling `m.span` positioned `absolute -top-3 -right-5 md:-top-4 md:-right-6` relative to the word
3. Emoji animates in with the word but adds a slight scale bounce + rotation (spring physics) for playfulness
4. Emoji size: `text-lg md:text-2xl` — small enough to accent, not overpower
5. Need to remove `overflow-hidden` from the rotating word container (or expand its bounds) so the emoji can overflow the edge visually

### Key detail
The rotating word container currently has `overflow-hidden` to clip exit animations. To allow the emoji to peek out, we wrap the word+emoji in the animated span but expand the container's padding/bounds slightly, or use a secondary container for the emoji that sits outside the clip.

Simpler approach: keep `overflow-hidden` on the text container, place the emoji in a separate absolutely-positioned `m.span` outside the overflow container but still keyed to the same word, so it animates in sync.

