import { queryWord } from "../src/services/openai-api.js";

(async () => {
  const response = await queryWord('apple')
  console.log(JSON.stringify(response, null, 2))
})()