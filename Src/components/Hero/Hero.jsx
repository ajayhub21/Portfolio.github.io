import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'
import { useScrollTo } from '../../hooks/useScrollTo'
import Button from '../ui/Button'
import styles from './Hero.module.css'

const Hero = () => {
  const scrollTo = useScrollTo()

  return (
    <section className={styles.hero} id="home">
      {/* Animated background elements */}
      <div className={styles.bgOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className={styles.greeting}>{personalInfo.greeting}</span>
          <h1 className={styles.name}>
            I am <span className={styles.nameHighlight}>{personalInfo.name}</span>
          </h1>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{personalInfo.title}</span>
            <span className={styles.titleCursor}>|</span>
          </div>
          <p className={styles.bio}>{personalInfo.heroBio}</p>
          <div className={styles.cta}>
            <Button size="lg" onClick={() => scrollTo('about')}>
              About Me <FaArrowDown />
            </Button>
            <Button variant="outline" size="lg" href={personalInfo.resumeUrl} download="AjayCV">
              Download CV
            </Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.imageGlow} />
          <div className={styles.imageContainer}>
            <img src={personalInfo.profileImage} alt={personalInfo.fullName} className={styles.image} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollTo('about')}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  )
}

export default Hero
