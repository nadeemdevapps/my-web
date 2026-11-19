import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'

import { Bubble, ButtonLink, DateChip, ScriptTitle, Signature, TypingDots } from '../components/ui'
import { ProductCard } from '../components/ProductCard'
import { brand, findProduct, home, photos, products, story, type Product } from '../content'
import { cx } from '../lib/cx'
import { money } from '../lib/money'
import { useTitle } from '../lib/title'

/** A hero piece: floats gently, can be picked up and dragged, and opens its
 *  product page on click or Enter. */
function Floating({ product, className, tilt, delay, size }: { product: Product; className: string; tilt: number; delay: number; size: string }) {
  const dragged = useRef(false)
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.6}
      whileDrag={{ scale: 1.08, zIndex: 20 }}
      onDragStart={() => (dragged.current = true)}
      onDragEnd={() => window.setTimeout(() => (dragged.current = false), 0)}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cx('absolute z-10 cursor-grab touch-none active:cursor-grabbing', className)}
    >
      <Link
        to={`/shop/${product.slug}`}
        draggable={false}
        onClick={(e) => dragged.current && e.preventDefault()}
        className="group relative block rounded-card focus-visible:outline-offset-0"
        aria-label={`${product.name}, ${money(product.price)}`}
      >
        <img
          src={photos[product.photo]}
          alt=""
          draggable={false}
          width={880}
          height={880}
          className={cx('cutout pointer-events-none animate-float select-none drop-shadow-none transition-transform duration-500 group-hover:scale-105', size)}
          style={{ ['--tilt' as string]: `${tilt}deg`, animationDelay: `${delay * -3}s` }}
        />
        <span className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-chip bg-ink px-3 py-1.5 text-[13px] font-semibold text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {product.name}, {money(product.price)}
        </span>
      </Link>
    </motion.div>
  )
}

function Hero() {
  const top = findProduct('flap-pouch')!
  const left = findProduct('keyboard-sleeve')!
  const right = findProduct('coin-pouch')!
  return (
    <section aria-labelledby="hero-title" className="relative mx-auto max-w-[900px] overflow-x-clip px-4 pt-10 sm:pt-[60px]">
      <div className="relative mx-auto h-[480px] max-w-[760px] sm:h-[620px]">
        <Floating product={top} tilt={-4} delay={0.05} className="left-1/2 top-0 -translate-x-1/2" size="size-[170px] sm:size-[250px]" />
        <Floating product={left} tilt={-24} delay={0.2} className="left-[-4%] top-[40px] sm:left-[9%] sm:top-[370px]" size="size-[120px] sm:size-[236px]" />
        <Floating product={right} tilt={8} delay={0.35} className="right-[-4%] top-[90px] sm:right-[-4%] sm:top-[290px]" size="size-[110px] sm:size-[210px]" />
        <div className="absolute inset-x-0 top-[200px] text-center sm:top-[300px]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <ScriptTitle size="xl" className="relative z-0">
              <span id="hero-title" className="block">
                {home.title[0]}
                <span className="block pl-[1.1em]">{home.title[1]}</span>
              </span>
            </ScriptTitle>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.7 }}>
            <Signature name={brand.maker} className="mt-5" />
          </motion.div>
        </div>
      </div>
      <div className="mx-auto max-w-[500px] text-center text-[18px] leading-[1.6] text-body sm:text-[20px]">
        <p>
          {home.intro.map((part, i) =>
            part.to ? (
              <Link key={i} to={part.to} className="text-link">
                {part.t}
              </Link>
            ) : (
              <span key={i}>{part.t}</span>
            ),
          )}
        </p>
        <p className="mt-7">{home.intro2}</p>
      </div>
    </section>
  )
}

function ChatCard() {
  const { chat } = home
  return (
    <section aria-label={`Messages with ${chat.friend}`} className="mx-auto mt-16 max-w-[560px] px-4">
      <div className="doodle-bg overflow-hidden rounded-panel px-4 pb-8 pt-4 shadow-card sm:px-7">
        <div className="mx-auto flex h-12 max-w-[420px] items-center justify-center gap-2.5 rounded-b-[18px] rounded-t-[14px] bg-page/80 text-[15px] font-semibold text-ink">
          <span aria-hidden className="round grid size-7 place-items-center rounded-full bg-tan-soft text-[13px] font-bold text-tan-text">
            {chat.friend[0]}
          </span>
          {chat.friend}
        </div>
        <div className="mt-5 text-center">
          <DateChip>{chat.date}</DateChip>
        </div>
        <ol className="mt-5 space-y-2">
          {chat.messages.map((m, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 10, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.25, duration: 0.4 }}>
              <Bubble from={m.from as 'me' | 'them'}>{m.text}</Bubble>
            </motion.li>
          ))}
        </ol>
        <motion.div className="mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: chat.messages.length * 0.25 }}>
          <TypingDots label={`${chat.friend} is typing`} />
        </motion.div>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-card bg-page/85 px-5 py-6 text-center">
          <p className="font-script text-[34px] font-bold leading-none text-ink">{chat.cta}</p>
          <ButtonLink to="/custom" variant="blue">
            {chat.ctaButton} <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

function Bench() {
  const picks = ['glasses-case', 'tracker-fob', 'card-wallet', 'notebook-cover'].map((s) => products.find((p) => p.slug === s)!)
  return (
    <section aria-labelledby="bench-title" className="mx-auto mt-28 max-w-[1120px] px-4 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <ScriptTitle as="h2" size="md">
            <span id="bench-title">{home.benchTitle}</span>
          </ScriptTitle>
          <p className="mt-2 max-w-md text-body">{home.benchBody}</p>
        </div>
        <ButtonLink to="/shop" variant="secondary">
          {home.benchLink} <ArrowRight aria-hidden />
        </ButtonLink>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        {picks.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}

function StoryTeaser() {
  return (
    <section aria-labelledby="story-teaser" className="mx-auto mt-28 grid max-w-[1120px] items-center gap-8 px-4 sm:px-6 md:grid-cols-[0.9fr_1fr] md:gap-14">
      <div className="overflow-hidden rounded-panel">
        <img src={photos.hands} alt="Two hands saddle-stitching a tan leather pouch held in a wooden clam" width={1000} height={1500} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </div>
      <div>
        <ScriptTitle as="h2" size="md">
          <span id="story-teaser">{story.processTitle}</span>
        </ScriptTitle>
        <ol className="mt-6 space-y-5">
          {story.process.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span aria-hidden className="round grid size-10 shrink-0 place-items-center rounded-full bg-cream font-hand text-[20px] text-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{s.title}</h3>
                <p className="text-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <ButtonLink to="/story" variant="secondary" className="mt-8">
          Read the story <ArrowRight aria-hidden />
        </ButtonLink>
      </div>
    </section>
  )
}

export function Home() {
  useTitle()
  return (
    <>
      <Hero />
      <ChatCard />
      <Bench />
      <StoryTeaser />
    </>
  )
}
