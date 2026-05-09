import { FaEnvelope, FaMobileAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './Contact.module.css'

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, subLabel: 'Drop a mail' },
  { icon: FaMobileAlt, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`, subLabel: 'Call or Save' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: 'Message Me', href: `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, subLabel: 'Chat directly' },
  { icon: FaMapMarkerAlt, label: 'Location', value: `${personalInfo.district}, ${personalInfo.state}`, href: null, subLabel: 'My location' },
]

const Contact = () => {

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <SectionHeading title="Contact" highlight="Me" subtitle="Let's get in touch" />

        <div className={styles.grid}>
          {/* Contact Info Cards */}
          <ScrollReveal>
            <div className={styles.infoSection}>
              {contactInfo.map((item) => {
                const CardWrapper = item.href ? 'a' : 'div'
                const wrapperProps = item.href 
                  ? { href: item.href, target: item.label === 'WhatsApp' ? '_blank' : '_self', rel: 'noreferrer', className: `${styles.infoCard} ${styles.clickableCard}` } 
                  : { className: styles.infoCard }

                return (
                  <CardWrapper key={item.label} {...wrapperProps}>
                    <div className={styles.infoIcon}><item.icon /></div>
                    <div className={styles.infoContent}>
                      <h4 className={styles.infoLabel}>{item.label}</h4>
                      <p className={styles.infoValue}>{item.value}</p>
                      {item.subLabel && <span className={styles.infoSubLabel}>{item.subLabel}</span>}
                    </div>
                  </CardWrapper>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
