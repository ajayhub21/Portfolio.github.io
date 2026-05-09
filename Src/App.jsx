import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, useScroll, useSpring } from 'framer-motion'
import SplashCursor from './components/SplashCursor/SplashCursor'
import AmbientSound from './components/AmbientSound'

// Lazy load the Home page for code splitting
const Home = lazy(() => import('./pages/Home'))

// Minimal loading fallback
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-primary)',
  }}>
    <div style={{
      width: 40,
      height: 40,
      border: '3px solid var(--border-color)',
      borderTopColor: 'var(--color-primary)',
      borderRadius: '50%',
      animation: 'rotate 0.8s linear infinite',
    }} />
  </div>
)

function App() {
  const theme = useSelector((state) => state.ui.theme)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <motion.div className="scrollProgress" style={{ scaleX }} />
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR={theme === 'dark' ? '#67E8F9' : '#7EC8E3'}
        DENSITY_DISSIPATION={theme === 'dark' ? 3.0 : 4.0}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
      />
      <AmbientSound />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
