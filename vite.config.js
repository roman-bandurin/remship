import { URL, fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
  base: 'remship',
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
      },
      output: {
        manualChunks: undefined,
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  server: {
    open: "index.html",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  }
})
