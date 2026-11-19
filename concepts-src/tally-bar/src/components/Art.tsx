import { cx } from '../lib/cx'

/** The cloud badge with the wordmark, in the style of the hero's top-right block. */
export function CloudMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 104 64" className={cx('h-auto w-[88px] xl:w-[100px]', className)} aria-hidden>
      <path
        d="M27 58h52c12 0 21-8.6 21-19.6 0-10-7.4-18-17.2-19.3C80 9.6 71.4 3 61 3c-8.7 0-16.2 4.6-20 11.6-2-.7-4.1-1-6.3-1C23.8 13.6 15 21.8 14.2 32.4 7.6 34 3 39.6 3 46.2 3 52.8 8.6 58 15.4 58H27Z"
        fill="#6c6c72"
      />
      <rect x="16" y="28" width="72" height="24" rx="7" fill="#f4f4f6" />
      <text x="52" y="46.5" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="16" letterSpacing="1.2" fill="#55555b">
        TALLY
      </text>
    </svg>
  )
}

/** Small LED-dot wordmark for the footer and the menu. */
export function DotMark({ className }: { className?: string }) {
  // "T" in a 5x5 dot grid
  const on = ['11111', '00100', '00100', '00100', '00100']
  return (
    <svg viewBox="0 0 30 30" className={cx('size-7', className)} aria-hidden>
      <rect width="30" height="30" rx="7" fill="#121214" />
      {on.flatMap((row, y) =>
        [...row].map((v, x) => <rect key={`${x}-${y}`} x={4.5 + x * 4.5} y={4.5 + y * 4.5} width="3.2" height="3.2" rx="0.7" fill={v === '1' ? '#ff3b30' : '#2a2a2e'} />),
      )}
    </svg>
  )
}

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/** Thin grey line icons for the feature strip. */
export function FeatureIcon({ name, className }: { name: 'timer' | 'apps' | 'gears'; className?: string }) {
  const cls = cx('size-14 xl:size-[60px]', className)
  if (name === 'timer')
    return (
      <svg viewBox="0 0 56 56" className={cls}>
        <circle cx="28" cy="31" r="21" {...line} />
        <path d="M24 5.5h8M28 5.5V10M44 13.5l3-3" {...line} />
        <path d="M28 31V15.5A15.5 15.5 0 0 0 16.5 21Z" fill="currentColor" opacity="0.9" />
        <path d="M28 31l-9-7" {...line} />
      </svg>
    )
  if (name === 'apps')
    return (
      <svg viewBox="0 0 56 56" className={cls}>
        <rect x="6" y="7" width="18" height="18" rx="2" fill="currentColor" />
        <rect x="6" y="31" width="18" height="18" rx="2" fill="currentColor" />
        <rect x="30" y="31" width="18" height="18" rx="2" fill="currentColor" />
        <path d="M39 6v20M29 16h20" {...line} strokeWidth={2.2} />
      </svg>
    )
  return (
    <svg viewBox="0 0 56 56" className={cls}>
      <Gear cx={34} cy={18} r={9} teeth={8} solid />
      <Gear cx={17} cy={36} r={10} teeth={8} solid />
      <Gear cx={39} cy={40} r={9} teeth={8} />
    </svg>
  )
}

function Gear({ cx: x, cy: y, r, teeth, solid }: { cx: number; cy: number; r: number; teeth: number; solid?: boolean }) {
  const pts: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2
    const rr = i % 2 ? r : r + 3
    const a1 = a - Math.PI / (teeth * 2) / 1.6
    const a2 = a + Math.PI / (teeth * 2) / 1.6
    pts.push(`${(x + rr * Math.cos(a1)).toFixed(2)},${(y + rr * Math.sin(a1)).toFixed(2)}`)
    pts.push(`${(x + rr * Math.cos(a2)).toFixed(2)},${(y + rr * Math.sin(a2)).toFixed(2)}`)
  }
  return (
    <g>
      <polygon points={pts.join(' ')} {...(solid ? { fill: 'currentColor' } : line)} />
      <circle cx={x} cy={y} r={r * 0.38} fill={solid ? 'var(--color-canvas)' : 'none'} stroke={solid ? 'none' : 'currentColor'} strokeWidth={1.6} />
    </g>
  )
}
