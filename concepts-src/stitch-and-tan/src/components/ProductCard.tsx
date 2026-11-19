import { Link } from 'react-router'

import { leathers, photos, type Product } from '../content'
import { cx } from '../lib/cx'
import { money } from '../lib/money'
import type { Force } from './ui'

export function StockTag({ stock }: { stock: number }) {
  if (stock > 3) return null
  return (
    <span className={cx('inline-flex h-7 items-center rounded-chip px-2.5 text-[13px] font-semibold', stock === 0 ? 'bg-ink text-white' : 'bg-tan-soft text-tan-text')}>
      {stock === 0 ? 'Sold out' : `${stock} left`}
    </span>
  )
}

/** Product tile: a cut-out on paper that tilts up on hover. */
export function ProductCard({ product, force, className }: { product: Product; force?: Force; className?: string }) {
  return (
    <Link
      to={`/shop/${product.slug}`}
      data-force={force}
      className={cx('group block rounded-card is-focus:outline is-focus:outline-[2.5px] is-focus:outline-offset-4 is-focus:outline-blue', className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-card bg-paper transition-colors duration-300 group-hover:bg-cream group-data-[force=hover]:bg-cream">
        <img
          src={photos[product.photo]}
          alt=""
          loading="lazy"
          width={880}
          height={880}
          className="cutout size-full object-contain p-[9%] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1.5 group-hover:-rotate-3 group-hover:scale-[1.04] group-data-[force=hover]:-translate-y-1.5 group-data-[force=hover]:-rotate-3 group-data-[force=hover]:scale-[1.04] group-active:scale-100"
        />
        <div className="absolute left-3 top-3">
          <StockTag stock={product.stock} />
        </div>
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-[16px] font-semibold text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[14px] text-muted">{product.short}</p>
        </div>
        <p className="text-[16px] font-semibold text-ink tabular-nums">{money(product.price)}</p>
      </div>
      <span className="sr-only">{`${product.colours.length} leather colours`}</span>
      <div aria-hidden className="mt-2 flex gap-1 px-1">
        {product.colours.map((c) => (
          <span key={c} className="round size-3.5 rounded-full border border-black/10" style={{ backgroundColor: leathers.find((l) => l.id === c)?.hex }} />
        ))}
      </div>
    </Link>
  )
}
