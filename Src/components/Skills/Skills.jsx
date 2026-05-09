import { useRef, useEffect, useState } from 'react'
import { 
  FaHtml5, FaJs, FaReact, FaDatabase, FaNodeJs, 
  FaServer, FaCloud, FaVial, FaGitAlt, FaCodeBranch, 
  FaUsers, FaLightbulb, FaHandshake 
} from 'react-icons/fa'
import { groupedSkills } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './Skills.module.css'

const iconMap = { 
  FaHtml5, FaJs, FaReact, FaDatabase, FaNodeJs, 
  FaServer, FaCloud, FaVial, FaGitAlt, FaCodeBranch, 
  FaUsers, FaLightbulb, FaHandshake 
}

/* Build a flat list of all skills for the marquee */
const allSkills = groupedSkills.flatMap((g) => g.skills)

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.skills} id="skills" ref={sectionRef}>
      <div className="container">
        <SectionHeading title="My" highlight="Skills" subtitle="Technologies and tools I work with" />

        {/* Infinite scrolling marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...allSkills, ...allSkills].map((skill, i) => {
              const Icon = iconMap[skill.icon]
              return (
                <span key={i} className={styles.marqueeItem}>
                  {Icon && <Icon style={{ color: skill.color }} />}
                  {skill.name}
                </span>
              )
            })}
          </div>
        </div>

        <div className={styles.categoriesGrid}>
          {groupedSkills.map((categoryGroup, catIndex) => (
            <ScrollReveal key={categoryGroup.category} delay={catIndex * 0.1}>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>{categoryGroup.category}</h3>
                <div className={styles.skillsList}>
                  {categoryGroup.skills.map((skill, index) => {
                    const Icon = iconMap[skill.icon]
                    return (
                      <div key={skill.name} className={styles.skillItem}>
                        {Icon && <Icon className={styles.skillIcon} style={{ color: skill.color }} />}
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
