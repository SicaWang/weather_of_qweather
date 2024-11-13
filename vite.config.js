import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))], // 包装在数组中
      symbolId: 'icon-[name]', // 可选的 symbolId 配置
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
})
