/*
 向数据库中批量添加单词。
 用法： node add-words.js <filename>
 单词文件中
*/
import process from 'process'
import fs from 'fs'
import openai_api from '../src/services/openai-api.js' 

// get the filename.
const filename = process.argv[2]
if (!filename) {
    console.error('Usage: node add-words.js <filename>')
    process.exit(1)
}
// read file
const words2add = []
fs.readFileSync(filename, 'utf-8').split('\n').forEach(async line => { 
    words2add.push(line)
})

// check word exists in db
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({
  credential: applicationDefault()
})

const db = getFirestore('ciku')
const wordscol = db.collection('words')

words2add.forEach(async word => {
    const query = wordscol.where('word', '==', word)
    const snapshot = await query.get()
    if (snapshot.empty) {
        console.log(`Adding ${word}`)
        const reply = await openai_api.queryWord(word)
        await wordscol.doc(word).set(reply)
    } else {
        console.log(`${word} exists`)
    }
})

