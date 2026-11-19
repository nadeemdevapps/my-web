import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { play, type Character } from '../content'
import { Game, WORLD, type GameEvent, type HudState } from '../game/engine'
import { cx } from '../lib/cx'
import { recordRun } from '../lib/scores'
import { Button, IconButton } from './Button'
import { Doodler, Faller } from './Doodle'
import { Frame } from './UI'

export type Phase = 'ready' | 'countdown' | 'playing' | 'paused' | 'over'
type Result = { score: number; best: number; isBest: boolean; unlocked: Character[] }

/** Three little hats: the lives counter. */
export function Hats({ count, className }: { count: number; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1', className)} role="img" aria-label={`${count} of 3 hats left`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 28 18" className={cx('h-[18px] w-7 transition-opacity', i < count ? 'opacity-100' : 'opacity-25')} aria-hidden="true">
          <path d="M5 13c0-6.5 4-10 9-10s9 3.5 9 10Z" fill="#111" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 13h24v3H2Z" fill="#111" />
        </svg>
      ))}
    </span>
  )
}

export function GameStage({ character, best, autostart }: { character: Character; best: number; autostart?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const primaryRef = useRef<HTMLButtonElement>(null)
  const [phase, setPhase] = useState<Phase>('ready')
  const [hud, setHud] = useState<HudState>({ score: 0, hats: 3, dodged: 0, caught: 0, time: 0 })
  const [count, setCount] = useState(3)
  const [result, setResult] = useState<Result | null>(null)
  const [announce, setAnnounce] = useState('')
  const [flash, setFlash] = useState<string | null>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const onEvent = useCallback((e: GameEvent) => {
    if (e.type === 'hit') {
      setAnnounce(e.hats > 0 ? `Bonk. ${e.hats} ${e.hats === 1 ? 'hat' : 'hats'} left.` : 'Bonk. No hats left.')
      setFlash('bonk!')
    } else if (e.type === 'catch') {
      setFlash(`+${e.points}`)
    } else if (e.type === 'over') {
      const g = gameRef.current
      const r = recordRun({ score: e.score, dodged: e.dodged, caught: e.caught, character: g ? characterRef.current.id : 'pip' })
      setResult({ score: e.score, ...r })
      setPhase('over')
      setAnnounce(`Run over. Score ${e.score}.${r.isBest ? ' New best.' : ''}`)
    }
  }, [])
  const characterRef = useRef(character)
  characterRef.current = character

  // Create the game once; keep it across re-renders.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const g = new Game(characterRef.current, setHud, onEvent, { reducedMotion: reduced })
    gameRef.current = g
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let scale = 1
    const resize = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const cssW = wrap.clientWidth
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round((cssW * WORLD.h * dpr) / WORLD.w)
      scale = canvas.width / WORLD.w
      g.draw(ctx, scale)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrapRef.current!)
    resize()
    let last = performance.now()
    let raf = 0
    const loop = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      g.tick(dt)
      g.draw(ctx, scale)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      gameRef.current = null
    }
  }, [onEvent])

  useEffect(() => {
    gameRef.current?.setCharacter(character)
  }, [character])

  const start = useCallback(() => {
    const g = gameRef.current
    if (!g) return
    g.reset()
    g.running = false
    setResult(null)
    setCount(3)
    setPhase('countdown')
    wrapRef.current?.focus()
  }, [])

  const pause = useCallback(() => {
    const g = gameRef.current
    if (!g || phaseRef.current !== 'playing') return
    g.running = false
    g.input.left = g.input.right = false
    g.input.target = null
    setPhase('paused')
  }, [])

  const resume = useCallback(() => {
    const g = gameRef.current
    if (!g || phaseRef.current !== 'paused') return
    g.running = true
    setPhase('playing')
    wrapRef.current?.focus()
  }, [])

  // Countdown, then go.
  useEffect(() => {
    if (phase !== 'countdown') return
    if (count <= 0) {
      const g = gameRef.current
      if (g) g.running = true
      setPhase('playing')
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 450)
    return () => clearTimeout(t)
  }, [phase, count])

  useEffect(() => {
    if (autostart) start()
  }, [autostart, start])

  // Focus the overlay's main button when one appears.
  useEffect(() => {
    if (phase === 'ready' || phase === 'paused' || phase === 'over') primaryRef.current?.focus({ preventScroll: true })
  }, [phase])

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(null), 650)
    return () => clearTimeout(t)
  }, [flash, hud])

  // Keyboard. Arrows and A/D move; Space, P and Escape pause.
  useEffect(() => {
    const set = (e: KeyboardEvent, down: boolean) => {
      const g = gameRef.current
      if (!g) return
      const target = e.target as HTMLElement
      if (target.closest('input,textarea,[role=dialog]')) return
      const k = e.key.toLowerCase()
      const live = phaseRef.current === 'playing' || phaseRef.current === 'countdown'
      if (k === 'arrowleft' || k === 'a') {
        g.input.left = down
        g.input.target = null
        if (live) e.preventDefault()
      } else if (k === 'arrowright' || k === 'd') {
        g.input.right = down
        g.input.target = null
        if (live) e.preventDefault()
      } else if (down && (k === ' ' || k === 'p' || k === 'escape')) {
        if (phaseRef.current === 'playing') {
          e.preventDefault()
          pause()
        } else if (phaseRef.current === 'paused' && k !== 'escape' && !(target.tagName === 'BUTTON')) {
          e.preventDefault()
          resume()
        }
      }
    }
    const down = (e: KeyboardEvent) => set(e, true)
    const up = (e: KeyboardEvent) => set(e, false)
    const hide = () => pause()
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', hide)
    document.addEventListener('visibilitychange', hide)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', hide)
      document.removeEventListener('visibilitychange', hide)
    }
  }, [pause, resume])

  // Touch and mouse: drag to steer.
  const toWorld = (clientX: number) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return ((clientX - r.left) / r.width) * WORLD.w
  }
  const onPointer = (e: React.PointerEvent) => {
    const g = gameRef.current
    if (!g || phaseRef.current !== 'playing') return
    if (e.type === 'pointerdown') (e.target as Element).setPointerCapture?.(e.pointerId)
    if (e.type === 'pointerup' || e.type === 'pointercancel') {
      g.input.target = null
      return
    }
    if (e.type === 'pointermove' && e.buttons === 0 && e.pointerType !== 'mouse') return
    if (e.type === 'pointermove' && e.pointerType === 'mouse' && e.buttons === 0) return
    g.input.target = toWorld(e.clientX)
  }
  const hold = (side: 'left' | 'right', on: boolean) => {
    const g = gameRef.current
    if (!g) return
    g.input[side] = on
    g.input.target = null
  }

  const holdProps = (side: 'left' | 'right') => ({
    onPointerDown: (e: React.PointerEvent) => {
      ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
      hold(side, true)
    },
    onPointerUp: () => hold(side, false),
    onPointerCancel: () => hold(side, false),
    onPointerLeave: () => hold(side, false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border-[2.5px] border-ink bg-card px-4 py-2.5 shadow-[var(--shadow-offset-sm)]">
        <div className="flex items-baseline gap-5">
          <div>
            <span className="block text-[0.75rem] font-extrabold text-graphite">{play.score}</span>
            <span className="font-display text-[1.75rem] leading-none font-black tabular-nums" data-testid="score">
              {hud.score}
            </span>
          </div>
          <div>
            <span className="block text-[0.75rem] font-extrabold text-graphite">{play.best}</span>
            <span className="font-display text-[1.75rem] leading-none font-black text-graphite tabular-nums">{Math.max(best, hud.score)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="sr-only">{play.hats}</span>
          <Hats count={hud.hats} />
          <IconButton aria-label={phase === 'paused' ? play.resume : play.pause} disabled={phase !== 'playing' && phase !== 'paused'} onClick={phase === 'paused' ? resume : pause}>
            {phase === 'paused' ? <Play className="size-5" strokeWidth={2.75} /> : <Pause className="size-5" strokeWidth={2.75} />}
          </IconButton>
        </div>
      </div>

      <Frame className="rounded-[var(--radius-lg)] border-[3.5px]">
        <div
          ref={wrapRef}
          tabIndex={-1}
          className="relative w-full touch-none focus:outline-none"
          style={{ aspectRatio: `${WORLD.w} / ${WORLD.h}` }}
          onPointerDown={onPointer}
          onPointerMove={onPointer}
          onPointerUp={onPointer}
          onPointerCancel={onPointer}
        >
          <canvas ref={canvasRef} className="block h-full w-full" role="img" aria-label="Game: a street where things fall from the sky. Move your character left and right to dodge their shadows." />
          {flash && (
            <span aria-hidden="true" className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 animate-pop font-display text-[2.5rem] leading-none font-black">
              {flash}
            </span>
          )}
          {phase === 'countdown' && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
              <span key={count} className="animate-pop font-display text-[6rem] leading-none font-black drop-shadow-[0_4px_0_#f3f2ee]">
                {count > 0 ? count : 'go'}
              </span>
            </div>
          )}
          {(phase === 'ready' || phase === 'paused' || phase === 'over') && (
            <div className="absolute inset-0 grid place-items-center bg-paper/70 p-3 backdrop-blur-[1.5px]">
              <div className="flex w-full max-w-[420px] animate-pop flex-col items-center rounded-[var(--radius-lg)] border-[2.5px] border-ink bg-card px-5 py-4 text-center shadow-[var(--shadow-offset)] sm:py-6">
                {phase === 'ready' && (
                  <>
                    <div className="hidden items-end gap-2 sm:flex" aria-hidden="true">
                      <Faller kind="teacup" size={34} />
                      <Doodler size={30} hat={character.hat} accessory={character.accessory} tint={character.tint} waddle />
                      <Faller kind="coin" size={26} />
                    </div>
                    <h2 className="font-display text-[1.75rem] leading-none font-black sm:mt-2 sm:text-[2.25rem]">{play.ready}</h2>
                    <p className="mt-1 hidden text-graphite sm:block">{play.readyBody}</p>
                    <Button ref={primaryRef} size="md" className="mt-3 sm:mt-4" onClick={start} icon={<Play className="size-4" strokeWidth={3} />}>
                      {play.start}
                    </Button>
                  </>
                )}
                {phase === 'paused' && (
                  <>
                    <h2 className="font-display text-[1.75rem] leading-none font-black sm:text-[2.25rem]">{play.paused}</h2>
                    <p className="mt-1 hidden text-graphite sm:block">{play.pausedBody}</p>
                    <div className="mt-3 flex gap-2 sm:mt-4">
                      <Button ref={primaryRef} onClick={resume} icon={<Play className="size-4" strokeWidth={3} />}>
                        {play.resume}
                      </Button>
                      <Button variant="paper" onClick={start} icon={<RotateCcw className="size-4" strokeWidth={3} />}>
                        {play.restart}
                      </Button>
                    </div>
                  </>
                )}
                {phase === 'over' && result && (
                  <>
                    <h2 className="font-display text-[2rem] leading-none font-black sm:text-[2.75rem]">{play.over}</h2>
                    <p className="mt-1 text-[0.9375rem] text-graphite" data-testid="over-text">
                      {play.overBody(result.score, result.best, result.isBest)}
                    </p>
                    {result.unlocked.length > 0 && (
                      <p className="mt-2 text-[0.875rem] font-extrabold">
                        Unlocked:{' '}
                        {result.unlocked.map((c, i) => (
                          <span key={c.id}>
                            {i > 0 && ', '}
                            <Link to="/characters" className="ink-link">
                              {c.name}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                    <Button ref={primaryRef} className="mt-3 sm:mt-4" onClick={start} icon={<RotateCcw className="size-4" strokeWidth={3} />}>
                      {play.again}
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </Frame>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        <button type="button" aria-label={play.left} className="round flex h-16 touch-none items-center justify-center rounded-full border-[2.5px] border-ink bg-card shadow-[var(--shadow-offset-sm)] select-none active:translate-y-0.5 active:bg-paper-2 active:shadow-none" {...holdProps('left')}>
          <ArrowLeft className="size-7" strokeWidth={3} />
        </button>
        <button type="button" aria-label={play.right} className="round flex h-16 touch-none items-center justify-center rounded-full border-[2.5px] border-ink bg-card shadow-[var(--shadow-offset-sm)] select-none active:translate-y-0.5 active:bg-paper-2 active:shadow-none" {...holdProps('right')}>
          <ArrowRight className="size-7" strokeWidth={3} />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  )
}
