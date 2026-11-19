import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { nav } from '../content'
import { cx } from '../lib/cx'
import { ButtonLink, IconButton } from './Button'
import { Drawer } from './Overlay'
import { Container } from './UI'
import { Logo } from './Wordmark'

const link =
  'round relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-extrabold text-ink-2 transition-colors hover:bg-ink/6 aria-[current=page]:bg-ink aria-[current=page]:text-white'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <header className="relative z-30">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="round -mx-2 inline-flex h-11 items-center rounded-full px-2" aria-label="Look Out Below, home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <IconButton aria-label="Open menu" aria-expanded={open} className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="size-5" strokeWidth={2.75} />
        </IconButton>
      </Container>
      <Drawer open={open} onClose={() => setOpen(false)} title="Menu">
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          <NavLink to="/" end className={cx(link, 'h-12 text-[1.125rem]')}>
            Home
          </NavLink>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={cx(link, 'h-12 text-[1.125rem]')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <ButtonLink to="/play" size="lg" className="mt-auto">
          Play the demo
        </ButtonLink>
      </Drawer>
    </header>
  )
}
