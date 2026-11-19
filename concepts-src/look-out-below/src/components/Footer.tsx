import { Link } from 'react-router'

import { brand, footerLinks } from '../content'
import { Doodler } from './Doodle'
import { Container } from './UI'
import { Logo } from './Wordmark'

export function Footer() {
  return (
    <footer className="mt-24 border-t-[3px] border-ink bg-paper">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-graphite">{brand.short}</p>
          <div className="mt-5 flex items-end gap-1" aria-hidden="true">
            <Doodler size={36} hat="beanie" waddle />
            <Doodler size={36} tint="ink" waddle delay={0.3} />
            <Doodler size={36} accessory="umbrella" waddle delay={0.6} />
            <Doodler size={36} tint="butter" hat="bow" waddle delay={0.15} />
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
          {footerLinks.map((l) => (
            <Link key={l.to} to={l.to} className="inline-flex h-10 items-center font-extrabold text-ink-2 hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container>
        <div className="flex flex-col gap-1 border-t-2 border-ink/15 py-5 text-[0.8125rem] text-graphite sm:flex-row sm:justify-between">
        <span>
          {brand.footerCredit}. {brand.releaseLine}.
        </span>
        <span>No account, no tracking. Scores stay in your browser.</span>
        </div>
      </Container>
    </footer>
  )
}
