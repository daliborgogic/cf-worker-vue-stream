<script setup>
import { computed} from 'vue'
import { useHead } from '@vueuse/head'
const { data } = await (await fetch('https://catfact.ninja/facts?limit=10')).json()

useHead({
  title: computed(() => data[0].fact),
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
    <h1>Cat Facts</h1>
    <ul v-if="Boolean(data.length)">
      <li v-for="{ fact }, key in data" :key="key" v-text="fact" />
    </ul>
  </div>
</template>

<style scoped lang="postcss">

.wrapper {
  max-width: var(--max-width);
  margin:0 auto;
  padding: 0 var(--gap);
}
h1 {
  font-size: 40px;
  font-weight: 800;
}
</style>
