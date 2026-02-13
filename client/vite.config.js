import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      host: 'localhost',
      overlay: false, // This hides the annoying red WebSocket error overlay
    },
    watch: {
      usePolling: true, // Helps if you are using XAMPP/WSL/Virtual Environments
    }
  }
})
