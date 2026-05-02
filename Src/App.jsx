import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
