import Firestore from '@google-cloud/firestore'
import { keys } from './keys.js'

const db = new Firestore(keys.firestore)
let wordlist_cache = []

// generate word list
export async function a_generate_wordlist() {
  wordlist_cache = []
  // get all words from words collection
  const snapshot = await db.collection('words').get()
  snapshot.forEach((doc) => {
    console.log('adding word:', doc.id, 'into list.')
    wordlist_cache.push(doc.id)
  })
  // sort the wordlist
  wordlist_cache.sort()
  // save the words to words-list collection
  await db.collection('word-list').doc('content').set({
    data: wordlist_cache
  })
}

// return the word list from cache.
async function a_get_wordlist() {
  if (wordlist_cache.length === 0) {
    const snapshot = await db.collection('word-list').doc('content').get()
    wordlist_cache = snapshot.data()['data']
  }
  console.log('wordlist_cache:', wordlist_cache)
  return wordlist_cache
}

export async function a_read_word(word) {
  console.log('reading word:', word)
  const wordRef = await db.collection('words').doc(word)
  const doc = await wordRef.get()
  if (!doc.exists) {
    console.log('No such document!')
    return null
  } else {
    console.log('Document data:', doc.data())
    return doc.data()
  }
}

// return a random word
export async function a_get_randomword() {
  await a_get_wordlist()
  const random_index = Math.floor(Math.random() * wordlist_cache.length)
  console.log('random index:', random_index)
  const random_id = wordlist_cache[random_index]
  console.log('random id:', random_id)
  const random_word = await a_read_word(random_id)
  return random_word
}
