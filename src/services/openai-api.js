import OpenAI from 'openai'
import { keys } from '../keys.js'
import { config } from './config.js'
const openai = new OpenAI({
  apiKey: keys.openai_key
})

export async function queryWord(word) {
  const response = await openai.chat.completions.create(config.openai_model_config(word))
  const reply = JSON.parse(response.choices[0].message.content)
  return reply
}

const openai_api = {
    queryWord: queryWord
}
export default openai_api