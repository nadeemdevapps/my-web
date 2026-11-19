import { Link } from 'react-router'

import { IMAGES, type DevlogPost } from '../content'
import { formatDate } from '../lib/format'
import { Card, Tag } from './UI'

export function DevlogCard({ post, force }: { post: DevlogPost; force?: 'hover' }) {
  return (
    <Card interactive force={force} className="group overflow-hidden">
      <div className="aspect-[3/2] overflow-hidden border-b-[2.5px] border-ink bg-white">
        <img src={IMAGES[post.image]} alt="" loading="lazy" className="h-full w-full object-cover mix-blend-multiply transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-[0.8125rem] text-graphite">
          <Tag>{post.tag}</Tag>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="mt-3 font-display text-[1.625rem] leading-[1.02] font-black">
          <Link to={`/devlog/${post.slug}`} className="inline-flex min-h-10 items-center after:absolute after:inset-0 focus:outline-none after:rounded-[var(--radius-lg)] focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-ink">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-graphite">{post.excerpt}</p>
      </div>
    </Card>
  )
}
