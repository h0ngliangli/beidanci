import { keys } from '@/keys'
import { config } from './config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
/*
    Enable Vertex AI in Firebase
    1. Go to Firebase Console (https://console.firebase.google.com/)
    2. Click on the project you want to enable Vertex AI
    3. On the left sidebar (Project Overview), click on Build with Gemini.
    4. Upgarde to Blaze plan. 
    5. Click on Enable APIs 

    Add the SDK.
    1. npm install firebase
    2. initialize firebase app
    3. initialize the Vertex AI service and the generative model
    4. Use the model to generate text
*/
import { getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview'

export const firebase = initializeApp(keys.firebase)
console.log('Firebase app initialized')

export const db = getFirestore('ciku')
export const words = collection(db, 'words')
export const word = doc(words, 'paradox')
export const wordDoc = await getDoc(word)

/*

import { query, orderBy, where, collection, doc, setDoc } from 'firebase/firestore'

const taskQuery = query(
  collection(db, 'tasks'),
  where('status', '==', 'active'),
  orderBy('createdAt', 'desc')
)
const tasks = await getDocs(taskQuery)
const maintaskRef = doc(collection(db, 'tasks'), 'main')
// update the main task
setDoc(maintaskRef, { title: 'Main Task', subtasks: ['subtask1', 'subtask2'] })
// delete
deleteDoc(maintaskRef)
*/

export const vertexAI = getVertexAI(firebase)
const model = getGenerativeModel(vertexAI, config.model_config)
console.log(`Vertex AI service initialized, model ${model.model}`)

// test the model
export async function generateText() {
  // Provide a prompt that contains text
  const prompt = 'Hello!'

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt)

  const response = result.response
  const text = response.text()
  console.log(text)
  return text
}
