import { ArrowRight } from 'lucide-react'

import { ButtonLink } from '../components/Button'
import { DeviceShot } from '../components/DeviceShot'
import { PageHeader, SpecRows } from '../components/Primitives'
import { KEY_SPECS, PHOTOS, SPEC_CALLOUTS, SPEC_GROUPS } from '../data'
import { useDevice } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { DEVICE } from '../shared/catalog'
import { formatMoney } from '../lib/format'

export function Specs() {
  useDocumentTitle('Specs')
  const device = useDevice()
  return (
    <>
      <PageHeader eyebrow="Specifications" title="Every number, in one place" body="Tally Bar is built to sit on a desk for years: a dense LED matrix, real controls and a body you can open with a screwdriver." />

      <section aria-label="Overview" className="container-page">
        <DeviceShot photo={PHOTOS.front.chalk} text={device.message || 'TALLY'} color={device.ledHex} priority className="overflow-hidden rounded-[var(--radius-xl)]" />
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
          {KEY_SPECS.map((s) => (
            <div key={s.label} className="border-t border-line-strong pt-4">
              <dt className="text-[15px] text-muted">{s.label}</dt>
              <dd className="mt-1 text-xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Detailed specifications" className="container-page mt-20 grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="Specification groups" className="hidden lg:block">
          <ul className="sticky top-8 space-y-1">
            {SPEC_GROUPS.map((g) => (
              <li key={g.title}>
                <a href={`#spec-${g.title.toLowerCase()}`} className="flex min-h-10 items-center rounded-[var(--radius-xs)] text-lg text-muted link-underline decoration-ink/30 hover:text-ink">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14">
          {SPEC_GROUPS.map((g) => (
            <div key={g.title} id={`spec-${g.title.toLowerCase()}`} className="scroll-mt-8">
              <h2 className="font-display text-3xl">{g.title}</h2>
              <SpecRows rows={g.rows} className="mt-4 border-t border-line text-[17px]" />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="ports-title" className="container-page mt-24 grid items-center gap-10 lg:grid-cols-2">
        <img src={PHOTOS.back.src} alt={PHOTOS.back.alt} width={PHOTOS.back.width} height={PHOTOS.back.height} loading="lazy" className="w-full rounded-[var(--radius-xl)]" />
        <div>
          <h2 id="ports-title" className="font-display text-4xl">
            Built to last on your desk
          </h2>
          <ul className="mt-8 space-y-6">
            {SPEC_CALLOUTS.map((c) => (
              <li key={c.title} className="border-t border-line-strong pt-4">
                <p className="text-xl">{c.title}</p>
                <p className="mt-1 text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page my-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-xl)] bg-ink p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <p className="font-display text-3xl md:text-4xl">{DEVICE.name}, {formatMoney(DEVICE.price)}</p>
            <p className="mt-2 text-[#c9c9ce]">Three colours, five LED colours, ships the same day.</p>
          </div>
          <ButtonLink to="/shop" size="md" className="h-14 px-8 text-lg" iconRight={<ArrowRight className="size-4" aria-hidden />}>
            Configure yours
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
