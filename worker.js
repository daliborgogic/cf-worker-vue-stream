import template from './dist/client/template.html'
import manifest from './dist/client/ssr-manifest.json'
import { createApp } from './dist/server/main.js'
import { pipeToWebWritable } from 'vue/server-renderer'

globalThis.__VUE_OPTIONS_API__ = false
globalThis.__VUE_PROD_DEVTOOLS__ = false

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach(id => {
    const files = manifest[id]
    if (files) {
      files.forEach(file => {
       seen.add(file)
          const filename = file.split(/[\\/]/).pop()
          console.log('FILENAME ', filename)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<${file}>; rel=preload; as=script; crossorigin, `
  } else if (file.endsWith('.css')) {
    return `<${file}>; rel=preload; as=style`
  } else {
    // TODO
    return ''
  }
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url)

  let ctx = {}
  let { app, router } = createApp(ctx)

  router.push(pathname)
  await router.isReady()

  const [prepend, append] = template.split('<!--app-->')
  const encoder = new TextEncoder()

  const { readable, writable } = new TransformStream({
    start(controller) {
      controller.enqueue(encoder.encode(prepend))
    },
    flush(controller) {
      controller.enqueue(encoder.encode(append))
    }
  })

  pipeToWebWritable(app, ctx, writable)

  const link = renderPreloadLinks(ctx?.modules, manifest)

  return new Response(readable, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'no-store, must-revalidate',
      link
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
