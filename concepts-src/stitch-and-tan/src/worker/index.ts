import { Hono } from 'hono'

import { custom, leathers, products, threads } from '../content'

// The Worker in front of the static shop. The routes validate input and
// return a reference but store nothing yet: wire them to your email
// provider, a D1 table or a payment provider before taking real orders.
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const reference = (prefix: string) => `${prefix}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

async function body(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const data: unknown = await req.json()
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : null
  } catch {
    return null
  }
}

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/orders', async (c) => {
  const data = await body(c.req.raw)
  if (!data) return c.json({ error: 'Send a JSON object.' }, 400)
  const fields: Record<string, string> = {}
  if (!EMAIL.test(str(data.email))) fields.email = 'Enter a valid email address.'
  const items = Array.isArray(data.items) ? data.items : []
  if (items.length === 0 || items.length > 20) fields.items = 'The bag is empty.'
  for (const raw of items) {
    const item = (raw ?? {}) as Record<string, unknown>
    const product = products.find((p) => p.slug === item.slug)
    const qty = Number(item.quantity)
    if (!product || product.stock === 0) fields.items = 'One of these pieces is no longer available.'
    else if (!product.colours.includes(str(item.leather))) fields.items = `Pick a leather for the ${product.name.toLowerCase()}.`
    else if (!Number.isInteger(qty) || qty < 1 || qty > 5) fields.items = 'Quantities go from 1 to 5.'
    else if (!/^[A-Za-z]{0,3}$/.test(str(item.monogram))) fields.items = 'Initials are up to 3 letters.'
  }
  if (Object.keys(fields).length) return c.json({ error: Object.values(fields)[0], fields }, 400)
  return c.json({ ok: true, reference: reference('ST') }, 201)
})

app.post('/api/custom-orders', async (c) => {
  const data = await body(c.req.raw)
  if (!data) return c.json({ error: 'Send a JSON object.' }, 400)
  const fields: Record<string, string> = {}
  if (!custom.fields.kinds.includes(str(data.kind))) fields.kind = 'Pick what I should make.'
  if (str(data.holds).length < 3) fields.holds = 'Tell me what it will hold.'
  if (!leathers.some((l) => l.id === data.leather)) fields.leather = 'Pick a leather colour.'
  if (!threads.some((t) => t.id === data.thread)) fields.thread = 'Pick a thread colour.'
  if (!custom.fields.budgets.includes(str(data.budget))) fields.budget = 'Pick a budget.'
  if (str(data.name).length < 2) fields.name = 'Tell me your name.'
  if (!EMAIL.test(str(data.email))) fields.email = 'Enter a valid email address.'
  if (str(data.notes, 2000).length > 600) fields.notes = 'Keep notes under 600 characters.'
  const deadline = str(data.deadline)
  if (deadline) {
    const when = Date.parse(deadline)
    if (Number.isNaN(when)) fields.deadline = 'Enter a real date.'
    else if (when < Date.now() + 14 * 864e5) fields.deadline = 'Give me at least two weeks.'
  }
  if (Object.keys(fields).length) return c.json({ error: 'Some fields need a look.', fields }, 400)
  return c.json({ ok: true, reference: reference('CU') }, 201)
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
