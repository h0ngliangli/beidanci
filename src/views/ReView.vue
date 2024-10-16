<script setup lang="ts">
import { ref } from 'vue';

const result = ref('');

function check(event: KeyboardEvent) {
  if (event.key == 'Enter') {
    // checkAnswer();
    result.value = '正确';
  }
  const answer = document.getElementById('answer') as HTMLInputElement;
  console.log(answer.value);
}
</script>

<template>
  <main>
    <h2>讽刺; 挖苦</h2>
    <input type="text" @keydown="check">
    <span>{{ result }}</span>
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
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  width: 15rem;
  /* round the corners */
  border-radius: 2rem;
  border: 1px solid var(--color-shadow);
}
</style>
