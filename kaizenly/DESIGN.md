---
version: alpha
name: Kaizenly
description: Kaizenly's own design language for its independent website — the blocker app's identity on the web. Green, not blue; DM Sans, not serif; the app's tinted canvas and 24px cards, not the portfolio's paper. Built for Astro (static HTML, zero JS by default) and for AI readability (semantic HTML, llms.txt, sitemap).
---

# Structural palette — DARK theme. Only color values change between themes.
# Every other token — typography, spacing, radius, components — is identical
# across both. Dark theme is the design anchor: design against
# dark first; the site defaults to light with a toggle + system preference
# (light is the app's fresh-install default).
colors:
  accent: "#27F24C"          # vivid green — the only structural accent (dark)
  accent-deep: "#1DBF3A"     # deep green — SOS, live bars, pressed accent
  accent-deeper: "#17992F"   # deepest green — light-mode deep
  pale: "#CBE8C3"            # pale green — nav tints, selected pill
  on-accent: "#1C2D28"        # dark green ink on accent fills
  canvas: "#1D201A"          # page background — dark green-tinted near-black
  surface: "#2A3327"         # card / panel surface — faint green tint
  surface-variant: "#232720" # recessed surface — faint green tint
  sheet: "#2A2E26"           # dialog / sheet surface
  ink: "#ECFBE1"             # primary text — pale mint white
  ink-secondary: "#E4FAD3"   # secondary body copy — pale mint beige
  ink-muted: "#909C8A"       # supporting / muted copy — green-grey
  hairline: "#7A807A"        # 1px borders, dividers
  nav: "#272E24"             # nav bar card — the app's navBackground
  block: "#1A1E1C"           # block / celebration glass
  label: "#686E62"           # block / celebration labels
  handle: "#757C6D"          # sheet drag handle
  danger: "#FF6B57"          # the single reserved non-green colour besides the accent

# LIGHT theme — the fresh-install default. Same token shape, lightness inverted.
colors-light:
  accent: "#1DBF3A"          # vivid green (same deep green as dark accent-deep)
  accent-deep: "#17992F"     # deep green
  accent-deeper: "#17992F"
  pale: "#CBE8C3"
  on-accent: "#1C2D28"
  canvas: "#E0E0E0"          # page background — neutral grey
  surface: "#FFFFFF"         # card / panel surface
  surface-variant: "#DBDBDB" # recessed surface
  sheet: "#E0E0E0"
  ink: "#2A2C29"             # primary text — green-tinted near-black
  ink-secondary: "#717870"   # secondary body copy
  ink-muted: "#717870"
  hairline: "#5B615A"
  peach: "#5B615A"           # unselected nav tint (light)
  nav: "#FFFFFF"             # nav bar card — the app's navBackground
  block: "#1A1E1C"           # block / celebration glass (same in both themes)
  label: "#686E62"           # block / celebration labels (same in both themes)
  handle: "#757C6D"          # sheet drag handle (same in both themes)
  danger: "#B3261E"

# Typography: DM Sans carries everything — the app's own font (OFL).
# Headlines are DM Sans Bold with tight tracking; the serif display voice
# of the main site does NOT appear here. The wordmark is the app's pixel
# tile alphabet, code-drawn as SVG.
typography:
  display-xl:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1px
  display-lg:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.5px
  display-md:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.5px
  title-lg:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  nav-link:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  timer-digit:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: 96px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
    # Big square numerals echo the app's SquareTimer pixel digits.
    # Use for hero numbers and stat figures, never for body copy.

