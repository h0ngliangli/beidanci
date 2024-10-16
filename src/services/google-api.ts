import { firebaseConfig } from './firebase-config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
// Your web app's Firebase configuration


// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore("ciku")
export const words = collection(db, "words")
export const word = doc(words, 'paradox')
export const wordDoc = await getDoc(word)
