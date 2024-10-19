import { keys } from '@/keys'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, getDoc } from 'firebase/firestore'

export const firebase = initializeApp(keys.firebase)
console.log('Firebase app initialized')

export const db = getFirestore('ciku')
export const wordscol = collection(db, 'words')
export async function getWord(word) {
  const ref = doc(wordscol, word)
  const refdoc = await getDoc(ref)
  if (refdoc.exists()) {
    return refdoc.data()
  } else {
    return null
  }
}
const firestore = { getWord }
export default firestore
