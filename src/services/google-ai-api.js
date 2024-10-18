/*
    Pricing: https://cloud.google.com/vertex-ai/generative-ai/pricing
    Gemini 1.5 Flash. 
        Text input:     $0.00001875 / 1k characters
        Text output:    $0.000075 / 1k characters
*/
import { keys } from '@/keys'
import { config } from './config'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(keys.google_ai_key)
const model = genAI.getGenerativeModel(config.google_model_config)
console.log(`Google AI service initialized ${model.model}`)
console.log(model.systemInstruction)
export const searchWord = async (word) => {
  const result = await model.generateContent(word)
  const response = await result.response.text()
  return JSON.parse(response)
}

