// Prices and options shared by the pages and the Worker. The Worker reprices
// every order from this file, so the browser can never set a price.

export const CURRENCY = 'USD'

export const DEVICE = {
  id: 'tally-bar',
  name: 'Tally Bar',
  price: 149,
  maxQty: 5,
  maxMessage: 32,
} as const

export const BODY_COLOURS = [
  { id: 'chalk', name: 'Chalk', hex: '#eeebe6', accent: 'Orange controls', surcharge: 0 },
  { id: 'graphite', name: 'Graphite', hex: '#3a3a3d', accent: 'Orange controls', surcharge: 10 },
  { id: 'sage', name: 'Sage', hex: '#a9bea0', accent: 'Cream controls', surcharge: 10 },
] as const

export type BodyColourId = (typeof BODY_COLOURS)[number]['id']

export const LED_COLOURS = [
  { id: 'red', name: 'Signal red', hex: '#ff3b30' },
  { id: 'amber', name: 'Amber', hex: '#ffab1f' },
  { id: 'green', name: 'Mint', hex: '#3cf08a' },
  { id: 'cyan', name: 'Ice', hex: '#46d7ff' },
  { id: 'white', name: 'Warm white', hex: '#fff3e0' },
] as const

export type LedColourId = (typeof LED_COLOURS)[number]['id']

export const ADDONS = [
  { id: 'stand', name: 'Tilt stand', detail: 'Walnut, angles the display 12°', price: 19 },
  { id: 'sleeve', name: 'Travel sleeve', detail: 'Felt, with a cable pocket', price: 24 },
  { id: 'caps', name: 'Dial caps', detail: 'Three anodised colours', price: 12 },
  { id: 'care', name: 'Care plan', detail: 'Three years, accidental damage', price: 29 },
] as const

export type AddonId = (typeof ADDONS)[number]['id']

export const SHIPPING = {
  standard: { id: 'standard', name: 'Standard', detail: '4 to 6 working days', price: 8 },
  express: { id: 'express', name: 'Express', detail: '1 to 2 working days', price: 18 },
  freeOver: 199,
  taxRate: 0.08,
} as const

export type ShippingId = 'standard' | 'express'

export type CartLine = {
  colour: BodyColourId
  led: LedColourId
  message: string
  addons: AddonId[]
  qty: number
}

export function lineKey(line: Omit<CartLine, 'qty'>) {
  return [line.colour, line.led, line.message.trim().toUpperCase(), [...line.addons].sort().join('+')].join('|')
}

export function unitPrice(line: Pick<CartLine, 'colour' | 'addons'>) {
  const colour = BODY_COLOURS.find((c) => c.id === line.colour)
  const extras = line.addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0)
  return DEVICE.price + (colour?.surcharge ?? 0) + extras
}

export function shippingPrice(subtotal: number, method: ShippingId) {
  if (subtotal === 0) return 0
  if (method === 'standard' && subtotal >= SHIPPING.freeOver) return 0
  return SHIPPING[method].price
}

export function totals(lines: CartLine[], method: ShippingId = 'standard') {
  const subtotal = lines.reduce((sum, l) => sum + unitPrice(l) * l.qty, 0)
  const shipping = shippingPrice(subtotal, method)
  const tax = Math.round(subtotal * SHIPPING.taxRate * 100) / 100
  const count = lines.reduce((n, l) => n + l.qty, 0)
  return { subtotal, shipping, tax, total: Math.round((subtotal + shipping + tax) * 100) / 100, count }
}

export type Totals = ReturnType<typeof totals>
