export type ApiResult = { ok: true; reference?: string } | { ok: false; error: string; fields?: Record<string, string> }

/** POST JSON to a Worker route and normalise the answer. */
export async function post(path: string, body: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    const data = (await res.json().catch(() => ({}))) as { reference?: string; error?: string; fields?: Record<string, string> }
    if (res.ok) return { ok: true, reference: data.reference }
    return { ok: false, error: data.error ?? 'Something went wrong. Try again.', fields: data.fields }
  } catch {
    return { ok: false, error: 'You appear to be offline. Check your connection and try again.' }
  }
}
