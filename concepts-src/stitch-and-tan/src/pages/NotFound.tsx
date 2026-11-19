import { ButtonLink, ScriptTitle } from '../components/ui'
import { notFound, photos } from '../content'
import { useTitle } from '../lib/title'

export function NotFound() {
  useTitle('Page not found')
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center px-4 pt-16 text-center sm:pt-24">
      <img src={photos.tagFob} alt="" width={880} height={880} className="cutout size-[180px] -rotate-12 animate-float" style={{ ['--tilt' as string]: '-12deg' }} />
      <p className="mt-2 font-hand text-[22px] tracking-[0.06em] text-muted">404</p>
      <ScriptTitle className="mt-1">{notFound.title}</ScriptTitle>
      <p className="mt-4 max-w-sm text-[18px] text-body">{notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">{notFound.home}</ButtonLink>
        <ButtonLink to="/shop" variant="secondary">
          {notFound.shop}
        </ButtonLink>
      </div>
    </section>
  )
}
