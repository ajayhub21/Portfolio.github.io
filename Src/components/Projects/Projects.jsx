import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '../../services/projectService'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

const Projects = () => {
  const { data: projects, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <SectionHeading title="My" highlight="Projects" subtitle="Some of my recent work" />

        {/* Loading Skeleton */}
        {isLoading && (
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '100%' }} />
                  <div className={styles.skeletonLine} style={{ width: '80%' }} />
                  <div className={styles.skeletonTags}>
                    <div className={styles.skeletonTag} />
                    <div className={styles.skeletonTag} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className={styles.errorState}>
            <p className={styles.errorText}>Failed to load projects: {error.message}</p>
            <button className={styles.retryBtn} onClick={() => refetch()}>
              Try Again
            </button>
          </div>
        )}

        {/* Project Grid */}
        {projects && (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
