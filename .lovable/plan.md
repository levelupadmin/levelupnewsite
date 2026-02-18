

## Expert Mentors Card: "Masterclass Player" UI

### The Problem
The current illustration is a static 3x2 grid of mentor photos with a "40+ MENTORS" label. It lacks the interactive, story-driven quality of the other two cards (Portfolio card has an NLE workspace; Community card has a live chat channel).

### The Concept: A Cinematic Masterclass Player
Replace the photo mosaic with a **streaming platform-style lesson viewer** -- think MasterClass or Netflix learning mode. This tells the story: "You get exclusive, cinematic lessons from real working professionals."

The illustration will show:
- A **main video player** (center) with a mentor photo as a still frame, viewfinder corners, and a progress bar at the bottom
- A **lesson sidebar** (right side) showing a vertical list of 3-4 chapter titles with durations and check marks for completed ones (e.g., "Story Structure - 14:32", "Building Tension - 11:08")
- A **"LIVE FEEDBACK" badge** floating near the top-right to hint at direct mentor access
- A **mentor name plate** at the bottom of the player (e.g., "Karthik Subbaraj -- Teaches Filmmaking")
- Small floating **discipline tags** ("Filmmaking", "Editing", "Music") orbiting gently with the existing float animations

### Visual Language
- Same dark card background, primary/orange accents, and subtle glow shadows as the other two cards
- Reuses existing masterclass images (`masterclass-1.jpg` through `masterclass-6.jpg`) for the player still and sidebar thumbnails
- Matches the level of detail and interactivity established by the Portfolio and Community cards

### Technical Details

**File: `src/components/why-levelup/ExpertMembershipCard.tsx`** -- Full rewrite of the illustration component:

1. **Main Player Block** (~55% width, 16:10 aspect ratio)
   - Mentor image as background (`masterclass-1.jpg`)
   - SVG viewfinder corner brackets (same pattern as Portfolio card)
   - Bottom gradient bar with mentor name + discipline
   - Thin progress bar with orange fill at ~40%

2. **Lesson Sidebar** (~35% width, right side)
   - Rounded container with `bg-[hsl(30_20%_10%/0.95)]` and subtle border
   - Header: "Chapters" with a small Film icon
   - 3-4 lesson rows, each with: check icon (completed) or circle (upcoming), title, duration
   - First two rows marked complete with a muted check, third row highlighted as "Now Playing"

3. **Floating Elements** (using existing `animate-float-card-*` classes)
   - "LIVE FEEDBACK" pill badge (top-right area)
   - Discipline tags: "Filmmaking", "Editing", "Music" scattered around edges
   - Small stacked mentor avatar cluster (bottom-left) showing 3 overlapping circular portraits with "+37 more"

4. **Ambient glow** -- radial gradient matching the Community card pattern

No other files need to change. The card component is self-contained and already imported by `WhyLevelUp.tsx`.
