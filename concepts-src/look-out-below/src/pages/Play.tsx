import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { Button, ButtonLink } from '../components/Button'
import { Doodler, Faller } from '../components/Doodle'
import { GameStage } from '../components/GameStage'
import { Modal } from '../components/Overlay'
import { Card, Container, Kbd, PageHeader } from '../components/UI'
import { characters, fallers, play } from '../content'
import { timeAgo } from '../lib/format'
import { clearScores, currentCharacter, useSave } from '../lib/scores'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Play() {
  useDocumentTitle(play.title)
  const save = useSave()
  const [params] = useSearchParams()
  const character = currentCharacter(save)
  const [confirm, setConfirm] = useState(false)
  const [cleared, setCleared] = useState(false)
  return (
    <Container>
      <PageHeader title={play.title} intro={play.intro} className="md:mb-8" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <GameStage character={character} best={save.best} autostart={params.get('start') === '1'} />
        <aside className="flex flex-col gap-5">
          <Card className="p-5">
            <h2 className="text-[0.8125rem] font-extrabold text-graphite">{play.playingAs}</h2>
            <div className="mt-2 flex items-center gap-4">
              <Doodler size={44} hat={character.hat} accessory={character.accessory} tint={character.tint} waddle />
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1.75rem] leading-none font-black">{character.name}</p>
                <p className="text-[0.875rem] text-graphite">{character.role}</p>
              </div>
              <ButtonLink to="/characters" variant="paper" size="sm">
                {play.change}
              </ButtonLink>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-display text-[1.5rem] leading-none font-black">Controls</h2>
            <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.9375rem] text-ink-2">
              <Kbd>←</Kbd>
              <Kbd>→</Kbd> or <Kbd>A</Kbd>
              <Kbd>D</Kbd> move, <Kbd>Space</Kbd> pause
            </p>
            <p className="mt-2 text-[0.875rem] text-graphite">{play.controlsTouch}</p>
            <ul className="mt-4 grid grid-cols-5 gap-1" aria-label="What falls">
              {fallers.map((f) => (
                <li key={f.kind} className="flex flex-col items-center gap-1 text-center">
                  <Faller kind={f.kind} size={30} />
                  <span className="text-[0.6875rem] leading-tight font-bold text-graphite">{f.points}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-[1.5rem] leading-none font-black">{play.history}</h2>
              <Button variant="ghost" size="sm" className="-mr-2" disabled={!save.runs.length} onClick={() => setConfirm(true)} icon={<Trash2 className="size-4" strokeWidth={2.5} />}>
                {play.clear}
              </Button>
            </div>
            {save.runs.length ? (
              <ol className="mt-3 flex flex-col divide-y-2 divide-ink/10" data-testid="runs">
                {save.runs.slice(0, 6).map((r) => (
                  <li key={r.at} className="flex items-center justify-between py-2 text-[0.9375rem]">
                    <span>
                      <span className="font-display text-[1.375rem] font-black tabular-nums">{r.score}</span>
                      <span className="ml-2 text-graphite">{characters.find((c) => c.id === r.character)?.name ?? 'Pip'}</span>
                    </span>
                    <span className="text-[0.8125rem] text-graphite">{timeAgo(r.at)}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-[0.9375rem] text-graphite">{cleared ? play.cleared + '. ' : ''}{play.historyEmpty}</p>
            )}
            <p className="mt-3 text-[0.8125rem] text-graphite">
              New to this? Read the <Link to="/tutorial" className="ink-link">tutorial</Link>.
            </p>
          </Card>
        </aside>
      </div>
      <Modal open={confirm} onClose={() => setConfirm(false)} title="Clear scores?" description="Your best score and recent runs are removed from this browser. Unlocked characters lock again.">
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="paper" onClick={() => setConfirm(false)} data-autofocus>
            Keep them
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              clearScores()
              setCleared(true)
              setConfirm(false)
            }}
          >
            {play.clear}
          </Button>
        </div>
      </Modal>
    </Container>
  )
}
