# ERA Beauty — website

React 18 + TypeScript + Vite, Tailwind CSS v4, Motion for React, Lucide icons.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run lint
npm run build
```

## Replacing placeholder content

All business content lives in `src/data/` — components read from these files only.

| File | Contents |
| --- | --- |
| `site.ts` | Brand name, currency, `pricesArePlaceholders` flag (hides the "sample prices" note when `false`) |
| `navigation.ts` | The seven menu destinations (anchors today; can become routes) |
| `images.ts` | Every image URL (currently Unsplash placeholders) |
| `services.ts` | Service cards |
| `pricing.ts` | Treatment menu by category — **placeholder prices** |
| `results.ts` | Before/after cases — set `demo: false` only for genuine, approved client photos |
| `faq.ts` | Questions and answers |
| `contact.ts` | Address, phone, email, hours, socials, `mapEmbedUrl`, `directionsUrl` |

## Booking

The appointment form is frontend-only. `submitAppointmentRequest` in `src/lib/booking.ts` is the single
integration point for a future backend or booking provider; it currently sends nothing and the UI says so.

## Branding

The wordmark in `src/components/layout/Wordmark.tsx` is typographic; swap in the official logo when supplied.
Design tokens (colours, fonts, easing) are in `src/index.css` under `@theme`.
