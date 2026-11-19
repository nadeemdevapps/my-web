import { Link } from 'react-router'

import { FOOTER, SITE } from '../data'
import { DotMark } from './Art'
import { TextLink } from './Button'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-16">
        <div>
          <Link to="/" className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-xs)]">
            <DotMark />
            <span className="text-lg font-medium">{SITE.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-muted">{FOOTER.blurb}</p>
        </div>
        {FOOTER.columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-[15px] text-ink">{col.title}</h2>
            <ul className="mt-3 space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <TextLink to={l.to} className="inline-flex min-h-10 min-w-10 items-center">
                    {l.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page border-t border-line py-6 text-sm text-muted">{FOOTER.legal}</div>
    </footer>
  )
}
