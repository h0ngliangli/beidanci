import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

initializeApp({
  credential: applicationDefault()
})

const db = getFirestore('ciku')
const words = db.collection('words')

const snapshot = await words.get()
snapshot.forEach(doc => {
    console.log("deleting ", doc.id)
    // console.log(doc.id, '=>', doc.data())
    doc.ref.delete()
})

// const word = words.doc('paradox')
// const wordDoc = await word.get()
// console.log(wordDoc.data())

// // add a doc
// const newWord = words.doc('newword')
// await newWord.set({
//     word: 'newword',
//     meaning: 'a new word'
// }, { merge: true })

// console.log((await newWord.get()).data())
// // delete a field
// await newWord.update({
//     meaning: FieldValue.delete()
// })
// console.log((await newWord.get()).data())
// // delete a doc
// newWord.delete()

// // query
// const query = words.where('en', '==', 'paradox')
// const snapshot = await query.get()
// snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data())
// })