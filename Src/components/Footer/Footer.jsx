import { FaArrowUp, FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'
import { useScrollTo } from '../../hooks/useScrollTo'
import styles from './Footer.module.css'

const socialIcons = { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn }

const Footer = () => {
  const scrollTo = useScrollTo()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoAccent}>A</span>J
            </span>
            <p className={styles.tagline}>Developer & Creative</p>
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

          <div className={styles.copyright}>
            <p>
              Created with <FaHeart className={styles.heart} /> by <span className={styles.name}>{personalInfo.fullName}</span>
            </p>
            <p className={styles.rights}>© {currentYear} All rights reserved.</p>
          </div>
        </div>

        <button className={styles.backToTop} onClick={() => scrollTo('home')} aria-label="Back to top">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer
