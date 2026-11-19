import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button, ButtonLink } from '../components/Button'
import { Doodler, Faller } from '../components/Doodle'
import { Hats } from '../components/GameStage'
import { Card, Container, Frame, PageHeader, SectionTitle, Tag } from '../components/UI'
import { fallers, tutorial } from '../content'
import { cx } from '../lib/cx'
import { useDocumentTitle } from '../lib/useDocumentTitle'

function Scene({ scene }: { scene: string }) {
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <div className="absolute inset-x-[6%] bottom-[18%] h-[2px] rounded bg-ink/20" />
      {scene === 'you' && (
        <>
          {[12, 28, 70, 86].map((x, i) => (
            <div key={x} className="absolute bottom-[18%] -translate-x-1/2 opacity-70" style={{ left: `${x}%` }}>
              <Doodler size={34} tint={i === 1 ? 'ink' : 'paper'} hat={i === 2 ? 'cap' : 'none'} waddle boil delay={i * 0.2} />
            </div>
          ))}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 animate-[tut-slide_3s_ease-in-out_infinite]">
            <svg viewBox="0 0 14 10" className="mx-auto mb-1 h-3 w-4 animate-bounce"><path d="M0 0h14L7 10Z" fill="#111" /></svg>
            <Doodler size={48} hat="beanie" waddle boil />
          </div>
        </>
      )}
      {scene === 'shadow' && (
        <>
          <div className="absolute bottom-[15%] left-1/2 h-[9%] w-[30%] -translate-x-1/2 animate-[tut-grow_2.4s_ease-in_infinite] rounded-[50%] bg-ink/25" />
          <div className="absolute left-1/2 -translate-x-1/2 animate-[tut-drop_2.4s_ease-in_infinite]">
            <Faller kind="piano" size={110} boil />
          </div>
          <div className="absolute bottom-[18%] left-[16%] -translate-x-1/2">
            <Doodler size={40} waddle boil />
          </div>
        </>
      )}
      {scene === 'coin' && (
        <>
          <div className="absolute bottom-[16%] left-[55%] h-[6%] w-[12%] -translate-x-1/2 rounded-[50%] bg-[#a08c28]/30" />
          <div className="absolute left-[55%] -translate-x-1/2 animate-[tut-drop_2s_ease-in_infinite]">
            <Faller kind="coin" size={44} boil />
          </div>
          <div className="absolute bottom-[18%] left-[55%] -translate-x-1/2">
            <Doodler size={46} hat="bucket" waddle boil />
          </div>
        </>
      )}
      {scene === 'hats' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <Hats count={3} className="scale-[2.2]" />
          <div className="flex items-end gap-6">
            <Doodler size={46} hat="top" boil />
            <Doodler size={46} hat="none" boil className="rotate-12" />
          </div>
        </div>
      )}
    </div>
  )
}

export function Tutorial() {
  useDocumentTitle(tutorial.title)
  const [i, setI] = useState(0)
  const steps = tutorial.steps
  const step = steps[i]
  const headRef = useRef<HTMLHeadingElement>(null)
  const go = (n: number) => {
    setI(n)
    requestAnimationFrame(() => headRef.current?.focus())
  }
  const last = i === steps.length - 1
  return (
    <Container>
      <PageHeader title={tutorial.title} intro={tutorial.intro} />
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Frame className="aspect-[4/3] rounded-[var(--radius-lg)] border-[3.5px] lg:aspect-auto lg:min-h-[420px]">
          <Scene key={step.scene} scene={step.scene} />
        </Frame>
        <Card className="flex flex-col p-6 md:p-8">
          <p className="text-[0.875rem] font-extrabold text-graphite" aria-live="polite">
            {tutorial.stepLabel(i + 1, steps.length)}
          </p>
          <h2 ref={headRef} tabIndex={-1} className="mt-2 font-display text-[2.75rem] leading-[0.95] font-black focus:outline-none">
            {step.title}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">{step.body}</p>
          <p className="mt-4">
            <Tag tone="butter">{step.tip}</Tag>
          </p>
          <div className="mt-auto pt-8">
            <ol className="mb-5 flex gap-2" aria-label="Steps">
              {steps.map((s, n) => (
                <li key={s.title}>
                  <button
                    type="button"
                    aria-label={`${tutorial.stepLabel(n + 1, steps.length)}: ${s.title}`}
                    aria-current={n === i ? 'step' : undefined}
                    onClick={() => go(n)}
                    className="round grid size-10 place-items-center rounded-full"
                  >
                    <span className={cx('round block size-3.5 rounded-full border-2 border-ink transition-colors', n === i ? 'bg-ink' : n < i ? 'bg-pencil' : 'bg-card')} />
                  </button>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <Button variant="paper" disabled={i === 0} onClick={() => go(i - 1)} icon={<ArrowLeft className="size-4" strokeWidth={3} />}>
                {tutorial.back}
              </Button>
              {last ? (
                <ButtonLink to="/play?start=1" icon={<Play className="size-4" strokeWidth={3} />}>
                  {tutorial.finish}
                </ButtonLink>
              ) : (
                <Button onClick={() => go(i + 1)}>
                  {tutorial.next}
                  <ArrowRight className="size-4" strokeWidth={3} />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      <section className="mt-20">
        <SectionTitle>{tutorial.whatFalls}</SectionTitle>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {fallers.map((f) => (
            <li key={f.kind}>
              <Card className="flex h-full flex-col items-start p-5">
                <Faller kind={f.kind} size={56} />
                <h3 className="mt-3 font-display text-[1.5rem] leading-none font-black">{f.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-graphite">{f.note}</p>
                <Tag className="mt-3" tone={f.kind === 'coin' ? 'butter' : 'paper'}>
                  {f.points}
                </Tag>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
