// POST /api/orders — shared by TWO concepts with different payloads:
//   - Tally Bar checkout sends { lines, customer } and expects 201
//     { id, createdAt, totals } (see Checkout.tsx).
//   - Stitch & Tan checkout sends { email, items } and expects 201
//     { ok: true, reference } (see CartDrawer.tsx).
// The handler dispatches on the payload shape, so both frontends keep
// working unchanged. Demo/concept sites: orders are validated and
// acknowledged only — nothing is stored, emailed, or sent anywhere.

import { json, readJson, ref, refRaw } from '../_lib/util.ts';
import { checkoutErrors, lineErrors, totals, type CartLine, type ShippingId } from '../_lib/tally.ts';
import { orderErrors } from '../_lib/stitch.ts';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const data = await readJson(context.request);
  if (!data) return json({ error: 'Send the order as JSON.' }, 400);

  // Tally Bar checkout.
  if (Array.isArray(data.lines) || 'customer' in data) {
    const cartError = lineErrors(data.lines);
    if (cartError) return json({ error: cartError }, 409);
    const customer = (data.customer ?? {}) as Record<string, unknown>;
    const fieldErrors = checkoutErrors(customer);
    if (Object.keys(fieldErrors).length) {
      return json({ error: 'Check the highlighted fields.', fieldErrors }, 422);
    }
    const t = totals(data.lines as CartLine[], customer.shipping as ShippingId);
    return json({ id: ref('TB'), createdAt: new Date().toISOString(), totals: t }, 201);
  }

  // Stitch & Tan checkout.
  if (Array.isArray(data.items) || 'items' in data) {
    const fields = orderErrors(data);
    if (Object.keys(fields).length) return json({ error: Object.values(fields)[0], fields }, 400);
    return json({ ok: true, reference: refRaw('ST') }, 201);
  }

  return json({ error: 'Send the order as JSON.' }, 400);
}
