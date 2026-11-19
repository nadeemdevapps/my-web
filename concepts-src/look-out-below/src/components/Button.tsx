import { LoaderCircle } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

import { cx } from '../lib/cx'

export type Variant = 'ink' | 'paper' | 'ghost' | 'danger'
export type Size = 'sm' | 'md' | 'lg'
export type Force = 'hover' | 'focus' | 'pressed'

// The chunky sticker button: a thick ink outline and an offset ink shadow that
// the button sinks into when pressed. `data-force` pins a state for the style guide.
const base =
  'round relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border-[2.5px] font-sans font-black tracking-[0.01em] transition-[transform,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none data-[force=focus]:outline-3 data-[force=focus]:outline-offset-3 data-[force=focus]:outline-ink'

const lift =
  'shadow-[var(--shadow-offset)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_0_var(--color-ink)] data-[force=hover]:-translate-y-0.5 data-[force=hover]:shadow-[0_7px_0_0_var(--color-ink)] active:translate-y-[4px] active:shadow-[0_1px_0_0_var(--color-ink)] data-[force=pressed]:translate-y-[4px] data-[force=pressed]:shadow-[0_1px_0_0_var(--color-ink)]'

export const variants: Record<Variant, string> = {
  ink: cx('border-ink bg-ink text-white', lift),
  paper: cx('border-ink bg-card text-ink hover:bg-white data-[force=hover]:bg-white', lift),
  ghost: 'border-transparent bg-transparent text-ink hover:bg-ink/6 data-[force=hover]:bg-ink/6 active:bg-ink/10 data-[force=pressed]:bg-ink/10',
  danger: cx('border-alert bg-card text-alert', 'shadow-[0_5px_0_0_var(--color-alert)] active:translate-y-[4px] active:shadow-[0_1px_0_0_var(--color-alert)] data-[force=pressed]:translate-y-[4px] hover:bg-white data-[force=hover]:bg-white'),
}

export const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.875rem]',
  md: 'h-12 px-6 text-[1rem]',
  lg: 'h-[52px] min-w-[150px] px-8 text-[1.0625rem]',
}

type Extra = { variant?: Variant; size?: Size; icon?: ReactNode; force?: Force }
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Extra & { loading?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'ink', size = 'md', loading, icon, className, children, disabled, force, type = 'button', ...rest }, ref) {
  return (
    <button ref={ref} type={type} data-force={force} disabled={disabled || loading} aria-busy={loading || undefined} className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : icon}
      {children}
    </button>
  )
})

export function ButtonLink({ variant = 'ink', size = 'md', className, children, icon, force, ...rest }: LinkProps & Extra) {
  return (
    <Link data-force={force} className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </Link>
  )
}

/** A plain anchor styled as a button, for downloads and external links. */
export function ButtonAnchor({ variant = 'paper', size = 'sm', className, children, icon, force, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & Extra) {
  return (
    <a data-force={force} className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </a>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-label': string; tone?: 'paper' | 'ink' | 'ghost'; force?: Force; size?: 'md' | 'lg' }

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ className, tone = 'paper', force, size = 'md', type = 'button', ...rest }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      data-force={force}
      className={cx(
        'round inline-grid shrink-0 place-items-center rounded-full border-[2.5px] transition-[transform,box-shadow,background-color] duration-[var(--duration-fast)] disabled:opacity-40 data-[force=focus]:outline-3 data-[force=focus]:outline-offset-3 data-[force=focus]:outline-ink',
        size === 'md' ? 'size-11' : 'size-14',
        tone === 'paper' && 'border-ink bg-card text-ink shadow-[var(--shadow-offset-sm)] hover:bg-white active:translate-y-[2px] active:shadow-none data-[force=hover]:bg-white data-[force=pressed]:translate-y-[2px] data-[force=pressed]:shadow-none',
        tone === 'ink' && 'border-ink bg-ink text-white shadow-[var(--shadow-offset-sm)] active:translate-y-[2px] active:shadow-none data-[force=pressed]:translate-y-[2px] data-[force=pressed]:shadow-none',
        tone === 'ghost' && 'border-transparent text-ink hover:bg-ink/6 active:bg-ink/10 data-[force=hover]:bg-ink/6 data-[force=pressed]:bg-ink/10',
        className,
      )}
      {...rest}
    />
  )
})
