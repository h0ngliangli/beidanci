import express from 'express'
import { config } from './config.js'
let a_get_randomword
if (config.database_source === 'firestore') {
  const module = await import('./firestore-api.js')
  a_get_randomword = module.a_get_randomword
}
console.log('a_get_randomword type:', typeof a_get_randomword)
const app = express()

app.all('*', (req, res, next) => {
  console.log('req.url:', req.url)
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => {
  res.send('api-server is running')
})
  
// return a random word
app.get('/random', async (req, res) => {
  try {
    const random_word = await a_get_randomword()
    res.json(random_word)
  } catch (error) {
    console.error('Error retrieving word:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(config.port, () => {
  console.log(`api-server is running port ${config.port}`)
})