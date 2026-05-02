import { FaGraduationCap, FaUniversity, FaBriefcase } from 'react-icons/fa'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './Experience.module.css'

const iconMap = { FaGraduationCap, FaUniversity, FaBriefcase }

const Experience = () => {
  return (
    <section className={styles.experience} id="experience">
      <div className="container">
        <SectionHeading title="My" highlight="Experience" subtitle="Education and professional journey" />

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experience.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <ScrollReveal key={item.id} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
                <div className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
                  <div className={styles.timelineDot}>
                    <Icon />
                  </div>
                  <div className={styles.timelineCard}>
                    <span className={`${styles.badge} ${item.type === 'work' ? styles.workBadge : styles.eduBadge}`}>
                      {item.period}
                    </span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardOrg}>{item.organization}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
