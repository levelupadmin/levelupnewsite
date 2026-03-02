

## Add @vercel/speed-insights

### Changes

1. **`package.json`** — Add `"@vercel/speed-insights": "^1.1.0"` to dependencies.

2. **`src/App.tsx`** — Import `SpeedInsights` and render `<SpeedInsights />` inside the App component (alongside `<Toaster />` etc.). It renders nothing visible — just a lightweight script for Core Web Vitals reporting.

**Note:** Data collection only works when deployed to Vercel. Otherwise the component is a no-op.

