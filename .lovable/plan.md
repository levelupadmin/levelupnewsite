

## Show Only 4 Lessons Visible, Rest Scrollable

### Change

In `src/pages/MasterclassDetail.tsx` (around line 158), reduce `max-h-[420px]` on the lesson scroll container to approximately `max-h-[340px]` — sized so exactly 4 collapsed lesson cards are visible. The container already has `overflow-y-auto`, so the remaining 17 lessons will be accessible by scrolling.

The YouTube embed's aspect ratio at the current grid width is roughly 340px tall, so this will align the two columns visually.

### File
- `src/pages/MasterclassDetail.tsx` — change `max-h-[420px]` → `max-h-[340px]` on the lesson list container (line 158)

