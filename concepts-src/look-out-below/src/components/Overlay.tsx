import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../lib/cx'
import { IconButton } from './Button'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Traps Tab inside `ref`, closes on Escape, locks scroll and restores focus on close. */
export function useFocusTrap(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const el = ref.current
    const first = el?.querySelector<HTMLElement>('[data-autofocus]') ?? el?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? el)?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !el) return
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null)
      if (!items.length) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (!el.contains(document.activeElement)) {
        e.preventDefault()
        head.focus()
      } else if (e.shiftKey && document.activeElement === head) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault()
        head.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, ref])
}

type ModalProps = { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode; className?: string }

export function Modal(props: ModalProps) {
  return createPortal(<AnimatePresence>{props.open && <ModalPanel {...props} />}</AnimatePresence>, document.body)
}

function ModalPanel({ onClose, title, description, children, className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  useFocusTrap(true, ref, onClose)
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        aria-describedby={description ? `${id}-d` : undefined}
        tabIndex={-1}
        initial={{ opacity: 0, y: -60, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: 30, transition: { duration: 0.15 } }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className={cx('paper-grain relative max-h-[92svh] w-full overflow-y-auto rounded-t-[var(--radius-lg)] border-[3px] border-ink p-6 shadow-[0_8px_0_0_var(--color-ink)] focus:outline-none sm:max-w-lg sm:rounded-[var(--radius-lg)] sm:p-8', className)}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-t`} className="font-display text-[2.25rem] leading-none font-black">
              {title}
            </h2>
            {description && (
              <p id={`${id}-d`} className="mt-2 text-graphite">
                {description}
              </p>
            )}
          </div>
          <IconButton aria-label="Close" tone="ghost" onClick={onClose}>
            <X className="size-5" strokeWidth={2.75} />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

/** A side drawer for the mobile menu. */
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return createPortal(
    <AnimatePresence>
      {open && <DrawerPanel onClose={onClose} title={title}>{children}</DrawerPanel>}
    </AnimatePresence>,
    document.body,
  )
}

function DrawerPanel({ onClose, title, children }: { onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  useFocusTrap(true, ref, onClose)
  return (
    <div className="fixed inset-0 z-[80]">
      <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%', transition: { duration: 0.18 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        className="paper-grain absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col border-l-[3px] border-ink p-5"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id={id} className="font-display text-[1.75rem] leading-none font-black">
            {title}
          </h2>
          <IconButton aria-label="Close menu" tone="ghost" onClick={onClose}>
            <X className="size-5" strokeWidth={2.75} />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
