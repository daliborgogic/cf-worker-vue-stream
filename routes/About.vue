<script setup>
import { computed} from 'vue'
import { useHead } from '@vueuse/head'
// let data = $ref('dsdsd')
const { data } = await (await fetch('https://meowfacts.herokuapp.com/')).json()
// const manifest = JSON.stringify(useManifest)

useHead({
  title: computed(() => data[0]),
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
    About
    <div v-if="data" v-text="data[0]" />
  </div>
</template>

<style scoped lang="postcss">

.wrapper {
  max-width: var(--max-width);
  margin:0 auto;
  padding: 0 var(--gap);
}
</style>
