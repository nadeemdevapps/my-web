import { Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { brand, footer, nav } from '../content'
import { cx } from '../lib/cx'
import { useStore } from '../lib/store'
import { Drawer } from './Overlay'
import { IconButton, Mark, Signature } from './ui'

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cx('round inline-flex h-11 items-center gap-2 rounded-full pr-2 text-[16px] leading-none', className)}>
      <Mark className="text-blue" />
      <span className="font-bold tracking-[-0.01em] text-blue">{brand.makerShort}</span>
      <span aria-hidden className="text-[13px] text-muted">×</span>
      <span className="font-medium text-ink">{brand.name}</span>
    </Link>
  )
}

export function Nav() {
  const { count, setCartOpen } = useStore()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])

  return (
    <header className="sticky top-3 z-40 px-4">
      <nav aria-label="Main" className="mx-auto flex h-[62px] max-w-[560px] items-center justify-between gap-2 rounded-full bg-paper pl-6 pr-2.5 shadow-pill">
        <Wordmark />
        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                className={({ isActive }) =>
                  cx('round inline-flex h-10 items-center rounded-full px-3 text-[14px] font-medium transition-colors hover:bg-cream', isActive ? 'text-ink underline decoration-tan decoration-2 underline-offset-[6px]' : 'text-muted hover:text-ink')
                }
              >
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <IconButton label="Open bag" badge={count} onClick={() => setCartOpen(true)}>
            <ShoppingBag aria-hidden strokeWidth={1.8} />
          </IconButton>
          <IconButton label="Open menu" className="md:hidden" onClick={() => setMenu(true)} aria-expanded={menu}>
            <Menu aria-hidden strokeWidth={1.8} />
          </IconButton>
        </div>
      </nav>
      <Drawer open={menu} onClose={() => setMenu(false)} title="Menu">
        <ul className="-mx-2 flex flex-col">
          {[{ to: '/', label: 'Home' }, ...nav].map((n) => (
            <li key={n.to}>
              <NavLink end to={n.to} className={({ isActive }) => cx('flex h-14 items-center rounded-field px-3 font-script text-[34px] font-bold transition-colors hover:bg-cream', isActive ? 'text-blue' : 'text-ink')}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Drawer>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line px-4 pb-10 pt-14 sm:mt-32">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-6 text-center">
        <Signature name={brand.maker} />
        <p className="max-w-sm text-[15px] text-muted">{footer.note}</p>
        <ul className="flex flex-wrap justify-center gap-x-1 gap-y-1">
          {footer.links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="round inline-flex h-10 items-center rounded-full px-3 text-[15px] font-medium text-ink transition-colors hover:bg-cream">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-muted">{footer.copyright}</p>
      </div>
    </footer>
  )
}

export function Toaster() {
  const { toasts, dismissToast } = useStore()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="pointer-events-auto flex min-h-12 items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-[15px] text-white shadow-card"
          >
            <span>{t.message}</span>
            {t.action && (
              <button
                type="button"
                onClick={() => {
                  t.action?.run()
                  dismissToast(t.id)
                }}
                className="round h-10 rounded-full px-4 font-semibold text-[#f2c99c] underline-offset-4 hover:underline focus-visible:outline-white"
              >
                {t.action.label}
              </button>
            )}
            <button type="button" aria-label="Dismiss" onClick={() => dismissToast(t.id)} className="round grid size-10 place-items-center rounded-full text-white/80 hover:bg-white/10 focus-visible:outline-white">
              <X aria-hidden className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
