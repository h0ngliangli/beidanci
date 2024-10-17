<script setup>
import { ref } from 'vue'
import { searchWord } from '@/services/google-ai-api'

const result = ref('')

async function check(event) {
  if (event.key == 'Enter') {
    // checkAnswer();
    // log the input
    console.log(event.target.value)
    result.value = await searchWord(event.target.value)
  }
}
</script>

<template>
  <main>
    <h2>讽刺; 挖苦</h2>
    <input type="text" @keydown="check" />
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
