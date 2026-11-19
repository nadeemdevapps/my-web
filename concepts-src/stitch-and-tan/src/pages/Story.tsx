import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { ButtonLink, ScriptTitle, Signature } from '../components/ui'
import { brand, photos, story } from '../content'
import { useTitle } from '../lib/title'

const rise = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6 } }

export function Story() {
  useTitle('Story')
  return (
    <div className="pt-14 sm:pt-20">
      <header className="mx-auto max-w-[640px] px-4 text-center">
        <ScriptTitle>{story.title}</ScriptTitle>
        <p className="mt-5 text-[20px] leading-relaxed text-body sm:text-[22px]">{story.lead}</p>
        <Signature name={brand.maker} className="mt-6" />
      </header>

      <motion.figure {...rise} className="mx-auto mt-14 max-w-[1120px] px-4 sm:px-6">
        <img src={photos.workshop} alt="A small leather workshop bench by a window, with hides, thread spools and tools" width={1500} height={1000} className="aspect-[3/2] w-full rounded-panel object-cover sm:aspect-[21/9]" />
        <figcaption className="mt-3 text-center text-[14px] text-muted">The bench, on a good afternoon.</figcaption>
      </motion.figure>

      <section className="mx-auto mt-16 max-w-[560px] space-y-6 px-4 text-[18px] leading-[1.7] text-body sm:text-[19px]">
        {story.paragraphs.map((p) => (
          <motion.p key={p.slice(0, 20)} {...rise}>
            {p}
          </motion.p>
        ))}
      </section>

      <section aria-label="In numbers" className="mx-auto mt-16 grid max-w-[880px] gap-3 px-4 sm:grid-cols-3">
        {story.stats.map((s) => (
          <motion.div key={s.label} {...rise} className="doodle-bg rounded-card px-6 py-7 text-center">
            <p className="font-script text-[64px] font-bold leading-none text-ink">{s.value}</p>
            <p className="mt-2 text-[15px] text-body">{s.label}</p>
          </motion.div>
        ))}
      </section>

      <section aria-labelledby="process" className="mx-auto mt-24 grid max-w-[1120px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
        <div>
          <ScriptTitle as="h2" size="md">
            <span id="process">{story.processTitle}</span>
          </ScriptTitle>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {story.process.map((s, i) => (
              <motion.li key={s.title} {...rise} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-card border border-line bg-paper p-5">
                <span aria-hidden className="font-hand text-[22px] text-tan-text">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-[17px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-[15px] text-body">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.img {...rise} src={photos.hands} alt="Saddle-stitching a tan pouch by hand with two needles" width={1000} height={1500} loading="lazy" className="aspect-[4/5] w-full rounded-panel object-cover" />
      </section>

      <section aria-labelledby="story-cta" className="mx-auto mt-24 max-w-[720px] px-4">
        <div className="doodle-bg rounded-panel px-6 py-12 text-center">
          <ScriptTitle as="h2" size="md">
            <span id="story-cta">{story.ctaTitle}</span>
          </ScriptTitle>
          <p className="mx-auto mt-3 max-w-sm text-[17px] text-body">{story.ctaBody}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/custom" variant="blue">
              {story.ctaButton} <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink to="/shop" variant="secondary">
              {story.shopButton}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  )
}
