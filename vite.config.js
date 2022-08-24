import { splitVendorChunkPlugin } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default {
  dev: false,
  plugins: [
    vuePlugin({
      reactivityTransform: true
    }),
    splitVendorChunkPlugin()
  ],
  resolve: {
    dedupe: ['vue', 'vue-router'],
  },
  build: {
    minify: true
  },
  server: {
    port: 8787
  },
  ssr: {
    target: 'webworker',
    noExternal: false
  }
}
