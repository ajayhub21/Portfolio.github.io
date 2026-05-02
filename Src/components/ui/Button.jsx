import styles from './ui.module.css'

const Button = ({ children, variant = 'primary', size = 'md', href, download, onClick, type = 'button', disabled = false, className = '' }) => {
  const classNames = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`

  if (href) {
    return (
      <a href={href} download={download} className={classNames} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
