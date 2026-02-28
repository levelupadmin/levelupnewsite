

## Redesign ExpertMembershipCard: Multi-Screen LMS with Cursor Navigation

Transform the static player+sidebar layout into a dynamic LMS that cycles through 4 distinct screens. The cursor navigates between sidebar tabs, each click transitions the main content area.

### Architecture

```text
┌─────────────────────────────────────┐
│  ┌──────────┐  ┌──────────────────┐ │
│  │ 🎬 Sessions│  │                  │ │
│  │ 📚 Resources│  │   MAIN CONTENT   │ │
│  │ 📖 Guides  │  │   (crossfades    │ │
│  │ 🤖 AI Learn│  │    between 4     │ │
│  │           │  │    screens)      │ │
│  └──────────┘  └──────────────────┘ │
│         ↑ cursor clicks tabs         │
└─────────────────────────────────────┘
```

### The 4 Screens

1. **Recorded Sessions** — Video thumbnail with play button, mentor name, progress bar (similar to current player)
2. **Resources** — List of 3-4 downloadable items (PDF icon + title like "Shot Composition Guide", "Script Template")
3. **Guides** — Step-by-step checklist (3-4 steps with checkmarks, like "Set up your project → Write your logline → Draft scene 1")
4. **AI Learning** — Mini chat interface showing a user question and an AI response with a typing indicator

### Animation Cycle (~16s loop)

- **0-4s**: Cursor on "Sessions" tab (highlighted), main area shows video player
- **4-8s**: Cursor moves to "Resources" tab, clicks, main crossfades to resources view
- **8-12s**: Cursor moves to "Guides" tab, clicks, main crossfades to guides view
- **12-16s**: Cursor moves to "AI Learning" tab, clicks, main crossfades to AI chat view
- Loop back to Sessions

### Implementation

**`src/components/why-levelup/ExpertMembershipCard.tsx`** — Full rewrite:
- Sidebar with 4 nav items (icons + labels), each highlighted via CSS animation classes synced to the cursor
- 4 content panels stacked absolutely, each with opacity animation synced to the cycle
- Cursor SVG (reused) with updated keyframes visiting 4 tab positions
- Click ripples at each tab position
- Floating elements: mentor avatars, "LIVE" badge, discipline tags (kept but repositioned)

**`src/index.css`** — Replace existing LMS keyframes:
- `lms-cursor-flow`: 4-stop path visiting each sidebar tab (~16s)
- `lms-screen-1` through `lms-screen-4`: Opacity keyframes showing each screen for its quarter of the cycle
- `lms-tab-1` through `lms-tab-4`: Highlight keyframes for active tab state
- `lms-ripple-tab-*`: Click ripples at each tab position
- Keep the hover-to-pause behavior for all new animation classes

### Content Details

**Resources screen**: 3 rows with file icon + title + "PDF" badge:
- "Shot Composition Guide"  
- "Script Formatting Template"
- "Color Grading Cheat Sheet"

**Guides screen**: 3 steps with status indicators:
- ✅ "Set up your project workspace"
- ✅ "Write your logline & synopsis"  
- 🔵 "Draft your opening scene" (in progress)

**AI Learning screen**: 2 chat bubbles:
- User: "How do I build tension in a chase sequence?"
- AI (with sparkle icon): "Start with rhythm — alternate between wide establishing shots and tight close-ups. Cut pace should accelerate..."

### Files to edit
- `src/components/why-levelup/ExpertMembershipCard.tsx` — full component rewrite
- `src/index.css` — replace LMS animation keyframes (lines ~458-573)

