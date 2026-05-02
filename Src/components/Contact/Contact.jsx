import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './Contact.module.css'

// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number').nullable().transform((v) => (v === '' ? null : v)),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
}).required()

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: FaMapMarkerAlt, label: 'Location', value: `${personalInfo.district}, ${personalInfo.state}`, href: null },
]

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <SectionHeading title="Contact" highlight="Me" subtitle="Let's get in touch" />

        <div className={styles.grid}>
          {/* Contact Info Cards */}
          <ScrollReveal direction="left">
            <div className={styles.infoSection}>
              {contactInfo.map((item) => (
                <div key={item.label} className={styles.infoCard}>
                  <div className={styles.infoIcon}><item.icon /></div>
                  <div>
                    <h4 className={styles.infoLabel}>{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className={styles.infoValue}>{item.value}</a>
                    ) : (
                      <p className={styles.infoValue}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Your Name" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} {...register('name')} id="contact-name" />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </div>

              <div className={styles.formGroup}>
                <input type="email" placeholder="Your Email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} {...register('email')} id="contact-email" />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>

              <div className={styles.formGroup}>
                <input type="tel" placeholder="Phone (optional)" className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} {...register('phone')} id="contact-phone" />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
              </div>

              <div className={styles.formGroup}>
                <textarea placeholder="Your Message" rows="5" className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`} {...register('message')} id="contact-message" />
                {errors.message && <span className={styles.error}>{errors.message.message}</span>}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : submitted ? (
                  <><FaCheck /> Sent Successfully!</>
                ) : (
                  <><FaPaperPlane /> Send Message</>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
