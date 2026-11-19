# Look Out Below

A hand-drawn, monochrome site for a small indie game: a framed title screen
with a stacked wordmark whose O's look up, a doodle crowd and a falling piano,
plus a playable browser mini-game, a tutorial, a character gallery with
unlocks, a press kit with a key-request form, and a devlog. The game concept,
characters and copy are placeholders for your own.

## Run it

```sh
bun install
bun run dev        # http://localhost:5366 (Vite + the Worker in workerd)
bun run build      # dist/client (assets) + dist/indie_game/index.js (Worker)
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Title screen, features, character teaser, latest devlog posts |
| `/play` | The mini-game (`?start=1` starts straight away), recent runs, controls |
| `/tutorial` | Four-step how-to with animated scenes, and what falls |
| `/characters` | Gallery with filters, detail modal and character select |
| `/press` | Fact sheet, description, images with downloads, logo, quotes, key request |
| `/devlog`, `/devlog/:slug` | Posts with tag filter |
| `/styleguide` | Tokens and every component state ([open it](http://localhost:5366/styleguide)) |

## Edit it

- `src/content.ts` holds every string, character, devlog post and press fact.
  `IMAGES` at the top routes every image: replace the files in
  `public/images/` (generated sketch art) with your real key art, or point the
  constants at your CDN.
- `src/styles.css` holds the tokens (paper, ink, graphite, the one butter
  yellow, radii, offset shadows, motion keyframes). Everything rounded is a
  squircle; pills and circles use `.round`.
- `src/game/shapes.ts` holds the doodles as SVG path strings. The site's SVG
  components (`src/components/Doodle.tsx`) and the canvas game draw from the
  same paths, so a new hat shows up in both.
- `src/game/engine.ts` is the game: a fixed-timestep simulation on an
  800 × 480 world. Tune `SPECS` (size, warning time, points, when each object
  starts appearing) and the spawn curve in `step()`.
- `src/lib/scores.ts` keeps the best score, the last ten runs and the selected
  character in `localStorage` (`look-out-below:v1`). Characters unlock at the
  `unlockAt` best score set in `content.ts`.
- `src/worker/index.ts` is the Cloudflare Worker. `POST /api/press-request`
  validates the press form and returns a reference; connect it to your inbox
  or a D1 table. Unknown `/api/*` routes return a JSON 404.

## Controls

Arrow keys or A/D move, Space, P or Escape pause. On touch screens, drag on
the game or hold the on-screen arrows. The game pauses itself when the tab
is hidden. With reduced motion, the line boil, screen shake and decorative
loops switch off.

## Deploy with Freebuff Sites

`deploy.json` already points at the build output. After `bun run build`, deploy
it with the `sites_deploy` tool (or the Sites API) from this directory.
