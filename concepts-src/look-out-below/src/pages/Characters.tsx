import { Check, Lock } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, ButtonLink } from '../components/Button'
import { Bubble, Doodler } from '../components/Doodle'
import { Modal } from '../components/Overlay'
import { Card, Chip, Container, EmptyState, PageHeader, Tag } from '../components/UI'
import { characters, charactersPage as copy, type Character } from '../content'
import { cx } from '../lib/cx'
import { currentCharacter, isUnlocked, selectCharacter, useSave } from '../lib/scores'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Filter = (typeof copy.filters)[number]['id']

function Speed({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${n} of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={cx('round block size-2.5 rounded-full border-2 border-ink', i <= n ? 'bg-ink' : 'bg-card')} />
      ))}
    </span>
  )
}

export function CharacterCard({ c, unlocked, selected, onOpen, force }: { c: Character; unlocked: boolean; selected: boolean; onOpen: () => void; force?: 'hover' }) {
  return (
    <Card interactive force={force} className={cx('flex h-full flex-col overflow-hidden', !unlocked && 'bg-paper')}>
      <div className="relative grid h-44 place-items-center border-b-[2.5px] border-ink bg-white/60">
        {unlocked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Bubble tail="center">{c.says}</Bubble>
          </div>
        )}
        <Doodler size={64} hat={c.hat} accessory={c.accessory} tint={c.tint} waddle={unlocked} boil={unlocked} className={cx('mt-8', !unlocked && 'opacity-30 grayscale')} />
        {selected && (
          <Tag tone="ink" className="absolute right-3 bottom-3">
            <Check className="mr-1 size-3.5" strokeWidth={3} />
            {copy.selected}
          </Tag>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-[1.875rem] leading-none font-black">
          <button type="button" onClick={onOpen} className="inline-flex min-h-10 min-w-10 items-center text-left after:absolute after:inset-0 after:rounded-[var(--radius-lg)] focus:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-ink">
            {unlocked ? c.name : `${c.name}?`}
          </button>
        </h2>
        <p className="mt-1 text-[0.9375rem] font-bold text-graphite">{c.role}</p>
        <div className="mt-auto pt-4">
          {unlocked ? (
            <span className="inline-flex items-center gap-2 text-[0.8125rem] font-extrabold text-graphite">
              {copy.speed} <Speed n={c.speed} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-extrabold text-graphite">
              <Lock className="size-3.5" strokeWidth={3} /> {copy.lockedLabel(c.unlockAt)}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export function Characters() {
  useDocumentTitle(copy.title)
  const save = useSave()
  const nav = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Character | null>(null)
  const current = currentCharacter(save)
  const list = characters.filter((c) => (filter === 'all' ? true : filter === 'unlocked' ? isUnlocked(c, save.best) : !isUnlocked(c, save.best)))
  const unlockedCount = characters.filter((c) => isUnlocked(c, save.best)).length
  return (
    <Container>
      <PageHeader title={copy.title} intro={copy.intro}>
        <p className="shrink-0 font-display text-[1.5rem] leading-none font-black">
          {unlockedCount} / {characters.length} {copy.unlocked.toLowerCase()}
        </p>
      </PageHeader>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter characters">
        {copy.filters.map((f) => (
          <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>
      {list.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <li key={c.id}>
              <CharacterCard c={c} unlocked={isUnlocked(c, save.best)} selected={current.id === c.id} onOpen={() => setOpen(c)} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="All out of the crowd" action={<ButtonLink to="/play">{copy.emptyCta}</ButtonLink>}>
          {filter === 'locked' ? 'Every character is unlocked. The sky is running out of surprises.' : copy.empty}
        </EmptyState>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title={open ? (isUnlocked(open, save.best) ? open.name : `${open.name}?`) : ''} description={open?.role}>
        {open && (
          <div>
            <div className="paper-grain flex h-44 items-end justify-center rounded-[var(--radius-md)] border-2 border-ink pb-6">
              <Doodler size={70} hat={open.hat} accessory={open.accessory} tint={open.tint} waddle boil className={isUnlocked(open, save.best) ? '' : 'opacity-30 grayscale'} />
            </div>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{open.bio}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.9375rem]">
              <div>
                <dt className="text-[0.8125rem] font-extrabold text-graphite">{copy.habit}</dt>
                <dd>{open.habit}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-extrabold text-graphite">{copy.speed}</dt>
                <dd className="mt-1">
                  <Speed n={open.speed} />
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              {isUnlocked(open, save.best) ? (
                <Button
                  disabled={current.id === open.id}
                  onClick={() => {
                    selectCharacter(open.id)
                    setOpen(null)
                    nav('/play')
                  }}
                >
                  {current.id === open.id ? copy.selected : copy.select}
                </Button>
              ) : (
                <>
                  <p className="mr-auto self-center text-[0.875rem] font-extrabold text-graphite">{copy.lockedLabel(open.unlockAt)}</p>
                  <ButtonLink to="/play">{copy.emptyCta}</ButtonLink>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Container>
  )
}
