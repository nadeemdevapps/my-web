// POST /api/custom-orders — Stitch & Tan custom request form (Custom.tsx).
// Expects the custom draft { kind, holds, size?, leather, thread, budget,
// deadline?, name, email, notes? }; returns 201 { ok: true, reference }.
// Demo/concept site: requests are validated and acknowledged only —
// nothing is stored, emailed, or sent anywhere.
import { json, readJson, refRaw } from '../_lib/util.ts';
import { customOrderErrors } from '../_lib/stitch.ts';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const data = await readJson(context.request);
  if (!data) return json({ error: 'Send a JSON object.' }, 400);
  const fields = customOrderErrors(data);
  if (Object.keys(fields).length) return json({ error: 'Some fields need a look.', fields }, 400);
  return json({ ok: true, reference: refRaw('CU') }, 201);
}
