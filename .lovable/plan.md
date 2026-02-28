

## Add Reaction Variety & Image Attachments to Community Chat

### Changes to `src/components/why-levelup/CommunityCard.tsx`

**1. Diversify reactions** — Replace repetitive 🔥/❤️ with a wider variety: `💡`, `🎯`, `✨`, `🤯`, `💪`, `🫡`, `👀`, `🎬`, `🎧`, `🎭`, `💯`. Each message gets a unique mix.

**2. Add `image` optional field to thread data** — Some messages include a small image attachment (a thumbnail below the text bubble). Use existing community/testimonial assets as the "shared" images:
- After Arjun's "one-take concept" message → small thumbnail of a storyboard-like image
- After Kiran's "rough cut" message → thumbnail preview of a film frame
- After Priya's "uploading for peer review" → thumbnail collage

**3. Update `MessageBubble` component** — If `msg.image` exists, render a small rounded thumbnail (aspect ~16:9, ~full bubble width, ~40px tall) below the text inside the bubble with a subtle border and rounded corners.

**4. Updated threads array** (example changes):
```
{ ..., reactions: ["🔥 12", "💡 5", "🎬 3"] }
{ ..., reactions: ["✨ 6", "👀 4"] }
{ ..., image: community7, reactions: ["🤯 9", "😈 4", "🎭 2"] }
{ ..., reactions: ["👏 11", "🫡 7"] }
{ ..., image: community9, reactions: ["🔥 24", "💯 18", "👀 6"] }
{ ..., reactions: ["💪 15", "🎧 3"] }
{ ..., reactions: ["🙌 12", "✨ 8", "🎯 5"] }
{ ..., image: community11, reactions: ["🎬 32", "❤️ 27", "🤯 14"] }
{ ..., reactions: ["💛 41", "🫡 9"] }
{ ..., reactions: ["🔥 38", "❤️ 29", "💡 11"] }
```

### Files to edit
- `src/components/why-levelup/CommunityCard.tsx` — add image field, update reactions, render thumbnails

