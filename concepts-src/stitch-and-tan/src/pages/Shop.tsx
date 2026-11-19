import { Scissors, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { ProductCard } from '../components/ProductCard'
import { Button, ButtonLink, Chip, EmptyState, InlineSelect, ScriptTitle } from '../components/ui'
import { categories, products, shop, type Category } from '../content'
import { useTitle } from '../lib/title'

export function Shop() {
  useTitle('Shop')
  const [params, setParams] = useSearchParams()
  const cat = (params.get('c') ?? 'all') as Category | 'all'
  const sort = params.get('sort') ?? 'new'
  const q = params.get('q') ?? ''
  const ready = params.get('ready') === '1'

  const set = (key: string, value: string | null) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === null || value === '' || (key === 'c' && value === 'all') || (key === 'sort' && value === 'new')) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = products.filter((p) => (cat === 'all' || p.category === cat) && (!ready || p.stock > 0) && (!needle || `${p.name} ${p.short}`.toLowerCase().includes(needle)))
    return out.sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : b.added.localeCompare(a.added)))
  }, [cat, sort, q, ready])

  const filtered = cat !== 'all' || ready || q

  return (
    <div className="mx-auto max-w-[1120px] px-4 pt-14 sm:px-6 sm:pt-20">
      <header className="text-center">
        <ScriptTitle>{shop.title}</ScriptTitle>
        <p className="mx-auto mt-4 max-w-[480px] text-[18px] text-body">{shop.body}</p>
      </header>

      <div className="mt-10 flex flex-col gap-4">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0" role="group" aria-label="Category">
          {categories.map((c) => (
            <Chip key={c.id} selected={cat === c.id} onClick={() => set('c', c.id)} className="shrink-0">
              {c.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col items-stretch justify-between gap-3 border-y border-line py-3 sm:flex-row sm:items-center">
          <label className="relative flex-1 sm:max-w-[320px]">
            <span className="sr-only">{shop.search}</span>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => set('q', e.target.value)}
              placeholder={shop.search}
              className="h-10 w-full rounded-control border border-line-strong bg-page pl-11 pr-4 text-[15px] text-ink placeholder:text-faint hover:border-ink focus:border-blue focus:outline-none focus:shadow-[0_0_0_3px_var(--color-blue-soft)]"
            />
          </label>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <label className="inline-flex h-10 cursor-pointer items-center gap-2.5 text-[14px] font-medium text-ink">
              <input type="checkbox" checked={ready} onChange={(e) => set('ready', e.target.checked ? '1' : null)} className="size-[18px] accent-ink" />
              {shop.inStock}
            </label>
            <InlineSelect label="Sort" value={sort} onChange={(e) => set('sort', e.target.value)}>
              {shop.sort.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </InlineSelect>
          </div>
        </div>
        <div className="flex items-center justify-between text-[14px] text-muted" aria-live="polite">
          <span>{shop.count(list.length)}</span>
          {filtered && (
            <Button variant="ghost" size="sm" onClick={() => setParams({}, { replace: true })}>
              <X aria-hidden /> {shop.clear}
            </Button>
          )}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={<Scissors aria-hidden strokeWidth={1.6} />} title={shop.emptyTitle} body={shop.emptyBody}>
            <ButtonLink to="/custom" variant="blue">
              {shop.emptyCta}
            </ButtonLink>
            <Button variant="secondary" onClick={() => setParams({}, { replace: true })}>
              {shop.clear}
            </Button>
          </EmptyState>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">
          <AnimatePresence initial={false}>
            {list.map((p) => (
              <motion.li key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
