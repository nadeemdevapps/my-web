// POST /api/support — Tally Bar support form (Support.tsx).
// Expects { name, email, topic, serial?, message }; returns 201
// { ticket, replyWithin }. Demo/concept site: requests are validated and
// acknowledged only — nothing is stored, emailed, or sent anywhere.
import { json, readJson, ref } from '../_lib/util.ts';
import { supportErrors } from '../_lib/tally.ts';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const input = await readJson(context.request);
  if (!input) return json({ error: 'Send the request as JSON.' }, 400);
  const fieldErrors = supportErrors(input);
  if (Object.keys(fieldErrors).length) {
    return json({ error: 'Check the highlighted fields.', fieldErrors }, 422);
  }
  return json({ ticket: ref('SUP'), replyWithin: '1 working day' }, 201);
}
