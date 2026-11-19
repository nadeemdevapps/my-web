---
version: alpha
name: Nadeem Dev Apps
description: Nadeem Dev Apps' design language for the nadeemdevapps.com website — portfolio, marketing, and product pages as sub-pages. Strictly monochrome in structure with a single blue accent; purple appears only inside the decorative sticker palette, never in structure. Built for Astro (static HTML, zero JS by default) and for AI readability (semantic HTML, llms.txt, sitemap).
---

# Structural palette — LIGHT theme. Only color values change between themes.
# Every other token — typography, spacing, radius, components — is identical
# across both. Dark theme is the design anchor: design against
# dark first; the site defaults to light and follows the system preference.
colors:
  primary: "#0075de"          # structural accent — blue (light)
  primary-active: "#005bab"   # pressed accent
  on-primary: "#ffffff"       # text/glyph on the accent
  canvas: "#f2efe9"           # page background — warm paper
  surface: "#fbf9f5"          # card / panel / field surface
  surface-elevated: "#fbf9f5" # modal / elevated surface
  surface-highlight: "#e9e5dd" # pressed-row / soft-fill surface
  hairline: "rgba(20,19,17,.14)" # 1px borders, dividers
  ink: "#141311"              # primary text — near-black
  ink-secondary: "#45413c"    # secondary body copy — warm charcoal
  ink-muted: "#6a665e"        # supporting / muted copy — stone
  ink-faint: "#9c978d"        # captions, placeholders, disabled — ash
  danger: "#b3261e"           # the single reserved non-monochrome color besides blue
  on-danger: "#ffffff"
  danger-container: "#f9dedc"
  on-danger-container: "#410e0b"
  data-track: "#ececec"       # empty / unfilled data cell (heatmap, donut, bars)
  data-1: "#c9c9c9"           # data ramp — low intensity (recedes toward canvas)
  data-2: "#9e9e9e"
  data-3: "#6e6e6e"
  data-4: "#3d3d3d"
  data-5: "#111111"           # high intensity (climbs toward ink)

# DARK theme — the design anchor. Same token shape, lightness inverted.
colors-dark:
  primary: "#0075de"          # structural accent — blue (same on dark)
  primary-active: "#005bab"   # pressed accent
  on-primary: "#ffffff"
  canvas: "#171512"          # page background — near-black
  surface: "#211e1a"          # card / panel / field surface
  surface-elevated: "#26221d" # modal / elevated surface
  surface-highlight: "#2c2822" # pressed-row / soft-fill surface
  hairline: "rgba(242,239,233,.16)" # 1px borders, dividers
  ink: "#f2efe9"              # primary text — warm white
  ink-secondary: "#c9c4b8"
  ink-muted: "#a8a294"
  ink-faint: "#55524b"
  danger: "#cf6679"
  on-danger: "#1a0000"
  danger-container: "#3d1515"
  on-danger-container: "#ff9999"
  data-track: "#1f1f1f"       # empty / unfilled data cell
  data-1: "#3a3a3a"           # data ramp — low intensity (recedes toward canvas)
  data-2: "#5c5c5c"
  data-3: "#8a8a8a"
  data-4: "#bdbdbd"
  data-5: "#f4f4f4"           # high intensity (climbs toward ink)

# Sticker palette — DECORATION ONLY. Small illustrated blocks,
# app-icon stickers, category dots. Never a CTA, never a structural fill,
# never a border. Purple lives here and ONLY here.
stickers:
  sky: "#62aef0"
  purple: "#d6b6f6"
  purple-deep: "#391c57"
  pink: "#ff64c8"
  orange: "#dd5b00"
  orange-deep: "#793400"
  teal: "#2a9d99"
  green: "#1aae39"
  brown: "#523410"

# Editorial type voice: Bricolage Grotesque display face for headlines, Inter
# for everything else. Display = Bricolage Grotesque (open, OFL), tight
# tracking, heavy weights at large sizes.
# Body/UI = Inter (OFL). Ship only license-verified fonts.
typography:
  display-xl:
    fontFamily: "EB Garamond, Cormorant Garamond, serif"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -1.5px
  display-lg:
    fontFamily: "EB Garamond, Cormorant Garamond, serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -1px
  display-md:
    fontFamily: "EB Garamond, Cormorant Garamond, serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "EB Garamond, Cormorant Garamond, serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.3px
  title-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

