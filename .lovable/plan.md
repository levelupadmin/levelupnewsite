

# Dark-to-Light Section Flipping

Adapt the alternating dark/light section pattern from the reference image. Currently, every section sits on the same pure black background. This change introduces an off-white/cream light mode for alternating sections, creating strong visual rhythm and contrast.

## Section Assignment

The sections will alternate between dark and light backgrounds:

| Section | Background | Text Colors |
|---|---|---|
| Hero | Dark (black) | White text, orange accents |
| Credibility Cues | Dark | White text |
| Why LevelUp | **Light (off-white)** | Dark text, orange accents |
| Masterclasses | Dark | White text |
| Live Programs | **Light (off-white)** | Dark text |
| The Forge | Dark | White text |
| Student Logos | **Light (off-white)** | Dark text |
| Testimonials | Dark | White text |
| FAQ | **Light (off-white)** | Dark text |
| Footer | Dark | White text |

## Visual Style for Light Sections

Based on the reference image, light sections use:
- Background: warm off-white / cream (~`40 20% 96%`)
- Text: near-black headings, dark gray body text
- Cards: white with subtle gray borders
- Accent color: same orange, works on both backgrounds
- Smooth transitions between dark and light via subtle gradient fades at edges

## Technical Details

### 1. Add light section CSS variables (`src/index.css`)

Add a new set of CSS custom properties for the light theme context:
- `--section-light-bg`, `--section-light-fg`, `--section-light-card`, `--section-light-muted`, `--section-light-border`
- Add utility classes: `.section-light` that overrides `--background`, `--foreground`, `--card`, `--muted-foreground`, `--border` locally so all child components automatically adapt

### 2. Create light section wrapper

Either use a CSS class `.section-light` that sets scoped CSS variables, or create a simple wrapper component. The class approach is simpler and avoids refactoring component internals.

The `.section-light` class will scope-override the relevant CSS variables so that existing `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border` classes automatically render in light mode within those sections.

### 3. Update section components

Apply the `.section-light` class to the `<section>` element in:
- **WhyLevelUp.tsx** -- add `section-light` class
- **LiveProgramsSection.tsx** -- add `section-light` class, update accent line/glow colors for light bg
- **StudentLogosSection.tsx** -- add `section-light` class
- **FAQSection.tsx** -- add `section-light` class, update card background styles for light context

### 4. Update component-specific hardcoded colors

- **WhyLevelUp.tsx**: Update `cardBgClasses` to use light-appropriate card backgrounds (white/near-white with subtle borders)
- **FAQSection.tsx**: Update `cardStyles` and `featuredStyle` arrays to use light-friendly card colors (white cards with light gray borders, featured cards with light amber tint)
- **LiveProgramsSection.tsx**: Remove/adapt the dark-specific accent line and glow overlays for light background
- **StudentLogosSection.tsx**: Ensure marquee brand names and stats render in dark text

### 5. Navbar and SectionLabel adaptation

- **SectionLabel.tsx**: Update label colors to ensure visibility on both dark and light sections (may need to detect current section background)
- **Navbar.tsx**: The navbar is fixed/sticky, so it stays dark with blur backdrop -- no changes needed

### 6. Transition polish

Add subtle gradient transitions at the boundary of dark-to-light sections to avoid hard cuts -- a small `h-16` gradient div fading from one background to the other between sections, or apply gradient top/bottom padding within section components.

