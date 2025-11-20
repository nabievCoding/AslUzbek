import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/asluzbeklugati/' // Netlify uchun kerak bo’ladi!
})
