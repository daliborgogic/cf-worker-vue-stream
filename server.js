import { pipeToWebWritable, renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { renderHeadToString } from '@vueuse/head'

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
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
  // console.log('head ', app._context.config.globalProperties['$head'].headTags)
  await router.push(url)
  
  await router.isReady()
  const ctx = {}
  // Workarround SSR head : (
  await renderToString(app)
  const { headTags } =  await renderHeadToString(head)
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
