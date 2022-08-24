<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Index',
  meta: [
    {
      name: 'description',
      content: 'Index description',
    },
    {
      property: 'og:title',
      content: 'Index',
    },
    {
      property: 'og:description',
      content: 'Index description',
    },
    {
      property: 'og:image',
      content: 'https://repository-images.githubusercontent.com/528317018/bfa25139-be47-4548-bd89-7a6581c739f3',
    },
  ]
})
</script>

<template>
  <div class="wrapper">
    Index
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--gap);
}
</style>
