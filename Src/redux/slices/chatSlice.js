import { createSlice } from '@reduxjs/toolkit'

// Persist chat messages to localStorage
const loadMessages = () => {
  try {
    const saved = localStorage.getItem('portfolio-chat')
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isOpen: false,
    isExpanded: false,
    messages: loadMessages(),
  },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen
    },
    setExpanded: (state, action) => {
      state.isExpanded = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
      })
      // Persist to localStorage
      try { localStorage.setItem('portfolio-chat', JSON.stringify(state.messages)) } catch {}
    },
    clearChat: (state) => {
      state.messages = []
      localStorage.removeItem('portfolio-chat')
    },
  },
})

export const { toggleChat, setExpanded, addMessage, clearChat } = chatSlice.actions
export default chatSlice.reducer
