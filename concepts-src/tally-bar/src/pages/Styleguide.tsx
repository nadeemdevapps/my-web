import { Heart, Plus, RotateCcw, ShoppingBag } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { AppCard } from '../components/AppCard'
import { CloudMark, DotMark, FeatureIcon } from '../components/Art'
import { Button, IconButton, TextLink, type ButtonVariant, type Force } from '../components/Button'
import { DeviceShot } from '../components/DeviceShot'
import { Check, Field, FormMessage, Input, Select, Textarea } from '../components/Field'
import { LedMatrix } from '../components/LedMatrix'
import { Drawer, Modal } from '../components/Overlay'
import { Accordion, Badge, Card, Chip, CodeBlock, EmptyState, FeatureCell, PageHeader, QuantityStepper, Segmented, Skeleton, SpecRows, SwatchPicker } from '../components/Primitives'
import { useToast } from '../components/Toast'
import { APPS, CODE_SAMPLE, PHOTOS } from '../data'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { BODY_COLOURS, LED_COLOURS } from '../shared/catalog'

const COLOURS = [
  ['canvas', '#f1eee9', 'Page'],
  ['canvas-2', '#e8e3db', 'Wells, skeletons'],
  ['surface', '#fdfcf9', 'Cards, inputs'],
  ['line', '#d8d4cc', 'Hairlines'],
  ['line-strong', '#b7b1a5', 'Control borders'],
  ['ink', '#121214', 'Headings, dark buttons'],
  ['ink-2', '#2c2c30', 'Body copy'],
  ['muted', '#5b5b61', 'Secondary text (AA on canvas)'],
  ['faint', '#8e8e94', 'Decoration only'],
  ['orange', '#e0531a', 'Brand fill, large display only'],
  ['orange-ink', '#b93d0b', 'Primary button, focus ring'],
  ['orange-deep', '#9c320a', 'Orange text, hover'],
  ['orange-soft', '#fae3d3', 'Tints, selection'],
  ['screen', '#0b0b0c', 'LED window'],
  ['success', '#1d6f45', 'Confirmations'],
  ['success-soft', '#e1f1e8', ''],
  ['danger', '#b4231b', 'Errors'],
  ['danger-soft', '#fbe5e3', ''],
] as const

const TYPE = [
  ['Display', 'font-display text-display', 'Inter 500, clamp 36 to 64px, -3%'],
  ['Heading', 'font-display text-[2.875rem]', '46px, section titles'],
  ['Title', 'text-3xl', '30px, group titles'],
  ['Lead', 'text-xl', '20px, hero paragraph'],
  ['Body', 'text-base', '16px / 1.55'],
  ['Small', 'text-[15px] text-muted', '15px, hints and captions'],
  ['Mono', 'font-mono text-sm', 'JetBrains Mono 14px, code'],
] as const

const RADII = [['xs', 6], ['sm', 10], ['md', 14], ['lg', 22], ['xl', 30]] as const
const SHADOWS = ['card', 'float', 'button', 'focus'] as const
const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 112]
const MOTION = [
  ['--duration-fast', '160ms', 'Hover, press'],
  ['--duration-base', '280ms', 'Accordions, chevrons'],
  ['--duration-slow', '650ms', 'Fade-up reveals'],
  ['--ease-out-soft', 'cubic-bezier(0.22, 1, 0.36, 1)', 'Everything that arrives'],
] as const

const VARIANTS: ButtonVariant[] = ['primary', 'dark', 'outline', 'ghost']
const STATES: (Force | 'default' | 'disabled' | 'loading')[] = ['default', 'hover', 'focus', 'pressed', 'disabled', 'loading']

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14">
      <h2 id={id} className="mb-8 font-display text-3xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-sm text-muted">{children}</p>
}

