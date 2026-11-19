import type { Accessory, Character, FallerKind, Hat, Tint } from '../content'
import { ACCESSORIES, FALLERS, HATS, PERSON, TINTS, type Shape } from './shapes'

/*
  The whole mini-game: a fixed-timestep simulation on an 800 × 480 world,
  drawn on one canvas. React owns the overlays and the HUD; this class only
  reports changes through `onChange` and `onEvent`.
*/
export const WORLD = { w: 800, h: 480, ground: 420 }
const STEP = 1 / 120

type Spec = { size: number; warn: number; points: number; after: number; weight: number }
export const SPECS: Record<FallerKind, Spec> = {
  teacup: { size: 46, warn: 1.05, points: 1, after: 0, weight: 5 },
  pot: { size: 56, warn: 1.15, points: 1, after: 0, weight: 4 },
  anvil: { size: 66, warn: 0.85, points: 2, after: 6, weight: 3 },
  piano: { size: 140, warn: 1.7, points: 3, after: 12, weight: 1.6 },
  coin: { size: 34, warn: 1.3, points: 10, after: 2, weight: 1.4 },
}

type Item = { id: number; kind: FallerKind; x: number; t: number; warn: number; size: number; spin: number; landed: number }
type Npc = { x: number; y: number; dir: number; speed: number; hat: Hat; accessory: Accessory; tint: Tint; squash: number; think: number; say: string; sayT: number; scale: number }

export type HudState = { score: number; hats: number; dodged: number; caught: number; time: number }
export type GameEvent = { type: 'hit'; hats: number } | { type: 'catch'; points: number } | { type: 'over'; score: number; dodged: number; caught: number }

const NPC_LINES = ['eek', 'oof', 'hm?', 'my hat', 'rude']
const paths = new Map<string, Path2D>()
const path = (d: string) => {
  let p = paths.get(d)
  if (!p) paths.set(d, (p = new Path2D(d)))
  return p
}

export class Game {
  hud: HudState = { score: 0, hats: 3, dodged: 0, caught: 0, time: 0 }
  running = false
  over = false
  player = { x: WORLD.w / 2, v: 0, face: 1, invuln: 0, walk: 0 }
  input = { left: false, right: false, target: null as number | null }
  private items: Item[] = []
  private npcs: Npc[] = []
  private nextId = 1
  private spawnIn = 0.8
  private acc = 0
  private shake = 0
  private boil = 0
  private boilSeed = 0
  private rng: () => number
  constructor(
    private character: Character,
    private onChange: (h: HudState) => void,
    private onEvent: (e: GameEvent) => void,
    private opts: { reducedMotion: boolean; seed?: number } = { reducedMotion: false },
  ) {
    let s = opts.seed ?? Math.floor(Math.random() * 1e9)
    this.rng = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
    this.reset()
  }

  setCharacter(c: Character) {
    this.character = c
  }

  reset() {
    this.hud = { score: 0, hats: 3, dodged: 0, caught: 0, time: 0 }
    this.items = []
    this.player = { x: WORLD.w / 2, v: 0, face: 1, invuln: 0, walk: 0 }
    this.spawnIn = 0.9
    this.over = false
    const looks: Array<[Hat, Accessory, Tint]> = [
      ['none', 'none', 'paper'], ['beanie', 'scarf', 'ink'], ['cap', 'none', 'smudge'], ['none', 'bag', 'paper'],
      ['bucket', 'none', 'paper'], ['top', 'glasses', 'ink'], ['none', 'umbrella', 'paper'], ['beanie', 'none', 'butter'],
    ]
    this.npcs = looks.map(([hat, accessory, tint], i) => ({
      x: 60 + i * 95 + this.rng() * 40,
      y: WORLD.ground - 26 - this.rng() * 30,
      dir: this.rng() < 0.5 ? -1 : 1,
      speed: 14 + this.rng() * 22,
      hat, accessory, tint,
      squash: 0,
      think: 2 + this.rng() * 4,
      say: '',
      sayT: 0,
      scale: 0.62 + this.rng() * 0.12,
    }))
    this.onChange({ ...this.hud })
  }

