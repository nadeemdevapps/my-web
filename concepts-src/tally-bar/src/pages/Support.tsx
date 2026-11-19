import { ArrowRight, CircleCheck, Search, SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import { Button } from '../components/Button'
import { Field, FormMessage, Input, Select, Textarea } from '../components/Field'
import { Accordion, Card, EmptyState, PageHeader } from '../components/Primitives'
import { FAQ_GROUPS, SITE, SUPPORT } from '../data'
import { postJson } from '../lib/api'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { SUPPORT_TOPICS, supportErrors, type FieldErrors, type SupportInput } from '../shared/validation'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function Support() {
  useDocumentTitle('Support')
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return FAQ_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => !needle || `${i.q} ${i.a}`.toLowerCase().includes(needle)) })).filter((g) => g.items.length)
  }, [query])
  const count = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <PageHeader title={SUPPORT.title} body={SUPPORT.intro}>
        <div className="relative mt-8 max-w-xl">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <Input type="search" aria-label="Search questions" placeholder={SUPPORT.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} className="h-14 pl-12 text-lg" />
        </div>
        <p className="mt-3 text-[15px] text-muted" aria-live="polite">
          {query.trim() ? `${count} ${count === 1 ? 'answer' : 'answers'} for “${query.trim()}”` : `${count} answers`}
        </p>
      </PageHeader>

      <div className="container-page grid gap-4 pb-16 md:grid-cols-3">
        {SUPPORT.channels.map((c) => (
          <Link key={c.title} to={c.to} className="group rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[var(--shadow-card)]">
            <p className="flex items-center justify-between text-xl">
              {c.title}
              <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
            </p>
            <p className="mt-2 text-muted">{c.body}</p>
          </Link>
        ))}
      </div>

      <section aria-label="Frequently asked questions" className="container-page space-y-14 pb-24">
        {groups.length ? (
          groups.map((g) => (
            <div key={g.title} id={slug(g.title)} className="grid scroll-mt-8 gap-4 lg:grid-cols-[16rem_1fr] lg:gap-16">
              <h2 className="font-display text-3xl">{g.title}</h2>
              <Accordion items={g.items.map((i) => ({ id: `faq-${slug(i.q)}`, q: i.q, a: i.a }))} />
            </div>
          ))
        ) : (
          <EmptyState icon={<SearchX className="size-8" aria-hidden />} title="No answers match" body="Try a shorter word, or ask us below." action={<Button variant="outline" onClick={() => setQuery('')}>Clear search</Button>} />
        )}
      </section>

      <ContactForm />
    </>
  )
}

const EMPTY: SupportInput = { name: '', email: '', topic: '', serial: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState<SupportInput>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<{ tone: 'error' | 'success'; text: string; ticket?: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const set = (key: keyof SupportInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const errs = supportErrors(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus({ tone: 'error', text: 'Check the highlighted fields.' })
      formEl.querySelector<HTMLElement>(`[name="${Object.keys(EMPTY).find((k) => errs[k])}"]`)?.focus()
      return
    }
    setBusy(true)
    const res = await postJson<{ ticket: string; replyWithin: string }>('/api/support', form)
    setBusy(false)
    if (!res.ok) {
      setStatus({ tone: 'error', text: res.error })
      if (res.fieldErrors) setErrors(res.fieldErrors)
      return
    }
    setStatus({ tone: 'success', text: `Thanks. Your ticket is ${res.data.ticket}; we reply within ${res.data.replyWithin}.`, ticket: res.data.ticket })
    setForm(EMPTY)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8 border-t border-line">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 id="contact-title" className="font-display text-4xl">
            {SUPPORT.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">{SUPPORT.contact.body}</p>
          <p className="mt-6 text-muted">
            Or write to <span className="text-ink">{SITE.email}</span>
          </p>
        </div>
        <Card className="p-6 sm:p-8">
          {status?.tone === 'success' ? (
            <div className="flex flex-col items-start gap-4" role="status">
              <CircleCheck className="size-8 text-success" aria-hidden />
              <p className="text-xl">Message sent</p>
              <p className="text-muted">{status.text}</p>
              <Button variant="outline" onClick={() => setStatus(null)}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              {status && <FormMessage tone="error">{status.text}</FormMessage>}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  {(p) => <Input {...p} name="name" autoComplete="name" value={form.name} onChange={set('name')} />}
                </Field>
                <Field label="Email" error={errors.email}>
                  {(p) => <Input {...p} name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />}
                </Field>
                <Field label="Topic" error={errors.topic}>
                  {(p) => (
                    <Select {...p} name="topic" value={form.topic} onChange={set('topic')}>
                      <option value="">Choose a topic</option>
                      {SUPPORT_TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </Select>
                  )}
                </Field>
                <Field label="Serial number" optional error={errors.serial} hint="On the base, like TB-4F7K2Q">
                  {(p) => <Input {...p} name="serial" value={form.serial} onChange={set('serial')} />}
                </Field>
              </div>
              <Field label="How can we help?" error={errors.message}>
                {(p) => <Textarea {...p} name="message" rows={5} value={form.message} onChange={set('message')} />}
              </Field>
              <Button type="submit" loading={busy}>
                Send message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
