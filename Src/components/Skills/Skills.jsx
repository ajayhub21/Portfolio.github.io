import { useRef, useEffect, useState } from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPhp, FaDatabase, FaGitAlt } from 'react-icons/fa'
import { skills, techStack } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './Skills.module.css'

const iconMap = { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPhp, FaDatabase, FaGitAlt }

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Trigger progress bar animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.skills} id="skills" ref={sectionRef}>
      <div className="container">
        <SectionHeading title="My" highlight="Skills" subtitle="Technologies and tools I work with" />

        {/* Progress Bars */}
        <ScrollReveal>
          <div className={styles.progressSection}>
            {skills.map((skill, index) => (
              <div key={skill.name} className={styles.progressItem}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressName}>{skill.name}</span>
                  <span className={styles.progressPercent}>{skill.percentage}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: isVisible ? `${skill.percentage}%` : '0%',
                      background: skill.color,
                      transitionDelay: `${index * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tech Stack Cards */}
        <div className={styles.techGrid}>
          {techStack.map((tech, index) => {
            const Icon = iconMap[tech.icon]
            return (
              <ScrollReveal key={tech.name} delay={index * 0.08}>
                <div className={styles.techCard}>
                  <div className={styles.techIcon} style={{ color: tech.color }}>
                    <Icon />
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
