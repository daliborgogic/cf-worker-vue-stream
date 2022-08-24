import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

  return router
}
