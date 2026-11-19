import { ShoppingBag, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

import { PHOTOS } from '../data'
import { cx } from '../lib/cx'
import { formatMoney } from '../lib/format'
import { useStore } from '../lib/store'
import { ADDONS, BODY_COLOURS, DEVICE, LED_COLOURS, SHIPPING, lineKey, unitPrice, type CartLine, type Totals } from '../shared/catalog'
import { Button, ButtonLink } from './Button'
import { DeviceShot } from './DeviceShot'
import { Drawer } from './Overlay'
import { EmptyState, QuantityStepper } from './Primitives'

export function lineDetails(line: CartLine) {
  const colour = BODY_COLOURS.find((c) => c.id === line.colour)
  const led = LED_COLOURS.find((c) => c.id === line.led)
  const addons = line.addons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean)
  return { colour, led, addons }
}

/** The configured device as a small picture, with its own message lit. */
export function LineThumb({ line, className }: { line: CartLine; className?: string }) {
  const { led } = lineDetails(line)
  return (
    <DeviceShot
      photo={PHOTOS.front[line.colour]}
      text={line.message || ' '}
      color={led?.hex ?? '#ff3b30'}
      className={cx('w-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-canvas-2 sm:w-32', className)}
      label={line.message ? `Preview reads ${line.message}` : 'Preview with a blank display'}
    />
  )
}

export function CartLines({ editable = true }: { editable?: boolean }) {
  const { cart, setQty, remove } = useStore()
  return (
    <ul className="divide-y divide-line">
      {cart.map((line) => {
        const key = lineKey(line)
        const { colour, led, addons } = lineDetails(line)
        return (
          <li key={key} className="flex gap-4 py-5">
            <LineThumb line={line} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[17px] text-ink">{DEVICE.name}</p>
                <p className="tabular text-ink">{formatMoney(unitPrice(line) * line.qty)}</p>
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {colour?.name} body, {led?.name.toLowerCase()} LEDs
              </p>
              <p className="text-sm text-muted">{line.message ? <>Message “{line.message}”</> : 'No preset message'}</p>
              {addons.length > 0 && <p className="text-sm text-muted">With {addons.join(', ').toLowerCase()}</p>}
              {editable ? (
                <div className="mt-3 flex items-center gap-2">
                  <QuantityStepper value={line.qty} onChange={(q) => setQty(key, q)} max={DEVICE.maxQty} label="Quantity" />
                  <button type="button" onClick={() => remove(key)} className="inline-flex h-11 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-sm text-muted hover:bg-ink/6 hover:text-ink">
                    <Trash2 className="size-4" aria-hidden />
                    Remove
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-sm text-muted">Quantity {line.qty}</p>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function SummaryRows({ totals, shippingLabel }: { totals: Pick<Totals, 'subtotal' | 'shipping' | 'tax' | 'total'>; shippingLabel?: string }) {
  const rows: [string, string][] = [
    ['Subtotal', formatMoney(totals.subtotal)],
    [shippingLabel ?? 'Shipping', totals.shipping === 0 ? 'Free' : formatMoney(totals.shipping)],
    [`Tax (${Math.round(SHIPPING.taxRate * 100)}%)`, formatMoney(totals.tax)],
  ]
  return (
    <dl className="space-y-2 text-[15px]">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between">
          <dt className="text-muted">{k}</dt>
          <dd className="tabular">{v}</dd>
        </div>
      ))}
      <div className="flex justify-between border-t border-line pt-3 text-lg">
        <dt>Total</dt>
        <dd className="tabular">{formatMoney(totals.total)}</dd>
      </div>
    </dl>
  )
}

export function FreeShippingNote({ subtotal }: { subtotal: number }) {
  const left = SHIPPING.freeOver - subtotal
  if (subtotal === 0) return null
  return (
    <p className="text-sm text-muted">
      {left > 0 ? <>Add {formatMoney(left)} more for free standard shipping.</> : 'Standard shipping is free on this order.'}
    </p>
  )
}

export function CartDrawer() {
  const { cart, summary, cartOpen, setCartOpen } = useStore()
  const navigate = useNavigate()
  const close = () => setCartOpen(false)
  return (
    <Drawer
      open={cartOpen}
      onClose={close}
      title="Your cart"
      description={cart.length ? `${summary.count} ${summary.count === 1 ? 'device' : 'devices'}` : undefined}
      footer={
        cart.length ? (
          <div className="space-y-4">
            <SummaryRows totals={summary} />
            <FreeShippingNote subtotal={summary.subtotal} />
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => { close(); navigate('/cart') }}>
                View cart
              </Button>
              <Button onClick={() => { close(); navigate('/checkout') }}>Check out</Button>
            </div>
          </div>
        ) : undefined
      }
    >
      {cart.length ? (
        <CartLines />
      ) : (
        <EmptyState
          icon={<ShoppingBag className="size-8" aria-hidden />}
          title="Your cart is empty"
          body="Pick a colour and write the first message your Tally Bar will show."
          action={<ButtonLink to="/shop" onClick={close}>Configure yours</ButtonLink>}
        />
      )}
    </Drawer>
  )
}
