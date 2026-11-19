import { Package, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import { Button } from '../components/Button'
import { DeviceShot } from '../components/DeviceShot'
import { Check, Field, Input } from '../components/Field'
import { Chip, Eyebrow, Price, QuantityStepper, SwatchPicker } from '../components/Primitives'
import { useToast } from '../components/Toast'
import { HOME, PHOTOS, STORAGE_KEYS, type Photo } from '../data'
import { cx } from '../lib/cx'
import { formatMoney } from '../lib/format'
import { useStore } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { ADDONS, BODY_COLOURS, DEVICE, LED_COLOURS, SHIPPING, unitPrice, type AddonId, type BodyColourId, type LedColourId } from '../shared/catalog'
import { messageError } from '../shared/validation'

type Draft = { colour: BodyColourId; led: LedColourId; message: string; addons: AddonId[]; qty: number }
const DEFAULT: Draft = { colour: 'chalk', led: 'red', message: 'FOCUS', addons: [], qty: 1 }

function loadDraft(params: URLSearchParams): Draft {
  let draft = DEFAULT
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.draft)
    if (raw) draft = { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  const colour = params.get('colour')
  const led = params.get('led')
  const message = params.get('message')
  return {
    ...draft,
    colour: BODY_COLOURS.some((c) => c.id === colour) ? (colour as BodyColourId) : draft.colour,
    led: LED_COLOURS.some((c) => c.id === led) ? (led as LedColourId) : draft.led,
    message: message !== null && !messageError(message) ? message : draft.message,
  }
}

const VIEWS = [
  { id: 'front', label: 'Front' },
  { id: 'desk', label: 'On a desk' },
  { id: 'back', label: 'Ports' },
  { id: 'dial', label: 'Dial' },
] as const
type View = (typeof VIEWS)[number]['id']

const PERKS = [
  { icon: Truck, text: `Free standard shipping over ${formatMoney(SHIPPING.freeOver)}` },
  { icon: RotateCcw, text: '30-day returns, in any condition' },
  { icon: ShieldCheck, text: 'Two-year warranty' },
  { icon: Package, text: 'Ships the same working day before 2 pm' },
]

export function Shop() {
  useDocumentTitle('Shop')
  const [params] = useSearchParams()
  const [draft, setDraft] = useState<Draft>(() => loadDraft(params))
  const [view, setView] = useState<View>('front')
  const [adding, setAdding] = useState(false)
  const { add, setCartOpen } = useStore()
  const toast = useToast()

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft))
    } catch {
      /* ignore */
    }
  }, [draft])

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }))
  const colour = BODY_COLOURS.find((c) => c.id === draft.colour)!
  const led = LED_COLOURS.find((c) => c.id === draft.led)!
  const error = messageError(draft.message)
  const price = unitPrice(draft)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (error) {
      document.querySelector<HTMLInputElement>('input[name="message"]')?.focus()
      return
    }
    setAdding(true)
    window.setTimeout(() => {
      add({ ...draft, message: draft.message.trim() })
      setAdding(false)
      toast(`Added ${DEVICE.name} in ${colour.name} to your cart`)
      setCartOpen(true)
    }, 450)
  }

  const photo: Photo = view === 'front' ? PHOTOS.front[draft.colour] : view === 'desk' ? PHOTOS.desk : view === 'back' ? PHOTOS.back : PHOTOS.dial

  return (
    <div className="container-page pt-28 pb-24 md:pt-36">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[#ececee]">
            {photo.screen ? (
              <DeviceShot
                key={photo.src}
                photo={photo}
                text={draft.message || ' '}
                color={led.hex}
                priority
                className="aspect-[3/2] animate-[fade-up_400ms_var(--ease-out-soft)_both]"
                label={draft.message ? `Preview: ${colour.name} Tally Bar reading ${draft.message}` : `Preview: ${colour.name} Tally Bar with a blank display`}
              />
            ) : (
              <img key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="aspect-[3/2] w-full animate-[fade-up_400ms_var(--ease-out-soft)_both] object-cover" />
            )}
          </div>
          <div role="group" aria-label="Photo" className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
            {VIEWS.map((v) => {
              const thumb = v.id === 'front' ? PHOTOS.front[draft.colour] : v.id === 'desk' ? PHOTOS.desk : v.id === 'back' ? PHOTOS.back : PHOTOS.dial
              return (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={view === v.id}
                  onClick={() => setView(v.id)}
                  className={cx(
                    'overflow-hidden rounded-[var(--radius-md)] border-2 bg-[#ececee] text-left transition-[border-color] duration-[var(--duration-fast)]',
                    view === v.id ? 'border-ink' : 'border-transparent hover:border-line-strong',
                  )}
                >
                  <img src={thumb.src} alt="" className="aspect-[3/2] w-full object-cover" loading="lazy" />
                  <span className="block px-2 py-1.5 text-[13px] text-muted sm:text-sm">{v.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <form onSubmit={submit} noValidate aria-labelledby="shop-title" className="flex flex-col gap-8">
          <div>
            <Eyebrow>Configure yours</Eyebrow>
            <h1 id="shop-title" className="mt-2 font-display text-display">
              {DEVICE.name}
            </h1>
            <p className="mt-4 text-2xl text-ink tabular">
              <Price value={price} />
            </p>
            <p className="mt-1 text-[15px] text-muted">Including the display, a braided USB-C cable and free firmware updates.</p>
          </div>

          <SwatchPicker
            label="Body"
            swatches={BODY_COLOURS.map((c) => ({ ...c, note: c.surcharge ? `+${formatMoney(c.surcharge)}, ${c.accent.toLowerCase()}` : c.accent }))}
            value={draft.colour}
            onChange={(id) => {
              set('colour', id as BodyColourId)
              setView('front')
            }}
          />

          <SwatchPicker label="LED colour" swatches={LED_COLOURS} value={draft.led} onChange={(id) => set('led', id as LedColourId)} glow />

          <div className="space-y-3">
            <Field label="First message" hint={`Shown when it first powers on. ${draft.message.length} of ${DEVICE.maxMessage} characters.`} error={error}>
              {(p) => <Input {...p} name="message" value={draft.message} placeholder="Leave blank for the clock" onChange={(e) => set('message', e.target.value)} />}
            </Field>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Message presets">
              {HOME.message.presets.map((m) => (
                <Chip key={m} selected={draft.message === m} onClick={() => set('message', m)}>
                  {m}
                </Chip>
              ))}
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-[15px] font-medium">Add-ons</legend>
            <div className="divide-y divide-line rounded-[var(--radius-md)] border border-line bg-surface px-4">
              {ADDONS.map((a) => (
                <Check
                  key={a.id}
                  checked={draft.addons.includes(a.id)}
                  onChange={(e) => set('addons', e.target.checked ? [...draft.addons, a.id] : draft.addons.filter((x) => x !== a.id))}
                  className="py-3"
                  label={
                    <span className="flex w-full justify-between gap-4">
                      <span>{a.name}</span>
                      <span className="tabular text-muted">+{formatMoney(a.price)}</span>
                    </span>
                  }
                  hint={a.detail}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={draft.qty} onChange={(q) => set('qty', q)} max={DEVICE.maxQty} />
            <Button type="submit" size="md" loading={adding} className="h-[56px] min-w-[220px] flex-1 text-lg">
              Add to cart, {formatMoney(price * draft.qty)}
            </Button>
          </div>

          <ul className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-[15px] text-muted">
                <Icon className="mt-0.5 size-5 shrink-0 text-ink-2" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  )
}
