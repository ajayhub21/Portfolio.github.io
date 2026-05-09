import { useMemo, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSelector } from 'react-redux'
import { FaArrowDown } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'
import { useScrollTo } from '../../hooks/useScrollTo'
import Button from '../ui/Button'
import styles from './Hero.module.css'

/* ── Stars: minimal, sparse, premium ── */
const STARS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 65,
  size: Math.random() * 1.8 + 0.8,
  delay: Math.random() * 6,
  duration: Math.random() * 4 + 3,
}))

/* ── Floating particles ── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 10,
  delay: Math.random() * 5,
}))

/* ── Staggered letter animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 1.0 },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/* ── Magnetic button hook ── */
const useMagnetic = () => {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    setOffset({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return { ref, offset, handleMouseMove, handleMouseLeave }
}

const MagneticButton = ({ children, ...props }) => {
  const { ref, offset, handleMouseMove, handleMouseLeave } = useMagnetic()
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={styles.magneticWrap}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}

const Hero = () => {
  const scrollTo = useScrollTo()
  const theme = useSelector((state) => state.ui.theme)
  const isDark = theme === 'dark'

  const { scrollY } = useScroll()
  const celestialY = useTransform(scrollY, [0, 800], [0, 30])

  /* Theme-conditional class helper */
  const tc = (base, lightCls, darkCls) =>
    `${styles[base]} ${isDark ? styles[darkCls] : styles[lightCls]}`

  /* Split name into letters for stagger animation */
  const nameLetters = useMemo(() => {
    const prefix = 'I am '
    const name = personalInfo.name
    return { prefix, letters: name.split('') }
  }, [])

  return (
    <section className={styles.hero} id="home">
      {/* ===== SKY BACKGROUND ===== */}
      <div className={styles.scene}>
        <div className={`${styles.sky} ${isDark ? styles.skyDark : styles.skyLight}`} />

        {/* Sunlight ambient glow (light mode only) */}
        <div className={`${styles.sunlightGlow} ${!isDark ? styles.sunlightGlowVisible : ''}`} />

        {/* SUN (light mode) */}
        <motion.div
          className={`${styles.sunWrapper} ${!isDark ? styles.sunVisible : ''}`}
          style={{ y: celestialY }}
        >
          <div className={styles.sun} />
        </motion.div>

        {/* MOON (dark mode) */}
        <motion.div
          className={`${styles.moonWrapper} ${isDark ? styles.moonVisible : ''}`}
          style={{ y: celestialY }}
        >
          <div className={styles.moon} />
        </motion.div>

        {/* STARS (dark mode) */}
        <div className={`${styles.starsContainer} ${isDark ? styles.starsVisible : ''}`}>
          {STARS.map((s) => (
            <div
              key={s.id}
              className={styles.star}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* FLOATING PARTICLES */}
        <div className={styles.particlesContainer}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className={`${styles.particle} ${isDark ? styles.particleDark : styles.particleLight}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.span
            className={tc('greeting', 'greetingLight', 'greetingDark')}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {personalInfo.greeting}
          </motion.span>

          {/* Staggered Name Animation */}
          <motion.h1
            className={tc('name', 'nameLight', 'nameDark')}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameLetters.prefix}
            <span className={`${styles.nameHighlight} ${isDark ? styles.nameHighlightDark : styles.nameHighlightLight}`}>
              {nameLetters.letters.map((letter, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            className={styles.titleWrapper}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <span className={tc('title', 'titleLight', 'titleDark')}>
              {personalInfo.title}
            </span>
            <span className={`${styles.titleCursor} ${isDark ? styles.titleCursorDark : styles.titleCursorLight}`}>
              |
            </span>
          </motion.div>
          <motion.p
            className={tc('bio', 'bioLight', 'bioDark')}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {personalInfo.heroBio}
          </motion.p>
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
          >
            <MagneticButton size="lg" onClick={() => scrollTo('about')}>
              About Me <FaArrowDown />
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" href={personalInfo.resumeUrl} download="AjayCV">
              Download CV
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        >
          <div className={`${styles.imageGlow} ${isDark ? styles.imageGlowDark : styles.imageGlowLight}`} />
          <div className={`${styles.imageContainer} ${isDark ? styles.imageContainerDark : styles.imageContainerLight}`}>
            <img src={personalInfo.profileImage} alt={personalInfo.fullName} className={styles.image} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={`${styles.scrollIndicator} ${isDark ? styles.scrollIndicatorDark : styles.scrollIndicatorLight}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2.5 }, y: { duration: 2, repeat: Infinity } }}
        onClick={() => scrollTo('about')}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  )
}

export default Hero
