<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Index',
  meta: [
    {
      name: 'description',
      content: 'Index description',
    }
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
