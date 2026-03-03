

## Suggestions: Improve the Career Quiz CTA Card

The current card is quite flat — heavy backdrop blur, a masked-out background image, and plain text. Here are visual upgrade options:

### Option A: Glassmorphic Card with Animated Gradient Border
- Replace the static `border-primary/50` with an animated gradient border (rotating conic gradient using a pseudo-element trick)
- Use a subtle glass effect: `bg-white/5 backdrop-blur-xl` instead of `bg-background/80`
- Let more of the background image show through (reduce overlay opacity to ~40%)
- Add a soft ambient glow behind the card (`box-shadow` with primary color)

### Option B: Illustrated / Icon-Driven Card
- Remove the background image entirely
- Add a large decorative icon or emoji (e.g., a compass 🧭 or sparkles ✨) as a focal point
- Use a subtle gradient background (`from-primary/10 to-transparent`)
- Make the "Take our quiz" button a proper pill button with arrow, instead of a text link
- Add a thin accent line or dot pattern for texture

### Option C: Interactive Hover Card (recommended)
- Show the background image at ~30% opacity normally, scale it up slightly on hover
- Add a warm gradient overlay (`from-amber-900/60 via-background/70 to-background/90`) instead of flat backdrop blur
- Remove the left-fade mask (currently hides the image) — let the full image breathe
- Turn the CTA into a small pill button: `bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5` with hover glow
- Add a subtle `?` or quiz icon next to the text
- On hover, shift the overlay slightly lighter to reveal more of the image

### Option D: Minimal Text Card with Accent
- Remove the background image entirely for a clean look
- Use a left accent border (`border-l-2 border-primary`) instead of full border
- Slightly larger typography for the question
- Add a small decorative element like a subtle dotted line or sparkle icon

---

**My recommendation: Option C** — it keeps the existing image asset, adds warmth and depth, and makes the card feel interactive without being heavy. I'd implement: warm gradient overlay, remove left-fade mask, pill-style CTA button, and hover image scale.

