import { pipeToWebWritable, renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { renderHeadToString } from '@vueuse/head'

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  for (const [key, value] of Object.entries(manifest)) {
    if (key.startsWith('node_modules')) {
      if (!links.includes(value)) {
        console.log(value[0])
        links += renderPreloadLink(value[0])
      }
    }
  }
  modules.forEach(id => {
    const files = manifest[id]
    if (files) {
      files.forEach(file => {
       seen.add(file)
          const filename = file.split(/[\\/]/).pop()
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

export async function render(url, manifest, template) {
  const { app, router, head } = createApp()
  // set the router to the desired URL before rendering
  router.push(url)
  await router.isReady()
  const ctx = {}
  await renderToString(app) // Workaround to get head  <meta name="head:count" content="0"> 
  const { headTags } = renderHeadToString(head)

  const tmpl = template.split('<!--app-->')
 
  const prepend = tmpl[0].replace(`<!--head-->`, headTags)
  const append = tmpl[1]
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

  return [readable, link]
}
