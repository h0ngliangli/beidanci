<script setup>
import { ref } from 'vue'
import { searchWord } from '@/services/google-ai-api'

const result = ref('')

async function check(event) {
  if (event.key == 'Enter') {
    // checkAnswer();
    // log the input
    console.log(event.target.value)
    let word = await searchWord(event.target.value)
    word = JSON.stringify(word, null, 2)
    console.log(word)
    result.value = word
  }
}
</script>

<template>
  <section>
    <h2>讽刺; 挖苦</h2>
    <input type="text" @keydown="check" />
    <div><pre>{{ result }}</pre></div>
  </section>
</template>

<style scoped>
section {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  margin-top: 1rem;
  font-size: 2rem;
}
input {
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  width: 15rem;
  border-radius: 2rem;
  border: 1px solid var(--color-shadow);
}

div {
  width: 30rem;
  padding: 2rem;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 1rem;
  font-size: 1rem;
}
</style>
