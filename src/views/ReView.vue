<script setup lang="ts">
function answer() {
  const answer = document.getElementById('answer') as HTMLInputElement;
  console.log(answer.value);
}
</script>

<template>
  <main>
    <h2>讽刺; 挖苦</h2>
    <input type="text" id="answer" @keydown="answer">
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  width: 50%;
  /* round the corners */
  border-radius: 2rem;
  border: 1px solid var(--color-shadow);
}
</style>
