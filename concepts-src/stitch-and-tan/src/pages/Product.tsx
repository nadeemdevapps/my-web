import { ArrowLeft, Check, Clock, Ruler } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useId, useState, type KeyboardEvent } from 'react'
import { Link, useParams } from 'react-router'

import { ProductCard, StockTag } from '../components/ProductCard'
import { Button, ButtonLink, EmptyState, Input, ScriptTitle, Stepper, SwatchGroup } from '../components/ui'
import { findLeather, findProduct, leathers, photos, productPage as copy, products } from '../content'
import { cx } from '../lib/cx'
import { money } from '../lib/money'
import { MAX_QTY, useStore } from '../lib/store'
import { useTitle } from '../lib/title'

type Tab = keyof typeof copy.tabs

function Tabs({ details }: { details: string[] }) {
  const [tab, setTab] = useState<Tab>('details')
  const base = useId()
  const keys = Object.keys(copy.tabs) as Tab[]
  const content: Record<Tab, string[]> = { details, care: copy.care, shipping: copy.shipping }
  const onKey = (e: KeyboardEvent) => {
    const i = keys.indexOf(tab)
    const next = e.key === 'ArrowRight' ? keys[(i + 1) % keys.length] : e.key === 'ArrowLeft' ? keys[(i + keys.length - 1) % keys.length] : null
    if (next) {
      e.preventDefault()
      setTab(next)
      document.getElementById(`${base}-${next}-tab`)?.focus()
    }
  }
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="About this piece" className="flex gap-1 border-b border-line" onKeyDown={onKey}>
        {keys.map((k) => (
          <button
            key={k}
            id={`${base}-${k}-tab`}
            role="tab"
            type="button"
            aria-selected={tab === k}
            aria-controls={`${base}-${k}-panel`}
            tabIndex={tab === k ? 0 : -1}
            onClick={() => setTab(k)}
            className={cx('-mb-px h-11 border-b-2 px-3 text-[15px] font-semibold transition-colors', tab === k ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink')}
          >
            {copy.tabs[k]}
          </button>
        ))}
      </div>
      <div id={`${base}-${tab}-panel`} role="tabpanel" aria-labelledby={`${base}-${tab}-tab`} tabIndex={0} className="rounded-field pt-5">
      <ul className="space-y-2.5">
        {content[tab].map((line) => (
          <li key={line} className="flex gap-3 text-body">
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-green" />
            {line}
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export function ProductPage() {
  const { slug = '' } = useParams()
  const product = findProduct(slug)
  useTitle(product?.name ?? 'Not found')
  const { add, setCartOpen } = useStore()
  const [leather, setLeather] = useState(product?.colours[0] ?? '')
  const [monogram, setMonogram] = useState('')
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setLeather(product?.colours[0] ?? '')
    setMonogram('')
    setQty(1)
    setStatus('idle')
    setTouched(false)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-[720px] px-4 pt-16">
        <EmptyState title={copy.notFoundTitle} body={copy.notFoundBody}>
          <ButtonLink to="/shop">{copy.back}</ButtonLink>
        </EmptyState>
      </div>
    )
  }

  const monogramOk = /^[A-Za-z]{0,3}$/.test(monogram)
  const soldOut = product.stock === 0
  const max = Math.min(MAX_QTY, product.stock)
  const options = leathers.filter((l) => product.colours.includes(l.id))
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).concat(products.filter((p) => p.category !== product.category)).slice(0, 3)

  const onAdd = () => {
    setTouched(true)
    if (!monogramOk) return
    setStatus('adding')
    window.setTimeout(() => {
      add({ slug: product.slug, leather, monogram: monogram.toUpperCase() }, qty)
      setStatus('added')
      setCartOpen(true)
      window.setTimeout(() => setStatus('idle'), 1600)
    }, 450)
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 pt-8 sm:px-6 sm:pt-12">
      <Link to="/shop" className="round inline-flex h-10 items-center gap-1.5 rounded-full pr-3 text-[15px] font-medium text-muted transition-colors hover:text-ink">
        <ArrowLeft aria-hidden className="size-[18px]" /> {copy.back}
      </Link>
      <div className="mt-4 grid gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="doodle-bg relative grid aspect-square place-items-center overflow-hidden rounded-panel">
            <motion.img
              key={product.slug}
              src={photos[product.photo]}
              alt={`${product.name} in ${findLeather(product.colours[0]).name.toLowerCase()} leather`}
              width={880}
              height={880}
              initial={{ opacity: 0, y: 16, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="cutout relative size-[82%] object-contain"
            />
            <div className="absolute left-4 top-4">
              <StockTag stock={product.stock} />
            </div>
          </div>
          <p className="mt-3 text-center text-[14px] text-muted">{copy.photoNote(findLeather(product.colours[0]).name)}</p>
        </div>

        <div>
          <ScriptTitle className="!leading-[1]">{product.name}</ScriptTitle>
          <p className="mt-3 text-[24px] font-semibold text-ink tabular-nums">{money(product.price)}</p>
          <p className="mt-4 text-[18px] leading-relaxed text-body">{product.story}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
            <li className="inline-flex items-center gap-2">
              <Clock aria-hidden className="size-4" /> {copy.lead(product.leadDays)}
            </li>
            <li className="inline-flex items-center gap-2">
              <Ruler aria-hidden className="size-4" /> {copy.size}: {product.size}
            </li>
          </ul>

          <div className="mt-8 space-y-6 border-t border-line pt-7">
            {soldOut ? (
              <div className="rounded-card bg-cream p-5">
                <p className="font-semibold text-ink">{copy.soldOut}</p>
                <p className="mt-1 text-body">{copy.soldOutBody}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button disabled>{copy.soldOut}</Button>
                  <ButtonLink to={`/custom?kind=${encodeURIComponent(product.category === 'cases' ? 'Case or sleeve' : 'Pouch')}&holds=${encodeURIComponent(product.name)}`} variant="blue">
                    {copy.soldOutCta}
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <>
                <SwatchGroup label={copy.leather} options={options} value={leather} onChange={setLeather} />
                {product.monogram && (
                  <div className="max-w-[260px]">
                    <Input
                      label={copy.monogram}
                      value={monogram}
                      maxLength={3}
                      onChange={(e) => setMonogram(e.target.value)}
                      onBlur={() => setTouched(true)}
                      placeholder="TM"
                      autoComplete="off"
                      className="uppercase tracking-[0.2em] placeholder:tracking-[0.2em]"
                      hint={copy.monogramHint}
                      error={touched && !monogramOk ? copy.monogramError : undefined}
                    />
                  </div>
                )}
                <div>
                  <p className="mb-2.5 text-[14px] font-semibold text-ink">{copy.quantity}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Stepper label={copy.quantity} value={qty} max={max} onChange={(n) => setQty(Math.max(1, Math.min(max, n)))} />
                    <Button size="lg" className="min-w-[200px] flex-1 sm:flex-none" loading={status === 'adding'} onClick={onAdd}>
                      {status === 'added' && <Check aria-hidden />}
                      {status === 'adding' ? copy.adding : status === 'added' ? copy.added : `${copy.add}, ${money(product.price * qty)}`}
                    </Button>
                  </div>
                  <p className="mt-3 text-[14px] text-muted">{product.stock <= 3 ? copy.stockLow(product.stock) : copy.stockOk}</p>
                </div>
              </>
            )}
          </div>
          <Tabs details={product.details} />
        </div>
      </div>

      <section aria-labelledby="related" className="mt-24">
        <ScriptTitle as="h2" size="md">
          <span id="related">{copy.related}</span>
        </ScriptTitle>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
