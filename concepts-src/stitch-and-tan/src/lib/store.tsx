import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

import { findProduct, type Product } from '../content'
import { usePersistent } from './persist'

// Bag, sent requests and toasts. Everything is kept in localStorage; replace
// these setters with API calls when you add a backend.

export interface CartLine {
  slug: string
  leather: string
  monogram: string
  quantity: number
}
export interface CartItem extends CartLine {
  product: Product
}
export interface SentRequest {
  reference: string
  createdAt: string
  kind: string
  holds: string
}
export interface Toast {
  id: number
  message: string
  action?: { label: string; run: () => void }
}

interface StoreState {
  items: CartItem[]
  count: number
  subtotal: number
  add: (line: Omit<CartLine, 'quantity'>, quantity?: number) => void
  setQuantity: (line: CartLine, quantity: number) => void
  remove: (line: CartLine) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  requests: SentRequest[]
  addRequest: (r: SentRequest) => void
  toasts: Toast[]
  toast: (message: string, action?: Toast['action']) => void
  dismissToast: (id: number) => void
}

const Ctx = createContext<StoreState | null>(null)
const isArray = (v: unknown): v is never[] => Array.isArray(v)
const same = (a: Omit<CartLine, 'quantity'>, b: Omit<CartLine, 'quantity'>) => a.slug === b.slug && a.leather === b.leather && a.monogram === b.monogram
export const MAX_QTY = 5

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = usePersistent<CartLine[]>('stitch-tan-bag', [], isArray)
  const [requests, setRequests] = usePersistent<SentRequest[]>('stitch-tan-requests', [], isArray)
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const toast = useCallback(
    (message: string, action?: Toast['action']) => {
      const id = nextId.current++
      setToasts((t) => [...t.slice(-2), { id, message, action }])
      window.setTimeout(() => dismissToast(id), 5000)
    },
    [dismissToast],
  )

  const add = useCallback(
    (line: Omit<CartLine, 'quantity'>, quantity = 1) => {
      setLines((prev) => {
        const hit = prev.find((l) => same(l, line))
        if (hit) return prev.map((l) => (l === hit ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l))
        return [...prev, { ...line, quantity: Math.min(MAX_QTY, quantity) }]
      })
    },
    [setLines],
  )
  const setQuantity = useCallback(
    (line: CartLine, quantity: number) => setLines((prev) => prev.map((l) => (same(l, line) ? { ...l, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) } : l))),
    [setLines],
  )
  const remove = useCallback(
    (line: CartLine) => {
      let index = -1
      setLines((prev) => {
        index = prev.findIndex((l) => same(l, line))
        return prev.filter((l) => !same(l, line))
      })
      const name = findProduct(line.slug)?.name ?? 'item'
      toast(`Removed ${name.toLowerCase()}`, {
        label: 'Undo',
        run: () => setLines((prev) => (prev.some((l) => same(l, line)) ? prev : [...prev.slice(0, Math.max(0, index)), line, ...prev.slice(Math.max(0, index))])),
      })
    },
    [setLines, toast],
  )
  const clearCart = useCallback(() => setLines([]), [setLines])
  const addRequest = useCallback((r: SentRequest) => setRequests((prev) => [r, ...prev].slice(0, 10)), [setRequests])

  const value = useMemo<StoreState>(() => {
    const items: CartItem[] = []
    for (const l of lines) {
      const product = findProduct(l.slug)
      if (product) items.push({ ...l, product })
    }
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.quantity * i.product.price, 0),
      add,
      setQuantity,
      remove,
      clearCart,
      cartOpen,
      setCartOpen,
      requests,
      addRequest,
      toasts,
      toast,
      dismissToast,
    }
  }, [lines, requests, cartOpen, toasts, add, setQuantity, remove, clearCart, addRequest, toast, dismissToast])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): StoreState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore outside StoreProvider')
  return ctx
}
