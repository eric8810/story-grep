import { aiChat } from "./base"
const key = process.env.GLM_KEY ?? ""
const url = process.env.GLM_ENDPOINT ?? ""

export const glm4Chat = (request: Record<string, any>) => {
  const model = "glm-4"
  return aiChat(url, model, key, request)
}
