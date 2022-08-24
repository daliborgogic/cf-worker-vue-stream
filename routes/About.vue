<script setup>
const x = await (await fetch('https://randomuser.me/api/')).json()
</script>

<template>
  <div class="wrapper">
    About
    <pre v-if="x">
{{  x }}
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
