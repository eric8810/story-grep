import { aiChat } from "./base"
const key = process.env.YI_KEY ?? ""
const url = process.env.YI_ENDPOINT ?? ""

export const yiChat = (request: Record<string, any>) => {
  const model = "yi-medium-200k"
  return aiChat(url, model, key, request)
}
