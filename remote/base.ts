import { fetchEventData } from "fetch-sse"

export const aiChat = async (
  url: string,
  model: string,
  key: string,
  request: Record<string, any>
): Promise<string> => {
  let text = ""
  return new Promise((resolve, reject) => {
    fetchEventData(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      data: { model, ...request },
      async onOpen(response) {
        // console.log("???", response)
      },
      onMessage(msg, done) {
        // console.log("hehehe?", msg)
        // if the server emits an error message, throw an exception
        // so it gets handled by the onerror callback below:
        // console.log(typeof msg?.data)
        if (msg?.data && msg?.data?.indexOf("[DONE]") >= 0) {
          // console.log("??????????????????", msg)
          resolve(text)
          return
        }
        if (msg?.data) {
          try {
            const resp = JSON.parse(msg.data) as any
            if (resp.choices[0]) {
              text += resp.choices[0].delta?.content ?? ""
              process.stdout.write(resp.choices[0].delta?.content ?? "")
              // console.log("the resp", resp.choices[0].delta)

              if (resp.choices[0].finish_reason) {
                console.log(resp.choices[0].finish_reason)
              }
              if (resp.choices[0].finish_reason === "stop") {
                console.log("finished", resp.usage)
              }
            }
          } catch (error) {
            // console.error(error)
            console.log(">>>>>>>>", msg?.data)
          }
        }
      },
      onClose() {
        // if the server closes the connection unexpectedly, retry:
        // throw new RetriableError()
      },
      onError(err) {
        console.error(err)
        console.log("closed?")
        // reject(err)
        // if (err instanceof FatalError) {
        //   throw err // rethrow to stop the operation
        // } else {
        //   // do nothing to automatically retry. You can also
        //   // return a specific retry interval here.
        // }
      }
    })
  })
}
