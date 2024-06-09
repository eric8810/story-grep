import { aiChat } from "./base"
const key = process.env.DEEPSEEK_KEY ?? ""
const url = process.env.DEEPSEEK_ENDPOINT ?? ""

export const deepChat = (request: Record<string, any>) => {
  const model = "deepseek-chat"
  return aiChat(url, model, key, request)
}
