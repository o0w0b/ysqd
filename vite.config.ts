import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression2'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 1024, // 设置超过1024byte的文件执行压缩
      deleteOriginalAssets: false, // 设置是否删除原文件
      skipIfLargerOrEqual: true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
    }),
    // visualizer({
    //   emitFile: false,
    //   filename: 'stats.html',
    //   open: true,
    //   sourcemap: true
    // }),
  ],
  build: {
    minify: 'terser',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        // chunkFileNames: (chunkInfo) => {
        //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
        //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
        //   return `js/${fileName}/[name].[hash].js`;
        // }
        chunkFileNames: 'js/[name].js',
        assetFileNames: '[ext]/[name][extname]',
        entryFileNames: '[name].js',
      }
    }
  },
})