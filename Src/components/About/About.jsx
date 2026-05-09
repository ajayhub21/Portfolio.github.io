import { personalInfo, getAge } from '../../data/personalInfo'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaDownload } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import ProfileCard from '../ProfileCard/ProfileCard'
import styles from './About.module.css'

const socialIcons = { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn }

const infoItems = [
  { label: 'DOB', value: personalInfo.dob },
  { label: 'Age', value: getAge() },
  { label: 'Gender', value: personalInfo.gender },
  { label: 'Language', value: personalInfo.language },
  { label: 'Work', value: personalInfo.work },
  { label: 'Phone', value: personalInfo.phone },
  { label: 'Email', value: personalInfo.email },
  { label: 'District', value: personalInfo.district },
  { label: 'State', value: personalInfo.state },
  { label: 'Country', value: personalInfo.country },
]

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className="container">
        <SectionHeading title="About" highlight="Me" subtitle="Get to know me better" />

        <div className={styles.grid}>
          <ScrollReveal direction="left">
            <div className={styles.imageSection}>
              <ProfileCard
                name={personalInfo.fullName}
                title={personalInfo.title}
                handle="ajayraj"
                status="Frontend Developer"
                contactText="Contact Me"
                avatarUrl={personalInfo.aboutImage}
                showUserInfo={true}
                enableTilt={false}
                enableMobileTilt={false}
                behindGlowEnabled={false}
                innerGradient="linear-gradient(145deg,#0D948844 0%,#0891B244 100%)"
                onContactClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
              <div className={styles.contentSection}>
                <p className={styles.bio}>{personalInfo.aboutBio}</p>
                {personalInfo.aboutHighlights && (
                  <ul className={styles.highlightsList}>
                    {personalInfo.aboutHighlights.map((highlight, index) => (
                      <li key={index} className={styles.highlightItem}>{highlight}</li>
                    ))}
                  </ul>
                )}

                <div className={styles.infoGrid}>
                {infoItems.map((item) => (
                  <div key={item.label} className={styles.infoItem}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                ))}
              </div>

              <Button href={personalInfo.resumeUrl} download="AjayCV" size="lg">
                <FaDownload /> Download CV
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default About
