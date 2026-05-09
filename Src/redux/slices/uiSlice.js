import { createSlice } from '@reduxjs/toolkit'

// Read persisted theme from localStorage, default to dark
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) return saved
    // Respect system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  }
  return 'dark'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(),
    mobileMenuOpen: false,
    activeSection: 'home',
    soundEnabled: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-theme', state.theme)
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('portfolio-theme', state.theme)
    },
    setMobileMenu: (state, action) => {
      state.mobileMenuOpen = action.payload
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled
    }
  },
})

export const { toggleTheme, setTheme, setMobileMenu, setActiveSection, toggleSound } = uiSlice.actions
export default uiSlice.reducer
