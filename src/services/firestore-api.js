import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'


export const db = getFirestore("ciku")
export const words = collection(db, "words")
export const word = doc(words, 'paradox')
export const wordDoc = await getDoc(word)
