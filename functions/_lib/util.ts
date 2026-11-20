// Shared helpers for the concept-site API handlers (functions/api/*).
// Demo/concept sites only: handlers validate the request and acknowledge
// receipt. Nothing is stored, emailed, or sent to any external service.

export function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

/** Parse a JSON object body; null for invalid JSON or non-object bodies. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const value: unknown = await request.json();
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/** 'TB-4F7K2Q' style reference: 6 uppercase alphanumerics, no dashes. */
export function ref(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()}`;
}

/** Stitch & Tan's reference keeps the raw UUID slice (may contain a dash). */
export function refRaw(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EMAIL_RE_STRICT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trimmed string, capped at max chars; '' for non-strings. */
export function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/**
 * Read a JSON object body with an optional byte cap (16 KB in the
 * product-site / portfolio-concept workers). Returns { over: true } when
 * the body exceeds the cap, so the handler can answer 413. Measures the
 * actual body bytes — the content-length header is not reliable (it may be
 * absent on chunked requests, and undici does not expose it on constructed
 * Requests at all).
 */
export async function readJsonBody(
  request: Request,
  maxBytes?: number,
): Promise<{ over: boolean; data: Record<string, unknown> | null }> {
  const text = await request.text().catch(() => '');
  if (maxBytes !== undefined && new TextEncoder().encode(text).length > maxBytes) {
    return { over: true, data: null };
  }
  try {
    const value: unknown = JSON.parse(text);
    return {
      over: false,
      data:
        value !== null && typeof value === 'object' && !Array.isArray(value)
          ? (value as Record<string, unknown>)
          : null,
    };
  } catch {
    return { over: false, data: null };
  }
}
