<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

const users = await (await fetch('https://randomuser.me/api/')).json()
// const y = JSON.stringify(users, null, 2)

useHead({
  // title: 'About'
  title: computed(() => `About ${users.results[0].name.title} ${users.results[0].name.first} ${users.results[0].name.last}`),
  meta: [
    {
      name: 'description',
      content: computed(() => `${users.results[0].gender}`)
    }
  ]
})
</script>

<template>
  <div class="wrapper">
    About
    <pre v-if="users">
{{ users?.results }}
    </pre>
  </div>
</template>

<style scoped lang="postcss">

.wrapper {
  max-width: var(--max-width);
  margin:0 auto;
  padding: 0 var(--gap);
}
</style>
