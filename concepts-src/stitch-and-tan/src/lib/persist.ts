import { useEffect, useState } from 'react'

/** useState that survives reloads. Bad or missing data falls back to `initial`. */
export function usePersistent<T>(key: string, initial: T, validate?: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initial
      const parsed: unknown = JSON.parse(raw)
      return validate && !validate(parsed) ? initial : (parsed as T)
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked: the app keeps working for this visit.
    }
  }, [key, value])
  return [value, setValue] as const
}
