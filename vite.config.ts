import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react'
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    react(),
    visualizer({
      open: false,         // build 完自动打开
      gzipSize: true,      // 显示 gzip 后大小
      brotliSize: true,    // 显示 brotli 后大小
      filename: "stats.html"
    })
  ]
})