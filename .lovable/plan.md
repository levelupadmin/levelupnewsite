

## Expandable Navbar: Pill Morphs Downward on Hover

Transform the navbar from a static pill with visible links into a **compact pill** (logo + menu icon) that **expands downward** on hover to reveal navigation links with descriptions. The pill itself morphs — no separate dropdown panel, just the shape growing taller.

### How It Looks

**Default (resting) state:**
```text
  [  LevelUp Logo          ☰  ]
       compact pill, rounded-full
```

**On hover — pill expands downward:**
```text
  [  LevelUp Logo          ✕  ]
  [                            ]
  [  Masterclasses             ]
  [  World-class mentors...    ]
  [                            ]
  [  The Forge                 ]
  [  Intensive creator lab...  ]
  [                            ]
  [  StarDa                    ]
  [  Discover new paths...     ]
  [                            ]
  [  About                     ]
  [  Our story and mission...  ]
  [                            ]
  [          Sign In           ]
  [____________________________]
       expanded pill, rounded-2xl
```

**On mouse leave:** pill smoothly contracts back to the compact resting state.

### What Changes

1. **Default state hides nav links** — The compact pill shows only the logo on the left and a hamburger/menu icon on the right (no visible text links)

2. **Hover triggers expansion** — When the user hovers anywhere on the pill, it morphs downward: the border-radius shifts from `rounded-full` to `rounded-2xl`, and the hidden link section animates open with height + opacity transitions

3. **Navigation links with descriptions** — Each link shows as a title (e.g., "Masterclasses") with a short description below (e.g., "Learn from world-class mentors"). These are revealed with staggered fade-in animations

4. **Menu icon toggles** — The hamburger icon switches to an X when expanded; on desktop, this is driven by hover state rather than click

5. **Smooth morphing animation** — Uses Framer Motion's `animate` prop to transition:
   - Height from compact (~48px) to expanded
   - Border-radius from `rounded-full` to `rounded-2xl`
   - Content opacity and vertical offset for stagger effect

6. **Sign In button moves inside** — In the expanded state, the Sign In button appears at the bottom of the panel

### Technical Details

**File: `src/components/Navbar.tsx`**

- Add an `expanded` state (`boolean`) controlled by `onMouseEnter`/`onMouseLeave` on the outer pill container
- Add nav link descriptions as data alongside the existing `navLinks` array:
  ```text
  { label: "Masterclasses", href: "#masterclasses", description: "Learn from world-class mentors" }
  { label: "The Forge", href: "#forge", description: "Intensive creator accelerator" }
  { label: "StarDa", href: "#", description: "Discover new creative paths" }
  { label: "About", href: "#testimonials", description: "Our story and mission" }
  ```
- Use `motion.nav` with `animate` to transition between compact and expanded states:
  - Compact: `rounded-full`, minimal padding, tight height
  - Expanded: `rounded-2xl`, more padding, auto-height with content revealed
- The nav links section uses `AnimatePresence` + `motion.div` with `initial={{ opacity: 0, height: 0 }}` and `animate={{ opacity: 1, height: "auto" }}`
- Each link item staggers in with a slight delay (`delay: 0.05 * index`)
- The existing sliding hover highlight (`layoutId="nav-highlight"`) is removed since links now display vertically in the expanded panel
- On mobile, the behavior stays click-driven (hamburger opens the existing full-screen overlay); the hover expansion is desktop-only (`md:` breakpoint)
- The menu icon on the right replaces the current inline desktop links — shows hamburger by default, X when expanded
- The existing scroll-based compaction logic (`scrolled` state) still applies to the compact pill's padding and background intensity

### What Stays the Same

- Glassmorphism styling (backdrop-blur, semi-transparent background, border)
- Scroll-based background/shadow intensification
- Mobile full-screen overlay menu (click-driven)
- Logo placement and sizing behavior
- All section anchor links and routing