# Radius scale. Marketing CTAs stay fully pill-shaped;
# utility/nav buttons use the tighter 8px;
# cards round at 24px; inputs stay tight at 4px.
rounded:
  xs: 4px      # text fields / inputs
  sm: 8px      # utility buttons, small surfaces, skeleton placeholders
  md: 12px     # panels, dialogs, illustration frames
  card: 24px   # cards
  xl: 16px     # large containers, image wells
  pill: 9999px # marketing CTAs, switches
  full: 9999px # circular icon buttons, avatars

# Spacing — web scale (8px base). Section gaps are web-sized,
# not phone-sized.
spacing:
  xxs: 4px            # tightest gaps
  xs: 8px             # small gap
  sm: 12px            # gap between stacked items within a card
  md: 16px            # standard gap, nav padding
  lg: 24px            # card interior padding
  xl: 28px
  xxl: 32px
  section: 64px       # gap between major sections on desktop
  section-mobile: 48px # gap between major sections on mobile
  screen-h: 24px      # default horizontal gutter
  content-bottom: 32px # trailing space at the end of a page

components:
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    padding: "{spacing.md}"
    # Pill nav: a centred floating pill (Home/Work/About/Contact) plus a
    # sun/moon theme toggle after a divider — no wordmark, no hamburger,
    # no active-page pill. The toggle flips data-theme and saves the
    # choice to localStorage (nda-theme). The pill stays visible at every
    # width; links shrink slightly on small screens.
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-primary-pressed:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-primary-disabled:
    backgroundColor: "{colors.surface-highlight}"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-utility:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 4px 14px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  text-link-quiet:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    elevation: 0
  feature-card-elevated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    elevation: 1
  panel-section:
    backgroundColor: "{colors.surface}"
    headerTypography: "{typography.title-sm}"
    bodyTypography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    iconRounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    focusedBorderColor: "{colors.primary}"
    labelColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 6px
  switch:
    checkedTrackColor: "{colors.primary}"
    checkedThumbColor: "{colors.canvas}"
    uncheckedTrackColor: "{colors.surface-highlight}"
    uncheckedThumbColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
  hero:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    headlineTypography: "{typography.display-xl}"
    headlineAccent: "{colors.primary}" (one word)
    mark: none on Home (the logo mark lives in the nav); centred headline
      + intro + CTA pair on Home; fills the first screen (min-height
      100vh minus the nav) so the cards below appear on scroll
    rounded: 0
  inverted-band:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.caption}"
    padding: "{spacing.xxl}"
    # Minimal centred footer: brand line, GitHub link, "© 2026 Nadeem Dev
    # Apps". No link columns, no mail pill, no "Built with Astro" line.
    # Below, a giant outlined "NADEEM" wordmark (Bricolage 800, ~19vw);
    # hovering a letter turns it blue with a hatch fill + anchor points.
  toast:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    actionColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  skeleton:
    backgroundColor: "{colors.surface-highlight}"
    rounded: "{rounded.sm}"
  dialog:
    backgroundColor: "{colors.surface-elevated}"
    titleTypography: "{typography.title-md}"
    bodyTypography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  stat-tile:
    backgroundColor: "{colors.surface}"
    valueTypography: "{typography.display-sm}"
    captionTypography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 16px
  flagship-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    elevation: 1
    # Header row: name left, category pill right (pill + coloured dot,
    # decoration only) — the pill never sits on its own line above the
    # name. Then description, plain bullets, "Learn more" link.
    # Grid: 2 per row; an odd last card centres in its own row below
    # (3 → 2+1 centred, 4 → 2x2, 5 → 2+2+1 centred).
  attention-band:
    # One photographic image (grayscale, vendored locally at
    # public/attention-band.jpg — made for us by Google Stitch), dark
    # gradient overlay, serif headline bottom-left. Rounded {rounded.xl}.
    # Hover returns the photo to colour; it is black-and-white otherwise.
  about-card:
    # Condensed About on a fixed dark block (#111111, hairline #333333) in
    # light theme; INVERTED in dark theme (bright #f6f5f4 card, dark text)
    # so it still stands out against the dark canvas. Text left, primary
    # + secondary CTAs right.
    rounded: "{rounded.xl}"
    padding: 48px
  illustration:
    style: monochrome line art + colour sticker accents
    tint: "{colors.ink}"
    source: code-drawn (SVG), theme-reactive
  line-glyph:
    style: hand-drawn monochrome stroke glyph
    tint: "{colors.ink}"
    source: code-drawn (SVG), theme-reactive
  logo:
    status: decided
    mark: "Stack in a pill" — three stacked bars inside a rounded frame
      (14px corner radius); monochrome line mark, ink-tinted, theme-reactive
      via currentColor; must read at 20–28px and as a favicon; no colour
      except the sticker palette in decorative use only
    files: src/components/Logo.astro (inline, theme-reactive),
      public/logo.svg (standalone mark), public/favicon.svg (filled-tile
      variant: ink tile, canvas bars)