  /** Advance by real seconds; runs fixed steps underneath. */
  tick(dt: number) {
    this.boil += dt
    if (this.boil > 0.16) {
      this.boil = 0
      this.boilSeed = (this.boilSeed + 1) % 3
    }
    if (!this.running || this.over) return
    this.acc += Math.min(dt, 0.1)
    while (this.acc >= STEP) {
      this.step(STEP)
      this.acc -= STEP
    }
  }

  private step(dt: number) {
    const h = this.hud
    h.time += dt
    const p = this.player
    const speed = 290 + this.character.speed * 28
    let dir = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0)
    if (!dir && this.input.target != null) {
      const d = this.input.target - p.x
      if (Math.abs(d) > 6) dir = Math.sign(d) * Math.min(1, Math.abs(d) / 40)
    }
    p.v += (dir * speed - p.v) * Math.min(1, dt * 14)
    p.x = Math.max(22, Math.min(WORLD.w - 22, p.x + p.v * dt))
    if (Math.abs(p.v) > 20) {
      p.face = Math.sign(p.v)
      p.walk += dt * 12
    }
    p.invuln = Math.max(0, p.invuln - dt)
    this.shake = Math.max(0, this.shake - dt * 3)

    this.spawnIn -= dt
    if (this.spawnIn <= 0) {
      this.spawn()
      this.spawnIn = Math.max(0.32, 1.05 - h.time * 0.0085) * (0.75 + this.rng() * 0.5)
    }

    for (const it of this.items) {
      if (it.landed > 0) {
        it.landed += dt
        continue
      }
      it.t += dt
      if (it.t >= it.warn) this.land(it)
    }
    this.items = this.items.filter((it) => it.landed === 0 || it.landed < 0.9)

