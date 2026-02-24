

# Rearrange Forge Section to Centered Layout

## What Changes

Restructure the Forge section from its current two-column split layout to a single, centered column layout matching the reference image. The key change is moving from a left-text/right-features split to everything stacked and centered, with the three feature points displayed in a horizontal row.

## Layout Comparison

```text
CURRENT LAYOUT:
+---------------------------+---------------------------+
|  Forge Logo               |  [icon] Pressure that..   |
|  Learn. Do. Become.       |  [icon] Mentorship...     |
|  Description paragraph    |  [icon] Offline. Imm...   |
|  Stats: 10 | 25+ | 500+  |                           |
+---------------------------+---------------------------+
|            [ Carousel ]                               |
+-------------------------------------------------------+

NEW LAYOUT (from reference):
+-------------------------------------------------------+
|              [IN-PERSON BOOTCAMP badge]                |
|              The Forge logo                            |
|           Where you become (become in orange)          |
|         Centered description paragraph                 |
|           7 Cities  |  11 Editions  |  248 Shortfilms  |
|                                                       |
| [icon] Pressure..  [icon] Mentorship..  [icon] Offline|
|  description         description          description  |
|                                                       |
|            [ Carousel ]                               |
+-------------------------------------------------------+
```

## Technical Steps

### `src/components/ForgeSection.tsx`

**1. Update badge text (line 158-160)**
- Change "Offline Bootcamps" to "In-Person Bootcamp"

**2. Replace two-column grid with centered single column (lines 163-218)**
- Remove the `grid grid-cols-1 md:grid-cols-2` wrapper
- Center the Forge logo
- Replace "Learn. Do. Become." with "Where you **become**" (with "become" in italic primary)
- Center the description text
- Center the stats row
- Move feature points below stats in a 3-column horizontal grid (`grid-cols-1 md:grid-cols-3`)

**3. Update stats data (lines 61-64)**
- Change values to match reference: "7" Cities, "11" Editions, "248" Shortfilms

**4. Update description text (lines 179-183)**
- Replace with the reference text: "A filmmaking bootcamp for aspiring filmmakers, creators, and storytellers -- where in 12 days we teach you filmmaking hands-on and you create your very own short film."

**5. Feature points layout (lines 199-216)**
- Change from vertical stack (`flex flex-col`) to horizontal 3-column grid
- Keep the AnvilHammerIcon with `text-primary`

**6. Update CTA button text in carousel cards (line 272)**
- Change "Request an Invite" to "Apply Now"

No new files or dependencies needed. All changes are within `ForgeSection.tsx`.

