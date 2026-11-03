import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiPlugin } from './vite-api-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    host: true
  }
})

