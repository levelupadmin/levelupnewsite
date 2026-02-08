

# Make Masterclasses, Live Programs, and The Forge More Distinct

## The Problem

Right now, the three product verticals already have distinct **section** treatments on the page (different backgrounds, accent lines, and glow colors). But the **navbar dropdowns** are visually identical — same white/10 card backgrounds, same `text-primary` hover color, same layout. There's no visual signal telling the user which "world" they're browsing when the dropdown opens.

Additionally, the nav link labels themselves all look the same — no color coding or visual hint.

---

## What Changes

### 1. Add per-category accent theming to the navbar data

Extend the `NavLink` interface in `navbarData.ts` with an `accent` color string (matching the section colors already defined in CSS):

- **Masterclasses**: amber (`hsl(38 75% 55%)`) -- matches the existing primary
- **LevelUp Live**: teal (`hsl(200 35% 55%)`) -- matches `--accent-live`
- **The Forge**: ember (`hsl(15 65% 55%)`) -- matches `--accent-forge`
- **Workshops / About**: no accent (defaults to primary amber)

### 2. Accent-tinted dropdown panels (desktop)

When a category dropdown expands, apply its accent color to:

- **Accent line**: A thin 1px colored line at the top of the dropdown panel, matching the section's gradient accent (amber / teal / ember)
- **Card hover state**: Instead of generic `bg-white/10`, cards will glow with a faint tint of the accent color on hover (e.g., `bg-[hsl(200_35%_55%_/_0.08)]` for Live)
- **Title hover color**: Card titles shift to the accent color on hover, not the global primary
- **Description text color**: The category description text uses the accent color at reduced opacity

### 3. Accent dot on the active nav link (desktop)

When hovering a category link, show a small colored dot (matching the accent) below or beside the label, similar to how the `SectionLabel` component already uses a colored dot. This replaces the current generic `bg-white/10` pill background with a more distinctive treatment:

- A tiny animated dot appears below the active label, colored with the category's accent
- The label text itself tints toward the accent color

### 4. Accent-colored expand indicator on mobile

In the mobile menu overlay:

- The `+` toggle icon for expandable categories uses the accent color
- The mobile card grid gets a subtle left-border accent line per category
- Category labels tint toward their accent on tap/expand

### 5. Minimal format badge in dropdown cards

Add a small, styled badge/tag next to the subtitle in each dropdown card showing the format:

- Masterclasses: "On-demand" in amber
- Live Programs: "Live" in teal  
- The Forge: "In-person" in ember

This reinforces what kind of experience each card represents, even within the nav.

---

## Files to Modify

### `src/components/navbarData.ts`
- Add `accent?: string` and `formatBadge?: string` fields to the `NavLink` interface
- Add accent color and format badge values to each nav link entry

### `src/components/Navbar.tsx`
- Read `accent` from the active link
- Apply accent color to: dropdown accent line, card hover backgrounds, title hover color, description tint
- Add accent dot under active desktop nav label
- Apply accent theming to mobile expand toggles and category labels
- Render the format badge on dropdown cards when available

---

## Visual Summary

```text
BEFORE (all dropdowns identical):
+------------------------------------------+
| Masterclasses  LevelUp Live  The Forge   |
|------------------------------------------|
| [card] [card] [card]  (white/10 hover)   |
| titles go primary-amber on hover         |
+------------------------------------------+

AFTER (each dropdown gets its own accent):
+------------------------------------------+
| Masterclasses  LevelUp Live  The Forge   |
|     *amber        *teal        *ember    |
|------------------------------------------|
| ─── amber accent line ───────────────    |
| [card] [card] [card]  (amber tint hover) |
| titles go amber on hover                 |
| "On-demand" badge on each card           |
+------------------------------------------+
```

---

## What Stays the Same

- The glassmorphic pill shape and expand/collapse animation
- The overall card grid layout and image aspect ratios
- The lazy-load / code-split architecture
- Section styling on the main page (already distinct)
- All external links and navigation behavior
