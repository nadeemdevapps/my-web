import { CircleCheck } from 'lucide-react'
import { useParams } from 'react-router'

import { ButtonLink } from '../components/Button'
import { LineThumb, lineDetails, SummaryRows } from '../components/Cart'
import { LedMatrix } from '../components/LedMatrix'
import { Card, EmptyState, PageHeader, SpecRows } from '../components/Primitives'
import { formatDate, formatMoney } from '../lib/format'
import { useDevice, useStore } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { DEVICE, unitPrice } from '../shared/catalog'

export function OrderPage() {
  const { id } = useParams()
  const { orders } = useStore()
  const { ledHex } = useDevice()
  const order = orders.find((o) => o.id === id)
  useDocumentTitle(order ? `Order ${order.id}` : 'Order not found')

  if (!order)
    return (
      <>
        <PageHeader title="Order not found" />
        <div className="container-page pb-24">
          <EmptyState title={`We cannot find ${id ?? 'that order'} on this device`} body="Orders are kept in this browser. Check the link, or look at your recent orders." action={<ButtonLink to="/cart" variant="outline">Recent orders</ButtonLink>} />
        </div>
      </>
    )

  return (
    <>
      <PageHeader eyebrow={`Order ${order.id}`} title={`Thank you, ${order.customer.name.split(' ')[0]}`} body={`A receipt is on its way to ${order.customer.email}. We will email tracking when it ships.`}>
        <div className="mt-10 aspect-[6/1] max-w-3xl rounded-[var(--radius-lg)] bg-screen p-4 sm:aspect-[7/1]">
          <LedMatrix text="THANK YOU!" color={ledHex} rows={14} label="Display reads THANK YOU!" />
        </div>
      </PageHeader>
      <div className="container-page grid gap-10 pb-24 lg:grid-cols-[1fr_24rem]">
        <div>
          <p className="flex items-center gap-2 text-success">
            <CircleCheck className="size-5" aria-hidden />
            Confirmed {formatDate(order.createdAt)}
          </p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {order.lines.map((line, i) => {
              const { colour, led, addons } = lineDetails(line)
              return (
                <li key={i} className="flex gap-4 py-5">
                  <LineThumb line={line} />
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <p className="text-[17px]">
                        {DEVICE.name} × {line.qty}
                      </p>
                      <p className="tabular">{formatMoney(unitPrice(line) * line.qty)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-muted">
                      {colour?.name} body, {led?.name.toLowerCase()} LEDs{line.message ? `, “${line.message}”` : ''}
                    </p>
                    {addons.length > 0 && <p className="text-sm text-muted">With {addons.join(', ').toLowerCase()}</p>}
                  </div>
                </li>
              )
            })}
          </ul>
          <SpecRows
            className="mt-8"
            rows={[
              ['Deliver to', `${order.customer.city}, ${order.customer.country}`],
              ['Shipping', order.shipping],
              ['Payment', order.payment],
            ]}
          />
        </div>
        <Card className="h-fit space-y-5 p-6">
          <h2 className="text-xl">Total</h2>
          <SummaryRows totals={order.totals} shippingLabel={`${order.shipping} shipping`} />
          <ButtonLink to="/apps" variant="outline" className="w-full">
            Pick apps while you wait
          </ButtonLink>
        </Card>
      </div>
    </>
  )
}