    for (const n of this.npcs) {
      n.squash = Math.max(0, n.squash - dt)
      n.sayT = Math.max(0, n.sayT - dt)
      if (n.squash > 0) continue
      n.x += n.dir * n.speed * dt
      n.think -= dt
      if (n.x < 20 || n.x > WORLD.w - 20 || n.think <= 0) {
        n.dir = n.x < 20 ? 1 : n.x > WORLD.w - 20 ? -1 : -n.dir
        n.think = 2 + this.rng() * 5
      }
    }
  }

  private spawn() {
    const t = this.hud.time
    const pool = (Object.keys(SPECS) as FallerKind[]).filter((k) => t >= SPECS[k].after)
    const total = pool.reduce((s, k) => s + SPECS[k].weight, 0)
    let r = this.rng() * total
    let kind: FallerKind = pool[0]
    for (const k of pool) {
      r -= SPECS[k].weight
      if (r <= 0) {
        kind = k
        break
      }
    }
    const spec = SPECS[kind]
    const half = spec.size / 2
    const aim = this.rng() < 0.45 ? this.player.x + (this.rng() - 0.5) * 120 : 20 + this.rng() * (WORLD.w - 40)
    const x = Math.max(half, Math.min(WORLD.w - half, aim))
    const speedUp = Math.max(0.72, 1 - t * 0.003)
    this.items.push({ id: this.nextId++, kind, x, t: 0, warn: spec.warn * speedUp, size: spec.size, spin: (this.rng() - 0.5) * 1.2, landed: 0 })
  }

  private land(it: Item) {
    it.landed = 0.0001
    const h = this.hud
    const reach = it.size * 0.42 + 12
    const hitPlayer = Math.abs(this.player.x - it.x) < reach
    if (it.kind === 'coin') {
      if (hitPlayer) {
        h.score += SPECS.coin.points
        h.caught += 1
        it.landed = 0.9 // vanish at once
        this.onEvent({ type: 'catch', points: SPECS.coin.points })
      }
    } else if (hitPlayer && this.player.invuln <= 0) {
      h.hats -= 1
      this.player.invuln = 1.4
      if (!this.opts.reducedMotion) this.shake = 1
      this.onEvent({ type: 'hit', hats: h.hats })
      if (h.hats <= 0) {
        this.over = true
        this.running = false
        this.onEvent({ type: 'over', score: h.score, dodged: h.dodged, caught: h.caught })
      }
    } else {
      h.score += SPECS[it.kind].points
      h.dodged += 1
    }
    for (const n of this.npcs) {
      if (Math.abs(n.x - it.x) < it.size * 0.42 + 8 && it.kind !== 'coin') {
        n.squash = 1.1
        n.say = NPC_LINES[Math.floor(this.rng() * NPC_LINES.length)]
        n.sayT = 1.2
      }
    }
    this.onChange({ ...h })
  }

  // ---------- drawing ----------

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    const { w, h, ground } = WORLD
    ctx.setTransform(scale, 0, 0, scale, 0, 0)
    ctx.fillStyle = '#f3f2ee'
    ctx.fillRect(0, 0, w, h)
    if (this.shake > 0) ctx.translate((Math.sin(this.hud.time * 90) * 6 * this.shake) | 0, 0)
    const j = this.opts.reducedMotion ? 0 : this.boilSeed

    // paper ground lines
    ctx.strokeStyle = 'rgba(17,17,17,0.18)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(-10, ground + 6 + j * 0.4)
    ctx.bezierCurveTo(w * 0.3, ground + 2, w * 0.6, ground + 10 - j * 0.5, w + 10, ground + 4)
    ctx.stroke()
    ctx.strokeStyle = 'rgba(17,17,17,0.08)'
    for (let i = 0; i < 6; i++) {
      const y = ground + 18 + i * 9
      ctx.beginPath()
      ctx.moveTo(20 + i * 37, y)
      ctx.lineTo(80 + i * 37 + j, y)
      ctx.moveTo(470 + i * 29, y + 3)
      ctx.lineTo(520 + i * 29 - j, y + 3)
      ctx.stroke()
    }

    // shadows first, under everyone
    for (const it of this.items) {
      const p = it.landed > 0 ? 1 : Math.min(1, it.t / it.warn)
      const rx = it.size * (0.18 + 0.38 * p * p) + 4
      const alpha = it.landed > 0 ? Math.max(0, 0.32 - it.landed * 0.4) : 0.12 + 0.22 * p
      ctx.fillStyle = it.kind === 'coin' ? `rgba(160,140,40,${alpha})` : `rgba(17,17,17,${alpha})`
      ctx.beginPath()
      ctx.ellipse(it.x, ground + 2, rx, rx * 0.26, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // background crowd
    for (const n of [...this.npcs].sort((a, b) => a.y - b.y)) {
      const sq = n.squash > 0 ? 0.35 + 0.65 * Math.max(0, 1 - n.squash) ** 3 : 1
      this.person(ctx, n.x, n.y, n.scale, n.hat, n.accessory, n.tint, n.dir, sq, this.hud.time * 4 + n.x, j)
      if (n.sayT > 0) this.bubble(ctx, n.x, n.y - 48 * n.scale, n.say)
    }

    // player
    const p = this.player
    const blink = p.invuln > 0 && Math.floor(p.invuln * 10) % 2 === 0
    if (!blink || this.over) {
      const c = this.character
      this.person(ctx, p.x, ground + 2, 1.05, this.hud.hats > 0 ? c.hat : 'none', c.accessory, c.tint, p.face, this.over ? 0.4 : 1, p.walk, j)
      if (!this.over) {
        ctx.fillStyle = '#111'
        ctx.beginPath()
        const ay = ground - 78 + Math.sin(this.hud.time * 5) * 2
        ctx.moveTo(p.x - 7, ay)
        ctx.lineTo(p.x + 7, ay)
        ctx.lineTo(p.x, ay + 9)
        ctx.closePath()
        ctx.fill()
      }
    }

    // falling things
    for (const it of this.items) {
      const prog = it.landed > 0 ? 1 : Math.min(1, it.t / it.warn)
      const bottom = ground + 2
      const y = it.landed > 0 ? bottom - it.size * 0.4 : -it.size + (bottom - it.size * 0.4 + it.size) * prog * prog
      const s = it.size / 100
      ctx.save()
      ctx.translate(it.x, y)
      if (it.landed > 0) {
        const k = Math.min(1, it.landed * 6)
        ctx.globalAlpha = Math.max(0, 1 - Math.max(0, it.landed - 0.4) * 2)
        ctx.translate(0, it.size * 0.4)
        ctx.scale(1 + 0.12 * k, 1 - 0.12 * k)
        ctx.translate(0, -it.size * 0.4)
      } else {
        ctx.rotate(it.spin * (1 - prog))
      }
      ctx.scale(s, s)
      this.shape(ctx, FALLERS[it.kind], it.kind === 'coin' ? '#f1e7a6' : '#ffffff', 3.4 / s / 1.1, j)
      ctx.restore()
      if (it.kind === 'coin' && it.landed === 0) {
        ctx.strokeStyle = '#111'
        ctx.lineWidth = 2
        const tw = 6 + Math.sin(it.t * 12) * 2
        ctx.beginPath()
        ctx.moveTo(it.x + 22, y - 14 - tw)
        ctx.lineTo(it.x + 22, y - 14 + tw)
        ctx.moveTo(it.x + 22 - tw, y - 14)
        ctx.lineTo(it.x + 22 + tw, y - 14)
        ctx.stroke()
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  private shape(ctx: CanvasRenderingContext2D, shape: Shape, fill: string, width: number, jitter: number) {
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = width
    ctx.strokeStyle = '#111'
    const o = (jitter - 1) * 0.6
    for (const d of shape.fill ?? []) {
      ctx.fillStyle = fill
      ctx.fill(path(d))
      ctx.stroke(path(d))
    }
    for (const d of shape.ink ?? []) {
      ctx.fillStyle = '#111'
      ctx.fill(path(d))
      ctx.stroke(path(d))
    }
    for (const d of shape.stroke ?? []) ctx.stroke(path(d))
    if (o) {
      // a second, lighter pass a hair off: the pencil look
      ctx.save()
      ctx.globalAlpha = 0.35
      ctx.translate(o, -o)
      for (const d of [...(shape.fill ?? []), ...(shape.stroke ?? [])]) ctx.stroke(path(d))
      ctx.restore()
    }
  }

  private person(ctx: CanvasRenderingContext2D, x: number, feetY: number, scale: number, hat: Hat, acc: Accessory, tint: Tint, face: number, squash: number, walk: number, jitter: number) {
    const t = TINTS[tint]
    ctx.save()
    ctx.fillStyle = 'rgba(17,17,17,0.12)'
    ctx.beginPath()
    ctx.ellipse(x, feetY, 13 * scale, 3.5 * scale, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.translate(x, feetY)
    ctx.scale(scale * (face < 0 ? -1 : 1) * (2 - squash) ** 0.5, scale * squash)
    ctx.rotate(Math.sin(walk) * 0.06)
    ctx.translate(-20, -56)
    const lw = 2.4
    ctx.strokeStyle = '#111'
    ctx.lineWidth = lw
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke(path(PERSON.legs))
    ctx.stroke(path(PERSON.arms))
    if (acc === 'ladder') this.shape(ctx, ACCESSORIES.ladder, '#fff', lw, 0)
    ctx.fillStyle = t.body
    ctx.fill(path(PERSON.body))
    ctx.stroke(path(PERSON.body))
    ctx.fillStyle = t.head
    ctx.fill(path(PERSON.head))
    ctx.stroke(path(PERSON.head))
    ctx.fillStyle = '#111'
    ctx.fill(path(PERSON.eyes))
    if (acc !== 'ladder') this.shape(ctx, ACCESSORIES[acc], '#fff', lw, 0)
    this.shape(ctx, HATS[hat], '#fff', lw, 0)
    if (jitter) {
      ctx.globalAlpha = 0.25
      ctx.translate(jitter * 0.4 - 0.4, 0.3)
      ctx.stroke(path(PERSON.head))
    }
    ctx.restore()
  }

  private bubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
    ctx.save()
    ctx.font = '700 13px Nunito, sans-serif'
    const w = ctx.measureText(text).width + 16
    const bx = Math.max(4, Math.min(WORLD.w - w - 4, x - w / 2))
    ctx.fillStyle = '#fbfaf7'
    ctx.strokeStyle = '#111'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(bx, y - 24, w, 22, 8)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#2b2a28'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, bx + 8, y - 13)
    ctx.restore()
  }
}
