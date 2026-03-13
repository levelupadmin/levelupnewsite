

## Update DRK Kiran CTAs

### Change in `src/data/masterclassPages.ts` (lines 626-630)

Update the drk-kiran entry's CTA link, price, and label:

```ts
// From:
price: 499,
originalPrice: 2999,
currency: "₹",
ctaLink: "https://study.leveluplearning.in/l/38f10118da",
ctaText: "SUBSCRIBE FOR ₹499",

// To:
price: 999,
originalPrice: 2999,
currency: "₹",
ctaLink: "https://study.leveluplearning.in/web/checkout/64e7670a1e642660e96fc8e9",
ctaText: "BUY FOR ₹999",
```

This updates the checkout URL, price, and CTA label across all CTA buttons on the DRK Kiran page (hero, sticky bar, pricing section) since they all read from `data.ctaLink` and `data.ctaText`.

