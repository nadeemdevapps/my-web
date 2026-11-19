import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cx } from '../lib/cx'
import { GLYPH_ROWS, rasterize } from '../lib/ledFont'

type Props = {
  text: string
  color: string
  /** LED rows; columns follow from the box's aspect ratio. */
  rows?: number
  /** Pixel size of one font dot, in LEDs. */
  scale?: 1 | 2
  /** Scroll speed in LED columns per second when the text is too long. */
  speed?: number
  /** Breathe the brightness, used when a session ends. */
  pulse?: boolean
  label?: string
  className?: string
}

const OFF = 'rgba(255,255,255,0.055)'

/**
 * The LED pixel screen, drawn on a canvas. Short text sits centred; long text
 * scrolls. With reduced motion, long text is paged word by word instead.
 */
export function LedMatrix({ text, color, rows = 16, scale = 2, speed = 16, pulse = false, label, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const state = useRef({ text, color, scale, speed, reduced, offset: 0, page: 0 })
  state.current.text = text
  state.current.color = color
  state.current.scale = scale
  state.current.speed = speed
  state.current.reduced = !!reduced

  useEffect(() => {
    state.current.offset = 0
    state.current.page = 0
  }, [text])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let last = 0
    let visible = true
    let pageTimer = 0

    const layout = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const pitch = h / rows
      const cols = Math.max(8, Math.floor(w / pitch))
      return { w, h, pitch, cols, xPad: (w - cols * pitch) / 2 }
    }

    const pagesFor = (value: string, cols: number) => {
      const words = value.split(/\s+/).filter(Boolean)
      const pages: string[] = []
      let current = ''
      for (const word of words) {
        const next = current ? `${current} ${word}` : word
        if (rasterize(next).length <= cols - 2 || !current) current = next
        else {
          pages.push(current)
          current = word
        }
      }
      if (current) pages.push(current)
      return pages.length ? pages : ['']
    }

    const draw = () => {
      const s = state.current
      const { w, h, pitch, cols, xPad } = layout()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      let value = s.text
      let k: number = s.scale
      let bits = rasterize(value)
      let scrolling = bits.length * k > cols - 2
      if (scrolling && s.reduced) {
        // Page through the words instead of scrolling.
        if (bits.length <= cols - 2) k = 1
        else {
          k = 1
          const pages = pagesFor(value, cols)
          value = pages[s.page % pages.length]
          bits = rasterize(value)
        }
        scrolling = false
      }
      const textW = bits.length * k
      const start = scrolling ? Math.round(cols - s.offset) : Math.floor((cols - textW) / 2)
      const yStart = Math.floor((rows - GLYPH_ROWS * k) / 2)
      const dot = pitch * 0.8
      const r = Math.min(dot * 0.22, 2)

      for (const lit of [false, true]) {
        ctx.fillStyle = lit ? s.color : OFF
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const x = c - start
          const col = x >= 0 && x < textW ? bits[Math.floor(x / k)] : 0
          for (let row = 0; row < rows; row++) {
            const y = row - yStart
            const on = col !== 0 && y >= 0 && y < GLYPH_ROWS * k && (col >> Math.floor(y / k)) & 1
            if (!!on !== lit) continue
            const px = xPad + c * pitch + (pitch - dot) / 2
            const py = row * pitch + (pitch - dot) / 2
            ctx.roundRect(px, py, dot, dot, r)
          }
        }
        ctx.fill()
      }
      return { scrolling, cycle: textW + cols, cols }
    }

    const tick = (t: number) => {
      const dt = last ? Math.min(0.1, (t - last) / 1000) : 0
      last = t
      const info = draw()
      if (info.scrolling) {
        state.current.offset = (state.current.offset + dt * state.current.speed) % info.cycle
      }
      raf = info.scrolling && visible ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      if (raf) return
      last = 0
      raf = requestAnimationFrame(tick)
    }

    kick()
    const ro = new ResizeObserver(kick)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) kick()
    })
    io.observe(canvas)
    pageTimer = window.setInterval(() => {
      if (!state.current.reduced) return
      state.current.page += 1
      kick()
    }, 2400)
    const onVis = () => document.visibilityState === 'visible' && kick()
    document.addEventListener('visibilitychange', onVis)
    ;(canvas as HTMLCanvasElement & { __kick?: () => void }).__kick = kick
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.clearInterval(pageTimer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [rows])

  // Redraw when the text, colour or motion setting changes.
  useEffect(() => {
    const canvas = canvasRef.current as (HTMLCanvasElement & { __kick?: () => void }) | null
    canvas?.__kick?.()
  }, [text, color, scale, reduced])

  return (
    // The canvas is absolutely positioned so its pixel buffer never feeds
    // back into the layout size.
    <div className={cx('relative h-full w-full', className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label ?? `Display reads ${text.trim() || 'nothing'}`}
        className={cx('absolute inset-0 block size-full', pulse && 'animate-[led-pulse_1.6s_ease-in-out_infinite]')}
        style={{ filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px ${color}66)` }}
      />
    </div>
  )
}
