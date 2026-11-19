import { Loader2, Minus, Plus } from 'lucide-react'
import { forwardRef, useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'

import { cx } from '../lib/cx'

export type Force = 'hover' | 'focus' | 'pressed'

/* ---------------------------------------------------------------- Buttons */

type Variant = 'primary' | 'secondary' | 'ghost' | 'blue'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white is-hover:bg-[#2c2c2c] is-pressed:bg-black',
  blue: 'bg-blue text-white is-hover:bg-[#23289a] is-pressed:bg-[#1c2080]',
  secondary: 'bg-paper text-ink border border-line-strong is-hover:bg-cream is-hover:border-[#c6bea8] is-pressed:bg-cream-deep',
  ghost: 'text-ink is-hover:bg-cream is-pressed:bg-cream-deep',
}
const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[14px] gap-1.5',
  md: 'h-12 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-[16px] gap-2',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cx(
    'inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-control font-semibold transition-[background-color,border-color,transform,box-shadow] duration-200',
    'is-pressed:scale-[0.97] is-focus:outline-[2.5px] is-focus:outline-offset-[3px] is-focus:outline-blue is-focus:outline',
    'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
    '[&_svg]:size-[18px]',
    variants[variant],
    sizes[size],
    className,
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean; force?: Force }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', loading, force, className, children, disabled, type = 'button', ...rest }, ref) {
  return (
    <button ref={ref} type={type} data-force={force} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonClass(variant, size, className)} {...rest}>
      {loading && <Loader2 aria-hidden className="animate-spin" />}
      {children}
    </button>
  )
})

export function ButtonLink({ variant = 'primary', size = 'md', className, force, ...rest }: LinkProps & { variant?: Variant; size?: Size; force?: Force }) {
  return <Link data-force={force} className={buttonClass(variant, size, className)} {...rest} />
}

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { label: string; size?: 'sm' | 'md'; force?: Force; badge?: number }>(function IconButton(
  { label, size = 'md', force, badge, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={badge ? `${label}, ${badge} ${badge === 1 ? 'item' : 'items'}` : label}
      title={label}
      data-force={force}
      className={cx(
        'round relative inline-flex shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200',
        'is-hover:bg-cream is-pressed:scale-95 is-pressed:bg-cream-deep is-focus:outline is-focus:outline-[2.5px] is-focus:outline-offset-2 is-focus:outline-blue disabled:opacity-40',
        size === 'md' ? 'size-11 [&_svg]:size-[22px]' : 'size-10 [&_svg]:size-[18px]',
        className,
      )}
      {...rest}
    >
      {children}
      {!!badge && (
        <span key={badge} aria-hidden className="round absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-red px-1 text-[11px] font-bold leading-none text-white">
          {badge}
        </span>
      )}
    </button>
  )
})

/* ------------------------------------------------------------ Chips/swatch */

