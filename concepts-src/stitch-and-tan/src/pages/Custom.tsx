import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'

import { Bubble, Button, Chip, DateChip, Input, Notice, ScriptTitle, SwatchGroup, Textarea } from '../components/ui'
import { custom as copy, leathers, threads } from '../content'
import { post } from '../lib/api'
import { usePersistent } from '../lib/persist'
import { useStore } from '../lib/store'
import { useTitle } from '../lib/title'

type Draft = { kind: string; holds: string; size: string; leather: string; thread: string; budget: string; deadline: string; name: string; email: string; notes: string }
const blank: Draft = { kind: '', holds: '', size: '', leather: 'tan', thread: 'cream', budget: '', deadline: '', name: '', email: '', notes: '' }
const isDraft = (v: unknown): v is Draft => !!v && typeof v === 'object' && 'holds' in v
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(d: Draft) {
  const e: Partial<Record<keyof Draft, string>> = {}
  if (!d.kind) e.kind = 'Pick what I should make.'
  if (d.holds.trim().length < 3) e.holds = 'Tell me what it will hold.'
  if (!d.budget) e.budget = 'Pick a budget.'
  if (d.name.trim().length < 2) e.name = 'Tell me your name.'
  if (!EMAIL.test(d.email.trim())) e.email = 'Enter a valid email address.'
  if (d.notes.length > 600) e.notes = 'Keep notes under 600 characters.'
  if (d.deadline && Date.parse(d.deadline) < Date.now() + 14 * 864e5) e.deadline = 'Give me at least two weeks.'
  return e
}