# Radius scale — the app's rhythm: 24px cards, pill CTAs, 12px small
# surfaces. (The main site uses 12px cards; Kaizenly does not.)
rounded:
  xs: 4px      # text fields / inputs
  sm: 8px      # utility buttons, small surfaces
  md: 12px     # small cards, dialogs
  lg: 24px     # cards, panels — the app's cornerLarge
  xl: 32px     # large containers, hero wells
  pill: 9999px # marketing CTAs, switches, nav pill
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
    # Kaizenly's own nav: 3-tile mark + KAIZENLY pixel wordmark left;
    # Home / Features / Gallery / About / Download / Privacy / Terms links; theme
    # toggle right. The portfolio link lives in the About section and the
    # footer ("Built by Nadeem"), not in the nav. Hamburger below 840px.
  wordmark:
    fontFamily: "pixel tile alphabet (code-drawn SVG, as in the app)"
    textColor: "{colors.ink}"
    # KAIZENLY in the app's tile alphabet, cream/mint ink with a single
    # accent-green notch. Never set in DM Sans, never in a pixel webfont.
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-primary-pressed:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
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
    headlineAccent: "{colors.accent}" (one word)
    # Follows the active theme (dark anchor, light default). Huge DM Sans
    # headline, one word in vivid green. The 3-tile mark sits above the
    # headline; the pixel wordmark is the header lockup, not a hero element.
    # A drifting floating pill and a live ticking timer echo the app.
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.caption}"
    padding: "{spacing.xxl}"
    # Own footer: mark + tagline, "Built by Nadeem" with a link to the
    # portfolio home, links to Home / Features / Gallery / About / Download
    # / Privacy / Terms, and the Machine column (llms.txt / robots.txt / sitemap.xml).
  toast:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    actionColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
  dialog:
    backgroundColor: "{colors.sheet}"
    titleTypography: "{typography.title-md}"
    bodyTypography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  stat-tile:
    backgroundColor: "{colors.surface}"
    valueTypography: "{typography.timer-digit}"
    captionTypography: "{typography.caption}"
    rounded: "{rounded.lg}"
    padding: 16px
  logo:
    status: decided
    mark: "Three stacked tiles forming a K" — two mint tiles + one vivid
      green tile (the launcher icon's mark, redrawn as SVG). Must read at
      20–28px and as a favicon; the green tile is always #27F24C, never
      recoloured per theme.
    files: public/logo.svg (header mark, theme-reactive tiles via
      currentColor), public/favicon.svg (filled-tile variant on the dark
      canvas)
    wordmark: "{components.wordmark}"
---


## Overview

Kaizenly's site feels like the app: dark, direct, and a little strict. The
dominant surface is the app's own dark canvas (`{colors.canvas}` — #1D201A),
a near-black with a faint green tint — the same tint that replaced BlockIt's
warm brown. Against it, exactly one thing speaks in colour: vivid green,
`{colors.accent}` (#27F24C), the app's bright accent. Pale green
(`{colors.pale}` — #CBE8C3) tints the navigation; dark green ink
(`{colors.on-accent}` — #1C2D28) sits on accent fills. There is no blue
here — the main site's blue never appears on a Kaizenly page — and no
orange: the old accent is gone from the app and from this site.

Type is DM Sans throughout — the app's only font. Headlines are DM Sans
Bold with tight tracking; body and UI are DM Sans Regular/Medium. There is
no serif voice on this site. The logo lockup is the app's pixel tile
alphabet for the KAIZENLY wordmark, with a single accent-green notch.

The site ships in **two polarities** that share every non-color token:
1. **Dark theme** — the design anchor. Dark green-tinted canvas, mint-white ink.
2. **Light theme** — the fresh-install default (like the app). Neutral grey
   canvas (`{colors-light.canvas}` — #E0E0E0), green-tinted near-black ink.

The theme is Light by default (the app's fresh-install default), and the
toggle persists the choice. Dark is the design anchor: design against
dark first, then ship light as the same product with palette values
inverted in lightness.

Surfaces are the app's surfaces: 24px cards (`{rounded.lg}`), pill CTAs,
hairlines, barely-there shadows. The timer's huge square digits echo in
hero numbers and stat figures (`{typography.timer-digit}`).

**Key Characteristics:**
- Green is the only structural accent — vivid green for actions, deep green
  for pressed/SOS states, pale green for nav tints.
- No blue, no orange, no purple in any role. The main site's blue and the
  old orange accent never appear here.
- DM Sans everywhere; pixel tile alphabet for the wordmark only.
- Dark green-tinted canvas over pure black; light theme is the app's
  fresh-install grey, not paper white.
- 24px cards, pill CTAs, 12px small surfaces — the app's corner rhythm.
- Two shipped polarities (dark anchor + light) that share all non-color
  tokens; only palette values differ.
- Feature lists as plain bullets, never nested boxes.

## Colors

> The palette is the app's palette (COLORS.md in the app repo), in two
> polarities. Values are listed as **dark / light** where they differ.
> Canonical token map is `colors` (dark) with `colors-light` mirroring it.

### Brand & Accent
- **Accent** (`{colors.accent}` — #27F24C dark / #1DBF3A light): the single
  structural accent — primary CTA fill, inline link colour, active-tab and
  focus signal. This is the only colour that ever paints an action.
- **Deep Accent** (`{colors.accent-deep}` — #1DBF3A dark / #17992F light):
  the press state of the primary CTA, SOS wordmark, live sound bars.
- **On-Accent** (`{colors.on-accent}` — #1C2D28): text/glyph drawn on the
  accent fill.

### Surface
- **Canvas** (`{colors.canvas}` — #1D201A dark / #E0E0E0 light): the page
  background — dark green-tinted near-black in dark, neutral grey in light.
- **Surface** (`{colors.surface}` — #2A3327 dark / #FFFFFF light): card,
  panel, nav, and form-field surfaces.
- **Surface Variant** (`{colors.surface-variant}` — #232720 dark / #DBDBDB
  light): recessed cards and tiles.
- **Sheet** (`{colors.sheet}` — #2A2E26 dark / #E0E0E0 light): dialogs and
  bottom sheets.
- **Hairline** (`{colors.hairline}` — #7A807A dark / #5B615A light): 1px
  card borders and dividers.

### Text
- **Ink** (`{colors.ink}` — #ECFBE1 dark / #2A2C29 light): primary headings
  and body — pale mint white on dark, green-tinted near-black on light.
- **Ink Secondary** (`{colors.ink-secondary}` — #E4FAD3 dark / #717870
  light): secondary body copy.
- **Ink Muted** (`{colors.ink-muted}` — #909C8A dark / #717870 light):
  supporting / muted copy, inactive nav labels.

### Semantic
The only reserved non-green colour besides the accent is **Danger**
(`{colors.danger}` — #FF6B57 dark / #B3261E light), used solely for
destructive actions and error states. There is **no success/warning hue** —
affirmative state is carried by the accent and by ink weight.

## Typography

### Font Family
One family carries the system. **DM Sans** (OFL) sets display headlines,
titles, body, navigation, buttons, captions, and all UI labels. The pixel
tile alphabet sets only the KAIZENLY wordmark.

- DM Sans Bold (700, tight tracking) → `display-xl` … `display-sm` (hero
  headlines, section headlines, big numbers).
- DM Sans (400–500) → titles, body, nav, buttons, captions, labels.
- Pixel tile alphabet (code-drawn SVG) → the wordmark only.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 700 | 1.05 | −1px | Hero headline |
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
| `{typography.button}` | 16px | 500 | 1.5 | 0 | Button labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Nav links |
| `{typography.timer-digit}` | 96px | 700 | 1 | 0 | Hero numbers, stat figures |

### Principles
Headlines are DM Sans **Bold** — weight carries emphasis here, unlike the
main site's serif. Body type stays at weight 400 for paragraphs and 500
for labels and emphasized phrases. When in doubt about emphasis, reach for
the accent colour or a bigger size before a heavier weight.

## Layout

### Spacing System
- **Base unit:** 8px.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 ·
  `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 28 ·
  `{spacing.xxl}` 32.
- **Card padding:** `{spacing.lg}` (24px) inside cards and panels.
- **Section gaps:** `{spacing.section}` (64px desktop / 48px mobile)
  between major sections.
- **Screen gutters:** `{spacing.screen-h}` (24px) horizontal.
- **Page tail:** `{spacing.content-bottom}` (32px) of breathing room at the
  end of a page.

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
Pill CTAs and utility buttons carry comfortable tap padding; aim for a
44×44px minimum hit area on mobile by preserving vertical padding even as
labels shrink.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Hairline border `{colors.hairline}`, no shadow | Default cards on the dark canvas |
| 1 — Soft | Layered micro-shadow, barely-there | Raised feature cards, floating buttons |
| 2 — Elevated | Deeper layered stack | Modals, popovers, bottom sheets |

Elevation is **barely-there**. In dark theme a black shadow is invisible
on a near-black canvas — the depth cue there is a lighter card border plus
a faint light edge, not a darker shadow.

## Illustrations

The app's illustration voice, not the main site's: pixel art and tile
glyphs, code-drawn as SVG, tinted with `{colors.ink}` (theme-reactive) or
painted in the accent greens. One calm illustration per surface, with
generous whitespace. No photography as decoration; screenshots of the app
sit inside rounded `{rounded.lg}` frames.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Text fields / inputs |
| `{rounded.sm}` | 8px | Utility buttons, small surfaces |
| `{rounded.md}` | 12px | Small cards, dialogs |
| `{rounded.lg}` | 24px | Cards, panels — the app's corner |
| `{rounded.xl}` | 32px | Large containers, hero wells |
| `{rounded.pill}` | 9999px | Marketing CTAs, switches |
| `{rounded.full}` | 9999px | Circular icon buttons, avatars, product icons |

Marketing CTAs are deliberately **fully pill-shaped** — the contrast
between a pill CTA and a 24px card is intentional. Inputs stay tight at
4px so fields never read as buttons.

## Components

### Navigation

**`nav-bar`** — Top navigation. Slim sticky bar, `{colors.surface}`
background, 64px tall. Left: 3-tile mark + KAIZENLY pixel wordmark.
Centre/right: Home / Features / Gallery / About / Download / Privacy / Terms links.
Right: theme toggle. The portfolio link lives in the About section and the
footer ("Built by Nadeem"), not in the nav. Condenses to a hamburger
below 840px.

**`wordmark`** — The KAIZENLY pixel tile alphabet lockup, used with the
3-tile mark in the nav bar and footer. Mint ink with a single accent-green
notch. Never set in DM Sans, never in a pixel webfont.

**`logo`** — "Three stacked tiles forming a K": two mint tiles + one vivid
green tile (#27F24C, never recoloured per theme). Must read at 20–28px and
as a favicon. Files: `public/logo.svg`, `public/favicon.svg`.

### Buttons

**`button-primary`** — The primary CTA. Background `{colors.accent}`
(vivid green), text `{colors.on-accent}`, type `{typography.button}`
(DM Sans 16 / 500), fully pill `{rounded.pill}`, padding 12px × 24px.
- Pressed state darkens to `{colors.accent-deep}`.
- Disabled state uses `{colors.surface-variant}` fill with
  `{colors.ink-muted}` text.

**`button-secondary`** — Pill button for secondary actions.
`{colors.surface}` background, `{colors.ink}` text, 1px
`{colors.hairline}` border, same pill shape and padding as primary.

**`text-link`** — Inline link, no background, `{colors.accent}` text.

### Cards & Containers

**`card`** — The workhorse surface. `{colors.surface}` background, 1px
`{colors.hairline}` border, rounded `{rounded.lg}` (24px), `0dp`
elevation, interior padding `{spacing.lg}` (24px).

**`feature-card`** — Same chrome as `card`. Feature lists inside are plain
bullets, never nested boxes.

### Feedback

**`toast`** — `{colors.sheet}` surface, `{colors.ink}` text,
`{colors.accent}` action label, `{typography.body-sm}`, rounded
`{rounded.md}`.

**`dialog`** — Modal / bottom-sheet surface. `{colors.sheet}` background,
`{typography.title-md}` title, `{typography.body-md}` body, 24px radius,
24px padding.

### Signature Components

**`hero`** — Dark canvas, `{colors.ink}` text, `{typography.display-xl}`
DM Sans Bold headline with one word in `{colors.accent}`, and a
`button-primary` + `button-secondary` CTA pair. The 3-tile mark sits above
the headline.

**`footer`** — Own footer. Dark `{colors.canvas}` band,
`{colors.ink-secondary}` link text at `{typography.caption}`, padding
`{spacing.xxl}`. Brand column (mark + tagline + "Built by Nadeem" with a
link to the portfolio home), link columns (Home / Features / Gallery /
About / Download / Privacy / Terms), and the Machine column (llms.txt / robots.txt /
sitemap.xml).

**`stat-tile`** — A stat block. `{colors.surface}` background, value in
`{typography.timer-digit}` (huge square numerals), caption in
`{typography.caption}`, 24px radius, 16px padding.

## Core Pages

- **Home**: hero (3-tile mark, DM Sans headline with one green word,
  primary + secondary CTA, drifting floating pill, ticking timer), the name
  section ("Why Kaizenly?" — Kai = change, Zen = calm, ly = daily), a
  highlights teaser (four cards — Focus, Routines, the Tower, Parachutes —
  each linking to its Features anchor), FAQ ("Kaizenly, answered." — ten
  questions, drives the FAQPage JSON-LD), the local-first band ("Your focus
  belongs to you."), About / developer card (who built it, link to the main
  website), and the footer. The feature sections live on the Features page,
  not here.
- **Features**: the exhaustive feature page — one section per feature, in
  deep detail, so no user question stays unanswered. Focus (bags, presets,
  wheel, slide to start, floating pill, block screen, essentials, the block
  holding, settings passes, routine-aware stretch, hold to extend, leaving
  early, break, sounds, celebration, boot restore), Routines & streaks
  (three routines, schedules, pre-alerts, overlap warnings, own-bag, enable
  gates, the daily streak), the Tower (blocks/floors, reserves, repair, day
  100, best day — with the scroll-built Tower visual), Parachutes (earn rule
  table, spend costs, break/exit), Sounds, Stats (Day / Month / Year),
  Widgets (preset + streak), Settings (theme, haptics, reminders, silence),
  Backup & privacy, Everything free, First run, and Honest boundaries. Every
  fact verified against FEATURES.md / the app's code — never copied from the
  old site without re-checking it. No internal details: no architecture
  names, no component names, no encryption algorithm names — behaviour only.
- **Gallery**: a shell, not a gallery yet. Page hero, six group sections
  (Focus sessions, Routines, the Tower, Stats, Widgets, Settings & backup)
  with the grid layout ready and placeholder frames. No images — real phone
  screenshots arrive later from the user (per-app Drive folder) and replace
  the placeholders.
- **About**: the app's story, not the developer's bio — the developer
  content already lives on the main portfolio site. H1 "Built for a phone
  that would not stay down." — why it was built (his own problem; tried
  other focus apps and never found one both strict and private; local-first
  by design; everything free in this version), why the name (Kai = change,
  Zen = calm, ly = daily — Kaizen, daily), the philosophy (strict about
  the session, gentle about the person — small steps, no guilt), and a
  short developer section at the end only (one paragraph + contact +
  "More from Nadeem Dev Apps →"). Keeps the short Person JSON-LD (no
  location). No location is stated for the developer anywhere on this site.
- **Download**: honest, no download yet. H1 "No download yet." — the app
  is in development; no Play Store listing, no APK, no download button
  (the repo is private, so no GitHub link either); those appear here only
  when they are real. "What to expect" (everything free; no account;
  local-first; no tracking) and "Questions first?" (Privacy
  + FAQ on Home). No version or release numbers anywhere on the page —
  they go stale. Primary CTA "See how it works" → Features #focus;
  secondary "Explore features" → Features.
- **Privacy / Terms**: document pages — dark canvas, DM Sans headlines,
  generous line-height. Content carries over from the main site's
  `/products/kaizenly/privacy/` and `/terms/` pages.

## AI Readability

Same discipline as the main site: semantic HTML, `llms.txt` +
`llms-full.txt` (both in this folder's `public/`, served with the site),
`robots.txt` allowing AI crawlers, `sitemap.xml` generated at build time,
JSON-LD (`SoftwareApplication` + `FAQPage`) on the home page.

## Accessibility

- **Text scaling:** all pages must survive large text — prefer wrap/scroll
  over fixed heights.
- **Touch targets:** 44×44px minimum hit area on mobile for CTAs and nav
  controls.
- **Contrast:** the green accent on the dark canvas is high-contrast
  (~11:1 for `#27F24C` on `#1D201A`); the dark-green ink on accent fills
  is ~9.6:1. Focus states use `{colors.accent}` so keyboard navigation is
  always visible.
- **Alt text and labels:** every image carries alt text; charts expose a
  data-summary description; actionable icons carry a meaningful label.

## Themes (Dark / Light)

- **Dark is the anchor.** Design against dark first; the light theme is the
  same product with palette values inverted in lightness.
- **Only palette changes.** Spacing, type, radius, and components are
  identical across themes. Never branch layout or shape on theme.
- **Theme source:** Light by default (the app's fresh-install default);
  the toggle persists the choice in localStorage. Every token reads the
  active palette, so theme flips re-colour the whole site without
  touching call sites.

## Free model — decided (2026-11-10, implemented in the app)

- **Free**: all 3 bags with 6 slots each, 3 routines (routine-own-bag
  free), all 4 soundscapes, and parachutes earned free via streaks.
- **Parachute streak**: a separate counter from the Tower. A qualifying
  day = one session with ≥30 minutes of actual focus; at most one
  qualifying day per calendar day. First 10 days pay DOUBLE (day 3 → +2,
  days 4–10 → +2/day, day 10 → +6 that day with its +4 bonus); after day
  10 → +1/day, day 20 → +6 that day (+1 daily + 5 bonus). Cumulative
  totals: 3→2, 6→8, 10→20, 15→25, 20→35, 30→45. A missed day resets the
  counter to 0 — Tower reserve blocks do not save it. Cap 99.
- **Parachute costs**: break = 1 per 30-minute break; exit =
  1 + 1 per started hour left (minimum 2); hold-to-extend and starting a
  session over 3 hours need at least 1 parachute on board (not consumed);
  enabling a routine needs at least 1 parachute.
- **Also free**: sessions up to 12 hours (custom card) and silence /
  Do Not Disturb during sessions. There is no Premium variant and no purchase in the app.
- **Never list as paid**: routines, bags, slots, sounds, parachutes, the custom card, 12-hour sessions, silence / Do Not Disturb. Everything in the app is free; there is no Premium variant.
- **Profile**: no sign-in, no "Leave a review" — the profile sheet has a
  "How to get parachutes" row instead.

## Cutover

Cut over 2026-11-10. `npm run build` at the repo root builds this folder
and merges its `dist` into the main site's `dist` under
`/products/kaizenly/` (`scripts/merge-kaizenly.mjs`); the main site's
`src/pages/products/kaizenly.astro` + `kaizenly/privacy.astro` +
`kaizenly/terms.astro` were deleted, so this folder is the only source of
the Kaizenly pages.

## Motion

Motion is part of the identity, not decoration. The app's own motion
language — pixel blocks that land, pills that drift, digits that tick —
carries over to the web:

- **Scroll-driven reveals**: feature cards and sections fade + rise into
  view (`view-timeline` / `IntersectionObserver` fallback; transform and
  opacity only).
- **The Tower**: builds block-by-block as you scroll (7 blocks per floor,
  reserve blocks in pale green) — the streak, made visible.
- **Hero**: the floating pill drifts gently; the timer digits tick.
- **3D scrolling**: hero and section art tilt on scroll (`perspective` +
  `rotateX` / `rotateY`, driven by scroll progress), parallax on the
  background tiles.
- **Reward table**: rows highlight in sequence as the streak grows.
- **Rules**: motion is transform/opacity only (no layout thrash);
  `prefers-reduced-motion` disables all of it (content fully visible, no
  animation); no JS framework — small page-scoped scripts only, like the
  main site's Products filter script.

## Do's and Don'ts

### Do
- Reserve `{colors.accent}` (vivid green) for the primary action, inline
  links, and the active/focus signal — nothing decorative.
- Keep both themes in the app's palette; let the canvas/surface/ink ramp
  do all the figure/ground work.
- Set headlines in DM Sans Bold with tight tracking; pair with DM Sans
  400/500 body.
- Ship every change in both polarities — change only palette values, never
  spacing/type/radius/components, between dark and light.
- Keep the page on the tinted `{colors.canvas}` canvas; use
  `{colors.surface}` for cards to create gentle figure/ground.
- Keep marketing CTAs fully pill-shaped (`{rounded.pill}`) and cards at
  24px (`{rounded.lg}`).
- Use `{colors.danger}` only for destructive/error states.
- Use the toast bus for feedback, with specific, actionable messages.
- Verify every feature claim against FEATURES.md / the app's code before
  writing it into site copy — never copy a feature from the old site
  without re-checking it.

### Don't
- Don't use the main site's blue (#0075de) anywhere on a Kaizenly page.
- Don't use orange anywhere — the old accent is gone from the app and
  from this site.
- Don't use a serif display face — headlines are DM Sans Bold.
- Don't use Inter for anything here — the app's font is DM Sans.
- Don't set the wordmark in DM Sans or a pixel webfont — it is the app's
  tile alphabet, code-drawn as SVG.
- Don't put pill radii on form fields — inputs stay tight at `{rounded.xs}`
  (4px).
- Don't drop heavy shadows; elevation is hairline + barely-there layered
  shadow, never a hard cast.
- Don't branch layout, spacing, or shape on the theme — only colours
  change.
- Don't invent feature claims, prices, or dates — every fact on the site
  must be verified in the app repo first.
