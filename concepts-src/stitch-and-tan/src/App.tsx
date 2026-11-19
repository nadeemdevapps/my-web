import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { CartDrawer } from './components/CartDrawer'
import { Footer, Nav, Toaster } from './components/Chrome'
import { StoreProvider } from './lib/store'
import { Custom } from './pages/Custom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductPage } from './pages/Product'
import { Shop } from './pages/Shop'
import { Story } from './pages/Story'
import { StyleGuide } from './pages/StyleGuide'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MotionConfig reducedMotion="user">
        <StoreProvider>
          <ScrollToTop />
          <a href="#main" className="sr-only z-[70] rounded-control bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
            Skip to content
          </a>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            <Routes>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:slug" element={<ProductPage />} />
              <Route path="custom" element={<Custom />} />
              <Route path="story" element={<Story />} />
              <Route path="styleguide" element={<StyleGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </StoreProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
