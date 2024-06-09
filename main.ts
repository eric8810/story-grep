import { deepChat } from "./remote/deep"
import task from "tasuku"
import { fetchEventData } from "fetch-sse"
import { hp_story } from "./story/hp"
// import { sanguoyanyi } from "./story/sanguoyanyi"
import * as fs from "fs"
import { Chapter, sanguoStory } from "./chapter"
import { ollamaQwen2_7BChat } from "./remote/ollama"
import { gpt35T16Chat } from "./remote/openai"
import { glm4Chat } from "./remote/glm"
import { yiChat } from "./remote/yi"

// 请从故事中提取章节名称。
// 请从故事中提取主要事件，并撰写事件的主要过程和相关角色。

const characterGrep = async (story: { title: string; chapters: Chapter[] }) => {
  let characters = ""
  for (let index = 0; index < story.chapters.length; index++) {
    if (index <= 49) {
      continue
    }
    console.log("计算第", index + 1, "章")
    const chapter = story.chapters[index]
    const messages = [
      {
        role: "system",
        content: `
          你是一个专业的小说家，会注意到故事所有的细节，以及角色之间暗含的关系。
          目前你正在看的小说叫《${story.title}》。
          你会收到一些故事章节，从故事中提取所有角色以及角色设定，角色范围包含所有仅提到一次的人物，角色设定是中文的。
          注意，角色设定的内容请用中文写出。
          你只能用yaml输出结果。你不用标记输出内容的格式名称。

          ###角色设定字段
          姓名
          称呼（多种）
          身份
          形象
          出生地
          性别
          语言方式
          性格特点
          相关角色(角色与关系)

        `
      },
      {
        role: "user",
        content: `
        ${chapter.number} ${chapter.title}
        ${chapter.content}
        `
      }
    ]

    const request = {
      messages,
      temperature: 0,
      stream: true
    }

    // characters = await ollamaQwen2_7BChat(request)
    // characters = await gpt35T16Chat(request)
    // characters = await glm4Chat(request)
    characters = await deepChat(request)
    fs.writeFileSync(
      `./generate/sanguo/characters/sanguoyanyi-${index}.yaml`,
      characters
    )
  }
}
characterGrep(sanguoStory)
