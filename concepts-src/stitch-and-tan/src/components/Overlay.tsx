import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, type ReactNode } from 'react'

import { cx } from '../lib/cx'
import { useFocusTrap } from '../lib/focus'
import { IconButton } from './ui'

/** Side sheet: focus trapped inside, Escape or the scrim closes it, focus
 *  returns to the opener. */
export function Drawer({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  return <AnimatePresence>{open && <DrawerPanel onClose={onClose} title={title} footer={footer}>{children}</DrawerPanel>}</AnimatePresence>
}

function DrawerPanel({ onClose, title, children, footer }: { onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  const ref = useFocusTrap<HTMLDivElement>(true, onClose)
  const titleId = useId()
  return (
    <div className="fixed inset-0 z-50">
      <motion.div className="absolute inset-0 bg-ink/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-page shadow-drawer sm:right-3 sm:top-3 sm:h-[calc(100%-24px)] sm:rounded-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id={titleId} className="font-script text-[38px] font-bold leading-none">
            {title}
          </h2>
          <IconButton label="Close" size="sm" onClick={onClose}>
            <X aria-hidden />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-line px-6 py-5">{footer}</div>}
      </motion.div>
    </div>
  )
}

/** Centred dialog with the same focus and Escape behaviour as the drawer. */
export function Modal({ open, onClose, title, children, className, hideTitle }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string; hideTitle?: boolean }) {
  return <AnimatePresence>{open && <ModalPanel onClose={onClose} title={title} className={className} hideTitle={hideTitle}>{children}</ModalPanel>}</AnimatePresence>
}

function ModalPanel({ onClose, title, children, className, hideTitle }: { onClose: () => void; title: string; children: ReactNode; className?: string; hideTitle?: boolean }) {
  const ref = useFocusTrap<HTMLDivElement>(true, onClose)
  const titleId = useId()
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <motion.div className="absolute inset-0 bg-ink/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cx('relative max-h-[calc(100dvh-32px)] w-full max-w-lg overflow-y-auto rounded-panel bg-page p-6 shadow-card sm:p-8', className)}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className={cx('font-script text-[40px] font-bold leading-none', hideTitle && 'sr-only')}>
            {title}
          </h2>
          <IconButton label="Close" size="sm" onClick={onClose} className="-mr-2 -mt-1 ml-auto">
            <X aria-hidden />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
