import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.cardImage}>
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className={styles.cardOverlay}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink} aria-label="Live demo">
            <FaExternalLinkAlt />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink} aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
