import { keys } from '@/keys'
import { config } from './config'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(keys.google_ai_key)
const experimentModel = genAI.getGenerativeModel(config.model_config)
const result = await experimentModel.generateContent([])
const response = await result.response.text()
JSON.parse(response)