function ChipField({ legend, error, id, children }: { legend: string; error?: string; id: string; children: ReactNode }) {
  return (
    <fieldset id={id} aria-describedby={error ? `${id}-err` : undefined} tabIndex={-1} className="outline-none">
      <legend className="mb-2.5 text-[14px] font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[14px] text-danger">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export function Custom() {
  useTitle('Custom orders')
  const [params] = useSearchParams()
  const [draft, setDraft] = usePersistent<Draft>('stitch-tan-custom-draft', blank, isDraft)
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({})
  const [status, setStatus] = useState<{ s: 'idle' | 'sending' } | { s: 'error'; message: string } | { s: 'done'; reference: string; name: string }>({ s: 'idle' })
  const { requests, addRequest } = useStore()
  const summary = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const [focusSummary, setFocusSummary] = useState(0)
  useEffect(() => {
    if (focusSummary) summary.current?.focus()
  }, [focusSummary])

  useEffect(() => {
    const kind = params.get('kind')
    const holds = params.get('holds')
    if (kind || holds) setDraft((d) => ({ ...d, kind: kind && copy.fields.kinds.includes(kind) ? kind : d.kind, holds: holds ? `Like the ${holds.toLowerCase()}` : d.holds }))
  }, [params, setDraft])

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDraft((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(draft)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus({ s: 'idle' })
      setFocusSummary((n) => n + 1)
      return
    }
    setStatus({ s: 'sending' })
    const res = await post('/api/custom-orders', draft)
    if (res.ok && res.reference) {
      addRequest({ reference: res.reference, createdAt: new Date().toISOString(), kind: draft.kind, holds: draft.holds })
      setStatus({ s: 'done', reference: res.reference, name: draft.name.trim() })
      setDraft(blank)
      window.setTimeout(() => doneRef.current?.focus(), 50)
    } else if (!res.ok && res.fields) {
      setErrors(res.fields as typeof errors)
      setStatus({ s: 'idle' })
      setFocusSummary((n) => n + 1)
    } else {
      setStatus({ s: 'error', message: copy.networkError })
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Draft, string][]
  const f = copy.fields
  const minDate = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10)

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-14 sm:px-6 sm:pt-20">
      <header className="mx-auto max-w-[620px] text-center">
        <ScriptTitle>{copy.title}</ScriptTitle>
        <p className="mt-4 text-[18px] text-body">{copy.body}</p>
        <ol className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {copy.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 rounded-card bg-paper px-4 py-3">
              <span aria-hidden className="round grid size-9 shrink-0 place-items-center rounded-full bg-cream font-hand text-[18px] text-ink">
                {i + 1}
              </span>
              <span className="text-[15px] font-medium text-ink">{s}</span>
            </li>
          ))}
        </ol>
      </header>

      <div className="mx-auto mt-12 max-w-[680px]">
        {status.s === 'done' ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="doodle-bg rounded-panel px-5 py-8 sm:px-8">
            <div className="text-center">
              <DateChip>Today</DateChip>
            </div>
            <div className="mt-5 space-y-2">
              <Bubble from="them">Sent you a custom request!</Bubble>
              <Bubble from="me">{copy.successBody(status.name)}</Bubble>
            </div>
            <div className="mt-8 flex flex-col items-center rounded-card bg-page/85 px-5 py-6 text-center" role="status">
              <CheckCircle2 aria-hidden className="size-10 animate-pop text-green" strokeWidth={1.6} />
              <h2 ref={doneRef} tabIndex={-1} className="mt-2 font-script text-[40px] font-bold leading-none text-ink outline-none">
                {copy.successTitle}
              </h2>
              <p className="mt-2 text-body">
                Reference <strong className="font-semibold text-ink">{status.reference}</strong>
              </p>
              <Button variant="secondary" className="mt-5" onClick={() => setStatus({ s: 'idle' })}>
                {copy.another}
              </Button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-8 rounded-panel border border-line bg-page p-5 shadow-card sm:p-9">
            {errorList.length > 0 && (
              <div ref={summary} tabIndex={-1} className="outline-none">
                <Notice tone="error">
                  <p className="font-semibold">{copy.errorSummary}</p>
                  <ul className="mt-1 list-disc pl-5">
                    {errorList.map(([k, v]) => (
                      <li key={k}>
                        <a className="underline underline-offset-2" href={`#f-${k}`}>
                          {v}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Notice>
              </div>
            )}
            <ChipField legend={f.kind} error={errors.kind} id="f-kind">
              {f.kinds.map((k) => (
                <Chip key={k} selected={draft.kind === k} onClick={() => set('kind', k)}>
                  {k}
                </Chip>
              ))}
            </ChipField>
            <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
              <Input id="f-holds" label={f.holds} placeholder={f.holdsHint} value={draft.holds} onChange={(e) => set('holds', e.target.value)} error={errors.holds} />
              <Input id="f-size" label={f.size} placeholder="12 × 9 × 6" hint={f.sizeHint} value={draft.size} onChange={(e) => set('size', e.target.value)} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <SwatchGroup label={f.leather} options={leathers} value={draft.leather} onChange={(v) => set('leather', v)} size="sm" />
              <SwatchGroup label={f.thread} options={threads} value={draft.thread} onChange={(v) => set('thread', v)} size="sm" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <ChipField legend={f.budget} error={errors.budget} id="f-budget">
                {f.budgets.map((b) => (
                  <Chip key={b} selected={draft.budget === b} onClick={() => set('budget', b)}>
                    {b}
                  </Chip>
                ))}
              </ChipField>
              <Input id="f-deadline" type="date" min={minDate} label={f.deadline} hint={f.deadlineHint} value={draft.deadline} onChange={(e) => set('deadline', e.target.value)} error={errors.deadline} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="f-name" label={f.name} autoComplete="name" value={draft.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
              <Input id="f-email" label={f.email} type="email" autoComplete="email" value={draft.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
            </div>
            <Textarea id="f-notes" label={f.notes} placeholder={f.notesHint} value={draft.notes} onChange={(e) => set('notes', e.target.value)} error={errors.notes} counter={`${draft.notes.length}/600`} />
            {status.s === 'error' && <Notice tone="error">{status.message}</Notice>}
            <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
              <p className="text-[14px] text-muted">{copy.draftSaved}</p>
              <Button type="submit" variant="blue" size="lg" loading={status.s === 'sending'}>
                {status.s === 'sending' ? copy.sending : copy.submit} {status.s !== 'sending' && <ArrowRight aria-hidden />}
              </Button>
            </div>
          </form>
        )}

        {requests.length > 0 && (
          <section aria-labelledby="history" className="mt-12">
            <h2 id="history" className="text-[16px] font-semibold text-ink">
              {copy.history}
            </h2>
            <ul className="mt-3 divide-y divide-line rounded-card border border-line">
              {requests.map((r) => (
                <li key={r.reference} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5">
                  <span className="text-ink">
                    <strong className="font-semibold">{r.kind}</strong> <span className="text-body">for {r.holds}</span>
                  </span>
                  <span className="text-[14px] text-muted tabular-nums">
                    {r.reference}, {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
