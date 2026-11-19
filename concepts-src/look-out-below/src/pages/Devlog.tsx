import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

import { ButtonLink } from '../components/Button'
import { DevlogCard } from '../components/DevlogCard'
import { Chip, Container, EmptyState, PageHeader, Tag } from '../components/UI'
import { devlog, IMAGES, type DevlogPost } from '../content'
import { formatDate } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

const TAGS: Array<DevlogPost['tag'] | 'All'> = ['All', 'Design', 'Art', 'Tech', 'News']

export function DevlogIndex() {
  useDocumentTitle(devlog.title)
  const [tag, setTag] = useState<(typeof TAGS)[number]>('All')
  const posts = devlog.posts.filter((p) => tag === 'All' || p.tag === tag)
  return (
    <Container>
      <PageHeader title={devlog.title} intro={devlog.intro} />
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter posts">
        {TAGS.map((t) => (
          <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
            {t === 'All' ? devlog.all : t}
          </Chip>
        ))}
        <Chip disabled title="Coming soon">
          Audio
        </Chip>
      </div>
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <DevlogCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <EmptyState title={devlog.empty} />
      )}
    </Container>
  )
}

export function DevlogPostPage() {
  const { slug } = useParams()
  const post = devlog.posts.find((p) => p.slug === slug)
  useDocumentTitle(post?.title ?? 'Not found')
  if (!post) return <NotFound />
  const i = devlog.posts.indexOf(post)
  const next = devlog.posts[(i + 1) % devlog.posts.length]
  return (
    <Container className="max-w-[860px]">
      <Link to="/devlog" className="ink-link mb-8 inline-flex h-10 items-center gap-1.5 font-extrabold">
        <ArrowLeft className="size-4" strokeWidth={3} /> {devlog.back}
      </Link>
      <article>
        <div className="flex items-center gap-3 text-[0.875rem] text-graphite">
          <Tag>{post.tag}</Tag>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h1 className="mt-4 font-display text-[3rem] leading-[0.95] font-black md:text-[4.25rem]">{post.title}</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed text-graphite">{post.excerpt}</p>
        <img src={IMAGES[post.image]} alt="" className="mt-8 aspect-[3/2] w-full rounded-[var(--radius-lg)] border-[3px] border-ink bg-white object-cover" />
        <div className="prose-doodle mt-10 text-[1.0625rem] text-ink-2">
          {post.body.map((b, n) =>
            b.h ? (
              <h2 key={n}>{b.h}</h2>
            ) : b.list ? (
              <ul key={n}>
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={n}>{b.p}</p>
            ),
          )}
        </div>
      </article>
      <div className="mt-14 flex flex-col items-start gap-3 border-t-2 border-ink/15 pt-8">
        <span className="text-[0.875rem] font-extrabold text-graphite">Next post</span>
        <Link to={`/devlog/${next.slug}`} className="font-display text-[2rem] leading-none font-black hover:underline">
          {next.title}
        </Link>
        <ButtonLink to="/play" variant="paper" className="mt-4">
          Play the demo
        </ButtonLink>
      </div>
    </Container>
  )
}
