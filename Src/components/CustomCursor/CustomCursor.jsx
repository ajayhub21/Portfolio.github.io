import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './CustomCursor.module.css'

const CustomCursor = () => {
  const theme = useSelector((state) => state.ui.theme)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    if (theme !== 'dark') return

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseOver = (e) => {
      if (window.getComputedStyle(e.target).cursor === 'pointer' || e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [theme])

  if (theme !== 'dark') return null

  return (
    <>
      <div 
        className={`${styles.cursorDot} ${isPointer ? styles.pointer : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`${styles.cursorGlow} ${isPointer ? styles.pointerGlow : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  )
}

export default CustomCursor
