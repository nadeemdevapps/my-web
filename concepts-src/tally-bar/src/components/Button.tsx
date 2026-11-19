import { LoaderCircle } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, NavLink, type LinkProps } from 'react-router'

import { cx } from '../lib/cx'

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type Force = 'hover' | 'focus' | 'pressed'

// `force` pins a state for the style guide; each hover/active class is
// mirrored under data-[force=…].
const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-sans font-normal transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] active:scale-[0.98] data-[force=pressed]:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-orange-ink text-white shadow-[var(--shadow-button)] hover:bg-orange-deep data-[force=hover]:bg-orange-deep active:bg-[#8a2d08] data-[force=pressed]:bg-[#8a2d08]',
  dark: 'bg-ink text-white hover:bg-ink-2 data-[force=hover]:bg-ink-2 active:bg-black data-[force=pressed]:bg-black',
  outline:
    'border border-line-strong bg-surface/60 text-ink hover:border-ink hover:bg-surface data-[force=hover]:border-ink data-[force=hover]:bg-surface active:bg-canvas-2 data-[force=pressed]:bg-canvas-2',
  ghost: 'text-ink hover:bg-ink/6 data-[force=hover]:bg-ink/6 active:bg-ink/10 data-[force=pressed]:bg-ink/10',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[15px]',
  md: 'h-12 px-6 text-base',
  lg: 'h-[72px] min-w-[200px] px-10 text-xl',
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cx(base, variants[variant], sizes[size], className)
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; icon?: ReactNode; iconRight?: ReactNode; force?: Force }

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  force,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button type={type} data-force={force} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'md', icon, iconRight, force, className, children, ...rest }: Common & LinkProps) {
  return (
    <Link data-force={force} className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </Link>
  )
}

/** Square icon-only button. Always pass an aria-label. */
export function IconButton({
  className,
  tone = 'plain',
  force,
  badge,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'plain' | 'outline' | 'dark'; force?: Force; badge?: number; 'aria-label': string }) {
  return (
    <button
      type="button"
      data-force={force}
      className={cx(
        'relative inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-[background-color,color,transform,border-color] duration-[var(--duration-fast)] active:scale-95 data-[force=pressed]:scale-95 disabled:pointer-events-none disabled:opacity-40',
        tone === 'plain' && 'text-ink hover:bg-ink/7 data-[force=hover]:bg-ink/7',
        tone === 'outline' && 'border border-line-strong bg-surface text-ink hover:border-ink data-[force=hover]:border-ink',
        tone === 'dark' && 'bg-ink text-white hover:bg-ink-2 data-[force=hover]:bg-ink-2',
        className,
      )}
      {...rest}
    >
      {children}
      {badge ? (
        <span className="round absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-ink px-1 text-[11px] font-medium text-white tabular">{badge}</span>
      ) : null}
    </button>
  )
}

const textLink =
  'rounded-[var(--radius-xs)] text-muted link-underline decoration-ink/35 transition-colors duration-[var(--duration-fast)] hover:text-ink hover:decoration-ink data-[force=hover]:text-ink data-[force=hover]:decoration-ink'

/** Underlined text link, the nav style from the hero. */
export function TextLink({ className, force, ...rest }: LinkProps & { force?: Force }) {
  return <Link data-force={force} className={cx(textLink, className)} {...rest} />
}

/** Nav item: underlined until it is the current page, as in the reference. */
export function NavItem({ className, ...rest }: Omit<LinkProps, 'className'> & { className?: string; end?: boolean }) {
  return (
    <NavLink
      className={({ isActive }) => cx(textLink, isActive && 'text-ink no-underline hover:no-underline', className)}
      {...rest}
    />
  )
}

export function ExternalLink({ className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx(textLink, className)} target="_blank" rel="noreferrer" {...rest} />
}
