import { ButtonLink } from '../components/Button'
import { Doodler, Faller } from '../components/Doodle'
import { Container, Frame } from '../components/UI'
import { notFound } from '../content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Not found')
  return (
    <Container>
      <Frame className="flex min-h-[520px] flex-col items-center justify-center px-6 py-16 text-center">
        <div aria-hidden="true" className="relative mb-6 h-40 w-56">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-bob">
            <Faller kind="anvil" size={90} boil />
          </div>
          <div className="absolute bottom-0 left-[20%]">
            <Doodler size={40} hat="cap" boil waddle />
          </div>
        </div>
        <p className="font-display text-[6rem] leading-none font-black">404</p>
        <h1 className="mt-2 font-display text-[2.5rem] leading-none font-black">{notFound.title}</h1>
        <p className="mt-3 max-w-md text-graphite">{notFound.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/">{notFound.home}</ButtonLink>
          <ButtonLink to="/play" variant="paper">
            {notFound.play}
          </ButtonLink>
        </div>
      </Frame>
    </Container>
  )
}