---


## Overview

Nadeem Dev Apps should feel calm, focused, and document-quiet — a well-organized desk in good daylight, not a dashboard. The dominant surface is a warm, paper-soft off-white (`{colors.canvas}` — #f2efe9) that takes the clinical edge off the screen and makes long pages feel like a document rather than an app. Against that quiet chrome, exactly one thing speaks in colour: a single, dependable blue, `{colors.primary}` (#0075de), reserved almost entirely for links and the nav Contact CTA. A playful multi-colour sticker palette carries the brand's personality in small illustrated blocks and category dots — it decorates, it never structures. The hero adds four slowly drifting blurred colour fields (the products' own colours) and a film-grain overlay — decoration, not structure.

Type carries the personality. Headlines run a **Bricolage Grotesque display face** (weight 700–800 with tight tracking), paired with **Inter** for body, navigation, and UI labels. The display / sans-body split gives the site a bold, considered voice — closer to a long-form reading site than a SaaS landing page — while the monochrome-plus-blue palette keeps it quiet.

The site ships in **two polarities** that share every non-color token:
1. **Light theme** — the default. Warm paper canvas (`{colors.canvas}` — #f2efe9), near-black ink.
2. **Dark theme** — the design anchor. Near-black canvas (`{colors.canvas}` — #171512), warm-white ink.

The theme follows the system preference. The light theme must read as the **same product**, not a recolor — only palette values change between the two (`colors` vs `colors-dark`).

Surfaces are defined by **hairlines and the faintest layered shadows** rather than heavy elevation. Cards round at 24px (`{rounded.card}`), marketing CTAs are fully pill-shaped (`{rounded.pill}`), utility buttons round tighter at 8px (`{rounded.sm}`), and inputs stay tight at 4px (`{rounded.xs}`). Spacing follows the web grid (8px base, 1120px container), not a phone rhythm.

**Key Characteristics:**
- Strictly monochrome in structure — black, near-black, white, neutral grays; exactly one structural accent, blue.
- No purple in any structural role. Purple appears only as decoration (hero drift fields, Tsumly's card glow) and inside the decorative sticker palette. A product's in-app brand never recolours a website page.
- Warm paper-soft canvas over pure white, never clinical.
- Editorial type: Bricolage Grotesque display headlines (weight 700–800, tight tracking) paired with Inter body and UI.
- Two shipped polarities (dark anchor + light) that share all non-color tokens; only palette values differ.
- Fully pill-shaped marketing CTAs contrasted with flat 24px cards and tight 4px inputs.
- Elevation by hairline + barely-there layered shadow, never heavy drop-shadows.
- A portfolio hero on the warm canvas — oversized name, drifting colour fields, grain (on Home, centred, no logo mark).
- Sticker palette as decoration only — small, playful, never structural.

## Colors

> The palette is strictly monochrome in structure and ships in two polarities. Values are listed as **light / dark** where they differ. Canonical token map is `colors` (light) with `colors-dark` mirroring it.

### Brand & Accent
- **Accent** (`{colors.primary}` — #0075de light / #0075de dark): the single structural accent — primary CTA fill, inline link colour, active-tab and focus signal. This is the only colour that ever paints an action.
- **Pressed Accent** (`{colors.primary-active}` — #005bab): the press state of the primary CTA.
- **On-Accent** (`{colors.on-primary}` — #ffffff): text/glyph drawn on the accent fill.

### Surface
- **Canvas** (`{colors.canvas}` — #f2efe9 light / #171512 dark): the page background — warm paper in light, near-black in dark.
- **Surface** (`{colors.surface}` — #fbf9f5 light / #211e1a dark): card, panel, nav, and form-field surfaces.
- **Surface Elevated** (`{colors.surface-elevated}` — #fbf9f5 light / #26221d dark): modals and dialogs.
- **Surface Highlight** (`{colors.surface-highlight}` — #e9e5dd light / #2c2822 dark): pressed-row, soft-fill, and skeleton surfaces.
- **Hairline** (`{colors.hairline}` — rgba(20,19,17,.14) light / rgba(242,239,233,.16) dark): 1px card borders and dividers.

### Text
- **Ink** (`{colors.ink}` — #141311 light / #f2efe9 dark): primary headings and body — near-black on light, warm-white on dark.
- **Ink Secondary** (`{colors.ink-secondary}` — #45413c light / #c9c4b8 dark): secondary body copy.
- **Ink Muted** (`{colors.ink-muted}` — #6a665e light / #a8a294 dark): supporting / muted copy, inactive nav labels.
- **Ink Faint** (`{colors.ink-faint}` — #9c978d light / #55524b dark): captions, placeholders, disabled text.

### Semantic
The only reserved non-monochrome colour besides blue is **Danger** (`{colors.danger}` — #b3261e light / #cf6679 dark), used solely for destructive actions and error states, with `{colors.on-danger}`, `{colors.danger-container}`, and `{colors.on-danger-container}` for filled/container variants. There is **no success/warning hue** — affirmative state is carried by ink weight and monochrome iconography, not colour.

### Sticker palette (decoration only)
A playful multi-colour palette. It appears only as illustrated blocks, app stickers and category dots — never as CTAs, structural fills, or borders:
- **Sticker Sky** (`{stickers.sky}` — #62aef0)
- **Sticker Purple** (`{stickers.purple}` — #d6b6f6) / **Deep Purple** (`{stickers.purple-deep}` — #391c57) — purple is acceptable here and only here
- **Sticker Pink** (`{stickers.pink}` — #ff64c8)
- **Sticker Orange** (`{stickers.orange}` — #dd5b00) / **Deep Orange** (`{stickers.orange-deep}` — #793400)
- **Sticker Teal** (`{stickers.teal}` — #2a9d99)
- **Sticker Green** (`{stickers.green}` — #1aae39)
- **Sticker Brown** (`{stickers.brown}` — #523410)

## Typography

### Font Family
Two families carry the system. **Bricolage Grotesque** (open, OFL) sets every display headline at weight 700–800 with tight tracking (−0.035em) and tight leading (0.95). **Inter** (OFL) sets titles, body, navigation, buttons, captions, and all UI labels. There is no monospace role; the site shows no code.

The display/body split is editorial:
- Bricolage (weight 700–800, tight tracking) → `display-xl` … `display-sm` (hero headlines, section headlines, big numbers).
- Inter (weight 400–600) → titles, body, nav, buttons, captions, labels.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | clamp(64px, 13.5vw, 180px) | 800 | 0.95 | −0.035em | Hero headline — Bricolage |
| `{typography.display-lg}` | clamp(40px, 6vw, 64px) | 700 | 0.95 | −0.035em | Section headlines — Bricolage |
| `{typography.display-md}` | 36px | 700 | 1.0 | −0.03em | Sub-section headlines, large stats — Bricolage |
| `{typography.display-sm}` | 28px | 700 | 1.05 | −0.025em | Card headlines, callouts — Bricolage |
| `{typography.title-lg}` | 22px | 500 | 1.3 | 0 | Panel titles — Inter |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Card titles, dialog titles — Inter |
| `{typography.title-sm}` | 16px | 500 | 1.4 | 0 | List labels — Inter |
| `{typography.body-md}` | 17px | 400 | 1.6 | 0 | Default running text — Inter |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Dense body, descriptions, fine print — Inter |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Captions — Inter |
| `{typography.caption-uppercase}` | 12px | 500 | 1.4 | 1.5px | Small uppercase labels — Inter |
| `{typography.button}` | 15.5px | 600 | 1.5 | 0 | Button labels — Inter |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Nav links — Inter |

### Principles
Display sizes use weight **700–800 (bold), never regular** — the heavy Bricolage cut at tight tracking carries the emphasis. Negative letter-spacing (−0.025 to −0.035em) is essential; Bricolage without it reads off-brand. Body type stays at weight 400 for paragraphs and 500–600 for labels and emphasized phrases. When in doubt about emphasis, reach for a bigger display size before a heavier weight.

### Note on Font Substitutes
Bricolage Grotesque is the open display face (variable font, opsz 12..96, wght 400–800). Apply the negative tracking values explicitly. Inter at default tracking is the body voice — no tuned cut is needed on the web.

## Layout

### Spacing System
- **Base unit:** 8px.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 28 · `{spacing.xxl}` 32.
- **Card padding:** `{spacing.lg}` (24px) inside cards and panels.
- **Section gaps:** `{spacing.section}` (96px desktop / 72px mobile) between major sections.
- **Screen gutters:** `{spacing.screen-h}` (24px) horizontal.
- **Page tail:** `{spacing.content-bottom}` (32px) of breathing room at the end of a page.

### Grid & Container
Content is centred in a 1120px max-width column on desktop with generous outer gutters. Feature sections alternate between full-width text blocks and 2-up card grids; the products page uses a 2-column project-card grid. The hero sits inside the centred container, like every other section.

### Whitespace Philosophy
Whitespace is the primary grouping device. Sections are separated by large vertical gaps rather than rules, and cards sit on the warm canvas with quiet hairlines instead of heavy frames. The effect is document-like: airy, scannable, never crowded — and calm enough to read as a portfolio rather than a busy dashboard.

### Responsive Strategy

#### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Wide | 1440px+ | Full multi-column grids, widest container |
| Desktop | 1080–1300px | Standard centred container, 2-up card grids |
| Tablet | 768–840px | Grids stay 2-up to 760px, then 1-up; nav links shrink slightly |
| Mobile | ≤600px | Single-column stacks, pill nav stays visible, full-width CTAs |

#### Touch Targets
Pill CTAs (`button-primary`, `button-secondary`) and utility buttons (`button-utility`) carry comfortable tap padding; aim for a 44×44px minimum hit area on mobile by preserving vertical padding even as labels shrink.

#### Collapsing Strategy
The pill nav stays visible at every width (link padding shrinks on small screens); multi-column card grids collapse to a single stacked column; section padding tightens but the warm-canvas rhythm is preserved.

#### Image Behavior
Product screenshots and illustration tiles sit inside rounded `{rounded.md}` / `{rounded.xl}` frames and scale fluidly within their grid cell. Sticker illustrations are small fixed-scale decorative assets that re-flow but do not crop.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Hairline border `{colors.hairline}`, no shadow | Default cards on the warm canvas |
| 1 — Soft | Layered micro-shadow: `rgba(0,0,0,0.01) 0 0.175px 1.041px`, `0.02 0 0.8px 2.925px`, `0.027 0 2.025px 7.847px`, `0.04 0 4px 18px` | Raised feature cards, floating buttons |
| 2 — Elevated | Deeper 5-stop stack ending in `rgba(0,0,0,0.05) 0 23px 52px` | Modals, popovers |

Elevation is **barely-there**: shadows are built from many near-transparent layers so surfaces feel gently lifted off the paper rather than dramatically dropped. Most cards rely on a hairline alone. **In dark theme a black shadow is invisible on a near-black canvas** — the depth cue there is a lighter card border (`#3d3d3d`, `#4a4a4a` on hover) plus a faint light edge, not a darker shadow.

### Decorative Depth
The brand's real depth cue is **illustration**, not shadow. Feature sections layer small colourful app-icon stickers over plain surfaces to add playful dimensionality. Monochrome line illustrations provide the quiet spot art.

## Data Visualization

Charts stay **strictly monochrome**. To tell data apart without colour, use the dedicated **6-step gray ramp** plus a track colour (`{colors.data-track}` → `{colors.data-5}`), shared by every data surface. Low steps recede toward the canvas; high steps climb toward ink — so the same ramp reads correctly in both polarities.

- **Heatmap**: a month grid where each cell's intensity maps onto the ramp (`{colors.data-track}` for an empty day → `{colors.data-5}` for the busiest).
- **Donut**: a ring of ramp-shaded segments (e.g. three groups = `{colors.ink}` / `{colors.data-3}` / `{colors.data-1}`) with a serif center number and a legend.
- **Comparison bar**: a this-period (ink) bar over a last-period (`{colors.data-2}`) bar on a `{colors.data-track}` track, with a signed delta.
- **Trend chart**: an ink line over a faint `{colors.data-track}` grid, gaps where there's no data.

**Deltas carry meaning by glyph and ink weight, not hue** — a `+12%` / `−8%` reads through sign and the bar lengths, never a green/red. `{colors.danger}` is reserved for destructive/error states only; it is not a "down" colour.

## Illustrations

Two illustration voices, kept apart by role:
- **Monochrome line art** — quiet spot art, one calm illustration per surface, sized generously, with whitespace. Single-weight, hand-drawn-feeling line scenes on a transparent ground, tinted with `{colors.ink}` so they re-colour with the theme for free. Code-drawn in SVG on the web (no binary weight, no licensing constraints). Open-license art (Open Peeps CC0, DrawKit MIT, Lukasz Adam CC0) may be substituted as theme-tinted vectors where a closer match is wanted; keep them strictly monochrome and ink-tinted.
- **Colour stickers** — small playful sticker blocks, app-icon stickers, and category dots from `{stickers.*}`. Decoration only, never structural. They add the brand's joy on hero bands and product tiles.

Small repeated icons use `line-glyph` (hand-drawn monochrome stroke glyphs), not generic icon fonts, when they are part of brand surfaces: nav, metric rows, product cards. They should feel hand-drawn and slightly editorial, but stay simple enough to read at 20–28px.

**Do:** use one calm illustration per surface, with generous whitespace. **Don't:** add drop shadows, multiple illustrations per screen, or photographic imagery as decoration.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Text fields / inputs |
| `{rounded.sm}` | 8px | Utility buttons, small surfaces, skeleton placeholders |
| `{rounded.md}` | 12px | Panels, dialogs, illustration frames |
| `{rounded.card}` | 24px | Cards |
| `{rounded.xl}` | 16px | Large containers, image wells |
| `{rounded.pill}` | 9999px | Marketing CTAs, switches |
| `{rounded.full}` | 9999px | Circular icon buttons, avatars, product icons |

Marketing CTAs are deliberately **fully pill-shaped** — the contrast between a pill CTA and a 24px card is intentional. Inputs stay tight at 4px so fields never read as buttons. Utility buttons use 8px so nav and secondary actions stay compact.

### Imagery
The site uses no photography — it is a content-and-type site. Card visuals are CSS-only colour fields with large Bricolage glyphs; no screenshots or stock imagery.

## Components

> Document Default and Active/Pressed states only. Marketing CTAs stay pill-shaped; utility buttons use 8px. Buttons in this system are web buttons — the press transform is a brief `scale(0.9)` on marketing buttons, kept subtle.

### Navigation

**`nav-bar`** — Top navigation. A floating pill bar, fixed 18px from the top and centred, `rgba` surface background with a 14px backdrop blur, hairline border, pill radius, and the soft shadow. Four plain links (`Home / Work / About / Contact`) plus a sun/moon theme toggle after a divider — no wordmark, no hamburger, no active-page pill. The toggle flips `data-theme` and saves the choice to localStorage (`nda-theme`); the head script applies the saved choice before first paint. The pill stays visible at every width; link padding shrinks slightly on small screens.

**`wordmark`** — The "Nadeem Dev Apps" text lockup, used with the logo mark in the nav bar and footer. Bricolage Grotesque 700, `{colors.ink}`, negative tracking −0.025em.

**`logo`** — "Playful Steps": three ascending rounded squares (blue #0075de, purple #6C4DE6, amber #F2A81D). Files: `src/components/Logo.astro`, `public/logo.svg`, `public/favicon.svg`. The favicon is a cream-tile variant (warm paper #f2efe9 tile, no black). The mark appears in the favicon and structured data, not in the nav or footer.

### Buttons

**`button-primary`** — The primary CTA. Background `{colors.ink}`, text `{colors.canvas}`, type `{typography.button}` (Inter 15.5 / 600), fully pill `{rounded.pill}`, padding 12px × 26px, min-height 48px. Hover lifts 2px. The blue accent is reserved for links and the nav Contact CTA, never for a solid button.
- Pressed state applies a brief `scale(0.97)` press transform.
- Disabled state uses 0.55 opacity.

**`button-secondary`** — Pill button for secondary actions. Transparent background, `{colors.ink}` text, 1px `{colors.hairline}` border, same pill shape and padding as primary. Hover darkens the border to `{colors.ink}`.

**`button-utility`** — Nav / compact button. `{colors.surface}` background, `{colors.ink}` text, type `{typography.button}`, tighter `{rounded.sm}` (8px), padding 4px × 14px, 1px `{colors.hairline}` border. Used for compact actions where the marketing pill would be too large.

**`text-link`** — Inline link, no background, `{colors.primary}` text. Used for inline links in body copy.

**`text-link-quiet`** — Inline text button, no background, `{colors.ink}` text. Used for low-emphasis inline actions (e.g. "Log in").

### Cards & Containers

**`card`** — The workhorse surface. `{colors.surface}` background, 1px `{colors.hairline}` border, rounded 24px, `0dp` elevation, interior padding `{spacing.lg}` (24px). Holds list groups and panels.

**`feature-card-elevated`** — Same chrome as `card` with the soft Level-1 layered shadow for cards that float above the canvas (floating product panels).

**`panel-section`** — A titled content panel. `{colors.surface}` surface, a `{typography.title-sm}` header, `{typography.body-md}` body, 24px radius, 24px padding.

**`product-card`** — A product tile, 2-column grid. `{colors.surface}` surface (Tsumly on lavender `#E8E1F7`, Kaizenly on pale green `#ECFBE1`, demos on `#ece8df`), 1px `{colors.hairline}` border, 24px radius, 14px padding (26px bottom). A 150px CSS colour-field visual with a large Bricolage glyph (no screenshots), then name in Bricolage 27 / 700, a muted tag line, one short description, bullet points, and an underline-draw link. Hover lifts with a glow in the card's own colour; pointer tilt (±2°) via a small script. Demo concepts carry the tag "Demo concept — not a shipped product." and no link.

### Inputs & Forms

**`text-input`** — Outlined field. `{colors.surface}` background, `{colors.ink}` text, `{typography.body-sm}`, rounded `{rounded.xs}` (4px), padding 6px. Border is `{colors.hairline}` at rest and `{colors.primary}` on focus; label is `{colors.ink-muted}` (accent when focused). Error states swap border/label to `{colors.danger}`. Focus adds the soft Level-1 shadow.

**`switch`** — Monochrome toggle. Checked: `{colors.primary}` track, `{colors.canvas}` thumb. Unchecked: `{colors.surface-highlight}` track, `{colors.ink-muted}` thumb.

### Feedback

**`toast`** — App-wide toast bus. `{colors.surface-elevated}` surface, `{colors.ink}` text, `{colors.primary}` action label, `{typography.body-sm}`, rounded `{rounded.sm}`. Messages are specific and actionable, with an optional dismiss action.

**`skeleton`** — Loading placeholder. `{colors.surface-highlight}` fill with an animated alpha shimmer, rounded `{rounded.sm}`.

**`dialog`** — Modal surface. `{colors.surface-elevated}` background, `{typography.title-md}` title, `{typography.body-md}` body, 12px radius, 24px padding, Level-2 shadow.

### Signature Components

**`hero`** — The portfolio hero. Warm canvas with four slowly drifting blurred colour fields (Tsumly purple, Kaizenly green, amber, blue) plus a film-grain overlay. Oversized name in Bricolage 800 (clamp 64–180px) with a masked line-rise on load, then an intro line under a hairline and a `button-primary` + `button-secondary` CTA pair. Centred, no logo mark, no hero card, no eyebrow pills.

**`marquee`** — A scrolling strip of the working themes (AI-first building · Strategic planning · Phased implementation · Learning in public · Experiments) in Bricolage 600 with accent dots, edge-faded, pausing on hover.

**`inverted-band`** — A polarity-flipped emphasis band for mid-page moments. `{colors.primary}` fill, `{colors.on-primary}` text, `{typography.display-sm}` headline, 12px radius. Use sparingly.

**`cta-card`** — The internships call-to-action. A dark card (inverted in dark theme) with purple and blue glow blobs, oversized Bricolage headline, areas line, and mailto + GitHub buttons. Lives on Contact.

**`footer`** — Site footer. Minimal and centred: the brand line in Bricolage 700, a GitHub link, and "© 2026 Nadeem Dev Apps" — `{colors.ink-secondary}` link text at `{typography.caption}`, padding `{spacing.xxl}`. No link columns, no mail pill, no "Built with Astro" line. Below the minimal lines, a giant outlined "NADEEM" wordmark spans the footer (Bricolage 800, ~19vw, outlined ink at low opacity); hovering a letter turns its outline blue, fills it with a blue diagonal hatch, and shows its anchor points (OpenCode-style).

## Core Pages

- **Home**: portfolio hero (oversized name, drifting colour fields, grain, intro + two CTAs), marquee strip, Selected work (all 10 projects — 6 shipped products + 4 demo concepts, 2-column grid), the "I build for myself first" line with a link to About, and the footer.
- **Products** (index): Selected work — heading + "10 projects — 6 shipped products, 4 demo concepts" count, filter pills (All 10 / Mobile & Native 3 / Web 2 / Desktop 1 / Developer Tools 4), and a 2-column project grid (1 col mobile). Each card: CSS colour-field visual with a Bricolage glyph, name, tag, one short description, bullet points, and a link — live products link to their dedicated site, demo concepts carry "Demo concept — not a shipped product." and no link. No tech tags on cards. Filters work (small page-scoped script scoped to the works grid; without JS all cards show). Below the works grid, a Concepts section lists the 5 cleaned xyz concept sites (Tally Bar, Look Out Below, Stitch & Tan, ProductSite, Portfolio) as `project-card demo` tiles linking to `/concepts/<slug>/`; the filter pills do not touch them.
- **Product sub-pages** (`/products/tsumly`, `/products/kaizenly`, `/products/msgloop`): Tsumly and Kaizenly are independent Astro projects merged into the main build; MsgLoop is a page in this repo. Each has its own overview, features, and `/privacy/` + `/terms/` pages. Product sub-pages inherit this system; a product's in-app brand does not recolour the page.
- **About**: the portfolio story on a centred 760px column — education (Matriculation BISE Bahawalpur, UK Level 3 Diploma in IT & Cyber Security via Qualifi / Superior International Colleges, with the full 18-unit list visible, each 10 credits), a "by the numbers" strip (18 units, 180 credits, 1018/1200 Matric, 6 shipped products), the plan-first skill, the AI-first toolkit (OpenCode primary; Pomelli and REA as unlinked chips), self-education and doubts, and why he builds. No FAQ, no photo, no timeline.
- **Contact**: the "Open to internships" dark CTA card (areas: software house, bank, company, bookkeeping; mailto + GitHub buttons), then a mailto form (name, email, message — no backend). Errors via `{colors.danger}`, feedback via the toast bus.
- **Privacy / Terms**: document pages — warm canvas, Bricolage headlines, Inter body, generous line-height.

## AI Readability

The site is built for humans first and for AI agents, LLMs, and search second — the same static-HTML discipline serves both:
- **Semantic HTML**: proper `h1`/`h2` hierarchy, `<main>`, `<article>`, descriptive titles, alt text on every image. Astro outputs pure static HTML with zero JS by default, so crawlers (GPTBot, ClaudeBot, PerplexityBot) read everything without effort.
- **llms.txt**: a build-generated file at the site root summarising the site structure and every page, plus `llms-full.txt` with full page content (the llms.txt standard).
- **robots.txt**: AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, CCBot).
- **sitemap.xml**: every page listed, generated at build time.
- **JSON-LD structured data**: `Organization` on the home page, `SoftwareApplication` on each product sub-page, so AI cites the products correctly.

## Accessibility

- **Text scaling:** all pages must survive large text — prefer wrap/scroll over fixed heights. Nav labels and actions must stay one line where the design says so.
- **Touch targets:** 44×44px minimum hit area on mobile for CTAs and nav controls.
- **Contrast:** the monochrome ramp is tuned for legible contrast in both themes; focus states use `{colors.primary}` so keyboard navigation is always visible.
- **Alt text and labels:** every image carries alt text; decorative images set it to null; charts expose a data-summary description; actionable icons carry a meaningful label.
- **Feedback over silent states:** use the toast bus so messages are reachable by accessibility services and actionable.

## Themes (Dark / Light)

- **Dark is the anchor.** Design against dark first; the light theme is the same product with palette values inverted in lightness.
- **Only palette changes.** Spacing, type, radius, and components are identical across themes (`colors` vs `colors-dark`). Never branch layout or shape on theme.
- **Theme source:** follows the system preference. Every token reads the active palette, so theme flips re-colour the whole site without touching call sites.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (blue) for the primary action, inline links, and the active/focus signal — nothing decorative.
- Keep both themes strictly monochrome in structure; let the canvas/surface/ink ramp do all the figure/ground work.
- Set headlines in the serif display face at weight 400 with negative tracking; pair with Inter 400/500 body.
- Ship every change in both polarities — change only palette values, never spacing/type/radius/components, between dark and light.
- Keep the page on the warm `{colors.canvas}` canvas; use pure white `{colors.surface}` for cards and fields to create gentle figure/ground.
- Let the sticker palette live only in illustrations, icon tiles, and category dots.
- Keep marketing CTAs fully pill-shaped (`{rounded.pill}`) and cards flat at 12px (`{rounded.md}`) with a hairline border; utility buttons tighter at 8px (`{rounded.sm}`).
- Use `{colors.danger}` only for destructive/error states; carry success/affirmative state with ink weight and iconography.
- Use the toast bus for feedback, with specific, actionable messages.
- Keep the hero light and quiet — one accent word, no dark bands; on Home the hero is centred with no logo mark.

### Don't
- Don't introduce any chromatic brand colour into structure — there is no purple/coral/accent hue in layout, buttons, or borders; the structural accent is blue only, and purple lives only in the sticker palette.
- Don't paint a CTA or structural fill in any sticker-palette colour — those are decoration only.
- Don't introduce a second structural accent alongside `{colors.primary}`.
- Don't bold the serif display weight; the serif character, not weight, carries emphasis.
- Don't use Inter for display headlines — the serif voice is the brand. (And don't use the serif for body/UI.)
- Don't put pill radii on form fields — inputs stay tight at `{rounded.xs}` (4px).
- Don't drop heavy shadows; elevation is hairline + barely-there layered shadow, never a hard cast.
- Don't branch layout, spacing, or shape on the theme — only colours change.
- Don't place type on pure clinical white for full pages; the warm `{colors.canvas}` is core to the calm.
- Don't let a product's in-app brand recolour a website page.
