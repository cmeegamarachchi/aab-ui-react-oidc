import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import dotenv from 'dotenv'

dotenv.config() 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  envDir: "../"
})
