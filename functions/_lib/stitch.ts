// Stitch & Tan catalog + validation, mirrored from
// concepts-src/stitch-and-tan/src/content.ts and src/worker/index.ts so the
// Pages Function validates exactly like the original Worker did. Only the
// fields the validation needs are listed here (slug, colours, stock).

import { EMAIL_RE, str } from './util.ts';

export type StitchProduct = { slug: string; name: string; colours: string[]; stock: number };

export const PRODUCTS: StitchProduct[] = [
  { slug: 'flap-pouch', name: 'Little flap pouch', colours: ['tan', 'cream', 'tomato'], stock: 4 },
  { slug: 'glasses-case', name: 'One-piece glasses case', colours: ['bottle', 'chestnut', 'charcoal'], stock: 2 },
  { slug: 'tracker-fob', name: 'Round tracker fob', colours: ['oxblood', 'tan', 'bottle'], stock: 9 },
  { slug: 'card-wallet', name: 'Three-pocket card wallet', colours: ['tan', 'chestnut', 'charcoal'], stock: 6 },
  { slug: 'keyboard-sleeve', name: 'Keyboard sleeve', colours: ['charcoal', 'tan'], stock: 1 },
  { slug: 'coin-pouch', name: 'Scallop coin pouch', colours: ['tomato', 'mustard', 'bottle'], stock: 0 },
  { slug: 'pen-roll', name: 'Pencil roll', colours: ['chestnut', 'tan'], stock: 3 },
  { slug: 'notebook-cover', name: 'Pocket notebook cover', colours: ['mustard', 'tan', 'bottle'], stock: 5 },
  { slug: 'cable-wraps', name: 'Cable wraps, set of three', colours: ['tan'], stock: 12 },
];

export const LEATHERS = ['tan', 'cream', 'tomato', 'bottle', 'mustard', 'oxblood', 'charcoal', 'chestnut'];
export const THREADS = ['cream', 'tan', 'red', 'black'];
export const CUSTOM_KINDS = ['Pouch', 'Case or sleeve', 'Wallet', 'Strap or loop', 'Something else'];
export const CUSTOM_BUDGETS = ['£40–80', '£80–150', '£150+'];

export type FieldErrors = Record<string, string>;

/** Validation for POST /api/orders (cart checkout). Mirrors the Worker. */
export function orderErrors(data: Record<string, unknown>): FieldErrors {
  const fields: FieldErrors = {};
  if (!EMAIL_RE.test(str(data.email))) fields.email = 'Enter a valid email address.';
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0 || items.length > 20) fields.items = 'The bag is empty.';
  for (const raw of items) {
    const item = (raw ?? {}) as Record<string, unknown>;
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    const qty = Number(item.quantity);
    if (!product || product.stock === 0) fields.items = 'One of these pieces is no longer available.';
    else if (!product.colours.includes(str(item.leather))) fields.items = `Pick a leather for the ${product.name.toLowerCase()}.`;
    else if (!Number.isInteger(qty) || qty < 1 || qty > 5) fields.items = 'Quantities go from 1 to 5.';
    else if (!/^[A-Za-z]{0,3}$/.test(str(item.monogram))) fields.items = 'Initials are up to 3 letters.';
  }
  return fields;
}

/** Validation for POST /api/custom-orders. Mirrors the Worker. */
export function customOrderErrors(data: Record<string, unknown>): FieldErrors {
  const fields: FieldErrors = {};
  if (!CUSTOM_KINDS.includes(str(data.kind))) fields.kind = 'Pick what I should make.';
  if (str(data.holds).length < 3) fields.holds = 'Tell me what it will hold.';
  if (!LEATHERS.includes(str(data.leather))) fields.leather = 'Pick a leather colour.';
  if (!THREADS.includes(str(data.thread))) fields.thread = 'Pick a thread colour.';
  if (!CUSTOM_BUDGETS.includes(str(data.budget))) fields.budget = 'Pick a budget.';
  if (str(data.name).length < 2) fields.name = 'Tell me your name.';
  if (!EMAIL_RE.test(str(data.email))) fields.email = 'Enter a valid email address.';
  if (str(data.notes, 2000).length > 600) fields.notes = 'Keep notes under 600 characters.';
  const deadline = str(data.deadline);
  if (deadline) {
    const when = Date.parse(deadline);
    if (Number.isNaN(when)) fields.deadline = 'Enter a real date.';
    else if (when < Date.now() + 14 * 864e5) fields.deadline = 'Give me at least two weeks.';
  }
  return fields;
}
