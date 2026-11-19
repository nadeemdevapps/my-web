import { Hono } from 'hono'

// The Worker in front of the static site. The game itself runs entirely in
// the browser (scores live in localStorage). The press-key form posts here;
// wire it to your inbox, a D1 table or a key-distribution service.
type Env = { ASSETS: Fetcher }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const OUTLETS = ['press', 'creator', 'festival', 'other'] as const

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/press-request', async (c) => {
  let body: Record<string, unknown> = {}
  try {
    const json = await c.req.json()
    if (json && typeof json === 'object') body = json as Record<string, unknown>
  } catch {
    return c.json({ error: 'Send the form as JSON.' }, 400)
  }
  const fields: Record<string, string> = {}
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const outlet = String(body.outlet ?? '')
  const kind = String(body.kind ?? '')
  if (name.length < 2) fields.name = 'Tell us your name.'
  if (!EMAIL_RE.test(email)) fields.email = 'Enter a valid email address.'
  if (outlet.trim().length < 2) fields.outlet = 'Where will you cover the game?'
  if (!OUTLETS.includes(kind as (typeof OUTLETS)[number])) fields.kind = 'Pick what you do.'
  if (Object.keys(fields).length) return c.json({ error: 'Check the highlighted fields.', fields }, 400)
  const ref = 'LOB-' + crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return c.json({ ok: true, ref })
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
