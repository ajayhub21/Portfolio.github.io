import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, setMobileMenu, toggleSound } from '../../redux/slices/uiSlice'
import { FaBars, FaTimes, FaSun, FaMoon, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { useScrollTo } from '../../hooks/useScrollTo'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

const Navbar = () => {
  const dispatch = useDispatch()
  const { theme, mobileMenuOpen, soundEnabled } = useSelector((state) => state.ui)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const scrollTo = useScrollTo()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section via Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    scrollTo(id)
    dispatch(setMobileMenu(false))
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => handleNavClick('home')} aria-label="Go to top">
          <span className={styles.logoAccent}>A</span>J
        </button>

        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
          <button className={styles.mobileCloseBtn} onClick={() => dispatch(setMobileMenu(false))} aria-label="Close menu">
            <FaTimes />
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
              {activeSection === link.id && <span className={styles.activeIndicator} />}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.themeBtn} onClick={() => dispatch(toggleSound())} aria-label="Toggle sound">
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button className={styles.themeBtn} onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button className={styles.menuBtn} onClick={() => dispatch(setMobileMenu(!mobileMenuOpen))} aria-label="Toggle menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
