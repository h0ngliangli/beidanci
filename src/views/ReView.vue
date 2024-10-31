<script setup>
import { ref, reactive, computed } from 'vue'
import { getRandomWord } from '@/services/word-api.js'

const result = ref('')
const word = reactive({ reactive: { word: 'loading...' } })
const combinedCnMeaning = computed(() => {
  if (!word.reactive.definitions) return ''
  const cnMeanings = []
  word.reactive.definitions.map((def, index) => {
    cnMeanings.push(`${index + 1}. [${def.part_of_speech}] ${def.cn}`)
  })
  return cnMeanings.join(' ')
})

getRandomWord().then((randomWord) => {
  word.reactive = randomWord
})

async function check(event) {
  if (event.key == 'Enter') {
    const input = event.target.value
    const isCorrect = input == word.reactive.word
    if (isCorrect) {
      result.value = 'correct!'
      const nextButton = document.getElementById('next')
      nextButton.focus()
    } else {
      result.value = 'incorrect!'
    }
  }
}

async function nextWord() {
  result.value = ''
  const randomWord = await getRandomWord()
  word.reactive = randomWord
  const input = document.querySelector('input')
  input.value = ''
  input.focus()
}
</script>

<template>
  <section>
    <h2>{{ combinedCnMeaning }}</h2>
    <input type="text" @keydown="check" />
    <div v-show="result">{{ result }}</div>
    <button id="next" v-show="result == 'correct!'" @click="nextWord">Next</button>
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

/* div {
  width: 30rem;
  padding: 2rem;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-shadow);
} */

.hflex {
  display: flex;
  max-width: 15rem;
  justify-content: space-between;
}

#next {
  margin-top: 1rem;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  background-color: var(--color-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-shadow);
  cursor: pointer;
  font-size: 1.2rem;
}

#next:hover {
  background-color: var(--color-primary);
  color: var(--color-bg);
}
</style>
