import { ADDONS, BODY_COLOURS, DEVICE, LED_COLOURS, type CartLine } from './catalog'

// Rules shared by the forms and the Worker.

/** Characters the 5x7 LED font can draw (lowercase is shown as capitals). */
export const LED_CHARSET = /^[A-Za-z0-9 :!?.,'\-+/&]*$/

export function messageError(message: string) {
  if (message.length > DEVICE.maxMessage) return `Keep it to ${DEVICE.maxMessage} characters.`
  if (!LED_CHARSET.test(message)) return 'Letters, numbers, spaces and : ! ? . , \' - + / & only.'
  return undefined
}

export type FieldErrors = Record<string, string>

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export type CheckoutInput = {
  name: string
  email: string
  address: string
  city: string
  postcode: string
  country: string
  shipping: string
  payment: string
}

export const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Netherlands', 'Sweden', 'Australia', 'Japan'] as const

export function checkoutErrors(input: Partial<CheckoutInput>): FieldErrors {
  const e: FieldErrors = {}
  if (!input.name?.trim()) e.name = 'Enter your full name.'
  if (!input.email || !isEmail(input.email)) e.email = 'Enter a valid email address.'
  if (!input.address?.trim() || input.address.trim().length < 5) e.address = 'Enter a street address.'
  if (!input.city?.trim()) e.city = 'Enter a town or city.'
  if (!input.postcode?.trim() || !/^[A-Za-z0-9 -]{3,10}$/.test(input.postcode.trim())) e.postcode = 'Enter a valid postcode.'
  if (!input.country || !(COUNTRIES as readonly string[]).includes(input.country)) e.country = 'Choose a country we ship to.'
  if (input.shipping !== 'standard' && input.shipping !== 'express') e.shipping = 'Choose a delivery speed.'
  if (input.payment !== 'card' && input.payment !== 'invoice') e.payment = 'Choose how to pay.'
  return e
}

export function lineErrors(lines: unknown): string | undefined {
  if (!Array.isArray(lines) || lines.length === 0) return 'Your cart is empty.'
  if (lines.length > 10) return 'Too many lines in one order.'
  for (const raw of lines as Partial<CartLine>[]) {
    if (!BODY_COLOURS.some((c) => c.id === raw.colour)) return 'Unknown body colour.'
    if (!LED_COLOURS.some((c) => c.id === raw.led)) return 'Unknown LED colour.'
    if (typeof raw.message !== 'string' || messageError(raw.message)) return 'A message cannot be shown on the display.'
    if (!Array.isArray(raw.addons) || raw.addons.some((a) => !ADDONS.some((x) => x.id === a))) return 'Unknown add-on.'
    if (!Number.isInteger(raw.qty) || (raw.qty ?? 0) < 1 || (raw.qty ?? 0) > DEVICE.maxQty) return `Quantity must be 1 to ${DEVICE.maxQty}.`
  }
  return undefined
}

export type SupportInput = { name: string; email: string; topic: string; serial: string; message: string }

export const SUPPORT_TOPICS = ['Setup and Wi-Fi', 'Apps and integrations', 'Orders and shipping', 'Returns and warranty', 'Developer API', 'Something else'] as const

export function supportErrors(input: Partial<SupportInput>): FieldErrors {
  const e: FieldErrors = {}
  if (!input.name?.trim()) e.name = 'Enter your name.'
  if (!input.email || !isEmail(input.email)) e.email = 'Enter a valid email address.'
  if (!input.topic || !(SUPPORT_TOPICS as readonly string[]).includes(input.topic)) e.topic = 'Choose a topic.'
  if (input.serial && !/^TB-[0-9A-Z]{6}$/i.test(input.serial.trim())) e.serial = 'Serials look like TB-4F7K2Q.'
  if (!input.message?.trim() || input.message.trim().length < 20) e.message = 'Tell us a little more (20 characters or more).'
  return e
}
