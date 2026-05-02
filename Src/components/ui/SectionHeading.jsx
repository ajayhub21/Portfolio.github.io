import { motion } from 'framer-motion'
import styles from './ui.module.css'

const SectionHeading = ({ title, highlight, subtitle }) => {
  return (
    <motion.div
      className={styles.sectionHeading}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.headingTitle}>
        {title} <span className={styles.headingHighlight}>{highlight}</span>
      </h2>
      {subtitle && <p className={styles.headingSubtitle}>{subtitle}</p>}
      <div className={styles.headingLine} />
    </motion.div>
  )
}

export default SectionHeading
