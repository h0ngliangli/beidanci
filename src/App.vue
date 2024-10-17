<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <section>
      <RouterView />
    </section>
    <nav>
      <RouterLink to="/review">Memorize</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/about"> En > Zh </RouterLink>
      <RouterLink to="/about"> Zh > En </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
section {
  flex-grow: 1;
  /* 这个section的内容有可能会超出边界，因此
  需要设置overflow属性 */ 
  overflow: auto;
}
nav {
  height: 2rem;
  flex-shrink: 0;
  display: grid;
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
}
</style>
