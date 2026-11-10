---
version: alpha
name: Tsumly
description: Tsumly's own design language for its independent website — the ledger app's identity on the web. Purple/amber/cream, not blue; Inter + Bricolage Grotesque, not serif; the app's warm cream canvas and 20px cards, not the portfolio's paper. Built for Astro (static HTML, zero JS by default) and for AI readability (semantic HTML, llms.txt, sitemap).
---

# Structural palette — LIGHT theme is the brand home. Only color values
# change between themes. Every other token — typography, spacing, radius,
# components — is identical across both. The site follows the system by
# default (like the app: ThemeMode.system); dark is a first-class plum
# design, not an inversion.
colors:
  accent: "#6C4DE6"          # brand purple — the only structural accent
  accent-deep: "#4A2FB8"     # deep purple — text accents on cream, dark fills
  accent-soft: "#E4DCFB"     # soft purple wash — chips, selected states
  amber: "#F2A81D"           # secondary brand — coins, highlights
  amber-deep: "#9A6206"      # deep amber — text/icons on light amber tints
  amber-soft: "#FFE9C2"      # soft amber wash — highlights, lent tint base
  on-accent: "#FFFFFF"       # white text on accent fills
  on-accent-container: "#2A1B6E" # deep plum ink on soft purple
  canvas: "#F6F0E2"          # page background — warm cream
  surface: "#FDF9F0"         # card / panel surface — warm white
  surface-variant: "#FAF5E9" # recessed surface
  surface-high: "#F1E9D6"    # raised surface
  surface-highest: "#EAE0C9" # highest surface
  sheet: "#FDF9F0"           # dialog / sheet surface
  ink: "#23201B"             # primary text — warm near-black
  ink-secondary: "#6E655A"   # secondary body copy
  ink-muted: "#6E655A"       # supporting / muted copy
  hairline: "#EFE6D2"        # 1px card border (light only)
  outline: "#D8CDB6"         # field / control outlines
  error: "#C2410C"           # the single reserved non-brand colour

# DARK theme — deep plum, first-class (not an inverted afterthought).
colors-dark:
  accent: "#A78FFF"          # lighter purple that pops on plum
  accent-deep: "#A78FFF"
  accent-soft: "#3A2A7A"     # deep plum-purple wash
  amber: "#FFC53D"           # bright amber on plum
  amber-deep: "#FFE9C2"      # pale amber text on dark tints
  amber-soft: "#453312"      # deep amber wash
  on-accent: "#1E1440"       # deep plum ink on accent fills
  on-accent-container: "#E4DCFB"
  canvas: "#151020"          # page background — deep plum
  surface: "#1E1729"         # card / panel surface — plum
  surface-variant: "#1A1425" # recessed surface
  surface-high: "#272030"    # raised surface — plum card
  surface-highest: "#322840" # highest surface
  sheet: "#272030"
  ink: "#F5EEDF"             # primary text — cream on plum
  ink-secondary: "#B9AECB"   # secondary body copy — muted plum
  ink-muted: "#B9AECB"
  hairline: none             # dark cards carry NO border (BorderSide.none);
                             # separation comes from the surface step
  outline: "#4A3F5C"
  error: "#FF9E73"

# Money tints — the tint IS the meaning. Same mapping in every screen,
# both themes. Always pair a tint background with its on-tint foreground;
# never put body text on a tint.
tints:
  income: "#DDF3E3"          # on: "#1E7A45"
  expense: "#FFE2D4"         # on: "#C2410C"
  transfer: "#EDE7DA"        # on: "#6B6257"
  lent: "#FFEDC7"            # on: "#9A6206"
  borrowed: "#E7DFFB"        # on: "#5B3DF0"
tints-dark:
  income: "#1D3A28"          # on: "#7BD9A4"
  expense: "#43251A"         # on: "#FF9E73"
  transfer: "#2E2A24"        # on: "#C9BFAE"
  lent: "#453312"            # on: "#FFC53D"
  borrowed: "#2C2350"        # on: "#B7A6FF"

# Donut slices (brand palette, cycles past 6 categories).
donut: ["#6C4DE6", "#F2A81D", "#2FA968", "#E86AA0", "#3D7BE8", "#E85D3D"]
donut-dark: ["#A78FFF", "#FFC53D", "#7BD9A4", "#F49AC1", "#8FB4F7", "#FF9E73"]

