import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  compilerOptions: {
    target: "es2020",
    module: "esnext",
    baseUrl: "./",
    paths: {
      "@/*": ["src/*"],
    },
  },
  include: ["src"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
})
