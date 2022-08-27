<script setup>
import { useHead, injectHead } from '@vueuse/head'

const head = injectHead()
const headTags = await head.headTags

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'About description',
    },
    {
      property: 'og:title',
      content: 'Index',
    },
    {
      property: 'og:description',
      content: 'About description',
    },
    {
      property: 'og:image',
      content: 'https://repository-images.githubusercontent.com/528317018/bfa25139-be47-4548-bd89-7a6581c739f3',
    }
  ]
})
</script>

<template>
  <div class="wrapper">
    <h1>Demo Vuejs SSR TransformStream on Cloudflare Workers </h1>
    <p>...</p>
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--gap);
}
h1 {
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 20px;
}
h2 {
  font-size: 24px;
  padding-bottom: 20px;
}
</style>
