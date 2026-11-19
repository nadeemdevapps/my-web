import { useEffect } from 'react'

import { brand } from '../content'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.tagline}`
  }, [title])
}
