import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8081',
      '/pedidos': 'http://localhost:8081',
      '/usuarios': 'http://localhost:8081',
    },
  },
})