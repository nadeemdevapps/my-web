import { X } from 'lucide-react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../lib/cx'
import { IconButton } from './Button'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Traps Tab inside `ref`, closes on Escape and restores focus on close. */
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
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !el) return
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null)
      if (!items.length) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault()
        head.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (previous && document.contains(previous)) previous.focus()
    }
  }, [open, ref])
}

type PanelProps = { onClose: () => void; title: string; description?: string; children: ReactNode; className?: string; footer?: ReactNode }

/** Centred dialog (bottom sheet on phones). */
export function Modal({ open, ...props }: PanelProps & { open: boolean }) {
  return createPortal(<AnimatePresence>{open && <Panel kind="modal" {...props} />}</AnimatePresence>, document.body)
}

/** Slide-in panel from the right, used by the cart. */
export function Drawer({ open, ...props }: PanelProps & { open: boolean }) {
  return createPortal(<AnimatePresence>{open && <Panel kind="drawer" {...props} />}</AnimatePresence>, document.body)
}

function Panel({ kind, onClose, title, description, children, className, footer }: PanelProps & { kind: 'modal' | 'drawer' }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  // Release focus as soon as the exit animation starts, not when it ends.
  const present = useIsPresent()
  useFocusTrap(present, ref, onClose)
  const drawer = kind === 'drawer'
  return (
    <div className={cx('fixed inset-0 z-[80] flex', drawer ? 'justify-end' : 'items-end justify-center sm:items-center sm:p-6')}>
      <motion.div className="absolute inset-0 bg-scrim/45 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-desc` : undefined}
        tabIndex={-1}
        initial={drawer ? { x: '100%' } : { opacity: 0, y: 24 }}
        animate={drawer ? { x: 0 } : { opacity: 1, y: 0 }}
        exit={drawer ? { x: '100%' } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'relative flex flex-col bg-surface shadow-[var(--shadow-float)] focus:outline-none',
          drawer
            ? 'h-full w-full max-w-[440px] sm:m-2 sm:h-[calc(100%-16px)] sm:rounded-[var(--radius-lg)]'
            : 'max-h-[92svh] w-full rounded-t-[var(--radius-lg)] sm:max-w-lg sm:rounded-[var(--radius-lg)]',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div>
            <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={`${id}-desc`} className="mt-0.5 text-[15px] text-muted">
                {description}
              </p>
            )}
          </div>
          <IconButton aria-label="Close" tone="plain" onClick={onClose} className="-mt-1 -mr-2">
            <X className="size-5" />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{children}</div>
        {footer && <div className="border-t border-line px-6 py-5">{footer}</div>}
      </motion.div>
    </div>
  )
}
