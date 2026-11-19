import { Hono } from 'hono'

import { totals, type CartLine, type ShippingId } from '../shared/catalog'
import { checkoutErrors, lineErrors, supportErrors, type CheckoutInput, type SupportInput } from '../shared/validation'

// The Worker in front of the static site. Orders and support requests are
// validated and answered here; wire them to email, a CRM or a D1 table to
// keep them. Everything else falls through to the built assets.
type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

const ref = (prefix: string) => `${prefix}-${crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()}`

async function body<T>(req: Request): Promise<T | null> {
  try {
    const value = await req.json()
    return value && typeof value === 'object' ? (value as T) : null
  } catch {
    return null
  }
}

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/orders', async (c) => {
  const input = await body<{ lines?: CartLine[]; customer?: Partial<CheckoutInput> }>(c.req.raw)
  if (!input) return c.json({ error: 'Send the order as JSON.' }, 400)
  const cartError = lineErrors(input.lines)
  if (cartError) return c.json({ error: cartError }, 409)
  const fieldErrors = checkoutErrors(input.customer ?? {})
  if (Object.keys(fieldErrors).length) return c.json({ error: 'Check the highlighted fields.', fieldErrors }, 422)
  const t = totals(input.lines!, input.customer!.shipping as ShippingId)
  return c.json({ id: ref('TB'), createdAt: new Date().toISOString(), totals: t }, 201)
})

app.post('/api/support', async (c) => {
  const input = await body<Partial<SupportInput>>(c.req.raw)
  if (!input) return c.json({ error: 'Send the request as JSON.' }, 400)
  const fieldErrors = supportErrors(input)
  if (Object.keys(fieldErrors).length) return c.json({ error: 'Check the highlighted fields.', fieldErrors }, 422)
  return c.json({ ticket: ref('SUP'), replyWithin: '1 working day' }, 201)
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
