import { ArrowUpRight, Menu, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { NAV, SITE } from '../data'
import { cx } from '../lib/cx'
import { useStore } from '../lib/store'
import { CloudMark, DotMark } from './Art'
import { IconButton, NavItem } from './Button'
import { Drawer } from './Overlay'

export function Header() {
  const { summary, setCartOpen } = useStore()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-page flex items-start justify-between gap-6 pt-5 md:pt-11">
        <nav aria-label="Main" className="hidden items-center gap-8 text-lg md:flex lg:gap-11 xl:text-[21px]">
          {NAV.map((item) => (
            <NavItem key={item.to} to={item.to} end={item.to === '/'} className="py-1">
              {item.label}
            </NavItem>
          ))}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2 rounded-[var(--radius-xs)] py-1 text-muted link-underline decoration-ink/35 hover:text-ink"
          >
            Cart
            {summary.count > 0 && (
              <span className="round inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-ink px-1.5 text-[13px] text-white no-underline tabular">{summary.count}</span>
            )}
          </button>
        </nav>

        <Link to="/" className="flex min-h-11 items-center gap-2.5 rounded-[var(--radius-xs)] md:hidden" aria-label={`${SITE.name} home`}>
          <DotMark />
          <span className="text-lg font-medium">{SITE.name}</span>
        </Link>

        <div className="hidden items-start gap-5 lg:flex">
          <CloudMark className="mt-1" />
          <div className="max-w-[15.5rem] xl:max-w-[16.5rem]">
            <Link to="/apps#developers" className="inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] text-lg text-muted link-underline decoration-ink/35 hover:text-ink xl:text-[21px]">
              {SITE.cloud.title}
              <ArrowUpRight className="size-5 no-underline" aria-hidden />
            </Link>
            <p className="mt-1.5 text-[14.5px] leading-[1.65] text-muted xl:text-[15.5px]">{SITE.cloud.body}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <IconButton aria-label={`Cart, ${summary.count} items`} badge={summary.count} onClick={() => setCartOpen(true)}>
            <ShoppingBag className="size-5" aria-hidden />
          </IconButton>
          <IconButton aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
            <Menu className="size-5" aria-hidden />
          </IconButton>
        </div>
      </div>

      <Drawer open={menu} onClose={() => setMenu(false)} title="Menu">
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cx('flex min-h-14 items-center border-b border-line text-2xl', isActive ? 'text-ink' : 'text-muted')}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/apps#developers" className="mt-8 flex items-start gap-4 rounded-[var(--radius-sm)]">
            <CloudMark className="w-20 shrink-0" />
            <span>
              <span className="link-underline text-lg">{SITE.cloud.title}</span>
              <span className="mt-1 block text-[15px] text-muted">{SITE.cloud.body}</span>
            </span>
          </Link>
        </nav>
      </Drawer>
    </header>
  )
}
