import { ChevronDown } from 'lucide-react'
import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

import { cx } from '../lib/cx'

const control =
  'w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface px-4 text-[16px] text-ink placeholder:text-[#75757b] transition-[border-color,box-shadow] duration-[var(--duration-fast)] hover:border-ink/40 focus:border-ink focus:shadow-[var(--shadow-focus)] focus:outline-none focus-visible:outline-none data-[force=focus]:border-ink data-[force=focus]:shadow-[var(--shadow-focus)] data-[force=focus]:outline-none disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted aria-[invalid=true]:border-danger'

type FieldProps = {
  label: string
  hint?: string
  error?: string
  optional?: boolean
  className?: string
  children: (props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => ReactNode
}

/** Label + control + hint/error, wired for screen readers. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { 'data-force'?: string }) {
  return <input className={cx(control, 'h-12', className)} {...rest} />
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, 'min-h-28 resize-y py-3 leading-relaxed', className)} {...rest} />
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cx(control, 'h-12 appearance-none pr-10', className)} {...rest}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  )
}

/** A checkbox or radio with its label, sized as a 44px tap target. */
export function Check({ label, hint, className, type = 'checkbox', ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; hint?: ReactNode }) {
  return (
    <label className={cx('flex min-h-11 items-start gap-3 py-2 text-[15px] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50', className)}>
      <input type={type} className="mt-0.5 size-5 shrink-0 accent-[var(--color-orange-ink)]" {...rest} />
      <span className="flex-1">
        {label}
        {hint && <span className="block text-sm text-muted">{hint}</span>}
      </span>
    </label>
  )
}

/** Form-level status line: error summary or success. */
export function FormMessage({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx(
        'rounded-[var(--radius-sm)] border px-4 py-3 text-[15px]',
        tone === 'error' ? 'border-danger/30 bg-danger-soft text-danger' : 'border-success/30 bg-success-soft text-success',
      )}
    >
      {children}
    </p>
  )
}