# Typography: two-font system (locked 2026-09-30). Inter is the workhorse
# (~90% of the app); the display font is for brand moments ONLY — hero
# headings, onboarding headlines, empty-state titles, celebration
# banners. NEVER on amounts, buttons, tabs, or small labels; max one
# display heading per screen. Bricolage Grotesque is the default display
# family; EB Garamond is the user's selectable alternative (Settings →
# Appearance → "Display font"). Amounts are always Inter 600.
typography:
  display-xl:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -1px
  display-lg:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.5px
  display-md:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.5px
  title-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  amount-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.5px
    # Stat figures and money amounts — Inter 600, never the display font.

# Radius scale — the app's rhythm: 20px cards, 16px buttons/fields.
# (The main site uses 12px cards; Tsumly does not. Kaizenly uses 24px
# cards and pill CTAs; Tsumly does not — its buttons are 16px, not pill.)
rounded:
  xs: 12px     # chips
  sm: 14px     # snackbars, list tiles
  md: 16px     # buttons, fields — the app's button radius
  lg: 20px     # cards, panels — the app's corner
  xl: 24px     # dialogs, sheets (see Open decisions: code says 28px)
  pill: 9999px # status pills, segmented controls
  full: 9999px # circular icon buttons, avatars

# Spacing — web scale (8px base), like the main site.
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 28px
  xxl: 32px
  section: 64px
  section-mobile: 48px
  screen-h: 24px
  content-bottom: 32px

components:
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    padding: "{spacing.md}"
    # Tsumly's own nav: Tsumu mark + TSUMLY Bricolage wordmark left;
    # Overview / Privacy / Terms links; theme toggle + "Main website" link
    # right (back to the portfolio). Hamburger below 840px.
  wordmark:
    fontFamily: "Bricolage Grotesque, Inter, system-ui, sans-serif"
    fontWeight: 700
    textColor: "{colors.ink}"
    # "Tsumly" in the display font — the app's wordmark. Never set in
    # Inter, never in a pixel webfont.
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 16px 24px
  button-primary-pressed:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.outline}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 16px 24px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    elevation: 0
  feature-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    # Feature lists are plain bullets, never nested boxes — same rule as
    # the main site's flagship cards.
  hero:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    headlineTypography: "{typography.display-xl}"
    # Warm cream canvas, Bricolage two-tone headline (dim lead-in +
    # full-strength punch). Tsumu sits above the headline; the Bricolage
    # wordmark is the header lockup, not a hero element.
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.caption}"
    padding: "{spacing.xxl}"
    # Own footer: mark + tagline, "Built by Nadeem" with a link to the
    # portfolio home, links to Overview / Privacy / Terms, and the
    # Machine column (llms.txt / robots.txt / sitemap.xml).
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    actionColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  dialog:
    backgroundColor: "{colors.sheet}"
    titleTypography: "{typography.title-md}"
    bodyTypography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  stat-tile:
    backgroundColor: "{colors.surface}"
    valueTypography: "{typography.amount-lg}"
    captionTypography: "{typography.caption}"
    rounded: "{rounded.lg}"
    padding: 16px
  logo:
    status: decided
    mark: "Tsumu — three stacked amber coins with a minimal face and a
      purple party hat" (the app's mascot, code-drawn as SVG from
      mascot.dart). Must read at 20–28px and as a favicon; the hat is
      always #6C4DE6 and the coins always #F2A81D, never recoloured per
      theme; ink parts follow the theme via currentColor.
    files: public/logo.svg (full mark), public/favicon.svg (simplified
      stack on a purple rounded square)
    wordmark: "{components.wordmark}"
---


## Overview

