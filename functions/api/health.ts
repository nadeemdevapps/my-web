// GET /api/health — liveness check shared by all five concept workers.
// Demo/concept site: nothing is stored or sent anywhere.
import { json } from '../_lib/util.ts';

export function onRequestGet(): Response {
  return json({ ok: true });
}
