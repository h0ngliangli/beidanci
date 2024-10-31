import { keys } from '@/keys'
import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  query,
  getFirestore,
  getDoc,
  getCountFromServer,
  startAt,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore'

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

export async function getCount() {
  const snapshot = await getCountFromServer(wordscol)
  const count = snapshot.data().count
  console.log('count: ', count)
  return count
}
/*
  获取随机单词.
  如何获取一个随机单词？
  是否每次都需要访问数据库？
  可否将单词列表缓存到本地？
  
*/
export async function getRandomWord() {
  console.log('getting random word')
  const count = await getCount()
  const random = Math.floor(Math.random() * count)
  console.log('random: ', random)
  const snapshot = await getDocs(query(wordscol, orderBy('word'), startAt(random), limit(1)))
  if (snapshot.empty) {
    console.log('No matching documents.')
    return null
  }
  console.log('random word: ', snapshot.docs[0].data())
  return snapshot.docs[0].data()
  // const data = snapshot.docs[0].data()
  // return data
  // snapshot.forEach((doc) => {
  //   console.log('random word id: ', doc.id)
  //   const data = doc.data()
  //   console.log('random word: ', data)
  //   return data
  // })
}

const firestore = { getWord, getRandomWord, getCount: getCount }
export default firestore
