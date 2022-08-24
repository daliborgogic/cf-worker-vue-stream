<script setup>
import { start, done, configure } from 'nprogress'
// import vGrid from './components/Grid.vue'
import vNav from './components/Nav.vue'
configure({ trickle: true, showSpinner: false })
</script>

<template>
  <vNav />
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <!-- <KeepAlive> -->
        <Suspense @pending="start" @resolve="done">
          <Component :is="Component" :key="route.path" />
        </Suspense>
        <!-- </KeepAlive> -->
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="postcss">
:root {
  --brand-color: 0 0 0;
  --background-color: 255 255 255;
  --color: 0 0 0;
  --gap: 24px;
  --max-width: 1280px;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color: 255 255 255;
    --background-color: 0 0 0;
  }
}
*:where(:not(html, iframe, img, svg, video):not(svg *, symbol *)) {
  all: unset;
  display: revert;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  background-color: rgb(var(--background-color));
  color: rgb(var(--color));
}

a, 
button {
  cursor: revert;
}

#app {
  font-size: 14px;
  font-family: Inter, sans-serif;
  line-height: 1.5;
  display: grid;
  grid-template-rows: 64px auto;
  min-height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 128ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#nprogress {
  pointer-events: none;
}
[role=bar] {
  background: rgb(var(--color));
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
}
pre {
  all: revert;
  overflow: auto;
  font-size: 10px;
  line-height: 1.1;
}
</style>
