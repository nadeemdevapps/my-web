# Stitch & Tan

A one-person handmade leather shop. The homepage is a quiet white page with a
floating pill nav, a handwritten title, cut-out pieces you can pick up and
drag, a short story with links to products, and a chat thread with a friend
on a doodle background that leads to custom orders.

## Screens

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, story, chat thread, "On the bench" picks, how a piece is made |
| `/shop` | Product grid with category chips, search, ready-to-ship filter and sort (all kept in the URL) |
| `/shop/:slug` | Product page: leather colour, free initials, quantity, add to bag, details/care/shipping tabs, related pieces; sold-out pieces link to a prefilled custom request |
| `/custom` | Custom-order request form: item, what it holds, size, leather and thread, budget, date, contact, notes. The draft is kept in this browser; sent requests are listed below it |
| `/story` | About the maker, process, numbers and a call to action |
| `/styleguide` | Live style guide: tokens and every component state |
| anything else | 404 |

The bag is a drawer available everywhere (nav bag icon). It keeps its lines
across reloads, shows progress to free shipping and sends an order request.

## Where things live

- `src/content.ts`: every string, product, leather and thread colour, and the
  `photos` map.
- `src/styles.css`: design tokens (`@theme`), keyframes, the doodle background
  and the `is-hover` / `is-focus` / `is-pressed` variants that let the style
  guide pin a state with `data-force`. `src/lib/tokens.ts` mirrors the tokens
  for the style guide.
- `src/components/`: the design system (`ui.tsx`), drawer and modal
  (`Overlay.tsx`), nav, footer and toasts (`Chrome.tsx`), product card and bag
  drawer.
- `src/pages/`: one file per screen.
- `src/lib/store.tsx`: bag, sent custom requests and toasts, kept in
  localStorage.
- `src/worker/index.ts`: the Hono Worker. `GET /api/health`, validated
  `POST /api/orders` and `POST /api/custom-orders` (400 with field errors on bad
  input, 201 with a reference otherwise), JSON 404 for any other `/api/*`. They
  store nothing yet: wire them to your email provider, a D1 table or a payment
  provider.

## Photos

Every image goes through the `photos` map at the top of `src/content.ts`. The
images in `public/images/` are generated placeholders: the product shots are
transparent cut-outs, the workshop and hands are full photos. Drop your own
photography in that folder and point the map at it. Products reference a key
from the map, so one change updates the hero, card, product page and bag.
Cut-outs look best as transparent PNG/WebP with a soft shadow.

## Ordering

No payment is taken. The bag posts an order request with an email; the
custom form posts a request. Replace the Worker routes with your payment and
email providers before selling.

## Develop

```sh
bun install
bun run dev        # http://localhost:5356
bun run typecheck
bun run build
```

Style guide: `/styleguide` (also linked from the footer).
