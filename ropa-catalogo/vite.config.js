import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuración de Vite para Vue 3
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
