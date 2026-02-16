

# Replace Why LevelUp with Expandable Card System

Replace the current 3D flip-card "Why LevelUp" section with a new expandable card system matching the reference screenshots. The images are reference only -- not embedded.

---

## Visual Design (from reference)

Three cards in a horizontal grid. Only one can be expanded at a time.

- **Card 1**: Black background, white text
- **Card 2**: Soft peach/coral background (`#f5d5c8` / `hsl(15, 70%, 88%)`), dark text
- **Card 3**: Dark brown background (`hsl(20, 20%, 15%)`), white text

**Closed state**: Large serif headline, a small expand icon (top-right corner, `Maximize2` from lucide), and a decorative preview illustration area. Gentle hover lift (`hover:-translate-y-1`).

**Expanded state**: Card grows taller with smooth Framer Motion `layout` animation. Close button (X icon) replaces expand icon. Shows description, feature pills, testimonial, or lesson list depending on the card.

---

## Card Content

### Card 1 -- "A learning experience tailored to you"
- **Closed**: Headline + mock lesson card UI (Chapter 2 / Development Environments / Continue button)
- **Expanded**: Description text + "Everything in one place" feature pill list (Lessons, Coding tasks, Community events, Office hours, AI hints and instant feedback, Our AI assistant Dot, Lifetime access) + Testimonial from Stephanie McMillan

### Card 2 -- "Stuck? Get 1-on-1 guidance"
- **Closed**: Headline + mentor/AI character illustration area
- **Expanded**: Andrew availability card with green online badge + Dot AI assistant card with "Online 24/7" badge

### Card 3 -- "Make steady progress with bite-sized lessons"
- **Closed**: Headline + background image feel (dark overlay on cinematic image)
- **Expanded**: Lesson list with titles and durations (e.g., "From Chatbots to Agents: What's the Difference? -- Theory, 15 min")

---

## Technical Plan

### Files to modify:
- **`src/components/WhyLevelUp.tsx`** -- Complete rewrite with new expandable card system

### Files to delete (no longer needed):
- `src/components/why-levelup/ExpertMembershipCard.tsx`
- `src/components/why-levelup/LiveProjectsCard.tsx`
- `src/components/why-levelup/CommunityCard.tsx`

### No new files or dependencies needed
Uses existing Framer Motion (`AnimatePresence`, `m.div` with `layout`), lucide-react icons (`Maximize2`, `X`, `BookOpen`, `Code`, `Users`, `Clock`, `Sparkles`, `RefreshCw`, `Zap`), and Tailwind utilities.

### Implementation details:

1. **State**: `useState<number | null>(null)` for tracking which card is expanded
2. **Animation**: Framer Motion `AnimatePresence` + `m.div` with `layout` prop for smooth height transitions. Expanded content fades in with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}`.
3. **Layout**: `grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6` matching existing spacing conventions. When a card expands, it stays in its grid position (no overlay/modal).
4. **Closed card height**: Fixed `h-[420px] md:h-[480px]` with the headline at top and decorative content below.
5. **Expanded card height**: `auto` with `min-h-[480px]` to accommodate content.
6. **Feature pills**: Rendered as inline-flex items with icon + label, styled with `border border-foreground/20 rounded-full px-3 py-1.5`.
7. **Testimonial**: Avatar placeholder (initials circle), name, title, and quote text.
8. **Lesson list**: Stacked cards with title, category badge, and duration.
9. **Section headline** preserved: "The most intentional way to learn the craft." with the same layout.
10. **Mobile**: Cards stack vertically; expanded card pushes siblings down naturally via grid flow.

