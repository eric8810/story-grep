import { aiChat } from "./base"
const key = process.env.OPENAI_KEY ?? ""
const url = process.env.OPENAI_ENDPOINT ?? ""

export const gpt4oChat = (request: Record<string, any>) => {
  const model = "gpt-4o"
  return aiChat(url, model, key, request)
}

export const gpt35T16Chat = (request: Record<string, any>) => {
  const model = "gpt-3.5-turbo-16k"
  return aiChat(url, model, key, request)
}
