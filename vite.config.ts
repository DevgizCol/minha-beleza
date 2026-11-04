import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiPlugin } from './vite-api-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || (process.env.NODE_ENV === 'production' ? '/minha-beleza/' : '/'),
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    host: true
  }
})

