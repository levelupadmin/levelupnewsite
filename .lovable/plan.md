

# Why LevelUp Cards: Alignment and Interaction Polish

Redesign the card states to match the reference images and make open/close transitions smoother.

---

## Key Changes from Reference

### 1. Compressed cards keep their content visible (not vertical text)
In the reference, when one card is expanded the other cards still show their title and illustration -- just narrower. Currently, compressed cards collapse to vertical text. This will change so compressed cards simply scale down their default view.

### 2. Icon button styled as bordered square
The reference shows the expand/close icon inside a visible bordered square button (not a bare icon). Update styling to add a border and slightly larger hit area.

### 3. Expanded layout restructured
The reference expanded state shows:
- Title (large) + description text at the top-left
- Below that: illustration on left, bullet list in center, stat on right
- This is a more horizontal content spread vs the current 2-column split

### 4. Smoother transitions
- Remove the separate "compressed state" overlay entirely on desktop -- just let the default state content naturally shrink with the card width
- Use `overflow: hidden` on content areas so text clips gracefully during resize
- Faster opacity crossfade (250ms) with no delay on collapse for snappier feel
- Keep the 700ms width transition but use a slightly different easing for collapse vs expand

---

## Technical Details

### File: `src/components/WhyLevelUp.tsx`

**Remove the compressed state overlays entirely (desktop and mobile).** Instead, the "default state" layer stays visible for both default and compressed states -- the card just gets narrower and the content clips via overflow-hidden. This eliminates the jarring content swap during transitions.

**Three visual layers become two:**
1. **Default/Compressed layer** (always visible when not expanded) -- title + illustration, clips naturally as width shrinks
2. **Expanded layer** -- full content, fades in when expanded

**Specific changes:**
- Delete the "COMPRESSED STATE (desktop only)" block (lines 156-174)
- Delete the "COMPRESSED STATE (mobile)" block (lines 176-191)
- Update the "DEFAULT STATE" opacity logic: show when NOT expanded (i.e., `opacity: !isExpanded ? 1 : 0`)
- This means compressed cards still show the title + illustration, just narrower

**Icon button styling update:**
- Change from bare icon to bordered button: `border border-foreground/30 rounded-md p-2` with hover state `hover:border-foreground/60 hover:bg-white/5`
- Slightly larger: `w-9 h-9 flex items-center justify-center`

**Expanded state layout update (to match reference):**
- Top section: Title + expanded description side by side
- Bottom section: Illustration (left), bullets (center), stat (right) in a 3-column grid
- Close button stays in top-right corner

**Transition smoothness improvements:**
- Default/Compressed layer: `opacity 250ms ease` (no delay)
- Expanded layer: `opacity 300ms ease 100ms` on expand, `opacity 200ms ease` on collapse (remove delay when closing)
- Add `will-change: width` on card wrapper for GPU-accelerated width transitions
- Add `overflow: hidden` on the default state content so text doesn't overflow during compression

**Mobile adjustments:**
- Compressed cards on mobile show a single-line row with title (same as current mobile compressed but using the default state layer with overflow hidden instead of a separate overlay)
