import { Search, SearchX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { AppCard } from '../components/AppCard'
import { CloudMark } from '../components/Art'
import { Button } from '../components/Button'
import { Input } from '../components/Field'
import { LedMatrix } from '../components/LedMatrix'
import { Chip, CodeBlock, EmptyState, PageHeader, SectionHeading } from '../components/Primitives'
import { useToast } from '../components/Toast'
import { API_ENDPOINTS, APP_CATEGORIES, APPS, CODE_SAMPLE, MQTT_SAMPLE, SITE, type AppCategory } from '../data'
import { useDevice, useStore } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const SDKS = [
  { name: 'Python', install: 'pip install tally-bar' },
  { name: 'Go', install: 'go get tally.example/go' },
  { name: 'JavaScript', install: 'npm install @tally/bar' },
]

export function Apps() {
  useDocumentTitle('Apps')
  const [params, setParams] = useSearchParams()
  const { installed, toggleApp } = useStore()
  const { ledHex } = useDevice()
  const toast = useToast()
  const q = params.get('q') ?? ''
  const cat = (params.get('category') as AppCategory | null) ?? null
  const mine = params.get('installed') === '1'
  const [query, setQuery] = useState(q)

  useEffect(() => setQuery(q), [q])

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return APPS.filter((a) => (!cat || a.category === cat) && (!mine || installed.includes(a.id)) && (!needle || `${a.name} ${a.description} ${a.author}`.toLowerCase().includes(needle)))
  }, [q, cat, mine, installed])

  const onToggle = (id: string, name: string) => {
    const was = installed.includes(id)
    toggleApp(id)
    toast(was ? `Removed ${name} from your Tally Bar` : `Installed ${name}`)
  }

  const rotation = APPS.filter((a) => installed.includes(a.id)).map((a) => a.preview).join('   ')

  return (
    <>
      <PageHeader eyebrow="App library" title="Apps for your display" body="Install from here or from tally.local. Apps run on the device; the two marked with a cloud need a free Nadeem Cloud account.">
        <div className="mt-10 grid items-center gap-6 rounded-[var(--radius-xl)] bg-ink p-4 text-white sm:p-5 md:grid-cols-[1fr_auto]">
          <div className="aspect-[5/1] rounded-[var(--radius-md)] bg-screen p-3 md:aspect-[7/1]">
            <LedMatrix text={rotation || 'NO APPS'} color={ledHex} rows={12} scale={1} label={`Installed apps rotation: ${rotation || 'none'}`} />
          </div>
          <div className="px-2 pb-2 md:px-4 md:pb-0">
            <p className="text-3xl tabular">{installed.length}</p>
            <p className="text-[15px] text-[#c9c9ce]">apps on your device</p>
          </div>
        </div>
      </PageHeader>

      <section aria-label="Browse apps" className="container-page">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              update('q', query.trim() || null)
            }}
            className="relative w-full lg:max-w-sm"
          >
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <Input
              type="search"
              aria-label="Search apps"
              placeholder="Search apps"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                update('q', e.target.value.trim() || null)
              }}
              className="pl-11"
            />
          </form>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
            <Chip selected={!cat} onClick={() => update('category', null)}>
              All
            </Chip>
            {APP_CATEGORIES.map((c) => (
              <Chip key={c} selected={cat === c} onClick={() => update('category', cat === c ? null : c)}>
                {c}
              </Chip>
            ))}
            <Chip selected={mine} onClick={() => update('installed', mine ? null : '1')}>
              Installed
            </Chip>
          </div>
        </div>

        <p className="mt-6 text-[15px] text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? 'app' : 'apps'}
        </p>

        {list.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((app) => (
              <AppCard key={app.id} app={app} color={ledHex} installed={installed.includes(app.id)} onToggle={() => onToggle(app.id, app.name)} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={<SearchX className="size-8" aria-hidden />}
              title={mine && !q && !cat ? 'No apps installed yet' : 'No apps match'}
              body={mine && !q && !cat ? 'Install one and it joins the rotation on your display.' : 'Try a different word or clear the filters.'}
              action={
                <Button variant="outline" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                  Clear filters
                </Button>
              }
            />
          </div>
        )}
      </section>

      <section id="developers" aria-labelledby="developers-title" className="container-page mt-28 scroll-mt-8 border-t border-line pt-20 pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="developers-title"
              eyebrow="For developers"
              title="Local API, MQTT and SDKs"
              body="Every endpoint works on your network with no account. Turn on an API token in the local web panel to lock it down."
            />
            <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Endpoints table">
              <table className="w-full min-w-[28rem] text-left text-[15px]">
                <caption className="sr-only">HTTP and WebSocket endpoints</caption>
                <thead className="text-muted">
                  <tr className="border-b border-line">
                    <th scope="col" className="py-3 pr-4 font-normal">Method</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Path</th>
                    <th scope="col" className="py-3 font-normal">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {API_ENDPOINTS.map((e) => (
                    <tr key={e.path} className="border-b border-line">
                      <td className="py-3.5 pr-4 font-mono text-sm text-orange-deep">{e.method}</td>
                      <td className="py-3.5 pr-4 font-mono">{e.path}</td>
                      <td className="py-3.5 text-muted">{e.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {SDKS.map((s) => (
                <li key={s.name} className="rounded-[var(--radius-md)] border border-line bg-surface p-4">
                  <p className="text-lg">{s.name}</p>
                  <code className="mt-1 block font-mono text-[13px] break-all text-muted">{s.install}</code>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 space-y-4">
            <CodeBlock code={CODE_SAMPLE} label="HTTP" />
            <CodeBlock code={MQTT_SAMPLE} label="MQTT" />
            <div className="flex items-start gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-5">
              <CloudMark className="w-20 shrink-0" />
              <div>
                <h3 className="text-lg">{SITE.cloud.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{SITE.cloud.body}. Free for one device; it relays the same API from anywhere, over TLS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
