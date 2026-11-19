import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'

import { cx } from '../lib/cx'
import type { Force } from './Button'

const control =
  'w-full rounded-[var(--radius-md)] border-[2.5px] border-ink bg-white px-4 text-[1rem] font-semibold text-ink placeholder:text-pencil transition-[box-shadow,border-color] duration-[var(--duration-fast)] hover:shadow-[var(--shadow-offset-sm)] focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink data-[force=hover]:shadow-[var(--shadow-offset-sm)] data-[force=focus]:outline-3 data-[force=focus]:outline-offset-2 disabled:border-pencil disabled:bg-paper disabled:text-graphite aria-invalid:border-alert aria-invalid:shadow-[0_3px_0_0_var(--color-alert)]'

type Common = { label: string; hint?: string; error?: string; force?: Force }

function Wrap({ id, label, hint, error, children }: Common & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.875rem] font-extrabold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-e`} className="text-[0.8125rem] font-bold text-alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-h`} className="text-[0.8125rem] text-graphite">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({ label, hint, error, force, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <Wrap id={id} label={label} hint={hint} error={error}>
      <input id={id} data-force={force} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} className={cx(control, 'h-12', className)} {...rest} />
    </Wrap>
  )
}

export function TextArea({ label, hint, error, force, className, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Wrap id={id} label={label} hint={hint} error={error}>
      <textarea id={id} data-force={force} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} className={cx(control, 'min-h-28 py-3 leading-relaxed', className)} {...rest} />
    </Wrap>
  )
}

/** A radio group drawn as chips. */
export function ChoiceGroup({ label, name, options, value, onChange, error }: { label: string; name: string; options: ReadonlyArray<{ id: string; label: string }>; value: string; onChange: (v: string) => void; error?: string }) {
  const id = useId()
  return (
    <fieldset className="flex flex-col gap-1.5" aria-describedby={error ? `${id}-e` : undefined}>
      <legend className="mb-1.5 text-[0.875rem] font-extrabold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="relative">
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="peer absolute inset-0 cursor-pointer opacity-0" />
            <span className="round inline-flex h-10 items-center rounded-full border-2 border-ink bg-card px-4 text-[0.875rem] font-extrabold transition-colors peer-checked:bg-ink peer-checked:text-white peer-hover:bg-paper-2 peer-checked:peer-hover:bg-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-e`} className="text-[0.8125rem] font-bold text-alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
