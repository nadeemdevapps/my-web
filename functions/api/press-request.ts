// POST /api/press-request — Look Out Below press-key form (Press.tsx).
// Expects { name, email, outlet, kind } with kind one of
// press/creator/festival/other; returns { ok: true, ref }.
// Demo/concept site: requests are validated and acknowledged only —
// nothing is stored, emailed, or sent anywhere.
import { EMAIL_RE, json, ref } from '../_lib/util.ts';

const OUTLETS = ['press', 'creator', 'festival', 'other'] as const;

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await context.request.json();
    if (parsed && typeof parsed === 'object') body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: 'Send the form as JSON.' }, 400);
  }
  const s = (v: unknown) => String(v ?? '').trim();
  const fields: Record<string, string> = {};
  if (s(body.name).length < 2) fields.name = 'Tell us your name.';
  if (!EMAIL_RE.test(s(body.email))) fields.email = 'Enter a valid email address.';
  if (s(body.outlet).length < 2) fields.outlet = 'Where will you cover the game?';
  if (!(OUTLETS as readonly string[]).includes(s(body.kind))) fields.kind = 'Pick what you do.';
  if (Object.keys(fields).length) return json({ error: 'Check the highlighted fields.', fields }, 400);
  return json({ ok: true, ref: ref('LOB') });
}
