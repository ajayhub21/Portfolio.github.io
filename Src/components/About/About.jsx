import { personalInfo, getAge } from '../../data/personalInfo'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaDownload } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
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
              <div className={styles.imageBorder}>
                <img src={personalInfo.aboutImage} alt={personalInfo.fullName} className={styles.image} />
              </div>
              <div className={styles.socials}>
                {personalInfo.socials.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={social.name}>
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.contentSection}>
              <p className={styles.bio}>{personalInfo.aboutBio}</p>

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
