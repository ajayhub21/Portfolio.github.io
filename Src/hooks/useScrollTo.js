import { useCallback } from 'react'

/**
 * Custom hook for smooth scrolling to sections
 */
export const useScrollTo = () => {
  const scrollTo = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 70
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  return scrollTo
}
