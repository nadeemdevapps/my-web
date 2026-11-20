// Unknown /api/* path: JSON 404, like the original Workers' catch-all.
// Static routes (health, orders, support, ...) take precedence over this
// catch-all, so it only fires for paths no handler defines.
import { json } from '../_lib/util.ts';

export function onRequest(): Response {
  return json({ error: 'Not found' }, 404);
}
