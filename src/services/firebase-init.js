import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase-config'

/* global globalThis */
globalThis.firebaseApp = initializeApp(firebaseConfig)
console.log('Firebase app initialized')
