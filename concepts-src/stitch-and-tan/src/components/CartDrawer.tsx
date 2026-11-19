import { CheckCircle2, ShoppingBag, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

import { cart, findLeather, photos } from '../content'
import { post } from '../lib/api'
import { money } from '../lib/money'
import { MAX_QTY, useStore } from '../lib/store'
import { Drawer } from './Overlay'
import { Button, ButtonLink, EmptyState, IconButton, Input, Notice, Stepper } from './ui'

export function CartDrawer() {
  const { items, subtotal, cartOpen, setCartOpen, setQuantity, remove, clearCart } = useStore()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'error'; message?: string } | { status: 'done'; reference: string }>({ status: 'idle' })
  const close = () => {
    setCartOpen(false)
    if (state.status === 'done' || state.status === 'error') setState({ status: 'idle' })
  }
  const left = Math.max(0, cart.freeShip - subtotal)
  const progress = Math.min(100, (subtotal / cart.freeShip) * 100)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Enter an email so I can send the payment link.')
      return
    }
    setEmailError(undefined)
    setState({ status: 'sending' })
    const res = await post('/api/orders', { email: email.trim(), items: items.map((i) => ({ slug: i.slug, leather: i.leather, monogram: i.monogram, quantity: i.quantity })) })
    if (res.ok && res.reference) {
      clearCart()
      setState({ status: 'done', reference: res.reference })
    } else {
      setState({ status: 'error', message: res.ok ? cart.error : res.fields?.email ?? res.error })
    }
  }

  const done = state.status === 'done'

  return (
    <Drawer
      open={cartOpen}
      onClose={close}
      title={cart.title}
      footer={
        !done && items.length > 0 ? (
          <form onSubmit={submit} noValidate className="space-y-4">
            <div className="flex items-baseline justify-between text-[16px]">
              <span className="text-body">{cart.subtotal}</span>
              <span className="text-[20px] font-semibold text-ink tabular-nums">{money(subtotal)}</span>
            </div>
            <Input label={cart.emailLabel} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} placeholder="you@example.com" />
            {state.status === 'error' && <Notice tone="error">{state.message}</Notice>}
            <Button type="submit" size="lg" className="w-full" loading={state.status === 'sending'}>
              {state.status === 'sending' ? cart.checkingOut : cart.checkout}
            </Button>
            <p className="text-[13px] leading-relaxed text-muted">{cart.note}</p>
          </form>
        ) : undefined
      }
    >
      {done ? (
        <div className="flex flex-col items-center py-10 text-center" role="status">
          <CheckCircle2 aria-hidden className="size-12 animate-pop text-green" strokeWidth={1.6} />
          <h3 className="mt-4 font-script text-[40px] font-bold leading-none text-ink">{cart.successTitle}</h3>
          <p className="mt-3 max-w-xs text-body">{cart.successBody(state.reference)}</p>
          <Button variant="secondary" className="mt-6" onClick={close} data-autofocus>
            {cart.keepShopping}
          </Button>
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={<ShoppingBag aria-hidden strokeWidth={1.6} />} title={cart.empty} body={cart.emptyBody}>
          <ButtonLink to="/shop" onClick={close}>
            {cart.emptyCta}
          </ButtonLink>
        </EmptyState>
      ) : (
        <>
          <div className="mb-5 rounded-field bg-cream px-4 py-3">
            <p className="text-[14px] font-medium text-ink">{left > 0 ? cart.freeShipLeft(money(left)) : cart.freeShipDone}</p>
            <div className="round mt-2 h-1.5 overflow-hidden rounded-full bg-cream-deep" role="progressbar" aria-label="Progress to free shipping" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="round h-full rounded-full bg-tan transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {items.map((i) => (
              <li key={`${i.slug}-${i.leather}-${i.monogram}`} className="flex gap-4 py-4 first:pt-0">
                <Link to={`/shop/${i.slug}`} onClick={close} className="size-20 shrink-0 overflow-hidden rounded-field bg-paper">
                  <img src={photos[i.product.photo]} alt={i.product.name} className="cutout size-full object-contain p-1.5" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">{i.product.name}</p>
                      <p className="text-[14px] text-muted">
                        {findLeather(i.leather).name}
                        {i.monogram && `, initials ${i.monogram}`}
                      </p>
                    </div>
                    <p className="font-semibold text-ink tabular-nums">{money(i.product.price * i.quantity)}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <Stepper size="sm" label={`Quantity of ${i.product.name}`} value={i.quantity} max={MAX_QTY} onChange={(n) => setQuantity(i, n)} />
                    <IconButton label={`${cart.remove} ${i.product.name}`} size="sm" onClick={() => remove(i)}>
                      <Trash2 aria-hidden />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Drawer>
  )
}
