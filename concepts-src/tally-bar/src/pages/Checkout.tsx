import { Lock, ShoppingBag } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, ButtonLink, TextLink } from '../components/Button'
import { CartLines, SummaryRows } from '../components/Cart'
import { Check, Field, FormMessage, Input, Select } from '../components/Field'
import { Card, EmptyState, PageHeader } from '../components/Primitives'
import { postJson } from '../lib/api'
import { formatMoney } from '../lib/format'
import { useStore, type Order } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { SHIPPING, shippingPrice, totals, type ShippingId, type Totals } from '../shared/catalog'
import { COUNTRIES, checkoutErrors, type CheckoutInput, type FieldErrors } from '../shared/validation'

const EMPTY: CheckoutInput = { name: '', email: '', address: '', city: '', postcode: '', country: 'United States', shipping: 'standard', payment: 'card' }

export function Checkout() {
  useDocumentTitle('Checkout')
  const { cart, clear, addOrder } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutInput>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const sum = totals(cart, form.shipping as ShippingId)
  const set = (key: keyof CheckoutInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(EMPTY).find((k) => errs[k])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    const errs = checkoutErrors(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setFormError('Check the highlighted fields.')
      focusFirstError(errs)
      return
    }
    setBusy(true)
    const res = await postJson<{ id: string; createdAt: string; totals: Totals }>('/api/orders', { lines: cart, customer: form })
    setBusy(false)
    if (!res.ok) {
      setFormError(res.error)
      if (res.fieldErrors) {
        setErrors(res.fieldErrors)
        focusFirstError(res.fieldErrors)
      }
      return
    }
    const order: Order = {
      id: res.data.id,
      createdAt: res.data.createdAt,
      lines: cart,
      totals: res.data.totals,
      customer: { name: form.name.trim(), email: form.email.trim(), city: form.city.trim(), country: form.country },
      shipping: SHIPPING[form.shipping as ShippingId].name,
      payment: form.payment === 'card' ? 'Card on delivery (demo)' : 'Invoice (demo)',
    }
    addOrder(order)
    clear()
    navigate(`/orders/${order.id}`)
  }

  if (!cart.length)
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="container-page pb-24">
          <EmptyState icon={<ShoppingBag className="size-8" aria-hidden />} title="Nothing to check out" body="Your cart is empty." action={<ButtonLink to="/shop">Configure yours</ButtonLink>} />
        </div>
      </>
    )

  return (
    <>
      <PageHeader title="Checkout" body={<>Demo store: no payment is taken and nothing ships. <TextLink to="/cart">Back to cart</TextLink></>} />
      <div className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_26rem]">
          <form ref={formRef} onSubmit={submit} noValidate className="space-y-10" aria-labelledby="contact-title">
            {formError && <FormMessage tone="error">{formError}</FormMessage>}
            <fieldset className="space-y-5">
              <legend id="contact-title" className="mb-4 text-2xl">Contact and delivery</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  {(p) => <Input {...p} name="name" autoComplete="name" value={form.name} onChange={set('name')} />}
                </Field>
                <Field label="Email" error={errors.email} hint="For the receipt and tracking.">
                  {(p) => <Input {...p} name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />}
                </Field>
              </div>
              <Field label="Street address" error={errors.address}>
                {(p) => <Input {...p} name="address" autoComplete="street-address" value={form.address} onChange={set('address')} />}
              </Field>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Town or city" error={errors.city}>
                  {(p) => <Input {...p} name="city" autoComplete="address-level2" value={form.city} onChange={set('city')} />}
                </Field>
                <Field label="Postcode" error={errors.postcode}>
                  {(p) => <Input {...p} name="postcode" autoComplete="postal-code" value={form.postcode} onChange={set('postcode')} />}
                </Field>
                <Field label="Country" error={errors.country}>
                  {(p) => (
                    <Select {...p} name="country" autoComplete="country-name" value={form.country} onChange={set('country')}>
                      {COUNTRIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
                  )}
                </Field>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-2xl">Delivery speed</legend>
              <div className="divide-y divide-line rounded-[var(--radius-md)] border border-line bg-surface px-4">
                {(['standard', 'express'] as const).map((id) => {
                  const price = shippingPrice(sum.subtotal, id)
                  return (
                    <Check
                      key={id}
                      type="radio"
                      name="shipping"
                      value={id}
                      checked={form.shipping === id}
                      onChange={set('shipping')}
                      className="py-3"
                      label={
                        <span className="flex justify-between gap-4">
                          <span>{SHIPPING[id].name}</span>
                          <span className="tabular">{price === 0 ? 'Free' : formatMoney(price)}</span>
                        </span>
                      }
                      hint={SHIPPING[id].detail}
                    />
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-2xl">Payment</legend>
              <div className="divide-y divide-line rounded-[var(--radius-md)] border border-line bg-surface px-4">
                <Check type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={set('payment')} className="py-3" label="Card" hint="In the real store this opens a hosted payment page. Here nothing is charged." />
                <Check type="radio" name="payment" value="invoice" checked={form.payment === 'invoice'} onChange={set('payment')} className="py-3" label="Invoice for teams" hint="Net 30 for orders of three or more devices." />
              </div>
            </fieldset>

            <Button type="submit" loading={busy} className="h-14 w-full text-lg sm:w-auto sm:min-w-[260px]" icon={<Lock className="size-4" aria-hidden />}>
              Place order, {formatMoney(sum.total)}
            </Button>
          </form>

          <Card className="h-fit p-6 lg:sticky lg:top-8">
            <h2 className="text-xl">Order summary</h2>
            <div className="mt-2 max-h-[26rem] overflow-y-auto">
              <CartLines editable={false} />
            </div>
            <div className="mt-2 border-t border-line pt-5">
              <SummaryRows totals={sum} shippingLabel={`${SHIPPING[form.shipping as ShippingId].name} shipping`} />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
