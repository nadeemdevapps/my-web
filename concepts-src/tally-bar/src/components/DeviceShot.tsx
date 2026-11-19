import type { CSSProperties, ReactNode } from 'react'

import type { Photo, ScreenRect } from '../data'
import { cx } from '../lib/cx'
import { LedMatrix } from './LedMatrix'

const rect = (r: ScreenRect): CSSProperties => ({ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` })

/**
 * A product photo with the live LED text laid over the display window.
 * The overlay is positioned from `photo.screen`, so it follows the image at
 * every width. Children (hotspots) are positioned in the same box.
 */
export function DeviceShot({
  photo,
  text,
  color,
  pulse,
  rows = 16,
  inset = 0.12,
  className,
  imgClassName,
  priority,
  children,
  label,
}: {
  photo: Photo
  text: string
  color: string
  pulse?: boolean
  rows?: number
  /** Fraction of the screen height kept clear around the LEDs (rounded corners). */
  inset?: number
  className?: string
  imgClassName?: string
  priority?: boolean
  children?: ReactNode
  label?: string
}) {
  const s = photo.screen
  return (
    <div className={cx('relative', className)} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={cx('absolute inset-0 size-full select-none object-cover', imgClassName)}
        draggable={false}
      />
      {s && (
        <div className="absolute" style={rect(s)}>
          <div className="absolute" style={{ inset: `${inset * 100}% ${inset * (s.height / s.width) * 100 * 1.6}%` }}>
            <LedMatrix text={text} color={color} rows={rows} pulse={pulse} label={label} />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

/** An invisible button laid over a control in a photo, with a visible focus ring. */
export function Hotspot({ area, label, onClick, pressed, className }: { area: ScreenRect; label: string; onClick: () => void; pressed?: boolean; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      style={{
        left: `${area.left + area.width / 2}%`,
        top: `${area.top + area.height / 2}%`,
        width: `max(${area.width}%, 44px)`,
        height: `max(${area.height}%, 44px)`,
        translate: '-50% -50%',
      }}
      className={cx(
        'group absolute rounded-[var(--radius-sm)] transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-white/25 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
    />
  )
}
