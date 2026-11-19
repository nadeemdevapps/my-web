import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'

import { ButtonLink } from '../components/Button'
import { CartLines, FreeShippingNote, SummaryRows } from '../components/Cart'
import { Card, EmptyState, PageHeader } from '../components/Primitives'
import { formatDate, formatMoney } from '../lib/format'
import { useStore } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function CartPage() {
  useDocumentTitle('Cart')
  const { cart, summary, orders } = useStore()
  return (
    <>
      <PageHeader title="Your cart" body={cart.length ? `${summary.count} ${summary.count === 1 ? 'device' : 'devices'}, each with its own first message.` : undefined} />
      <div className="container-page pb-24">
        {cart.length ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
            <div className="border-t border-line">
              <CartLines />
            </div>
            <Card className="h-fit space-y-5 p-6 lg:sticky lg:top-8">
              <h2 className="text-xl">Summary</h2>
              <SummaryRows totals={summary} shippingLabel="Standard shipping" />
              <FreeShippingNote subtotal={summary.subtotal} />
              <ButtonLink to="/checkout" className="w-full" iconRight={<ArrowRight className="size-4" aria-hidden />}>
                Check out
              </ButtonLink>
              <p className="text-center text-sm text-muted">Demo store: no payment is taken.</p>
            </Card>
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingBag className="size-8" aria-hidden />}
            title="Your cart is empty"
            body="Pick a colour and write the first message your Tally Bar will show."
            action={<ButtonLink to="/shop">Configure yours</ButtonLink>}
          />
        )}

        {orders.length > 0 && (
          <section aria-labelledby="orders-title" className="mt-20">
            <h2 id="orders-title" className="font-display text-3xl">
              Recent orders
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {orders.map((o) => (
                <li key={o.id}>
                  <Link to={`/orders/${o.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-xs)] py-4 hover:bg-ink/3">
                    <span className="font-mono">{o.id}</span>
                    <span className="text-muted">{formatDate(o.createdAt)}</span>
                    <span className="text-muted">{o.totals.count} {o.totals.count === 1 ? 'device' : 'devices'}</span>
                    <span className="tabular">{formatMoney(o.totals.total)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
