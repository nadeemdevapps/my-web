// POST /api/subscribe — ProductSite newsletter/waitlist form (Cta.tsx).
// Expects { email }; returns { ok: true, demo: true }.
// Demo/concept site: the address is validated and acknowledged only —
// nothing is stored, emailed, or sent anywhere.
import { EMAIL_RE, json, readJsonBody } from '../_lib/util.ts';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const { over, data: body } = await readJsonBody(context.request, 16 * 1024);
  if (over) return json({ error: 'Request is too large.' }, 413);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) return json({ error: 'Enter a valid email address.' }, 400);
  return json({ ok: true, demo: true });
}
