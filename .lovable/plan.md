

## Make the Live Programs Card Larger and More Immersive

The program showcase card (containing the sidebar, image, and details panel) will be scaled up to feel more prominent while preserving the three-column layout.

### Changes (single file: `src/components/LiveProgramsSection.tsx`)

**1. Increase container max-width**
- Change `max-w-[1400px]` to `max-w-[1700px]` (~21% wider)

**2. Set a minimum height on the card**
- Add `md:min-h-[520px] lg:min-h-[580px]` to the main flex container to give the card more vertical presence

**3. Widen the sidebar**
- Change `md:w-[260px] lg:w-[300px]` to `md:w-[300px] lg:w-[340px]`

**4. Increase the center image width**
- Change `md:w-[40%]` to `md:w-[45%]`

**5. Scale up details panel padding**
- Change `p-6 lg:p-8` to `p-8 lg:p-10`

**6. Bump up the program title size in details**
- Change `text-2xl lg:text-3xl` to `text-2xl lg:text-4xl`

All internal spacing, button sizes, and text readability remain unchanged. Mobile layout is unaffected since these are `md:` and `lg:` prefixed values.

