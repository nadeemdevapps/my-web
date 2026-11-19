// localStorage that never throws (private windows and blocked storage
// return the fallback) and tells subscribers when a value changes.
const listeners = new Set<() => void>()

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw == null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function write(key: string, value: unknown) {
  try {
    if (value === undefined) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: keep going in memory */
  }
  listeners.forEach((l) => l())
}

export function subscribe(fn: () => void) {
  listeners.add(fn)
  const onStorage = () => fn()
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}
