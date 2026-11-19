import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { ButtonLink } from '../components/Button'
import { Bubble, Doodler, Faller } from '../components/Doodle'
import { DevlogCard } from '../components/DevlogCard'
import { Card, Container, Frame, SectionTitle, Tag } from '../components/UI'
import { Wordmark } from '../components/Wordmark'
import { brand, characters, crowdChatter, devlog, fallers, home, IMAGES, type Accessory, type Hat, type Tint } from '../content'
import { cx } from '../lib/cx'
import { currentCharacter, isUnlocked, useSave } from '../lib/scores'
import { useDocumentTitle } from '../lib/useDocumentTitle'

// The crowd on the title screen: [left %, top %, size, hat, accessory, tint, bubble index, mobile]
type Spot = [number, number, number, Hat, Accessory, Tint, number?]
const MOBILE_CROWD: Spot[] = [
  [8, 30, 22, 'none', 'none', 'paper', 1],
  [6, 52, 24, 'beanie', 'none', 'ink'],
  [93, 52, 24, 'none', 'none', 'paper'],
  [12, 89, 24, 'none', 'umbrella', 'paper'],
  [35, 90, 22, 'cap', 'none', 'smudge'],
  [65, 90, 22, 'bow', 'none', 'butter'],
  [88, 89, 24, 'none', 'bag', 'paper'],
  [50, 10, 20, 'none', 'none', 'paper'],
]
const CROWD: Spot[] = [
  [3, 52, 26, 'none', 'none', 'paper'],
  [7, 60, 28, 'beanie', 'none', 'ink'],
  [14, 41, 24, 'none', 'none', 'paper', 1],
  [16, 70, 30, 'none', 'bag', 'paper'],
  [10, 79, 26, 'cap', 'none', 'smudge'],
  [21, 58, 30, 'none', 'none', 'ink'],
  [23, 82, 26, 'none', 'umbrella', 'paper'],
  [28, 47, 24, 'bucket', 'none', 'paper'],
  [25, 69, 28, 'none', 'scarf', 'paper', 3],
  [31, 18, 22, 'none', 'none', 'paper'],
  [35, 87, 24, 'none', 'none', 'smudge'],
  [38, 55, 24, 'beanie', 'none', 'paper'],
  [27, 31, 22, 'none', 'none', 'ink', 0],
  [32, 90, 22, 'top', 'none', 'paper'],
  [85, 91, 22, 'none', 'glasses', 'paper'],
  [63, 36, 22, 'cap', 'none', 'paper'],
  [64, 55, 24, 'none', 'none', 'smudge'],
  [71, 90, 26, 'none', 'none', 'paper', 2],
  [70, 46, 24, 'none', 'bag', 'ink'],
  [72, 66, 30, 'beanie', 'scarf', 'paper', 5],
  [77, 84, 26, 'none', 'none', 'paper'],
  [80, 55, 26, 'none', 'none', 'paper'],
  [82, 73, 26, 'bow', 'none', 'butter'],
  [87, 62, 30, 'none', 'umbrella', 'paper', 4],
  [91, 79, 26, 'none', 'none', 'ink'],
  [94, 50, 24, 'cap', 'none', 'paper'],
  [52, 96, 24, 'none', 'ladder', 'smudge'],
]

