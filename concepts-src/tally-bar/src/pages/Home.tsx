import { ArrowRight, Pause, Play, RotateCcw } from 'lucide-react'

import { AppCard } from '../components/AppCard'
import { FeatureIcon } from '../components/Art'
import { Button, ButtonLink, TextLink } from '../components/Button'
import { DeviceShot, Hotspot } from '../components/DeviceShot'
import { Field, Input } from '../components/Field'
import { Chip, CodeBlock, FeatureCell, SectionHeading, Segmented, SwatchPicker } from '../components/Primitives'
import { API_ENDPOINTS, APPS, CODE_SAMPLE, FEATURES, HERO, HERO_CONTROLS, HOME, KEY_SPECS, PHOTOS } from '../data'
import { formatClock, useDevice, useStore } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { DEVICE, LED_COLOURS, type LedColourId } from '../shared/catalog'
import { messageError } from '../shared/validation'

export function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <MessageDemo />
      <TimerDemo />
      <AppsTeaser />
      <DevTeaser />
      <SpecsTeaser />
    </>
  )
}

function Hero() {
  const device = useDevice()
  const { timer } = device
  return (
    <section aria-labelledby="hero-title" className="hero-stage relative flex min-h-[max(100svh,640px)] flex-col overflow-hidden">
      <div className="relative mt-16 md:mt-[30px]" style={{ height: 'calc(var(--stage-w) / 1.5 * 0.53)' }}>
        <div className="hero-photo absolute top-0 left-1/2 -translate-x-1/2">
          <DeviceShot photo={PHOTOS.hero} priority text={device.display} color={device.ledHex} pulse={device.finished} rows={16} inset={0.1}>
            <Hotspot
              area={HERO_CONTROLS.plate}
              label={timer.running ? 'Pause the focus timer' : `Start a ${timer.minutes} minute focus session`}
              pressed={timer.running}
              onClick={device.toggleTimer}
            />
            <Hotspot area={HERO_CONTROLS.dial} label={`Timer length ${timer.minutes} minutes, turn for longer`} onClick={device.stepMinutes} className="round rounded-full" />
            <Hotspot area={HERO_CONTROLS.accent} label="Change the LED colour" onClick={device.cycleLed} className="round rounded-full" />
          </DeviceShot>
        </div>
      </div>

      <div className="container-page relative">
        <p id="hero-title" className="mx-auto max-w-[38.5rem] text-[17px] leading-[1.6] text-ink-2 md:text-[19px] xl:text-[19.5px]">
          <strong className="font-medium text-ink">{HERO.lead}</strong>
          {HERO.body}
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 md:mt-[52px]">
          <ButtonLink to="/shop" size="lg" className="w-full max-w-[200px]">
            {HERO.cta}
          </ButtonLink>
          <p className="max-w-sm text-center text-sm text-muted" aria-live="polite">
            {timer.running ? (device.finished ? 'Session done. Press the top button to reset.' : `Focus session running, ${formatClock(device.secondsLeft)} left.`) : HERO.hint}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-10">
        <ul className="grid border-t border-line md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <li key={f.title} className={i ? 'border-t border-line md:border-t-0 md:border-l' : undefined}>
              <FeatureCell icon={<FeatureIcon name={f.icon} />} title={f.title} body={f.body} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function MessageDemo() {
  const device = useDevice()
  const error = messageError(device.message)
  const params = new URLSearchParams({ message: device.message.trim(), led: device.led })
  return (
    <section aria-labelledby="message-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <DeviceShot
          photo={PHOTOS.front.chalk}
          text={device.message || ' '}
          color={device.ledHex}
          className="overflow-hidden rounded-[var(--radius-xl)]"
          label={device.message ? `Preview reads ${device.message}` : 'Preview with a blank display'}
        />
        <div>
          <SectionHeading id="message-title" eyebrow={HOME.message.eyebrow} title={HOME.message.title} body={HOME.message.body} />
          <div className="mt-8 space-y-6">
            <Field label="Message" hint={`${device.message.length} of ${DEVICE.maxMessage} characters`} error={error}>
              {(p) => <Input {...p} value={device.message} maxLength={DEVICE.maxMessage + 8} placeholder={HOME.message.placeholder} onChange={(e) => device.setMessage(e.target.value)} />}
            </Field>
            <div className="flex flex-wrap gap-2" aria-label="Message presets" role="group">
              {HOME.message.presets.map((p) => (
                <Chip key={p} selected={device.message === p} onClick={() => device.setMessage(p)}>
                  {p}
                </Chip>
              ))}
            </div>
            <SwatchPicker label="LED colour" swatches={LED_COLOURS} value={device.led} onChange={(id) => device.setLed(id as LedColourId)} glow />
            <ButtonLink to={`/shop?${params}`} variant="dark" iconRight={<ArrowRight className="size-4" aria-hidden />} aria-disabled={!!error || undefined}>
              {HOME.message.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimerDemo() {
  const device = useDevice()
  const { timer } = device
  return (
    <section aria-labelledby="timer-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="lg:order-2">
          <DeviceShot
            photo={PHOTOS.desk}
            text={device.finished ? 'DONE' : formatClock(device.secondsLeft)}
            color={device.ledHex}
            pulse={device.finished}
            className="overflow-hidden rounded-[var(--radius-xl)]"
            label={`Timer reads ${formatClock(device.secondsLeft)}`}
          />
        </div>
        <div>
          <SectionHeading id="timer-title" eyebrow={HOME.timer.eyebrow} title={HOME.timer.title} body={HOME.timer.body} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Segmented
              label="Session length"
              value={String(timer.minutes)}
              onChange={(v) => device.setMinutes(Number(v))}
              options={HOME.timer.presets.map((m) => ({ value: String(m), label: `${m} min` }))}
            />
            <Button onClick={device.toggleTimer} icon={timer.running ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}>
              {timer.running ? 'Pause' : timer.left !== timer.minutes * 60 ? 'Resume' : 'Start'}
            </Button>
            <Button variant="ghost" onClick={device.resetTimer} icon={<RotateCcw className="size-4" aria-hidden />} disabled={!timer.running && timer.left === timer.minutes * 60}>
              Reset
            </Button>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {HOME.timer.steps.map((s, i) => (
              <li key={s.title} className="border-t border-line-strong pt-4">
                <p className="text-sm text-muted tabular">0{i + 1}</p>
                <p className="mt-1 text-lg">{s.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function AppsTeaser() {
  const { installed, toggleApp } = useStore()
  const { ledHex } = useDevice()
  return (
    <section aria-labelledby="apps-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="apps-title" eyebrow={HOME.apps.eyebrow} title={HOME.apps.title} body={HOME.apps.body} />
          <ButtonLink to="/apps" variant="outline" iconRight={<ArrowRight className="size-4" aria-hidden />}>
            {HOME.apps.cta}
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.slice(0, 6).map((app) => (
            <AppCard key={app.id} app={app} color={ledHex} installed={installed.includes(app.id)} onToggle={() => toggleApp(app.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DevTeaser() {
  return (
    <section aria-labelledby="dev-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="dev-title" eyebrow={HOME.dev.eyebrow} title={HOME.dev.title} body={HOME.dev.body} />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {API_ENDPOINTS.slice(0, 3).map((e) => (
              <li key={e.path} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5">
                <code className="w-12 font-mono text-sm text-orange-deep">{e.method}</code>
                <code className="font-mono text-[15px]">{e.path}</code>
                <span className="basis-full text-[15px] text-muted sm:ml-auto sm:basis-auto">{e.body}</span>
              </li>
            ))}
          </ul>
          <TextLink to="/apps#developers" className="mt-6 inline-flex min-h-10 items-center text-lg">
            {HOME.dev.cta}
          </TextLink>
        </div>
        <CodeBlock code={CODE_SAMPLE} label="Set the message over HTTP" className="self-center" />
      </div>
    </section>
  )
}

function SpecsTeaser() {
  return (
    <section aria-labelledby="specs-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <img src={PHOTOS.dial.src} alt={PHOTOS.dial.alt} width={PHOTOS.dial.width} height={PHOTOS.dial.height} loading="lazy" className="aspect-square w-full rounded-[var(--radius-xl)] object-cover" />
        <div>
          <SectionHeading id="specs-title" eyebrow={HOME.specs.eyebrow} title={HOME.specs.title} />
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {KEY_SPECS.map((s) => (
              <div key={s.label} className="border-t border-line-strong pt-4">
                <dt className="text-[15px] text-muted">{s.label}</dt>
                <dd className="mt-1 text-xl text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/specs" variant="outline" className="mt-10" iconRight={<ArrowRight className="size-4" aria-hidden />}>
            {HOME.specs.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