Tsumly's site feels like the app: warm, quirky, and clean. The dominant
surface is the app's own warm cream (`{colors.canvas}` — #F6F0E2), with
brand purple (`{colors.accent}` — #6C4DE6) as the single structural
accent and amber (`{colors.amber}` — #F2A81D) as the secondary brand
colour — coins, highlights, the mascot. There is no blue here — the main
site's blue never appears on a Tsumly page — and no green: the money
tints carry meaning, they are not decoration.

The name is inspired by the Japanese verb *tsumu* (積む) — to stack, to
accumulate, to build up over time (see `TSUMLY_BRAND_NAME_STORY.md` in
the app repo). Say "inspired by", never as though "Tsumly" itself were a
Japanese word. The tagline is **"Every amount adds up."**

Type is a two-font system: **Inter** for everything functional (~90% of
the app — amounts, body, buttons, forms, tabs, labels) and **Bricolage
Grotesque** for brand moments only (hero headings, empty-state titles,
celebration banners), with **EB Garamond** as the user's selectable
alternative. Headlines use the app's two-tone style: a dull lead-in plus
a full-strength punch ("Every amount" dim → "adds up." strong).

The site ships in **two polarities** that share every non-color token:
1. **Light theme** — the brand home. Warm cream canvas, warm-white
   surfaces, warm near-black ink.
2. **Dark theme** — a first-class deep plum design (`{colors-dark.canvas}`
   — #151020), plum surfaces, cream ink, lighter purple accent.

The theme **follows the system by default** (like the app:
`ThemeMode.system` is the app's default — `app_providers.dart`: "User's
theme choice; defaults to following the system") and can be set
explicitly to Dark or Light via the toggle. Only palette values change
between the two.

Surfaces are the app's surfaces: 20px cards (`{rounded.lg}`), 16px
buttons/fields, 1px hairlines in light, **no borders in dark** — flat,
tint and border carry the separation, never drop shadows.

**Key Characteristics:**
- Purple is the only structural accent — brand purple for actions, deep
  purple for pressed states and text accents, soft purple for chips and
  selected states. Amber is the secondary brand colour.
- Warm, never cold. Cream/plum surfaces, never pure white/black or
  clinical blue-grey fintech.
- Inter everywhere functional; Bricolage Grotesque for brand moments
  only; EB Garamond as the selectable alternative.
- Colour carries meaning: every money direction has its tint, reused
  everywhere that meaning appears.
- Code-drawn, not raster: all illustration is drawn in code (SVG on the
  web, `CustomPainter` in the app). No PNG/JPG art in the UI, no
  emoji-as-UI.
- 20px cards, 16px buttons/fields — the app's corner rhythm.
- Two shipped polarities (light brand home + dark plum) that share all
  non-color tokens; only palette values differ.
- Feature lists as plain bullets, never nested boxes.

## Colors

> The palette is the app's palette (`app_colors.dart` in the app repo),
> in two polarities. Values are listed as **light / dark** where they
> differ. Canonical token map is `colors` (light) with `colors-dark`
> mirroring it.

### Brand & Accent
- **Accent** (`{colors.accent}` — #6C4DE6 light / #A78FFF dark): the
  single structural accent — primary CTA fill, inline link colour,
  active-tab and focus signal. Deep enough for white text on buttons
  (5.5:1).
- **Deep Accent** (`{colors.accent-deep}` — #4A2FB8 light / #A78FFF
  dark): text accents on cream, dark fills, the press state of the
  primary CTA. White on purpleDeep is 8.8:1.
- **Soft Accent** (`{colors.accent-soft}` — #E4DCFB light / #3A2A7A
  dark): chips, selected states, borrowed tint base.
- **Amber** (`{colors.amber}` — #F2A81D light / #FFC53D dark): secondary
  brand — coins, highlights. Deep amber (`{colors.amber-deep}` —
  #9A6206 light / #FFE9C2 dark) for text/icons on amber tints.

### Surface
- **Canvas** (`{colors.canvas}` — #F6F0E2 light / #151020 dark): the
  page background — warm cream in light, deep plum in dark.
- **Surface** (`{colors.surface}` — #FDF9F0 light / #1E1729 dark):
  card, panel, nav, and form-field surfaces.
- **Surface Variant** (`{colors.surface-variant}` — #FAF5E9 light /
  #1A1425 dark): recessed cards and tiles.
- **Sheet** (`{colors.sheet}` — #FDF9F0 light / #272030 dark): dialogs
  and bottom sheets.
- **Hairline** (`{colors.hairline}` — #EFE6D2 light / none dark): 1px
  card borders in light; dark cards carry no border — separation comes
  from the surface step.

### Text
- **Ink** (`{colors.ink}` — #23201B light / #F5EEDF dark): primary
  headings and body — warm near-black on cream (14.3:1), cream on plum
  (16.1:1).
- **Ink Secondary** (`{colors.ink-secondary}` — #6E655A light / #B9AECB
  dark): secondary body copy (5.0:1 light, 8.9:1 dark).
- **Ink Muted** (`{colors.ink-muted}`): supporting / muted copy,
  inactive nav labels — same values as secondary.

### Money tints
The tint *is* the meaning. Same mapping in every screen, both themes:

| Meaning | Light bg / fg | Dark bg / fg |
|---|---|---|
| Income | `#DDF3E3` / `#1E7A45` (4.6:1) | `#1D3A28` / `#7BD9A4` |
| Expense | `#FFE2D4` / `#C2410C` | `#43251A` / `#FF9E73` |
| Transfer | `#EDE7DA` / `#6B6257` | `#2E2A24` / `#C9BFAE` |
| Lent | `#FFEDC7` / `#9A6206` | `#453312` / `#FFC53D` |
| Borrowed | `#E7DFFB` / `#5B3DF0` | `#2C2350` / `#B7A6FF` |

Always pair a tint background with its `onTint*` foreground — never put
body text on a tint. Never use red/green text alone to signal money
meaning — always pair with tint or icon.

### Semantic
The only reserved non-brand colour is **Error** (`{colors.error}` —
#C2410C light / #FF9E73 dark), used solely for destructive actions and
error states. There is **no success/warning hue** — affirmative state is
carried by the accent and by ink weight.

## Typography

### Font Family
Two families carry the system. **Inter** (OFL, bundled in the app at
400/500/600/700) sets amounts, body text, buttons, forms, tabs, labels,
transaction rows, reports, loan details — ~90% of the app. **Bricolage
Grotesque** (OFL, 600/700/800, the default display family) sets brand
moments only. **EB Garamond** (OFL serif, 600/700/800) is the user's
selectable display alternative.

- Inter 600 → money amounts (never the display font).
- Inter 700, tight tracking (−0.2) → app bar titles.
- Bricolage Grotesque 700/800 → hero headings, onboarding headlines,
  empty-state titles, celebration banners. Max one display heading per
  screen.
- Bricolage Grotesque (or EB Garamond, if the user picked it) →
  page titles and Settings section labels.
- Display headings use the **two-tone style**: dull lead-in (55% ink)
  + full-strength punch, e.g. "Every amount" dim → "adds up." strong.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 800 | 1.05 | −1px | Hero headline |
| `{typography.display-lg}` | 48px | 700 | 1.1 | −0.5px | Section headlines |
| `{typography.display-md}` | 36px | 700 | 1.15 | −0.5px | Sub-section headlines, large stats |
| `{typography.display-sm}` | 28px | 700 | 1.2 | −0.5px | Card headlines, callouts |
| `{typography.title-lg}` | 22px | 500 | 1.3 | 0 | Panel titles |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Card titles, dialog titles |
| `{typography.title-sm}` | 16px | 500 | 1.4 | 0 | List labels |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default running text |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Dense body, descriptions, fine print |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Captions |
| `{typography.caption-uppercase}` | 12px | 500 | 1.4 | 1.5px | Small uppercase labels |
| `{typography.button}` | 16px | 600 | 1.5 | 0 | Button labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Nav links |
| `{typography.amount-lg}` | 40px | 600 | 1.1 | −0.5px | Stat figures, money amounts |

### Principles
Inter carries ~90% of the words; the display font is a spice, not a
staple. When in doubt about emphasis, reach for the accent colour or a
bigger size before a heavier weight. Never use font weight as the *only*
signal for a money state — pair with tint or an icon. No third display
family without a design discussion.

## Layout

### Spacing System
- **Base unit:** 8px.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 ·
  `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 28 ·
  `{spacing.xxl}` 32.
- **Screen padding:** 16px in the app; web gutters `{spacing.screen-h}`
  (24px) horizontal.
- **Card padding:** `{spacing.lg}` (24px) inside cards and panels.
- **Section gaps:** `{spacing.section}` (64px desktop / 48px mobile)
  between major sections.
- **Page tail:** `{spacing.content-bottom}` (32px) of breathing room at
  the end of a page.
- **Stacked cards:** the app's theme sets card margin to zero globally,
  so stacked cards in a list MUST add their own gap (12px) — without it
  cards visually merge, especially in dark mode where there is no
  border.

### Grid & Container
Content is centred in a wide max-width column (1080–1300px on desktop)
with generous outer gutters. Feature sections alternate between full-width
text blocks and 2-up / 3-up card grids. The hero sits inside the centred
container, like every other section.

### Responsive Strategy

#### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Wide | 1440px+ | Full multi-column grids, widest container |
| Desktop | 1080–1300px | Standard centred container, 3-up card grids |
| Tablet | 768–840px | Grids collapse to 2-up, nav begins condensing |
| Mobile | ≤600px | Single-column stacks, hamburger nav, full-width CTAs |

#### Touch Targets
Primary buttons and utility buttons carry comfortable tap padding; aim
for a 44×44px minimum hit area on mobile by preserving vertical padding
even as labels shrink.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Hairline border `{colors.hairline}` (light) / surface step (dark), no shadow | Default cards |
| 1 — Soft | Flat + tint | Raised feature cards, floating buttons |
| 2 — Elevated | Flat + sheet surface | Modals, popovers, bottom sheets |

**No drop shadows for depth** — the app's rule. Cards are flat; the
tint or the border (light) and the surface step (dark) carry the
separation. In dark theme a black shadow is invisible on a near-black
canvas — the depth cue there is a lighter card surface, not a darker
shadow.

## Illustrations

The app's illustration voice, not the main site's: code-drawn as SVG,
in the brand palette, with one consistent stroke language. One calm
illustration per surface, with generous whitespace. No photography as
decoration; screenshots of the app sit inside rounded `{rounded.lg}`
frames. No raster illustration, no emoji-as-UI.

- **Spot illustrations** (the app's `SpotKind` set): layered soft blobs
  in brand tints + one strong glyph. The closed set is `wallet`,
  `people`, `chart`, `transfer`, `calendar`, `loan`, `backup`,
  `transactions` (an amber blob with a receipt glyph). Used for empty
  states and onboarding headers.
- **Tsumu** (the mascot): the coin-stack buddy — three slightly askew
  amber coins, ink outlines, a minimal face on the middle coin, a
  purple party hat. Variants: `wave` (onboarding welcome, empty
  states), `celebrate` (loan fully-paid banner), `peek` (dashboard hero
  accent, half-hidden behind a card edge). The mascot appears at
  welcome / empty / payoff moments only — never in forms, never twice
  on one screen. Spot art and mascot are never mixed with raster
  images.
- **Wavy dividers / organic blobs**: brand-layer transitions only
  (onboarding header, hero backdrops). Never inside forms.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 12px | Chips |
| `{rounded.sm}` | 14px | Snackbars, list tiles |
| `{rounded.md}` | 16px | Buttons, fields — the app's button radius |
| `{rounded.lg}` | 20px | Cards, panels — the app's corner |
| `{rounded.xl}` | 24px | Dialogs, sheets |
| `{rounded.pill}` | 9999px | Status pills, segmented controls |
| `{rounded.full}` | 9999px | Circular icon buttons, avatars |

Marketing CTAs use `{rounded.md}` (16px) — the app's button radius,
**not** pill. Pill is reserved for status pills and segmented controls.
The contrast between a 16px button and a 20px card is intentional.

## Components

### Navigation

**`nav-bar`** — Top navigation. Slim sticky bar, `{colors.surface}`
background, 64px tall. Left: Tsumu mark + TSUMLY Bricolage wordmark.
Centre/right: Overview / Privacy / Terms links. Right: theme toggle +
"Main website" link (back to the portfolio home). Condenses to a hamburger
below 840px.

**`wordmark`** — "Tsumly" in Bricolage Grotesque 700, `{colors.ink}`.
The app's wordmark. Never set in Inter, never in a pixel webfont.

**`logo`** — "Tsumu — three stacked amber coins with a minimal face
and a purple party hat": the app's mascot, redrawn as SVG from
`mascot.dart` geometry. The hat is always #6C4DE6 and the coins always
#F2A81D, never recoloured per theme; ink parts follow the theme via
`currentColor`. Must read at 20–28px and as a favicon. Files:
`public/logo.svg`, `public/favicon.svg`.

### Buttons

**`button-primary`** — The primary CTA. Background `{colors.accent}`
(brand purple), text `{colors.on-accent}` (white, 5.5:1), type
`{typography.button}` (Inter 16 / 600), `{rounded.md}` (16px), padding
16px × 24px.
- Pressed state darkens to `{colors.accent-deep}`.
- Disabled state uses `{colors.surface-variant}` fill with
  `{colors.ink-muted}` text.

**`button-secondary`** — `{colors.surface}` background,
`{colors.ink}` text, 1px `{colors.outline}` border, same 16px radius
and padding as primary.

**`text-link`** — Inline link, no background, `{colors.accent}` text
(4.8:1 on cream, 7.1:1 on plum).

### Cards & Containers

**`card`** — The workhorse surface. `{colors.surface}` background, 1px
`{colors.hairline}` border in light / no border in dark, rounded
`{rounded.lg}` (20px), `0dp` elevation, interior padding
`{spacing.lg}` (24px).

**`feature-card`** — Same chrome as `card`. Feature lists inside are plain
bullets, never nested boxes.

### Feedback

**`toast`** — `{colors.ink}` surface (light) / `{colors.sheet}` (dark),
`{colors.surface}` / `{colors.ink}` text, `{colors.accent}` action
label, `{typography.body-sm}`, rounded `{rounded.sm}` (14px).

**`dialog`** — Modal / bottom-sheet surface. `{colors.sheet}`
background, `{typography.title-md}` title, `{typography.body-md}` body,
24px radius, 24px padding.

### Signature Components

**`hero`** — Warm cream canvas, `{colors.ink}` text,
`{typography.display-xl}` Bricolage two-tone headline ("Every amount"
dim → "adds up." strong), and a `button-primary` + `button-secondary`
CTA pair. Tsumu sits above the headline.

**`footer`** — Own footer. `{colors.canvas}` band,
`{colors.ink-secondary}` link text at `{typography.caption}`, padding
`{spacing.xxl}`. Brand column (mark + tagline + "Built by Nadeem" with a
link to the portfolio home), link columns (Overview / Privacy / Terms),
and the Machine column (llms.txt / robots.txt / sitemap.xml).

**`stat-tile`** — A stat block. `{colors.surface}` background, value in
`{typography.amount-lg}` (Inter 600 — money amounts, never the display
font), caption in `{typography.caption}`, 20px radius, 16px padding.

## Core Pages

- **Home**: hero (Tsumu mark, Bricolage two-tone headline "Every amount
  adds up.", primary + secondary CTA), the name section ("Why Tsumly?" —
  inspired by Japanese *tsumu* 積む, to stack / accumulate / build up),
  How it works (local-first ledger: lend and borrow, partial
  repayments, running balance, settle in full), Smart repayment split
  (one repayment across several loans, never merged), Pre-app loans
  (older loans without moving the balance), Person profiles (per-person
  totals, guarded archive), Everyday money (income, expenses,
  transfers, fees & taxes, categories), Accounts (five types, opening
  balance, balance guard), Reports & statements (monthly reports, six
  PDF statement exports, per-person statements), Home dashboard
  (available balance, net position, lent & borrowed, quick actions,
  daily quote), Loan reminders (due-date 9:00 AM + overdue), Make it
  yours (theme, display font, currency, name), Backup & privacy
  (offline-first, encrypted Drive backup, no tracking), and the footer.
  Copy carries over from the main site's `/products/tsumly/` page,
  verified against the app repo and `docs/06_DESIGN.md`.
- **Privacy / Terms**: document pages — warm canvas, Bricolage
  headlines, generous line-height. Content carries over from the main
  site's `/products/tsumly/privacy/` and `/terms/` pages.

## AI Readability

Same discipline as the main site: semantic HTML, `llms.txt` +
`llms-full.txt`, `robots.txt` allowing AI crawlers, `sitemap.xml`
generated at build time, JSON-LD (`SoftwareApplication` + `FAQPage`) on
the home page. The site's `llms.txt` lives at this folder's root when the
site is extracted; until cutover it is served from the main site's copy.

## Accessibility

- **Text scaling:** all pages must survive large text — prefer wrap/scroll
  over fixed heights.
- **Touch targets:** 44×44px minimum hit area on mobile for CTAs and nav
  controls.
- **Contrast (calculated, not claimed):** white on purple 5.5:1; ink on
  cream 14.3:1; purpleDeep on cream 7.7:1; purple on cream 4.8:1;
  creamInk on plum 16.1:1; purpleLight on plum 7.1:1; amberDeep on cream
  4.5:1; secondary text 5.0:1 on cream, 8.9:1 on plum. Focus states use
  `{colors.accent}` so keyboard navigation is always visible.
- **Alt text and labels:** every image carries alt text; charts expose a
  data-summary description; actionable icons carry a meaningful label.
- **Money meaning:** never signal a money state by colour or weight
  alone — always pair with tint or icon.

## Themes (System default / Light / Dark)

- **The site follows the system by default** — like the app
  (`ThemeMode.system` is the app's default). The toggle stores an
  explicit choice (System / Dark / Light); with no stored choice the
  system preference decides.
- **Light is the brand home.** Warm cream canvas, warm-white surfaces —
  the brand layer's home.
- **Dark is first-class.** Deep plum, not an inverted afterthought.
- **Only palette changes.** Spacing, type, radius, and components are
  identical across themes. Never branch layout or shape on theme.
- **Theme source:** resolved from the toggle + system preference. Every
  token reads the active palette, so theme flips re-colour the whole site
  without touching call sites.

## Motion

The app's motion language — restrained, never decorative for its own
sake ("No gold-plating. Simple, functional UI; nothing animated for its
own sake"):

- **Count-up heroes** — dashboard figures count up to their value
  (the app has an "Animate amounts" toggle, default ON; OFF shows the
  final value at once).
- **Chart draw-in** — the weekly cash-flow bars and spending donut draw
  in on first view.
- **Staggered list entrance** — list rows enter in sequence, press-down
  scale on tap.
- **Empty ↔ content switcher** — a gentle cross-fade when a list gains
  its first entry.
- **Payoff-only confetti** — confetti appears exactly once: when a loan
  is fully paid. Never on the marketing site, never on load.
- On the web (Step 2): the same restraint — count-up stat figures,
  chart draw-in, staggered reveals on scroll. No pixel-block landings,
  no Kaizenly motion language: this site moves the way Tsumly moves.

## Open decisions (do not build copy on these yet)

- **Bottom-sheet radius — code vs docs conflict (flagged, not silently
  picked):** `app_theme.dart` builds bottom sheets with a 28px top
  radius, but the theme's own doc comment and `06_DESIGN.md` say 24px.
  The site uses 24px (`{rounded.xl}`) pending his call; the app's
  shipped behaviour is 28px.
- **Display-font toggle on the site:** the app lets the user pick
  Bricolage Grotesque or EB Garamond in Settings → Appearance. Whether
  the site mirrors that choice (a font toggle in the nav, or Bricolage
  only) is a Step 2 decision. The site uses Bricolage (the default) for
  now.
- **Logo arms omitted:** the app's wave variant has arms and motion
  ticks; the site mark drops them so the stack stays legible at
  20–28px. The full wave mascot (with arms) is for large illustration
  use in Step 2, not the header lockup.
- **Cutover**: when this site goes live, its `dist` is copied into the
  main site's `dist` under `/products/tsumly/`, and the main site's
  `src/pages/products/tsumly.astro` is deleted. Until then the main
  site's page stays live and this folder builds standalone only.

## Cutover

When this site goes live, its `dist` is copied into the main site's `dist`
under `/products/tsumly/`, and the main site's
`src/pages/products/tsumly.astro` is deleted. Until then the main site's
page stays live and this folder builds standalone only.

## Do's and Don'ts

### Do
- Reserve `{colors.accent}` (brand purple) for the primary action, inline
  links, and the active/focus signal — nothing decorative.
- Keep both themes in the app's palette; let the canvas/surface/ink ramp
  do all the figure/ground work.
- Set brand headings in Bricolage Grotesque with the two-tone style;
  pair with Inter 400/500 body. Amounts are always Inter 600.
- Ship every change in both polarities — change only palette values, never
  spacing/type/radius/components, between light and dark.
- Draw illustration in code (SVG) — never raster, never emoji-as-UI.

### Don't
- Never use the main site's blue (#0075de) or Kaizenly's green (#27F24C)
  in any role. This site is purple/amber/cream.
- Never put the display font on amounts, buttons, tabs, or small labels.
- Never use drop shadows for card depth — flat + tint/border only.
- Never put the mascot or spot art inside money forms.
- Never add a third display family without a design discussion.
- Never put body text on a money tint — always pair tint with its
  on-tint foreground.
- Never add an "All Products" button or link anywhere on this site.
