import { Check, ChevronDown, Copy, Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'

import { cx } from '../lib/cx'
import { formatMoney } from '../lib/format'
import type { Force } from './Button'

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rounded-[var(--radius-lg)] border border-line bg-surface', className)} {...rest} />
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-[15px] text-muted', className)}>{children}</p>
}

export function SectionHeading({ eyebrow, title, body, className, id }: { eyebrow?: string; title: string; body?: ReactNode; className?: string; id?: string }) {
  return (
    <div className={cx('max-w-2xl', className)}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 id={id} className="font-display text-[clamp(1.875rem,1.2rem+1.9vw,2.875rem)] text-balance">
        {title}
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{body}</p>}
    </div>
  )
}

export function PageHeader({ eyebrow, title, body, children }: { eyebrow?: string; title: string; body?: ReactNode; children?: ReactNode }) {
  return (
    <header className="container-page pt-32 pb-10 md:pt-40 md:pb-14">
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h1 className="font-display text-display text-balance">{title}</h1>
      {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{body}</p>}
      {children}
    </header>
  )
}

const badgeTones = {
  neutral: 'bg-canvas-2 text-ink-2',
  orange: 'bg-orange-soft text-orange-deep',
  success: 'bg-success-soft text-success',
  dark: 'bg-ink text-white',
}

export function Badge({ tone = 'neutral', children, className }: { tone?: keyof typeof badgeTones; children: ReactNode; className?: string }) {
  return <span className={cx('inline-flex h-6 items-center gap-1 rounded-[var(--radius-xs)] px-2 text-[13px] font-medium', badgeTones[tone], className)}>{children}</span>
}

/** Toggle chip for filters. */
export function Chip({ selected, children, force, className, ...rest }: { selected?: boolean; force?: Force } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className={cx(
        'inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] border px-4 text-[15px] transition-[background-color,border-color,color] duration-[var(--duration-fast)] disabled:pointer-events-none disabled:opacity-45',
        selected ? 'border-ink bg-ink text-white' : 'border-line-strong bg-surface text-ink hover:border-ink data-[force=hover]:border-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Radio group drawn as a segmented control. */
export function Segmented<T extends string>({ label, options, value, onChange, className }: { label: string; options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; className?: string }) {
  const name = useId()
  return (
    <fieldset className={cx('inline-flex rounded-[var(--radius-sm)] border border-line-strong bg-surface p-1', className)}>
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <label
          key={o.value}
          className={cx(
            'relative inline-flex h-10 min-w-12 cursor-pointer items-center justify-center rounded-[var(--radius-xs)] px-4 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange-ink',
            value === o.value ? 'bg-ink text-white' : 'text-ink hover:bg-ink/6',
          )}
        >
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
          {o.label}
        </label>
      ))}
    </fieldset>
  )
}

export type Swatch = { id: string; name: string; hex: string; note?: string }

/** Colour radios as round swatches with the chosen name beside the legend. */
export function SwatchPicker({ label, swatches, value, onChange, size = 'md', glow = false }: { label: string; swatches: readonly Swatch[]; value: string; onChange: (id: string) => void; size?: 'sm' | 'md'; glow?: boolean }) {
  const name = useId()
  const current = swatches.find((s) => s.id === value)
  return (
    <fieldset>
      <legend className="mb-3 flex w-full items-baseline gap-2 text-[15px]">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">{current?.name}</span>
        {current?.note && <span className="ml-auto text-sm text-muted">{current.note}</span>}
      </legend>
      <div className="flex flex-wrap gap-3">
        {swatches.map((s) => (
          <label
            key={s.id}
            title={s.name}
            className={cx(
              'round relative grid cursor-pointer place-items-center rounded-full border-2 transition-[border-color,transform] duration-[var(--duration-fast)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange-ink',
              size === 'md' ? 'size-12' : 'size-10',
              value === s.id ? 'border-ink' : 'border-transparent hover:border-line-strong',
            )}
          >
            <input type="radio" name={name} value={s.id} checked={value === s.id} onChange={() => onChange(s.id)} className="sr-only" aria-label={s.name} />
            <span
              className={cx('round block rounded-full border border-black/10', size === 'md' ? 'size-9' : 'size-7')}
              style={{ background: s.hex, boxShadow: glow ? `0 0 10px ${s.hex}, inset 0 0 0 3px #111` : undefined }}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function QuantityStepper({ value, onChange, min = 1, max = 5, label = 'Quantity' }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label?: string }) {
  return (
    <div role="group" aria-label={label} className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-line-strong bg-surface">
      <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="grid h-full w-11 place-items-center rounded-l-[var(--radius-sm)] hover:bg-ink/6 disabled:opacity-35">
        <Minus className="size-4" aria-hidden />
      </button>
      <output aria-live="polite" className="w-8 text-center tabular">{value}</output>
      <button type="button" aria-label={`Increase ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="grid h-full w-11 place-items-center rounded-r-[var(--radius-sm)] hover:bg-ink/6 disabled:opacity-35">
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  )
}

export function Accordion({ items, defaultOpen }: { items: { id: string; q: string; a: ReactNode }[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={`${item.id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-a`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 rounded-[var(--radius-xs)] py-5 text-left text-lg text-ink hover:text-orange-deep"
              >
                {item.q}
                <ChevronDown className={cx('size-5 shrink-0 text-muted transition-transform duration-[var(--duration-base)]', isOpen && 'rotate-180')} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-a`}
                  role="region"
                  aria-labelledby={`${item.id}-q`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export function EmptyState({ icon, title, body, action }: { icon?: ReactNode; title: string; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-line-strong px-6 py-14 text-center">
      {icon && <div className="mb-4 text-faint">{icon}</div>}
      <p className="text-xl text-ink">{title}</p>
      {body && <p className="mt-2 max-w-sm text-muted">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('skeleton rounded-[var(--radius-sm)]', className)} />
}

export function Price({ value, className }: { value: number; className?: string }) {
  return <span className={cx('tabular', className)}>{formatMoney(value)}</span>
}

/** A label/value list, used for specs and order summaries. */
export function SpecRows({ rows, className }: { rows: readonly (readonly [string, ReactNode])[]; className?: string }) {
  return (
    <dl className={cx('divide-y divide-line', className)}>
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
          <dt className="text-muted">{k}</dt>
          <dd className="text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** One cell of the feature strip under the hero. */
export function FeatureCell({ icon, title, body, className }: { icon: ReactNode; title: string; body: string; className?: string }) {
  return (
    <div className={cx('flex gap-6 px-4 py-6 md:px-8 lg:py-8 xl:px-[6.5%]', className)}>
      <div className="shrink-0 text-[#8a8a90]" aria-hidden>
        {icon}
      </div>
      <div>
        <h3 className="text-[19px] leading-snug text-ink-2 xl:text-xl">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted xl:text-base">{body}</p>
      </div>
    </div>
  )
}

/** Dark code sample with a copy button. */
export function CodeBlock({ code, label = 'Code sample', className }: { code: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div className={cx('on-dark relative overflow-hidden rounded-[var(--radius-md)] bg-ink text-[#e9e9ec]', className)}>
      <div className="flex items-center justify-between border-b border-white/10 py-1.5 pr-1.5 pl-4 text-sm text-[#b4b4ba]">
        <span>{label}</span>
        <button type="button" onClick={copy} className="inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-xs)] px-3 text-[#e9e9ec] hover:bg-white/10">
          {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre tabIndex={0} aria-label={label} className="overflow-x-auto p-4 font-mono text-[13.5px] leading-relaxed sm:p-5">
        <code>{code}</code>
      </pre>
    </div>
  )
}
