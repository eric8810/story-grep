import { aiChat } from "./base"
const key = process.env.OLLAMA_KEY ?? ""
const url = process.env.OLLAMA_ENDPOINT ?? ""

export const ollamaQwen2_7BChat = (request: Record<string, any>) => {
  const model = "qwen2:7b"
  return aiChat(url, model, key, request)
}
