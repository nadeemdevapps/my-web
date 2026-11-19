import { useEffect, useRef } from 'react'

import { cx } from '../lib/cx'

/*
  The stacked logotype. The two O's in LOOK are eyes: their pupils look up
  and drift toward the pointer. With reduced motion they hold still.
*/
function Eye() {
  return (
    <span className="relative inline-block">
      O
      <span aria-hidden="true" className="absolute top-[29.5%] left-1/2 block h-[41%] w-[0.24em] -translate-x-1/2 overflow-hidden rounded-[50%]" style={{ background: 'var(--eye-white, var(--color-paper))' }}>
        <span className="absolute top-[12%] left-1/2 block size-[0.16em] transition-transform duration-150 ease-out" style={{ transform: 'translate(calc(-50% + var(--look-x, 0) * 0.04em), calc(var(--look-y, -0.6) * 0.03em))' }}>
          <span className="round block h-full w-full animate-blink rounded-full" style={{ background: 'var(--eye-ink, var(--color-ink))' }} />
        </span>
      </span>
    </span>
  )
}

export function Wordmark({ className, as: As = 'h1', follow = true }: { className?: string; as?: 'h1' | 'div'; follow?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !follow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
        const dy = (e.clientY - (r.top + r.height * 0.2)) / (window.innerHeight / 2)
        el.style.setProperty('--look-x', String(Math.max(-1, Math.min(1, dx))))
        el.style.setProperty('--look-y', String(Math.max(-1, Math.min(0.6, dy))))
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [follow])
  return (
    <As ref={ref as never} role={As === 'div' ? 'img' : undefined} aria-label="Look Out Below" className={cx('font-display leading-[0.8] font-black tracking-[-0.005em] text-ink select-none', className)}>
      <span aria-hidden="true" className="block">
        L<Eye />
        <Eye />K
      </span>
      <span aria-hidden="true" className="block">
        OUT
      </span>
      <span aria-hidden="true" className="block">
        BELOW
      </span>
    </As>
  )
}

/** Small horizontal mark for the header: two eyes and the name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2', className)}>
      <svg viewBox="0 0 32 20" className="h-6 w-auto text-ink" aria-hidden="true">
        <circle cx="9" cy="10" r="7.5" fill="#fff" stroke="currentColor" strokeWidth="3" />
        <circle cx="23" cy="10" r="7.5" fill="#fff" stroke="currentColor" strokeWidth="3" />
        <circle cx="9" cy="6.5" r="2.8" fill="currentColor" />
        <circle cx="23" cy="6.5" r="2.8" fill="currentColor" />
      </svg>
      <span className="font-display text-[1.375rem] leading-none font-black">Look Out Below</span>
    </span>
  )
}
