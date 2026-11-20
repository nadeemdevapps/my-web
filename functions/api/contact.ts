// POST /api/contact — Portfolio concept contact form (Footer.tsx).
// Expects { name, email, message }; returns { ok: true, demo: true }.
// Demo/concept site: the message is validated and acknowledged only —
// nothing is stored, emailed, or sent anywhere.
import { EMAIL_RE, json, readJsonBody } from '../_lib/util.ts';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const { over, data: body } = await readJsonBody(context.request, 16 * 1024);
  if (over) return json({ error: 'Request is too large.' }, 413);
  if (typeof body?.email !== 'string' || !EMAIL_RE.test(body.email)) {
    return json({ error: 'Enter a valid email address.' }, 400);
  }
  if (typeof body.message !== 'string' || !body.message.trim() || body.message.length > 2000) {
    return json({ error: 'Write a few words about the project.' }, 400);
  }
  return json({ ok: true, demo: true });
}
