import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

import { cx } from '../lib/cx'
import type { Force } from './Button'

/** The thick-outlined sketchbook frame the home screen sits in. */
export function Frame({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('paper-grain relative overflow-hidden rounded-[var(--radius-frame)] border-[4px] border-ink', className)} {...rest}>
      {children}
    </div>
  )
}

/** A raised paper card with an ink outline. `interactive` adds the lift on hover. */
export function Card({ className, interactive, force, children, ...rest }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean; force?: Force }) {
  return (
    <div
      data-force={force}
      className={cx(
        'relative rounded-[var(--radius-lg)] border-[2.5px] border-ink bg-card shadow-[var(--shadow-offset)]',
        interactive && 'transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_9px_0_0_var(--color-ink)] focus-within:-translate-y-1 data-[force=hover]:-translate-y-1 data-[force=hover]:shadow-[0_9px_0_0_var(--color-ink)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/** A toggle chip for filters and single choices. */
export function Chip({ active, className, force, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; force?: Force }) {
  return (
    <button
      type="button"
      data-force={force}
      aria-pressed={active}
      className={cx(
        'round inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-ink px-4 text-[0.875rem] font-extrabold transition-[background-color,color,transform] duration-[var(--duration-fast)] active:translate-y-px disabled:opacity-45 data-[force=pressed]:translate-y-px data-[force=focus]:outline-3 data-[force=focus]:outline-offset-3 data-[force=focus]:outline-ink',
        active ? 'bg-ink text-white' : 'bg-card text-ink hover:bg-paper-2 data-[force=hover]:bg-paper-2',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Tag({ children, tone = 'paper', className }: { children: ReactNode; tone?: 'paper' | 'ink' | 'butter'; className?: string }) {
  return (
    <span
      className={cx(
        'round inline-flex h-7 items-center rounded-full border-2 border-ink px-2.5 text-[0.75rem] font-extrabold',
        tone === 'paper' && 'bg-card text-ink',
        tone === 'ink' && 'bg-ink text-white',
        tone === 'butter' && 'bg-butter text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-grid h-7 min-w-7 place-items-center rounded-[8px] border-2 border-b-4 border-ink bg-card px-1.5 font-sans text-[0.75rem] font-black text-ink">{children}</kbd>
}

/** A score-style number with a label. */
export function Stat({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className={cx('min-w-0', className)}>
      <div className="text-[0.75rem] font-extrabold text-graphite">{label}</div>
      <div className="font-display text-[2rem] leading-none font-black tabular-nums">{value}</div>
    </div>
  )
}

export function PageHeader({ title, intro, children, className }: { title: string; intro?: string; children?: ReactNode; className?: string }) {
  return (
    <header className={cx('mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <h1 className="font-display text-[3.25rem] leading-[0.92] font-black tracking-[-0.01em] md:text-[5rem]">{title}</h1>
        {intro && <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite md:text-[1.1875rem]">{intro}</p>}
      </div>
      {children}
    </header>
  )
}

export function SectionTitle({ children, as: As = 'h2', className }: { children: ReactNode; as?: 'h2' | 'h3'; className?: string }) {
  return <As className={cx('font-display text-[2.25rem] leading-[0.95] font-black md:text-[2.75rem]', className)}>{children}</As>
}

/** Page content column with the shared side gutters. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border-2 border-dashed border-pencil px-6 py-12 text-center">
      <p className="font-display text-[1.75rem] leading-none font-black">{title}</p>
      {children && <p className="max-w-md text-graphite">{children}</p>}
      {action}
    </div>
  )
}

/** A skeleton block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cx('animate-pulse rounded-[var(--radius-md)] bg-paper-2', className)} />
}
