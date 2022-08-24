import { createSSRApp, createApp as _createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = (import.meta.env.SSR ? createSSRApp : _createApp)(App)
  const router = createRouter()
  const head = createHead()
  app.use(head)
  app.use(router)
 
  return { app, router, head }
}
