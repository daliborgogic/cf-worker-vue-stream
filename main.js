// main.js (shared between server and client)
import { createSSRApp, h, createApp as _createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'

function createApp() {
  const router = createRouter()
  const app = (import.meta.env.SSR ? createSSRApp : _createApp)({
    render: () => h(App)
  })
  app.use(router)
 
  return { app, router }
}

export { createApp }
