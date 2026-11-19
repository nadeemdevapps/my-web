import { Check, Cloud, Download } from 'lucide-react'

import type { AppItem } from '../data'
import { cx } from '../lib/cx'
import { formatNumber } from '../lib/format'
import { Button, type Force } from './Button'
import { LedMatrix } from './LedMatrix'
import { Badge } from './Primitives'

/** An app tile: a strip of live LEDs showing what the app looks like, then its details. */
export function AppCard({ app, installed, onToggle, color = '#ff3b30', force }: { app: AppItem; installed?: boolean; onToggle?: () => void; color?: string; force?: Force }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-3 transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-line-strong hover:shadow-[var(--shadow-card)]">
      <div className="aspect-[4.5/1] rounded-[var(--radius-md)] bg-screen px-3 py-2.5">
        <LedMatrix text={app.preview} color={color} rows={11} scale={1} label={`${app.name} preview reads ${app.preview}`} />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug text-ink">{app.name}</h3>
          <Badge>{app.category}</Badge>
        </div>
        <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{app.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              {app.needsCloud && <Cloud className="size-4" aria-label="Needs Nadeem Cloud" />}
              {app.author}
            </span>
            <span className="tabular">{formatNumber(app.installs)} installs</span>
          </p>
          {onToggle && (
            <Button
              size="sm"
              variant={installed ? 'outline' : 'dark'}
              force={force}
              icon={installed ? <Check className="size-4" aria-hidden /> : <Download className="size-4" aria-hidden />}
              onClick={onToggle}
              aria-pressed={installed}
              aria-label={`${installed ? 'Installed' : 'Install'} ${app.name}`}
              className={cx(installed && 'text-success')}
            >
              {installed ? 'Installed' : 'Install'}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
