import { Download, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

import { Button, ButtonAnchor } from '../components/Button'
import { Doodler } from '../components/Doodle'
import { ChoiceGroup, TextArea, TextField } from '../components/Field'
import { Card, Container, Frame, PageHeader, SectionTitle } from '../components/UI'
import { Wordmark } from '../components/Wordmark'
import { IMAGES, press } from '../content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Fields = Partial<Record<'name' | 'email' | 'outlet' | 'kind', string>>
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: { name: string; email: string; outlet: string; kind: string }): Fields {
  const f: Fields = {}
  if (v.name.trim().length < 2) f.name = 'Tell us your name.'
  if (!EMAIL_RE.test(v.email.trim())) f.email = 'Enter a valid email address.'
  if (v.outlet.trim().length < 2) f.outlet = 'Where will you cover the game?'
  if (!v.kind) f.kind = 'Pick what you do.'
  return f
}

function KeyRequest() {
  const f = press.form
  const [v, setV] = useState({ name: '', email: '', outlet: '', kind: '', message: '' })
  const [errors, setErrors] = useState<Fields>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [focusTick, setFocusTick] = useState(0)
  useEffect(() => {
    if (focusTick) formRef.current?.querySelector<HTMLElement>('[aria-invalid=true], fieldset[aria-describedby] input')?.focus()
  }, [focusTick])
  const set = (k: keyof typeof v) => (val: string) => {
    setV((s) => ({ ...s, [k]: val }))
    if (errors[k as keyof Fields]) setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const local = validate(v)
    setErrors(local)
    if (Object.keys(local).length) {
      setStatus('error')
      setMessage('Check the highlighted fields.')
      setFocusTick((n) => n + 1)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/press-request', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(v) })
      const data = (await res.json()) as { ok?: boolean; ref?: string; error?: string; fields?: Fields }
      if (!res.ok) {
        setErrors(data.fields ?? {})
        setFocusTick((n) => n + 1)
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
        return
      }
      setStatus('done')
      setMessage(f.success(data.ref ?? ''))
    } catch {
      setStatus('error')
      setMessage(f.networkError)
    }
  }
  if (status === 'done') {
    return (
      <div className="flex flex-col items-start gap-4" role="status">
        <Doodler size={48} hat="top" waddle boil />
        <p className="text-[1.0625rem] font-bold">{message}</p>
        <Button
          variant="paper"
          onClick={() => {
            setV({ name: '', email: '', outlet: '', kind: '', message: '' })
            setStatus('idle')
          }}
        >
          {f.another}
        </Button>
      </div>
    )
  }
  return (
    <form ref={formRef} noValidate onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={f.name} name="name" autoComplete="name" value={v.name} onChange={(e) => set('name')(e.target.value)} error={errors.name} />
        <TextField label={f.email} name="email" type="email" autoComplete="email" value={v.email} onChange={(e) => set('email')(e.target.value)} error={errors.email} />
      </div>
      <TextField label={f.outlet} name="outlet" hint={f.outletHint} value={v.outlet} onChange={(e) => set('outlet')(e.target.value)} error={errors.outlet} />
      <ChoiceGroup label={f.kind} name="kind" options={f.kinds} value={v.kind} onChange={set('kind')} error={errors.kind} />
      <TextArea label={f.message} name="message" value={v.message} onChange={(e) => set('message')(e.target.value)} />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" loading={status === 'sending'} icon={<Send className="size-4" strokeWidth={2.75} />}>
          {status === 'sending' ? f.sending : f.submit}
        </Button>
        {status === 'error' && (
          <p role="alert" className="text-[0.9375rem] font-bold text-alert">
            {message}
          </p>
        )}
      </div>
    </form>
  )
}

export function Press() {
  useDocumentTitle(press.title)
  return (
    <Container>
      <PageHeader title={press.title} intro={press.intro} />
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <Card className="p-6">
            <h2 className="font-display text-[1.75rem] leading-none font-black">{press.factsTitle}</h2>
            <dl className="mt-4 flex flex-col divide-y-2 divide-ink/10">
              {press.facts.map((f) => (
                <div key={f.k} className="py-2.5">
                  <dt className="text-[0.8125rem] font-extrabold text-graphite">{f.k}</dt>
                  <dd className="font-bold">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-[1.75rem] leading-none font-black">{press.contactTitle}</h2>
            <dl className="mt-3 flex flex-col gap-2">
              {press.contact.map((c) => (
                <div key={c.k}>
                  <dt className="text-[0.8125rem] font-extrabold text-graphite">{c.k}</dt>
                  <dd>
                    <a className="ink-link font-bold" href={`mailto:${c.v}`}>
                      {c.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </aside>
        <div className="flex min-w-0 flex-col gap-16">
          <section>
            <SectionTitle>{press.descriptionTitle}</SectionTitle>
            <div className="prose-doodle mt-4 max-w-2xl text-[1.0625rem] text-ink-2">
              {press.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="mt-6 font-display text-[1.5rem] leading-none font-black">{press.featuresTitle}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {press.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[1.0625rem] text-ink-2">
                  <span aria-hidden="true" className="round mt-2.5 block size-2 shrink-0 rounded-full bg-ink" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle>{press.mediaTitle}</SectionTitle>
            <p className="mt-3 text-graphite">{press.mediaNote}</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {press.media.map((m, i) => (
                <li key={m.title} className={i === 0 ? 'md:col-span-2' : ''}>
                  <Card className="overflow-hidden">
                    <img src={IMAGES[m.image]} alt={m.alt} loading="lazy" className="aspect-[3/2] w-full border-b-[2.5px] border-ink bg-white object-cover" />
                    <div className="flex items-center justify-between gap-3 p-4">
                      <span className="font-display text-[1.375rem] leading-none font-black">{m.title}</span>
                      <ButtonAnchor href={IMAGES[m.image]} download icon={<Download className="size-4" strokeWidth={2.75} />} aria-label={`${press.download} ${m.title}`}>
                        {press.download}
                      </ButtonAnchor>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle>{press.logoTitle}</SectionTitle>
            <p className="mt-3 text-graphite">{press.logoNote}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Frame className="grid place-items-center rounded-[var(--radius-lg)] border-[3px] px-6 py-10 [--eye-white:var(--color-paper)]">
                <Wordmark as="div" follow={false} className="text-[4.5rem] text-center" />
              </Frame>
              <div className="grid place-items-center rounded-[var(--radius-lg)] border-[3px] border-ink bg-ink px-6 py-10 text-center [--eye-ink:#fff] [--eye-white:var(--color-ink)]">
                <Wordmark as="div" follow={false} className="text-[4.5rem] text-white" />
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>{press.quotesTitle}</SectionTitle>
            <p className="mt-3 text-graphite">{press.quotesNote}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {press.quotes.map((q) => (
                <figure key={q.source} className="rounded-[var(--radius-lg)] border-2 border-dashed border-pencil p-6">
                  <blockquote className="font-display text-[1.75rem] leading-[1.05] font-black text-graphite">“{q.quote}”</blockquote>
                  <figcaption className="mt-3 text-[0.875rem] font-extrabold text-graphite">{q.source}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="request">
            <SectionTitle>{press.requestTitle}</SectionTitle>
            <p className="mt-3 max-w-xl text-graphite">{press.requestBody}</p>
            <Card className="mt-6 p-6 md:p-8">
              <KeyRequest />
            </Card>
          </section>
        </div>
      </div>
    </Container>
  )
}
