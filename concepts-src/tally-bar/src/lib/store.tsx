import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { DEFAULT_INSTALLED, HERO, STORAGE_KEYS } from '../data'
import { DEVICE, LED_COLOURS, lineKey, totals, type CartLine, type LedColourId, type Totals } from '../shared/catalog'

// Cart, orders, installed apps and the demo device's state, kept in
// localStorage so a reload or a second tab sees the same thing. No sign-in.

export type Order = {
  id: string
  createdAt: string
  lines: CartLine[]
  totals: Totals
  customer: { name: string; email: string; city: string; country: string }
  shipping: string
  payment: string
}

export type TimerState = { minutes: number; running: boolean; endsAt: number | null; left: number }

export type DeviceState = { message: string; led: LedColourId; timer: TimerState }

const DEFAULT_DEVICE: DeviceState = {
  message: HERO.defaultMessage,
  led: 'red',
  timer: { minutes: 25, running: false, endsAt: null, left: 25 * 60 },
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? ({ ...(fallback as object), ...JSON.parse(raw) } as T) : fallback
  } catch {
    return fallback
  }
}

function readArray<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = window.localStorage.getItem(key)
    const value = raw ? JSON.parse(raw) : null
    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked: keep the in-memory state */
  }
}

function usePersisted<T>(key: string, init: () => T, reread: () => T) {
  const [value, setValue] = useState<T>(init)
  useEffect(() => write(key, value), [key, value])
  const rereadRef = useRef(reread)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(rereadRef.current())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])
  return [value, setValue] as const
}

type StoreValue = {
  cart: CartLine[]
  summary: Totals
  add: (line: CartLine) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  orders: Order[]
  addOrder: (order: Order) => void
  installed: string[]
  toggleApp: (id: string) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartLine[]>(STORAGE_KEYS.cart, () => readArray(STORAGE_KEYS.cart, []), () => readArray(STORAGE_KEYS.cart, []))
  const [orders, setOrders] = usePersisted<Order[]>(STORAGE_KEYS.orders, () => readArray(STORAGE_KEYS.orders, []), () => readArray(STORAGE_KEYS.orders, []))
  const [installed, setInstalled] = usePersisted<string[]>(
    STORAGE_KEYS.apps,
    () => readArray(STORAGE_KEYS.apps, DEFAULT_INSTALLED),
    () => readArray(STORAGE_KEYS.apps, DEFAULT_INSTALLED),
  )
  const [cartOpen, setCartOpen] = useState(false)

  const add = useCallback(
    (line: CartLine) =>
      setCart((lines) => {
        const key = lineKey(line)
        const found = lines.find((l) => lineKey(l) === key)
        if (found) return lines.map((l) => (l === found ? { ...l, qty: Math.min(DEVICE.maxQty, l.qty + line.qty) } : l))
        return [...lines, { ...line, message: line.message.trim().toUpperCase() }]
      }),
    [setCart],
  )
  const setQty = useCallback(
    (key: string, qty: number) => setCart((lines) => lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(1, Math.min(DEVICE.maxQty, qty)) } : l))),
    [setCart],
  )
  const remove = useCallback((key: string) => setCart((lines) => lines.filter((l) => lineKey(l) !== key)), [setCart])
  const clear = useCallback(() => setCart([]), [setCart])
  const addOrder = useCallback((order: Order) => setOrders((list) => [order, ...list].slice(0, 20)), [setOrders])
  const toggleApp = useCallback((id: string) => setInstalled((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])), [setInstalled])

  const value = useMemo<StoreValue>(
    () => ({ cart, summary: totals(cart), add, setQty, remove, clear, orders, addOrder, installed, toggleApp, cartOpen, setCartOpen }),
    [cart, add, setQty, remove, clear, orders, addOrder, installed, toggleApp, cartOpen],
  )
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore outside StoreProvider')
  return value
}

// The demo device on the home page: message, LED colour and focus timer.

type DeviceValue = DeviceState & {
  ledHex: string
  secondsLeft: number
  finished: boolean
  display: string
  setMessage: (message: string) => void
  setLed: (led: LedColourId) => void
  cycleLed: () => void
  toggleTimer: () => void
  resetTimer: () => void
  setMinutes: (minutes: number) => void
  stepMinutes: () => void
}

const DeviceContext = createContext<DeviceValue | null>(null)

export const formatClock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = usePersisted<DeviceState>(STORAGE_KEYS.device, () => read(STORAGE_KEYS.device, DEFAULT_DEVICE), () => read(STORAGE_KEYS.device, DEFAULT_DEVICE))
  const [now, setNow] = useState(() => Date.now())
  const { timer } = device

  useEffect(() => {
    if (!timer.running) return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [timer.running])

  const secondsLeft = timer.running && timer.endsAt ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000)) : timer.left
  const finished = timer.running && secondsLeft === 0

  const setTimer = useCallback((fn: (t: TimerState) => TimerState) => setDevice((d) => ({ ...d, timer: fn(d.timer) })), [setDevice])

  const toggleTimer = useCallback(() => {
    setNow(Date.now())
    setTimer((t) => {
      if (t.running && t.endsAt) {
        const left = Math.max(0, Math.ceil((t.endsAt - Date.now()) / 1000))
        if (left === 0) return { ...t, running: false, endsAt: null, left: t.minutes * 60 }
        return { ...t, running: false, endsAt: null, left }
      }
      const left = t.left > 0 ? t.left : t.minutes * 60
      return { ...t, running: true, endsAt: Date.now() + left * 1000, left }
    })
  }, [setTimer])

  const resetTimer = useCallback(() => setTimer((t) => ({ ...t, running: false, endsAt: null, left: t.minutes * 60 })), [setTimer])
  const setMinutes = useCallback((minutes: number) => setTimer(() => ({ minutes, running: false, endsAt: null, left: minutes * 60 })), [setTimer])
  const stepMinutes = useCallback(
    () => setTimer((t) => {
      const minutes = t.minutes >= 90 ? 5 : t.minutes < 25 ? 25 : t.minutes < 50 ? 50 : 90
      return { minutes, running: false, endsAt: null, left: minutes * 60 }
    }),
    [setTimer],
  )

  const value = useMemo<DeviceValue>(() => {
    const ledHex = LED_COLOURS.find((c) => c.id === device.led)?.hex ?? LED_COLOURS[0].hex
    const timerShown = device.timer.running || device.timer.left !== device.timer.minutes * 60
    return {
      ...device,
      ledHex,
      secondsLeft,
      finished,
      display: finished ? 'DONE' : timerShown ? formatClock(secondsLeft) : device.message,
      setMessage: (message) => setDevice((d) => ({ ...d, message })),
      setLed: (led) => setDevice((d) => ({ ...d, led })),
      cycleLed: () =>
        setDevice((d) => {
          const i = LED_COLOURS.findIndex((c) => c.id === d.led)
          return { ...d, led: LED_COLOURS[(i + 1) % LED_COLOURS.length].id }
        }),
      toggleTimer,
      resetTimer,
      setMinutes,
      stepMinutes,
    }
  }, [device, secondsLeft, finished, setDevice, toggleTimer, resetTimer, setMinutes, stepMinutes])

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export function useDevice() {
  const value = useContext(DeviceContext)
  if (!value) throw new Error('useDevice outside DeviceProvider')
  return value
}
