import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Traps Tab inside the returned ref while `active`, closes on Escape and
 *  restores focus to whatever opened it. */
export function useFocusTrap<T extends HTMLElement>(active: boolean, onClose: () => void) {
  const ref = useRef<T>(null)
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    if (!active) return
    const opener = document.activeElement as HTMLElement | null
    const first = () => ref.current?.querySelector<HTMLElement>("[data-autofocus]") ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE)
    const t = window.setTimeout(() => first()?.focus(), 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close.current()
        return
      }
      const node = ref.current
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const a = items[0]
      const b = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === a || !node.contains(document.activeElement))) {
        e.preventDefault()
        b.focus()
      } else if (!e.shiftKey && document.activeElement === b) {
        e.preventDefault()
        a.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      opener?.focus?.()
    }
  }, [active])
  return ref
}
