import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { RoughDefs } from './components/Doodle'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Characters } from './pages/Characters'
import { DevlogIndex, DevlogPostPage } from './pages/Devlog'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Play } from './pages/Play'
import { Press } from './pages/Press'
import { Styleguide } from './pages/Styleguide'
import { Tutorial } from './pages/Tutorial'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) return void setTimeout(() => el.scrollIntoView(), 60)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main"
        key={location.pathname}
        tabIndex={-1}
        className="flex-1 pt-2 focus:outline-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="play" element={<Play />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="characters" element={<Characters />} />
          <Route path="press" element={<Press />} />
          <Route path="devlog" element={<DevlogIndex />} />
          <Route path="devlog/:slug" element={<DevlogPostPage />} />
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
        <RoughDefs />
        <ScrollManager />
        <a href="#main" className="round sr-only z-50 rounded-full bg-ink px-4 py-2 font-extrabold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <div className="flex min-h-svh flex-col">
          <Header />
          <Pages />
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}
