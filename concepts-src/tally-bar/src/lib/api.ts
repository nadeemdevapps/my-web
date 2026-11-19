export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; error: string; fieldErrors?: Record<string, string> }

/** POST JSON to the Worker and normalise the answer, including network failures. */
export async function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json = (await res.json().catch(() => ({}))) as T & { error?: string; fieldErrors?: Record<string, string> }
    if (!res.ok) return { ok: false, status: res.status, error: json.error ?? 'Something went wrong. Try again.', fieldErrors: json.fieldErrors }
    return { ok: true, data: json }
  } catch {
    return { ok: false, status: 0, error: 'You seem to be offline. Check your connection and try again.' }
  }
}
