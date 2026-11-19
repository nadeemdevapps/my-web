import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { CartDrawer } from './components/Cart'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ToastProvider } from './components/Toast'
import { DeviceProvider, StoreProvider } from './lib/store'
import { Apps } from './pages/Apps'
import { CartPage } from './pages/CartPage'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { OrderPage } from './pages/OrderPage'
import { Shop } from './pages/Shop'
import { Specs } from './pages/Specs'
import { Styleguide } from './pages/Styleguide'
import { Support } from './pages/Support'

/** New page: top of the page, or the #hash target once it has rendered. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = window.setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' }), 360)
    return () => window.clearTimeout(id)
  }, [pathname, hash])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 focus:outline-none"
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="specs" element={<Specs />} />
          <Route path="apps" element={<Apps />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders/:id" element={<OrderPage />} />
          <Route path="support" element={<Support />} />
          <Route path="styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <StoreProvider>
          <DeviceProvider>
            <ToastProvider>
              <ScrollManager />
              <a href="#main" className="sr-only z-[100] rounded-[var(--radius-sm)] bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
                Skip to content
              </a>
              <div className="relative flex min-h-svh flex-col">
                <Header />
                <Pages />
                <Footer />
              </div>
              <CartDrawer />
            </ToastProvider>
          </DeviceProvider>
        </StoreProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
