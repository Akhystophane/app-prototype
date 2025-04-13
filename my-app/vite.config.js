import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Put the build in a folder called "root"
    // relative to where this config file is located
    outDir: 'root',
  }
})