export function Styleguide() {
  useDocumentTitle('Style guide')
  const toast = useToast()
  const [replay, setReplay] = useState(0)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [seg, setSeg] = useState('25')
  const [swatch, setSwatch] = useState('chalk')
  const [led, setLed] = useState('red')
  const [qty, setQty] = useState(1)
  const [chip, setChip] = useState(true)

  return (
    <>
      <PageHeader eyebrow="Design system" title="Style guide" body="Tokens from src/styles.css and every component from src/components, rendered by the real code. Light theme only." />
      <div className="container-page pb-24">
        <Section id="sg-colour" title="Colour">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {COLOURS.map(([name, hex, use]) => (
              <li key={name}>
                <div className="h-20 rounded-[var(--radius-md)] border border-black/8" style={{ background: `var(--color-${name})` }} />
                <p className="mt-2 text-[15px]">{name}</p>
                <p className="font-mono text-[13px] text-muted">{hex}</p>
                {use && <p className="text-[13px] text-muted">{use}</p>}
              </li>
            ))}
          </ul>
          <Label>LED colours (catalogue)</Label>
          <div className="flex flex-wrap gap-4">
            {LED_COLOURS.map((c) => (
              <div key={c.id} className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-screen px-3 py-2 text-white">
                <span className="round size-4 rounded-full" style={{ background: c.hex, boxShadow: `0 0 8px ${c.hex}` }} />
                <span className="text-sm">{c.name}</span>
                <span className="font-mono text-xs text-[#b4b4ba]">{c.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sg-type" title="Type">
          <div className="space-y-6">
            {TYPE.map(([name, cls, note]) => (
              <div key={name} className="grid gap-2 md:grid-cols-[12rem_1fr]">
                <p className="text-sm text-muted">
                  {name}
                  <br />
                  {note}
                </p>
                <p className={cls}>Focus, then flip back to free</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sg-space" title="Spacing, radii and shadows">
          <Label>Spacing (px)</Label>
          <div className="flex flex-wrap items-end gap-4">
            {SPACE.map((s) => (
              <div key={s} className="text-center">
                <div className="bg-orange-soft" style={{ width: s, height: s }} />
                <p className="mt-1 font-mono text-xs text-muted">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <Label>Radius (squircle)</Label>
              <div className="flex flex-wrap gap-4">
                {RADII.map(([n, v]) => (
                  <div key={n} className="text-center">
                    <div className="size-20 border border-line-strong bg-surface" style={{ borderRadius: `var(--radius-${n})` }} />
                    <p className="mt-1 font-mono text-xs text-muted">
                      {n} {v}px
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Shadow</Label>
              <div className="flex flex-wrap gap-5">
                {SHADOWS.map((s) => (
                  <div key={s} className="text-center">
                    <div className="size-20 rounded-[var(--radius-md)] bg-surface" style={{ boxShadow: `var(--shadow-${s})` }} />
                    <p className="mt-2 font-mono text-xs text-muted">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="sg-motion" title="Motion">
          <ul className="mb-6 grid gap-2 text-[15px] md:grid-cols-2">
            {MOTION.map(([n, v, u]) => (
              <li key={n} className="flex flex-wrap gap-x-3">
                <code className="font-mono text-sm">{n}</code>
                <span className="text-muted">{v}</span>
                <span className="text-muted">{u}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="outline" icon={<RotateCcw className="size-4" aria-hidden />} onClick={() => setReplay((n) => n + 1)}>
              Replay
            </Button>
            <div key={`a${replay}`} className="animate-fade-up rounded-[var(--radius-md)] bg-surface px-5 py-3 shadow-[var(--shadow-card)]">
              fade-up
            </div>
            <div key={`b${replay}`} className="w-40 overflow-hidden rounded-[var(--radius-sm)]">
              <Skeleton className="h-10" />
            </div>
            <span className="relative grid size-10 place-items-center">
              <span className="round absolute inset-0 animate-press rounded-full bg-orange" />
              <span className="round size-3 rounded-full bg-orange-ink" />
            </span>
            <p className="text-sm text-muted">With reduced motion these stop; the LED pages words instead of scrolling.</p>
          </div>
        </Section>

        <Section id="sg-buttons" title="Buttons and links">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left">
              <thead>
                <tr className="text-sm text-muted">
                  <th scope="col" className="pb-3 font-normal">Variant</th>
                  {STATES.map((s) => (
                    <th key={s} scope="col" className="pb-3 font-normal">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map((v) => (
                  <tr key={v}>
                    <th scope="row" className="py-2 pr-4 text-[15px] font-normal">{v}</th>
                    {STATES.map((s) => (
                      <td key={s} className="py-2 pr-3">
                        <Button variant={v} size="sm" force={s === 'hover' || s === 'focus' || s === 'pressed' ? s : undefined} disabled={s === 'disabled'} loading={s === 'loading'}>
                          Buy
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg">Buy</Button>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
            <IconButton aria-label="Cart, 2 items" badge={2}>
              <ShoppingBag className="size-5" aria-hidden />
            </IconButton>
            <IconButton aria-label="Add" tone="outline">
              <Plus className="size-5" aria-hidden />
            </IconButton>
            <IconButton aria-label="Favourite" tone="dark">
              <Heart className="size-5" aria-hidden />
            </IconButton>
            <IconButton aria-label="Cart hovered" force="hover">
              <ShoppingBag className="size-5" aria-hidden />
            </IconButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-8 text-lg [&>a]:inline-flex [&>a]:min-h-10 [&>a]:items-center">
            <TextLink to="/styleguide">Text link</TextLink>
            <TextLink to="/styleguide" force="hover">
              Hover
            </TextLink>
            <TextLink to="/styleguide" force="focus">
              Focus
            </TextLink>
            <span className="text-ink">Current page</span>
          </div>
        </Section>

        <Section id="sg-forms" title="Form controls">
          <div className="grid gap-6 md:grid-cols-3">
            <Field label="Default" hint="A hint under the field">
              {(p) => <Input {...p} placeholder="Placeholder" />}
            </Field>
            <Field label="Focus">
              {(p) => <Input {...p} data-force="focus" defaultValue="DEEP WORK" />}
            </Field>
            <Field label="Error" error="Enter a valid email address.">
              {(p) => <Input {...p} defaultValue="name@" />}
            </Field>
            <Field label="Disabled">
              {(p) => <Input {...p} disabled defaultValue="Locked" />}
            </Field>
            <Field label="Select">
              {(p) => (
                <Select {...p} defaultValue="Setup and Wi-Fi">
                  <option>Setup and Wi-Fi</option>
                  <option>Developer API</option>
                </Select>
              )}
            </Field>
            <Field label="Optional" optional>
              {(p) => <Input {...p} placeholder="TB-4F7K2Q" />}
            </Field>
            <Field label="Textarea" className="md:col-span-2">
              {(p) => <Textarea {...p} placeholder="How can we help?" />}
            </Field>
            <div>
              <Check label="Tilt stand" hint="Walnut" defaultChecked />
              <Check label="Unchecked" />
              <Check label="Disabled" disabled />
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <FormMessage tone="error">Check the highlighted fields.</FormMessage>
            <FormMessage tone="success">Message sent.</FormMessage>
          </div>
          <div className="mt-8 flex flex-wrap items-start gap-8">
            <Segmented label="Length" value={seg} onChange={setSeg} options={['15', '25', '50'].map((v) => ({ value: v, label: `${v} min` }))} />
            <QuantityStepper value={qty} onChange={setQty} />
            <div className="flex flex-wrap gap-2">
              <Chip selected={chip} onClick={() => setChip(!chip)}>
                Selected
              </Chip>
              <Chip>Default</Chip>
              <Chip force="hover">Hover</Chip>
              <Chip force="focus">Focus</Chip>
              <Chip disabled>Disabled</Chip>
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <SwatchPicker label="Body" swatches={BODY_COLOURS} value={swatch} onChange={setSwatch} />
            <SwatchPicker label="LED colour" swatches={LED_COLOURS} value={led} onChange={setLed} glow />
          </div>
        </Section>

        <Section id="sg-display" title="LED display">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label>Short text, centred</Label>
              <div className="aspect-[4.5/1] rounded-[var(--radius-md)] bg-screen p-3">
                <LedMatrix text="BUSY" color="#ff3b30" />
              </div>
            </div>
            <div>
              <Label>Long text scrolls</Label>
              <div className="aspect-[4.5/1] rounded-[var(--radius-md)] bg-screen p-3">
                <LedMatrix text="BACK AFTER LUNCH, ASK JUNE" color="#ffab1f" />
              </div>
            </div>
            <div>
              <Label>Pulse (session done), small font</Label>
              <div className="aspect-[4.5/1] rounded-[var(--radius-md)] bg-screen p-3">
                <LedMatrix text="DONE 25:00" color="#3cf08a" scale={1} rows={11} pulse />
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label>DeviceShot: photo with the LED overlay</Label>
              <DeviceShot photo={PHOTOS.front.graphite} text="HELLO" color="#46d7ff" className="overflow-hidden rounded-[var(--radius-lg)]" />
            </div>
            <div>
              <Label>Marks and feature icons</Label>
              <Card className="flex flex-wrap items-center gap-8 p-6">
                <CloudMark />
                <DotMark className="size-10" />
                <FeatureIcon name="timer" className="text-[#8a8a90]" />
                <FeatureIcon name="apps" className="text-[#8a8a90]" />
                <FeatureIcon name="gears" className="text-[#8a8a90]" />
              </Card>
            </div>
          </div>
        </Section>

        <Section id="sg-content" title="Content">
          <div className="grid gap-6 lg:grid-cols-3">
            <AppCard app={APPS[0]} installed onToggle={() => toast('Toggled')} />
            <AppCard app={APPS[5]} onToggle={() => toast('Toggled')} />
            <AppCard app={APPS[6]} onToggle={() => toast('Toggled')} force="hover" />
          </div>
          <div className="mt-6 grid border-y border-line md:grid-cols-2">
            <FeatureCell icon={<FeatureIcon name="timer" />} title="Feature cell" body="Icon, title and a short line, as in the hero strip" />
            <FeatureCell icon={<FeatureIcon name="gears" />} title="Second cell" body="Cells share a hairline divider" className="border-t border-line md:border-t-0 md:border-l" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="orange">Orange</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="dark">Dark</Badge>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Accordion items={[{ id: 'sg-a1', q: 'Accordion, open', a: 'Answers slide open; Enter and Space toggle.' }, { id: 'sg-a2', q: 'Accordion, closed', a: 'Hidden until opened.' }]} defaultOpen="sg-a1" />
            <SpecRows rows={[['Spec row', '72 × 16 RGB LEDs'], ['Another', '310 g']]} className="border-t border-line" />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CodeBlock code={CODE_SAMPLE} label="Code block" />
            <EmptyState icon={<ShoppingBag className="size-8" aria-hidden />} title="Empty state" body="Shown when a list has nothing in it." action={<Button variant="outline" size="sm">Action</Button>} />
          </div>
          <div className="mt-6">
            <Label>Loading (skeleton)</Label>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </div>
          </div>
        </Section>

        <Section id="sg-overlays" title="Overlays and feedback">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setModal(true)}>
              Open modal
            </Button>
            <Button variant="outline" onClick={() => setDrawer(true)}>
              Open drawer
            </Button>
            <Button variant="outline" onClick={() => toast('Added Tally Bar in Chalk to your cart')}>
              Show toast
            </Button>
          </div>
          <Modal open={modal} onClose={() => setModal(false)} title="Modal" description="Tab is trapped; Esc closes; focus returns to the trigger." footer={<Button onClick={() => setModal(false)}>Done</Button>}>
            <Field label="Example field">{(p) => <Input {...p} data-autofocus />}</Field>
          </Modal>
          <Drawer open={drawer} onClose={() => setDrawer(false)} title="Drawer" description="Used by the cart and the mobile menu.">
            <p className="text-muted">Slides in from the right.</p>
          </Drawer>
        </Section>
      </div>
    </>
  )
}
