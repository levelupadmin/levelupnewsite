

## Narrative Scrolling Community Chat

### What changes

**`src/components/why-levelup/CommunityCard.tsx`** — Complete rework of the chat feed:

1. **Expand from 3 to ~10 messages** telling a cohesive narrative arc: someone proposes a project idea → others join in → feedback exchanged → celebration of the finished piece. The conversation feels like a real creative community unfolding.

2. **Auto-scrolling animation**: The messages container gets a vertical CSS `translateY` animation that slowly scrolls upward through the full message list, looping infinitely. Messages duplicate (like the logo marquee) so the scroll is seamless. A top/bottom gradient mask fades messages in/out at edges.

3. **Remove the static typing indicator** — instead, a typing indicator appears naturally as part of the message flow between certain messages.

4. **Narrative thread** (example):
   - Priya: "Anyone up for a 48hr edit challenge? 🎬"
   - Arjun: "I'm in — been wanting to try a one-take concept"
   - Meera: "Count me in! Can we do horror genre? 🎃"
   - Priya: "Horror it is. Let's sync on Discord at 8pm"
   - Kiran: "Just watched Arjun's rough cut — the tension is insane 🔥"
   - Arjun: "Meera's sound design made all the difference honestly"
   - Meera: "Learned that layering trick from Ravi Sir's masterclass"
   - Priya: "All 3 films are done! Uploading for peer review now"
   - Kiran: "This community is something else 🙌"
   - Arjun: "From strangers to collaborators in 48 hours ❤️"

5. **Vertical scroll animation**: Add a `@keyframes scroll-chat-up` in the component's inline style or index.css that translates the message list upward over ~25s, with the container using `overflow: hidden` and gradient masks top/bottom.

### Files to edit
- `src/components/why-levelup/CommunityCard.tsx` — expanded messages array, scroll animation wrapper, gradient mask
- `src/index.css` — add `@keyframes scroll-chat-up` animation

