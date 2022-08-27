import { splitVendorChunkPlugin } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

const external = ['vue', 'vue-router', 'nprogress', '@vueuse/head']

export default {
  dev: false,
  plugins: [
    vuePlugin({
      reactivityTransform: true
    }),
    splitVendorChunkPlugin(),
    {
      configResolved(config) {
        config.ssr.external = external
      }
    }
  ],
  resolve: {
    dedupe: external
  },
  build: {
    minify: true
  },
  server: {
    port: 8787
  },
  ssr: {
    target: 'webworker',
    noExternal: true
  }
}
