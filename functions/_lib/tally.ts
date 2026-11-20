// Tally Bar pricing + validation, mirrored from
// concepts-src/tally-bar/src/shared/{catalog,validation}.ts so the Pages
// Function reprices and validates exactly like the original Worker did.
// The browser can never set a price: totals are always computed here.

import { EMAIL_RE_STRICT, str } from './util.ts';

export const DEVICE = { price: 149, maxQty: 5, maxMessage: 32 } as const;

export const BODY_COLOURS = [
  { id: 'chalk', surcharge: 0 },
  { id: 'graphite', surcharge: 10 },
  { id: 'sage', surcharge: 10 },
] as const;

export const LED_COLOURS = ['red', 'amber', 'green', 'cyan', 'white'] as const;

export const ADDONS = [
  { id: 'stand', price: 19 },
  { id: 'sleeve', price: 24 },
  { id: 'caps', price: 12 },
  { id: 'care', price: 29 },
] as const;

export const SHIPPING = {
  standard: 8,
  express: 18,
  freeOver: 199,
  taxRate: 0.08,
} as const;

export type ShippingId = 'standard' | 'express';

export type CartLine = {
  colour: string;
  led: string;
  message: string;
  addons: string[];
  qty: number;
};

export const LED_CHARSET = /^[A-Za-z0-9 :!?.,'\-+/&]*$/;

export function messageError(message: string): string | undefined {
  if (message.length > DEVICE.maxMessage) return `Keep it to ${DEVICE.maxMessage} characters.`;
  if (!LED_CHARSET.test(message)) return "Letters, numbers, spaces and : ! ? . , ' - + / & only.";
  return undefined;
}

export type FieldErrors = Record<string, string>;

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Netherlands',
  'Sweden',
  'Australia',
  'Japan',
] as const;

export function checkoutErrors(input: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {};
  if (!str(input.name)) e.name = 'Enter your full name.';
  if (!EMAIL_RE_STRICT.test(str(input.email))) e.email = 'Enter a valid email address.';
  if (str(input.address).length < 5) e.address = 'Enter a street address.';
  if (!str(input.city)) e.city = 'Enter a town or city.';
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(str(input.postcode))) e.postcode = 'Enter a valid postcode.';
  if (!(COUNTRIES as readonly string[]).includes(str(input.country))) e.country = 'Choose a country we ship to.';
  if (input.shipping !== 'standard' && input.shipping !== 'express') e.shipping = 'Choose a delivery speed.';
  if (input.payment !== 'card' && input.payment !== 'invoice') e.payment = 'Choose how to pay.';
  return e;
}

export function lineErrors(lines: unknown): string | undefined {
  if (!Array.isArray(lines) || lines.length === 0) return 'Your cart is empty.';
  if (lines.length > 10) return 'Too many lines in one order.';
  for (const raw of lines as Partial<CartLine>[]) {
    if (!BODY_COLOURS.some((c) => c.id === raw?.colour)) return 'Unknown body colour.';
    if (!(LED_COLOURS as readonly string[]).includes(raw?.led ?? '')) return 'Unknown LED colour.';
    if (typeof raw?.message !== 'string' || messageError(raw.message)) return 'A message cannot be shown on the display.';
    if (!Array.isArray(raw?.addons) || raw.addons.some((a) => !ADDONS.some((x) => x.id === a))) return 'Unknown add-on.';
    if (!Number.isInteger(raw?.qty) || (raw.qty ?? 0) < 1 || (raw.qty ?? 0) > DEVICE.maxQty)
      return `Quantity must be 1 to ${DEVICE.maxQty}.`;
  }
  return undefined;
}

export function unitPrice(line: Pick<CartLine, 'colour' | 'addons'>): number {
  const colour = BODY_COLOURS.find((c) => c.id === line.colour);
  const extras = (line.addons ?? []).reduce(
    (sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0),
    0,
  );
  return DEVICE.price + (colour?.surcharge ?? 0) + extras;
}

export function shippingPrice(subtotal: number, method: ShippingId): number {
  if (subtotal === 0) return 0;
  if (method === 'standard' && subtotal >= SHIPPING.freeOver) return 0;
  return SHIPPING[method];
}

export function totals(lines: CartLine[], method: ShippingId = 'standard') {
  const subtotal = lines.reduce((sum, l) => sum + unitPrice(l) * l.qty, 0);
  const shipping = shippingPrice(subtotal, method);
  const tax = Math.round(subtotal * SHIPPING.taxRate * 100) / 100;
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return {
    subtotal,
    shipping,
    tax,
    total: Math.round((subtotal + shipping + tax) * 100) / 100,
    count,
  };
}

export const SUPPORT_TOPICS = [
  'Setup and Wi-Fi',
  'Apps and integrations',
  'Orders and shipping',
  'Returns and warranty',
  'Developer API',
  'Something else',
] as const;

export function supportErrors(input: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {};
  if (!str(input.name)) e.name = 'Enter your name.';
  if (!EMAIL_RE_STRICT.test(str(input.email))) e.email = 'Enter a valid email address.';
  if (!(SUPPORT_TOPICS as readonly string[]).includes(str(input.topic))) e.topic = 'Choose a topic.';
  if (str(input.serial) && !/^TB-[0-9A-Z]{6}$/i.test(str(input.serial))) e.serial = 'Serials look like TB-4F7K2Q.';
  if (str(input.message).length < 20) e.message = 'Tell us a little more (20 characters or more).';
  return e;
}
