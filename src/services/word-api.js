import axios from 'axios'
import { API_SERVER_URL } from '@/config.js'

export async function getRandomWord() {
  try {
    console.log(`fetching random word from: ${API_SERVER_URL}/random`)
    const response = await axios.get(`${API_SERVER_URL}/random`)
    console.log('random word:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching random word:', error)
    throw error
  }
}
