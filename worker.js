import manifest from './dist/client/ssr-manifest.json'
import { render } from './dist/server/server.js'
import template from './dist/client/template.html'

globalThis.__VUE_OPTIONS_API__ = false
globalThis.__VUE_PROD_DEVTOOLS__ = false

async function handleRequest(request) {
  const { pathname } = new URL(request.url)

  const [readable, link] = await render(pathname, manifest, template)

  return new Response(readable, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'no-cache',
      link // 103 Early Hints 🚀
    }
  })
}

export default {
  async fetch(request) {
    try {
      return handleRequest(request)
    } catch (err) {
      return new Response(err.message)
    }
  }
}
