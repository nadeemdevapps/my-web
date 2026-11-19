import { ArrowUpRight } from 'lucide-react'

import { site } from '../../data/site'
import { Lines, Parallax, Reveal } from '../components/motion'

export function About() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
      <Lines as="h1" className="font-display text-balance text-[clamp(44px,7.5vw,112px)]" lines={['Solo developer,', 'AI-first builder']} />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <Reveal>
          <Parallax src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt={site.name} className="aspect-[3/4] rounded-image" strength={6} />
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-draw inline-flex items-center gap-1 text-muted hover:text-fg">
                  {s.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <Reveal className="text-pretty text-[19px] leading-relaxed sm:text-[22px]">
            <p>
              I learn breadth-first: a little of every field, so that when I need depth, I know where to start. I build the same way — plan first, then implement phase by phase, with testing at every step.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-5 text-[17px] leading-relaxed text-muted">
            <p>
              I do not claim deep mastery of any one language. AI writes the code; I own the plan, the design and the testing. My apps start as things I need myself — a finance app with paid features I wanted free, a blocker I rebuilt because the first version was not strict enough — and they stay free when there is no server to pay for.
            </p>
            <p>
              When I am not building, I am following the newest AI launches, trying new tools, or clearing doubts — mine and other people’s. I have been my class representative since grade three.
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
