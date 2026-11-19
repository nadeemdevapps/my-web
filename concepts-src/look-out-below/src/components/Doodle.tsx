import type { CSSProperties } from 'react'

import type { Accessory, FallerKind, Hat, Tint } from '../content'
import { cx } from '../lib/cx'
import { ACCESSORIES, FALLERS, HATS, PERSON, TINTS, type Shape } from '../game/shapes'

/** The three wobble filters the `.rough` and `.boil` classes point at. Render once. */
export function RoughDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        {[3, 7, 11].map((seed, i) => (
          <filter key={seed} id={`rough-${'abc'[i]}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={seed} />
            <feDisplacementMap in="SourceGraphic" scale="2.4" />
          </filter>
        ))}
      </defs>
    </svg>
  )
}

function ShapePaths({ shape, fill = '#ffffff', width }: { shape: Shape; fill?: string; width: number }) {
  return (
    <>
      {shape.fill?.map((d) => <path key={d} d={d} fill={fill} stroke="currentColor" strokeWidth={width} strokeLinejoin="round" />)}
      {shape.ink?.map((d) => <path key={d} d={d} fill="currentColor" stroke="currentColor" strokeWidth={width} strokeLinejoin="round" />)}
      {shape.stroke?.map((d) => <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />)}
    </>
  )
}

export type DoodlerProps = {
  hat?: Hat
  accessory?: Accessory
  tint?: Tint
  size?: number
  /** Gentle side-to-side waddle. */
  waddle?: boolean
  /** Redraw the line wobble a few times a second. */
  boil?: boolean
  /** Ground shadow under the feet. */
  shadow?: boolean
  delay?: number
  flip?: boolean
  className?: string
  style?: CSSProperties
  label?: string
}

/** One tiny hand-drawn person. Decorative unless `label` is given. */
export function Doodler({ hat = 'none', accessory = 'none', tint = 'paper', size = 40, waddle, boil, shadow = true, delay = 0, flip, className, style, label }: DoodlerProps) {
  const t = TINTS[tint]
  const w = 2.2
  return (
    <span className={cx('relative inline-block text-ink', className)} style={{ width: size, height: (size * 64) / 56, ...style }} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {shadow && <span className="round absolute bottom-[1%] left-1/2 h-[10%] w-[62%] -translate-x-1/2 rounded-full bg-ink/12 blur-[1px]" />}
      <svg viewBox="-8 -4 56 64" className={cx('absolute inset-0 h-full w-full overflow-visible', boil ? 'boil' : 'rough')} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <g className={waddle ? 'animate-waddle' : undefined} style={{ animationDelay: `${delay}s`, transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          <path d={PERSON.legs} stroke="currentColor" strokeWidth={w} strokeLinecap="round" fill="none" />
          <path d={PERSON.arms} stroke="currentColor" strokeWidth={w} strokeLinecap="round" fill="none" />
          {accessory === 'ladder' && <ShapePaths shape={ACCESSORIES.ladder} width={w} />}
          <path d={PERSON.body} fill={t.body} stroke="currentColor" strokeWidth={w} strokeLinejoin="round" />
          <path d={PERSON.head} fill={t.head} stroke="currentColor" strokeWidth={w} />
          <path d={PERSON.eyes} fill="currentColor" />
          {accessory !== 'ladder' && <ShapePaths shape={ACCESSORIES[accessory]} width={w} />}
          <ShapePaths shape={HATS[hat]} width={w} />
        </g>
      </svg>
    </span>
  )
}

/** One falling object drawn the same way the game draws it. */
export function Faller({ kind, size = 64, className, label, boil }: { kind: FallerKind; size?: number; className?: string; label?: string; boil?: boolean }) {
  const fill = kind === 'coin' ? '#f1e7a6' : '#ffffff'
  return (
    <svg viewBox="-54 -54 108 108" width={size} height={size} className={cx('overflow-visible text-ink', boil ? 'boil' : 'rough', className)} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <ShapePaths shape={FALLERS[kind]} fill={fill} width={3.2} />
    </svg>
  )
}

/** A speech bubble with a little tail. */
export function Bubble({ children, className, tail = 'left' }: { children: React.ReactNode; className?: string; tail?: 'left' | 'center' | 'right' }) {
  return (
    <span className={cx('relative inline-flex min-h-7 items-center whitespace-nowrap rounded-[11px] border-2 bg-card px-2.5 text-[13px] leading-none font-bold text-ink-2 shadow-[0_2px_0_0_rgb(17_17_17/0.15)]', className)}>
      {children}
      <span
        aria-hidden="true"
        className={cx('absolute -bottom-[7px] h-3 w-3 rotate-45 border-r-2 border-b-2 bg-card', tail === 'left' && 'left-3', tail === 'center' && 'left-1/2 -ml-1.5', tail === 'right' && 'right-3')}
      />
    </span>
  )
}