function Crowd({ spots, className }: { spots: Spot[]; className: string }) {
  return (
    <div aria-hidden="true" className={cx('pointer-events-none absolute inset-0', className)}>
      {spots.map(([x, y, size, hat, accessory, tint, say], i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${x}%`, top: `${y}%` }}>
          {say !== undefined && (
            <div className={cx('absolute bottom-full mb-1', x > 75 ? 'right-1/2 translate-x-1/3' : 'left-1/2 -translate-x-1/3')}>
              <Bubble tail={x > 75 ? 'right' : 'left'}>{crowdChatter[say]}</Bubble>
            </div>
          )}
          <Doodler size={Math.round(size * 1.6)} hat={hat} accessory={accessory} tint={tint} waddle={i % 3 === 0} boil delay={(i % 5) * 0.17} flip={i % 2 === 1} />
        </div>
      ))}
    </div>
  )
}

function TitleScreen() {
  const save = useSave()
  return (
    <Container className="max-w-[1320px]">
      <Frame className="min-h-[640px] md:h-[calc(100svh-104px)] md:max-h-[860px] md:min-h-[700px]">
        {/* The falling piano and its growing shadow. */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[38%] right-[2%] h-[8%] w-[44%] animate-shadow-pulse rounded-[50%] bg-[radial-gradient(closest-side,rgb(17_17_17/0.2),rgb(17_17_17/0.12)_70%,transparent)] md:top-[60%] md:right-[7%] md:w-[27%]" />
        <img
          src={IMAGES.heroPiano}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-[9%] -right-[14%] w-[62%] max-w-[620px] animate-bob mix-blend-multiply select-none md:-top-[16%] md:-right-[2%] md:w-[40%]"
          draggable={false}
        />
        <Crowd spots={CROWD} className="hidden md:block" />
        <Crowd spots={MOBILE_CROWD} className="md:hidden" />
        <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center px-4 pt-24 pb-40 text-center md:pt-6 md:pb-16">
          <Wordmark className="text-[6.4rem] sm:text-[8.5rem] md:text-[10.5rem] lg:text-[12rem]" />
          <p className="mt-7 max-w-[34rem] text-[1.0625rem] leading-snug font-semibold text-ink-2 md:text-[1.25rem]">{brand.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink to="/play?start=1" size="lg">
              {home.start}
            </ButtonLink>
            <ButtonLink to="/tutorial" variant="paper" size="lg">
              {home.tutorial}
            </ButtonLink>
          </div>
          {save.best > 0 && (
            <p className="mt-5">
              <Tag tone="butter">
                {home.bestLabel}: {save.best} as {currentCharacter(save).name}
              </Tag>
            </p>
          )}
        </div>
        <p className="absolute inset-x-0 bottom-4 z-10 px-4 text-center text-[0.8125rem] text-graphite">
          {brand.footerCredit}.{' '}
          <a className="ink-link" href="https://fonts.google.com/specimen/Londrina+Solid" target="_blank" rel="noreferrer">
            {brand.footerFont}
          </a>
          .
        </p>
      </Frame>
    </Container>
  )
}

export function Home() {
  useDocumentTitle()
  const save = useSave()
  const teaser = characters.slice(0, 6)
  return (
    <>
      <TitleScreen />

      <Container className="mt-24">
        <div className="grid gap-6 md:grid-cols-3">
          {home.features.map((f, i) => (
            <Card key={f.title} className="p-6 md:p-7">
              <Faller kind={(['piano', 'teacup', 'coin'] as const)[i]} size={64} className="mb-4" />
              <h2 className="font-display text-[1.875rem] leading-none font-black">{f.title}</h2>
              <p className="mt-3 leading-relaxed text-graphite">{f.body}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <div className="flex flex-col gap-8 rounded-[var(--radius-frame)] border-[3px] border-ink bg-paper p-6 md:flex-row md:items-center md:p-10">
          <div className="md:w-[38%]">
            <SectionTitle>{home.galleryTitle}</SectionTitle>
            <p className="mt-3 leading-relaxed text-graphite">{home.galleryBody}</p>
            <ButtonLink to="/characters" variant="paper" className="mt-6" icon={<ArrowRight className="size-4" strokeWidth={3} />}>
              {home.galleryCta}
            </ButtonLink>
          </div>
          <ul className="grid flex-1 grid-cols-3 gap-3 sm:grid-cols-6">
            {teaser.map((c) => {
              const open = isUnlocked(c, save.best)
              return (
                <li key={c.id} className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] bg-card px-2 pt-4 pb-3">
                  <Doodler size={42} hat={c.hat} accessory={c.accessory} tint={c.tint} waddle={open} className={open ? '' : 'opacity-35 grayscale'} />
                  <span className="text-[0.875rem] font-extrabold">{open ? c.name : '?'}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>

      <Container className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionTitle>{home.devlogTitle}</SectionTitle>
          <Link to="/devlog" className="ink-link inline-flex h-10 items-center font-extrabold">
            {home.devlogCta}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {devlog.posts.slice(0, 3).map((p) => (
            <DevlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <div className="relative overflow-hidden rounded-[var(--radius-frame)] bg-ink px-6 py-12 text-center text-white md:px-12 md:py-16">
          <div aria-hidden="true" className="mb-6 flex justify-center gap-6">
            {fallers.slice(0, 4).map((f) => (
              <span key={f.kind} className="text-white [&_path[fill='#ffffff']]:fill-ink">
                <Faller kind={f.kind} size={40} className="text-white" />
              </span>
            ))}
          </div>
          <h2 className="font-display text-[2.5rem] leading-none font-black md:text-[3.5rem]">{home.wishlistTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{home.wishlistBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/play" variant="paper" size="lg">
              Play the demo
            </ButtonLink>
            <ButtonLink to="/press" variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Press kit
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  )
}