export function Chip({ selected, force, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; force?: Force }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className={cx(
        'inline-flex h-10 items-center gap-2 rounded-chip border px-4 text-[14px] font-medium transition-colors duration-200',
        'is-focus:outline is-focus:outline-[2.5px] is-focus:outline-offset-2 is-focus:outline-blue is-pressed:scale-[0.97] disabled:opacity-45',
        selected ? 'border-ink bg-ink text-white' : 'border-line-strong bg-page text-ink is-hover:border-ink is-hover:bg-paper',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** A radio group of colour swatches. Arrow keys move between them. */
export function SwatchGroup({ label, options, value, onChange, force, size = 'md' }: { label: string; options: { id: string; name: string; hex: string }[]; value: string; onChange: (id: string) => void; force?: Force; size?: 'sm' | 'md' }) {
  const id = useId()
  const current = options.find((o) => o.id === value)
  return (
    <fieldset>
      <legend className="mb-2.5 text-[14px] font-semibold text-ink">
        {label}
        {current && <span className="font-normal text-muted">: {current.name}</span>}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label key={o.id} title={o.name} data-force={o.id === options[0].id ? force : undefined} className="group relative grid size-11 cursor-pointer place-items-center">
            <input type="radio" name={id} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="peer sr-only" aria-label={o.name} />
            <span
              aria-hidden
              className={cx(
                'round block rounded-full border border-black/10 shadow-[inset_0_-3px_0_rgb(0_0_0/0.12)] transition-transform duration-200 group-hover:scale-110',
                'peer-checked:ring-2 peer-checked:ring-ink peer-checked:ring-offset-[3px] peer-focus-visible:outline peer-focus-visible:outline-[2.5px] peer-focus-visible:outline-offset-[5px] peer-focus-visible:outline-blue',
                'group-data-[force=hover]:scale-110 group-data-[force=focus]:outline group-data-[force=focus]:outline-[2.5px] group-data-[force=focus]:outline-offset-[5px] group-data-[force=focus]:outline-blue',
                size === 'md' ? 'size-8' : 'size-6',
              )}
              style={{ backgroundColor: o.hex }}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/* ------------------------------------------------------------------ Fields */

const fieldBase =
  'w-full rounded-field border bg-page px-4 text-[16px] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200 is-hover:border-[#bfb7a0] focus:outline-none focus-visible:outline-none focus:border-blue focus:shadow-[0_0_0_3px_var(--color-blue-soft)] data-[force=focus]:border-blue data-[force=focus]:shadow-[0_0_0_3px_var(--color-blue-soft)] disabled:cursor-not-allowed disabled:bg-paper disabled:text-faint'

type FieldShell = { label: string; hint?: string; error?: string; force?: Force; optional?: boolean; counter?: string }

function Shell({ id, label, hint, error, counter, children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-semibold text-ink">
          {label}
        </label>
        {counter && <span className="text-[13px] text-muted tabular-nums">{counter}</span>}
      </div>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="mt-1.5 text-[14px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="mt-1.5 text-[14px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldShell>(function Input({ label, hint, error, force, counter, className, id: given, ...rest }, ref) {
  const auto = useId()
  const id = given ?? auto
  return (
    <Shell id={id} label={label} hint={hint} error={error} counter={counter}>
      <input
        ref={ref}
        id={id}
        data-force={force}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cx(fieldBase, 'h-12', error ? 'border-danger' : 'border-line-strong', className)}
        {...rest}
      />
    </Shell>
  )
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldShell>(function Textarea({ label, hint, error, force, counter, className, id: given, ...rest }, ref) {
  const auto = useId()
  const id = given ?? auto
  return (
    <Shell id={id} label={label} hint={hint} error={error} counter={counter}>
      <textarea
        ref={ref}
        id={id}
        data-force={force}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cx(fieldBase, 'min-h-32 resize-y py-3', error ? 'border-danger' : 'border-line-strong', className)}
        {...rest}
      />
    </Shell>
  )
})

export function Select({ label, hint, error, force, className, id: given, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & FieldShell) {
  const auto = useId()
  const id = given ?? auto
  return (
    <Shell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        data-force={force}
        aria-invalid={!!error || undefined}
        className={cx(fieldBase, 'h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%278%27%20fill=%27none%27%20stroke=%27%23141414%27%20stroke-width=%271.8%27%3E%3Cpath%20d=%27M1%201.5l5%205%205-5%27/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10', error ? 'border-danger' : 'border-line-strong', className)}
        {...rest}
      >
        {children}
      </select>
    </Shell>
  )
}

/** Compact select with a visually hidden label, for toolbars. */
export function InlineSelect({ label, className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        className={cx(
          'h-10 appearance-none rounded-control border border-line-strong bg-page pl-4 pr-9 text-[14px] font-medium text-ink transition-colors hover:border-ink focus:outline-none focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-offset-2 focus-visible:outline-blue',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg aria-hidden width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink">
        <path d="M1 1.5l5 5 5-5" />
      </svg>
    </label>
  )
}

export function Stepper({ value, onChange, min = 1, max, label, size = 'md' }: { value: number; onChange: (n: number) => void; min?: number; max: number; label: string; size?: 'sm' | 'md' }) {
  return (
    <div role="group" aria-label={label} className={cx('inline-flex items-center rounded-control border border-line-strong bg-page', size === 'md' ? 'h-12' : 'h-10')}>
      <IconButton label="Decrease quantity" size="sm" onClick={() => onChange(value - 1)} disabled={value <= min} className={size === 'md' ? 'ml-1' : 'ml-0'}>
        <Minus aria-hidden />
      </IconButton>
      <output aria-live="polite" className="w-7 text-center text-[15px] font-semibold tabular-nums text-ink">
        {value}
      </output>
      <IconButton label="Increase quantity" size="sm" onClick={() => onChange(value + 1)} disabled={value >= max} className={size === 'md' ? 'mr-1' : 'mr-0'}>
        <Plus aria-hidden />
      </IconButton>
    </div>
  )
}

/* ------------------------------------------------------------- Chat parts */

export function DateChip({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-8 items-center rounded-chip bg-page px-3.5 text-[14px] font-semibold text-ink shadow-bubble">{children}</span>
}

export function Bubble({ from, children, className }: { from: 'me' | 'them'; children: ReactNode; className?: string }) {
  return (
    <div className={cx('flex', from === 'me' ? 'justify-end' : 'justify-start', className)}>
      <p
        className={cx(
          'max-w-[82%] rounded-bubble px-4 py-2.5 text-[16px] leading-snug shadow-bubble',
          from === 'me' ? 'rounded-br-md bg-blue text-white' : 'rounded-bl-md bg-page text-ink',
        )}
      >
        {children}
      </p>
    </div>
  )
}

export function TypingDots({ label }: { label: string }) {
  return (
    <div className="flex justify-start" role="status" aria-label={label}>
      <span className="inline-flex h-10 items-center gap-1 rounded-bubble rounded-bl-md bg-page px-4 shadow-bubble">
        {[0, 1, 2].map((i) => (
          <span key={i} className="round size-1.5 animate-typing rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </span>
    </div>
  )
}

/* ---------------------------------------------------------------- Layout */

export function ScriptTitle({ as: Tag = 'h1', size = 'lg', className, children }: { as?: 'h1' | 'h2' | 'h3'; size?: 'xl' | 'lg' | 'md'; className?: string; children: ReactNode }) {
  return <Tag className={cx('font-script font-bold tracking-[-0.01em] text-ink', size === 'xl' ? 'text-[76px] leading-[0.86] sm:text-script-xl' : size === 'lg' ? 'text-[56px] leading-[0.95] sm:text-script-lg' : 'text-[40px] leading-none sm:text-script-md', className)}>{children}</Tag>
}

/** Hand-drawn knot used either side of the maker's signature. */
export function Knot({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={cx('h-10 w-14', flip && '-scale-x-100', className)}>
      <path d="M3 34c6-1 12-6 16-12" />
      <path d="M19 22c3-6 10-10 15-6s1 12-6 13-12-6-6-12 16-6 19 2-1 13-9 12" />
      <path d="M26 31c6 4 14 6 20 3s10-10 15-12" />
      <path d="M40 13c3-4 7-6 11-5M47 6l5 2-2 5" />
      <path d="M8 39l-4 3M12 41l-3 4" />
    </svg>
  )
}

export function Signature({ name, className }: { name: string; className?: string }) {
  return (
    <p className={cx('flex items-center justify-center gap-3 font-hand text-[26px] tracking-[0.06em] text-ink sm:text-[30px]', className)}>
      <Knot />
      <span>{name}</span>
      <Knot flip />
    </p>
  )
}

/** The maker's mark: a little stitched loop, drawn in the brand blue. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={cx('size-6', className)}>
      <path d="M5 9c2-4 6-5 9-3s3 7 0 9-7 0-6-3" />
      <path d="M14 15c3 3 8 3 9-1" />
      <path d="M4 18c2 3 5 5 9 5" strokeDasharray="2.5 3.2" />
      <path d="M21 4c1 2 1 4 0 6" />
    </svg>
  )
}

export function EmptyState({ title, body, children, icon }: { title: string; body: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="doodle-bg flex flex-col items-center rounded-panel px-6 py-14 text-center">
      {icon && <div className="mb-3 text-tan-text [&_svg]:size-9">{icon}</div>}
      <h2 className="font-script text-[40px] font-bold leading-none text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-body">{body}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}

export function Notice({ tone = 'info', children, id }: { tone?: 'info' | 'error' | 'success'; children: ReactNode; id?: string }) {
  return (
    <div id={id} role={tone === 'error' ? 'alert' : 'status'} className={cx('rounded-field px-4 py-3 text-[15px]', tone === 'error' ? 'bg-danger-soft text-danger' : tone === 'success' ? 'bg-success-soft text-success' : 'bg-cream text-body')}>
      {children}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('animate-pulse rounded-card bg-cream', className)} />
}
