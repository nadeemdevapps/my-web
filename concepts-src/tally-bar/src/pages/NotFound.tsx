import { ButtonLink } from '../components/Button'
import { LedMatrix } from '../components/LedMatrix'
import { NOT_FOUND } from '../data'
import { useDevice } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')
  const { ledHex } = useDevice()
  return (
    <div className="container-page flex min-h-[80svh] flex-col items-center justify-center pt-32 pb-24 text-center">
      <div className="aspect-[4.5/1] w-full max-w-2xl rounded-[var(--radius-xl)] border-[10px] border-[#e9e6e1] bg-screen p-4 shadow-[var(--shadow-float)] sm:border-[14px] sm:p-5">
        <LedMatrix text="404" color={ledHex} label="Display reads 404" />
      </div>
      <h1 className="mt-12 font-display text-4xl md:text-5xl">{NOT_FOUND.title}</h1>
      <p className="mt-4 max-w-md text-lg text-muted">{NOT_FOUND.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/support" variant="outline">
          Get help
        </ButtonLink>
      </div>
    </div>
  )
}
