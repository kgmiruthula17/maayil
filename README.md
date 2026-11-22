# MAAYIL storefront

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · Zustand · React Hook Form + Zod

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_WHATSAPP
npm run dev                  # http://localhost:3000
npm run typecheck && npm run build
```

## Before showing the client
This project was written without network access, so it has **not been compiled or run yet**.
Run `npm run typecheck` and `npm run build` first, then Lighthouse on `next start` (mobile profile).

## Sample data
All products, prices, stock and reviews are demonstration content (`lib/products.ts`, `lib/content.ts`),
labelled as such in the UI. When real inventory is ready: replace the products, set `sampleData: false`
in `lib/site.ts` (this also enables Product structured data).

## Photography and logo
- Product visuals are generated inline SVG (no requests). To use real photos, put them in `public/` and
  add `photos: ["/products/x-1.jpg", ...]` to a product; `next/image` takes over (AVIF/WebP, lazy, srcset).
  Use 4:5 images.
- Logo: `components/layout/Logo.tsx` is a text stand-in. Drop the supplied logo in `public/logo.svg`
  and swap it in (the file explains how).

## Performance choices
- Server Components by default; only 20 files are client components.
- Hero entrance is CSS-only. Framer Motion loads via `LazyMotion` + `domAnimation` (async chunk).
- Carousel and product gallery use native scroll-snap (no slider libraries).
- Forms: react-hook-form/zod load only on checkout and customise; newsletter uses plain validation.
- Cart and wishlist persist to localStorage and hydrate after mount (no SSR mismatch).
- `prefers-reduced-motion` is honoured globally.

## Demo-only behaviour
Checkout takes no payment and places no order. The customisation enquiry composes a WhatsApp
message (needs `NEXT_PUBLIC_WHATSAPP`); nothing is sent to a server. Newsletter and account are front-end only.
