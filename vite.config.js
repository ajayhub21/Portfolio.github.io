import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Portfolio.github.io/',
  server: {
    port: 3000,
    open: true,
  },
}))
