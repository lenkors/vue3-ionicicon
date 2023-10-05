import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    cssInjectedByJsPlugin(),
    dts({ rollupTypes: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/svg')],
      symbolId: '[name]',
        /**
         * custom insert position
         * @default: body-last
         */
        inject: 'body-last',

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
    })
  ],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  build: {
    cssCodeSplit: true,
    target: "esnext",
    outDir: "./dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue3-ionicicon",
      fileName: (format) => `vue3-ionicicon.${format}.js`,
    },
    reportCompressedSize: true,

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
