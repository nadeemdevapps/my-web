import { ArrowRight, Heart, RotateCcw, Scissors, ShoppingBag } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { Drawer, Modal } from '../components/Overlay'
import { ProductCard, StockTag } from '../components/ProductCard'
import { Bubble, Button, Chip, DateChip, EmptyState, IconButton, InlineSelect, Input, Notice, ScriptTitle, Select, Signature, Skeleton, Stepper, SwatchGroup, Textarea, TypingDots, type Force } from '../components/ui'
import { brand, leathers, products } from '../content'
import { colours, motionTokens, radii, shadows, spacing, typeScale } from '../lib/tokens'
import { useStore } from '../lib/store'
import { useTitle } from '../lib/title'

const states: (Force | undefined)[] = [undefined, 'hover', 'focus', 'pressed']
const label = (s?: Force) => s ?? 'default'

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-12">
      <h2 id={id} className="font-script text-[44px] font-bold leading-none text-ink">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Cell({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="text-[13px] text-muted">{name}</span>
    </div>
  )
}

export function StyleGuide() {
  useTitle('Style guide')
  const { toast } = useStore()
  const [replay, setReplay] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [modal, setModal] = useState(false)
  const [swatch, setSwatch] = useState('tan')
  const [qty, setQty] = useState(2)
  const [chip, setChip] = useState(true)

  return (
    <div className="mx-auto max-w-[1120px] px-4 pt-14 sm:px-6">
      <header>
        <ScriptTitle>Style guide</ScriptTitle>
        <p className="mt-3 max-w-xl text-[18px] text-body">Every token and component {brand.name} is built from, rendered by the real components. Pinned states use a data-force attribute on the component itself.</p>
      </header>

      <Section id="sg-colour" title="Colour">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {colours.map((c) => (
            <li key={c.name} className="overflow-hidden rounded-card border border-line">
              <div className="h-20" style={{ backgroundColor: c.hex }} />
              <div className="px-3 py-2.5">
                <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                <p className="text-[13px] text-muted tabular-nums">{c.hex}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-muted">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-[15px] font-semibold text-ink">Leather palette (product data)</h3>
        <ul className="mt-3 flex flex-wrap gap-4">
          {leathers.map((l) => (
            <li key={l.id} className="flex items-center gap-2 text-[14px] text-body">
              <span className="round size-6 rounded-full border border-black/10" style={{ backgroundColor: l.hex }} />
              {l.name} <span className="text-muted tabular-nums">{l.hex}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sg-type" title="Type">
        <ul className="space-y-6">
          {typeScale.map((t) => (
            <li key={t.name} className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline">
              <div>
                <p className="text-[14px] font-semibold text-ink">{t.name}</p>
                <p className="text-[13px] text-muted">{t.spec}</p>
              </div>
              <p className={t.className}>{t.sample}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-lead text-body">
          Running copy with a{' '}
          <a className="text-link" href="#sg-type">
            text link
          </a>{' '}
          and its{' '}
          <a className="text-link" data-force="hover" href="#sg-type">
            hover state
          </a>
          .
        </p>
        <Signature name={brand.maker} className="mt-6 justify-start" />
      </Section>

      <Section id="sg-space" title="Spacing, radii, shadows">
        <div className="flex flex-wrap items-end gap-4">
          {spacing.map((s) => (
            <Cell key={s} name={`${s}px`}>
              <div className="rounded-[4px] bg-tan" style={{ width: s, height: s }} />
            </Cell>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
          {radii.map((r) => (
            <Cell key={r.name} name={`${r.name}, ${r.value}`}>
              <div className="size-24 border-2 border-ink bg-cream" style={{ borderRadius: r.value }} />
            </Cell>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-6">
          {shadows.map((s) => (
            <Cell key={s.name} name={s.name}>
              <div className={`size-28 rounded-card bg-page ${s.className}`} />
            </Cell>
          ))}
        </div>
      </Section>

      <Section id="sg-motion" title="Motion">
        <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
          <RotateCcw aria-hidden /> Replay
        </Button>
        <div key={replay} className="mt-6 grid gap-4 sm:grid-cols-4">
          {motionTokens.map((m) => (
            <div key={m.name} className="rounded-card border border-line p-5">
              <div className="grid h-24 place-items-center">
                {m.name === 'typing' ? (
                  <TypingDots label="Typing example" />
                ) : (
                  <span className={`round block size-12 rounded-full bg-tan ${m.className}`} style={{ ['--tilt' as string]: '0deg' }} />
                )}
              </div>
              <p className="mt-3 text-[14px] font-semibold text-ink">{m.name}</p>
              <p className="text-[13px] text-muted">{m.spec}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-muted">Reduced motion stops the loops, the hero float and the entrance animations.</p>
      </Section>

      <Section id="sg-buttons" title="Buttons">
        {(['primary', 'blue', 'secondary', 'ghost'] as const).map((v) => (
          <div key={v} className="mb-6 flex flex-wrap items-end gap-4">
            {states.map((s) => (
              <Cell key={label(s)} name={`${v}, ${label(s)}`}>
                <Button variant={v} force={s}>
                  Add to bag
                </Button>
              </Cell>
            ))}
            <Cell name={`${v}, disabled`}>
              <Button variant={v} disabled>
                Add to bag
              </Button>
            </Cell>
            <Cell name={`${v}, loading`}>
              <Button variant={v} loading>
                Adding
              </Button>
            </Cell>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-4">
          <Cell name="sm">
            <Button size="sm">Small</Button>
          </Cell>
          <Cell name="md">
            <Button>Medium</Button>
          </Cell>
          <Cell name="lg, with icon">
            <Button size="lg">
              Send request <ArrowRight aria-hidden />
            </Button>
          </Cell>
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-4">
          {states.map((s) => (
            <Cell key={label(s)} name={`icon, ${label(s)}`}>
              <IconButton label="Save" force={s}>
                <Heart aria-hidden />
              </IconButton>
            </Cell>
          ))}
          <Cell name="icon, disabled">
            <IconButton label="Save" disabled>
              <Heart aria-hidden />
            </IconButton>
          </Cell>
          <Cell name="icon, badge">
            <IconButton label="Bag" badge={3}>
              <ShoppingBag aria-hidden />
            </IconButton>
          </Cell>
        </div>
      </Section>

      <Section id="sg-choices" title="Chips, swatches, stepper">
        <div className="flex flex-wrap items-end gap-4">
          {states.map((s) => (
            <Cell key={label(s)} name={`chip, ${label(s)}`}>
              <Chip force={s}>Pouches</Chip>
            </Cell>
          ))}
          <Cell name="chip, selected (toggle me)">
            <Chip selected={chip} onClick={() => setChip((c) => !c)}>
              Everything
            </Chip>
          </Cell>
          <Cell name="chip, disabled">
            <Chip disabled>Desk</Chip>
          </Cell>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <SwatchGroup label="Swatches" options={leathers.slice(0, 5)} value={swatch} onChange={setSwatch} />
          <SwatchGroup label="First pinned to hover" options={leathers.slice(0, 3)} value="cream" onChange={() => {}} force="hover" />
          <SwatchGroup label="First pinned to focus" options={leathers.slice(0, 3)} value="cream" onChange={() => {}} force="focus" size="sm" />
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-6">
          <Cell name="stepper">
            <Stepper label="Quantity" value={qty} max={5} onChange={setQty} />
          </Cell>
          <Cell name="stepper, at minimum">
            <Stepper label="Quantity at minimum" value={1} max={5} onChange={() => {}} />
          </Cell>
          <Cell name="stepper, small">
            <Stepper label="Small quantity" size="sm" value={5} max={5} onChange={() => {}} />
          </Cell>
          <Cell name="stock tags">
            <div className="flex gap-2">
              <StockTag stock={2} />
              <StockTag stock={0} />
            </div>
          </Cell>
        </div>
      </Section>

      <Section id="sg-fields" title="Fields">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Default" placeholder="A film camera" />
          <Input label="Hover" placeholder="A film camera" force="hover" />
          <Input label="Focus" placeholder="A film camera" force="focus" />
          <Input label="Filled, with hint" defaultValue="A fountain pen" hint="Hints sit under the field." />
          <Input label="Error" defaultValue="me@" error="Enter a valid email address." />
          <Input label="Disabled" defaultValue="Not editable" disabled />
          <Select label="Select" defaultValue="b">
            <option value="a">Pouch</option>
            <option value="b">Case or sleeve</option>
          </Select>
          <div>
            <p className="mb-2 text-[14px] font-semibold text-ink">Toolbar select</p>
            <InlineSelect label="Sort example" defaultValue="new">
              <option value="new">Newest first</option>
              <option value="low">Price, low to high</option>
            </InlineSelect>
          </div>
          <Textarea label="Textarea, with counter" counter="0/600" placeholder="Photos you like, a story, initials…" />
        </div>
      </Section>

      <Section id="sg-chat" title="Chat">
        <div className="doodle-bg max-w-[520px] space-y-2 rounded-panel p-6">
          <div className="text-center">
            <DateChip>9 Nov 2026</DateChip>
          </div>
          <Bubble from="them">could you make one for my film camera?</Bubble>
          <Bubble from="me">Yes! Pick a colour.</Bubble>
          <TypingDots label="Typing example" />
        </div>
      </Section>

      <Section id="sg-cards" title="Product cards">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {states.slice(0, 3).map((s, i) => (
            <Cell key={label(s)} name={label(s)}>
              <ProductCard product={products[i + 1]} force={s} className="w-full" />
            </Cell>
          ))}
          <Cell name="sold out">
            <ProductCard product={products.find((p) => p.stock === 0)!} className="w-full" />
          </Cell>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Cell name="loading">
            <div className="w-full">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="mt-3 h-4 w-2/3 rounded-md" />
              <Skeleton className="mt-2 h-3 w-1/2 rounded-md" />
            </div>
          </Cell>
        </div>
      </Section>

      <Section id="sg-feedback" title="Feedback and overlays">
        <div className="grid gap-3 sm:grid-cols-3">
          <Notice>Draft saved in this browser.</Notice>
          <Notice tone="success">Order request sent.</Notice>
          <Notice tone="error">That did not send. Try again.</Notice>
        </div>
        <div className="mt-6">
          <EmptyState icon={<Scissors aria-hidden strokeWidth={1.6} />} title="Empty state" body="Shown when a filter matches nothing or the bag is empty.">
            <Button variant="secondary" size="sm">
              An action
            </Button>
          </EmptyState>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => toast('Removed card wallet', { label: 'Undo', run: () => toast('Restored') })}>
            Show a toast
          </Button>
          <Button variant="secondary" onClick={() => setDrawer(true)}>
            Open a drawer
          </Button>
          <Button variant="secondary" onClick={() => setModal(true)}>
            Open a modal
          </Button>
        </div>
        <Drawer open={drawer} onClose={() => setDrawer(false)} title="Drawer">
          <p className="text-body">Focus is trapped here. Escape or the scrim closes it, and focus returns to the button that opened it.</p>
        </Drawer>
        <Modal open={modal} onClose={() => setModal(false)} title="Modal">
          <p className="text-body">The same focus and Escape behaviour as the drawer.</p>
          <Button className="mt-5" onClick={() => setModal(false)}>
            Done
          </Button>
        </Modal>
      </Section>
    </div>
  )
}
