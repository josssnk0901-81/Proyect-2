import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    // El chunk de three.js (~940 kB sin comprimir) es esperado y se carga
    // en diferido — subimos el límite para que el build quede sin avisos
    chunkSizeWarningLimit: 1000,
  },
})
