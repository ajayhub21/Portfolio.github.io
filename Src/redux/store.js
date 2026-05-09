import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
  },
})
