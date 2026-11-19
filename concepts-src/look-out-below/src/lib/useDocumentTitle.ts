import { useEffect } from 'react'

import { brand } from '../content'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.short}`
  }, [title])
}
