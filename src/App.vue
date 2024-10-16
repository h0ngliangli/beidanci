<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@/services/firebase-init'


</script>

<template>
  <section>
    <main>
      <RouterView />
    </main>
    <nav>
      <RouterLink to="/review">Memorize</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/about"> En > Zh </RouterLink>
      <RouterLink to="/about"> Zh > En </RouterLink>
    </nav>
  </section>
</template>

<style scoped>
section {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 95%;
}
main {
  flex-grow: 1;
}
nav {
  /* height: 2rem; */
  flex-shrink: 0;
  display: grid;
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
}
nav a {
  margin-right: 1rem;
}
nav img {
  height: 2rem;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
