## LevelUp LIVE Section — Content & Metrics Update

### 1. Heading with Rotating Word Animation

**New heading:** "From Learner to `<rotating word>`."

The rotating word cycles through: **Creator → Editor → Designer → Screenwriter → Filmmaker**, highlighted in the brand primary color (orange/amber). Uses `AnimatePresence` with a vertical slide-fade transition (slide up to exit, slide up from below to enter), cycling every ~2.5s.

```text
From Learner to [Creator].
                 ^^^^^^^^^ primary color, vertical slide animation
```

**Implementation:** Replace the static `<h2>` (lines 94-98) with a flex layout where "From Learner to" is static white text and the last word is wrapped in an `AnimatePresence` block with `motion.span`. Add a `useEffect` interval to cycle through the words array. The rotating word gets `text-primary` styling.

### 2. New Subheading

Replace current subheading (lines 99-103) with:

> "LIVE intensive cohorts designed for one thing — taking you from "I know about it" to "I can actually do it." With industry mentors, live feedback, real work, and placement assistance to get you where you want to be."

### 3. Updated Metrics Strip

Replace the current 5-stat grid (lines 27-33) with just 3 metrics in a `grid-cols-3` layout:


| Value | Label            |
| ----- | ---------------- |
| 750+  | Dreamers         |
| 40+   | Industry Mentors |
| 🗓️   | Weekends Only    |


This simplifies the strip and keeps it punchy. The grid changes from `md:grid-cols-5` to `grid-cols-3`.  
  
4. Auto-Advancing Carousel with Pause-on-Hover/Click

Currently the program carousel is fully static (manual navigation only). Changes:

- Add a `useEffect` interval that auto-advances to the next program every **4 seconds**
- **Pause on hover** (`onMouseEnter` / `onMouseLeave`) over the card area
- **Freeze on pill click** — when a user clicks a filter pill, clear the interval and stop auto-advancing
- The dot indicators and pill active state stay synced with the auto-advance

---

### 5. Bigger Testimonial Cards

Increase the testimonial marquee card dimensions:

- Width: `340px` → `380px`
- Padding: `p-5` → `p-6`
- Quote text: `text-sm` → `text-base`
- Add more vertical breathing room (`min-h-[120px]`)

---

### 6. Remove Bottom CTA ("Not Sure Which Program Fits?")

Remove the entire "Book a Free Call" / "Explore All Programs" block at the bottom of the section (lines 260-272).

---



### Files Modified

- `src/components/LiveProgramsSection.tsx` — heading, subheading, metrics, rotating word state/effect