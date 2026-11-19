# Hardware product

"Tally Bar", a store and product site for a desk status display with an LED
pixel screen and a focus timer. The home page is a pale studio hero: the
device sits on a desk with its LED window drawn live over the photo, an intro
paragraph, a Buy button and a three-cell feature strip. The device's own
controls work: press the top plate to start or pause a focus session (the
display counts down), turn the dial for a longer one, press the small orange
button to change the LED colour. Below the fold: a message writer that
relights the display as you type, the focus timer on a desk shot, an app
teaser, the HTTP API and key specs.

- **Shop** (`/shop`): the configurator. Body colour (Chalk, Graphite, Sage),
  LED colour, the first message with a live preview on the photo, add-ons and
  quantity; photo views for front, desk, ports and dial. `?message=&led=&colour=`
  prefills it, and the draft is saved.
- **Specs** (`/specs`), **Apps** (`/apps`: search, categories, install and
  remove, an "installed" filter, all in the URL, and the developer API at
  `/apps#developers`), **Support** (`/support`: searchable FAQ and a contact
  form).
- **Cart and checkout** (`/cart`, slide-in drawer, `/checkout`, `/orders/:id`):
  a demo checkout. No payment is taken and no card details are asked for.
- A 404 page and a live style guide at [`/styleguide`](http://localhost:5361/styleguide),
  linked in the footer.

Cart, orders, installed apps, the demo device (message, LED colour, timer)
and the configurator draft are kept in `localStorage`, so a reload keeps
them, including a running timer. There is no sign-in.

## Run it

```sh
bun install
bun run dev        # http://localhost:5361 (Vite + the Worker in workerd)
bun run build      # dist/client (assets) + dist/hardware_product/index.js (Worker)
bun run typecheck
```

## Edit it

- **`src/data.ts` holds every string and piece of seed data**: `SITE`, `NAV`,
  `HERO`, `FEATURES`, `HOME`, specs, `APPS`, `API_ENDPOINTS`, `FAQ_GROUPS`,
  `SUPPORT`, `FOOTER`.
- **Prices and options are in `src/shared/catalog.ts`** (device price, body
  and LED colours, add-ons, shipping, tax), because the Worker reprices every
  order from it. Form rules are in `src/shared/validation.ts`, shared by the
  pages and the Worker.
- **Every image goes through one constant, `PHOTOS`, at the end of
  `src/data.ts`.** The defaults are generated renders in `public/images/`
  (WebP). To use real photography, point `src` at your own file. Photos that
  show the display carry a `screen` rectangle (percent of the image) where
  the live LED text is drawn; measure your photo's dark window and update it,
  or delete `screen` to show the photo as is. `HERO_CONTROLS` places the
  clickable plate, dial and accent button on the hero photo.
- **The LED display** is `src/components/LedMatrix.tsx` (canvas) with the 5x7
  font in `src/lib/ledFont.ts`. Short text sits centred; long text scrolls;
  with reduced motion it pages word by word.
- **Pages** are in `src/pages/`; routes are in `src/App.tsx` (react-router).
- **`src/worker/index.ts`** is the Cloudflare Worker:
  - `POST /api/orders` validates the cart and the customer and returns `201`
    with an order id and server-computed totals; `409` for an empty or
    invalid cart, `422` with `fieldErrors` for bad fields, `400` for bad JSON.
  - `POST /api/support` returns `201` with a ticket id, or `422`/`400`.
  - `GET /api/health` returns `{ ok: true }`; any other `/api/*` is a JSON `404`.

  To keep orders and tickets, send them to email, a CRM or a D1 table, and
  add a hosted payment page (secret key in Sites → Secrets).

### Tokens (`src/styles.css`)

| Group | Tokens |
| --- | --- |
| Colour | `canvas` #f0f0f2 (page), `canvas-2`, `surface` #fbfbfc, `line`, `line-strong`, `ink` #121214, `ink-2`, `muted` #5b5b61, `faint` (decoration only), `orange` #ea5a1c (fills, large type only), `orange-ink` #c2410c (primary button, focus), `orange-deep` #a3360a (orange text), `orange-soft`, `screen` #0b0b0c, `success`, `success-soft`, `danger`, `danger-soft`, `scrim` |
| Type | Inter and JetBrains Mono (Google Fonts); `font-display`, `text-display` |
| Radius | `xs` 6, `sm` 10 (buttons, inputs), `md` 14, `lg` 22 (cards), `xl` 30 (photos) |
| Shadow | `card`, `float`, `button`, `focus` |
| Motion | `--duration-fast/base/slow`, `--ease-out-soft`, `--ease-in-out-soft`; keyframes `fade-up`, `shimmer`, `press`, `led-pulse`, `blink` |

Light theme only.

### Components (`src/components/`)

| File | Components |
| --- | --- |
| `Button.tsx` | `Button` / `ButtonLink` (primary, dark, outline, ghost; sm/md/lg; loading; `force` pins hover/focus/pressed), `IconButton`, `TextLink`, `NavItem` |
| `Field.tsx` | `Field`, `Input`, `Select`, `Textarea`, `Check`, `FormMessage` |
| `Primitives.tsx` | `Card`, `Eyebrow`, `SectionHeading`, `PageHeader`, `Badge`, `Chip`, `Segmented`, `SwatchPicker`, `QuantityStepper`, `Accordion`, `EmptyState`, `Skeleton`, `Price`, `SpecRows`, `FeatureCell`, `CodeBlock` |
| `LedMatrix.tsx`, `DeviceShot.tsx` | The LED screen; a photo with the LED laid over its window, and `Hotspot` for controls in a photo |
| `AppCard.tsx`, `Cart.tsx` | App tile; `CartDrawer`, `CartLines`, `LineThumb`, `SummaryRows` |
| `Header.tsx`, `Footer.tsx`, `Overlay.tsx`, `Toast.tsx`, `Art.tsx` | Layout, `Modal` / `Drawer` with `useFocusTrap`, toasts, `CloudMark`, `DotMark`, `FeatureIcon` |

## Deploy with Freebuff Sites

`deploy.json` points at the build output. After `bun run build`, deploy with
the `sites_deploy` tool from this directory.
