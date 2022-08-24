<template>
<nav>
  <RouterLink :to="{ name: 'index'}">HOME</RouterLink>
   <RouterLink :to="{ name: 'about'}">ABOUT</RouterLink>
</nav>
</template>

<style scoped lang="postcss">
nav {
  position: sticky;
  top: 0;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--gap);
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 10;
}
a {
  min-width: 48px;
}
</style>
