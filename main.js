// main.js (shared between server and client)
import { createSSRApp, h, createApp as _createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import { createHead } from '@vueuse/head'

const head = createHead()

function createApp() {
  const router = createRouter()
 
  const app = (import.meta.env.SSR ? createSSRApp : _createApp)({
    render: () => h(App)
  })
  app.use(router)
  app.use(head)
 
  return { app, router, head }
}

export { createApp }
