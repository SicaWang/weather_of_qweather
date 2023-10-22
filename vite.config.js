import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url';
import vitePluginVueSvgIcons from "vite-plugin-vue-svg-icons";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginVueSvgIcons({ 
      dir: fileURLToPath(new URL("./src/assets/icons", import.meta.url))
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
