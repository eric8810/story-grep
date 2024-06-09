import * as fs from "fs"
import { sanguoyanyi } from "./story/sanguoyanyi"

export interface Chapter {
  number: string
  title: string
  content: string
}

function splitNovelIntoChapters(novel: string): Chapter[] {
  // 正则表达式匹配 “第X回 标题”，其中X是汉字数字
  const chapterRegex = /第[\u4e00-\u9fa5]+回 [^\n]+/g
  let chapters: Chapter[] = []
  let novelParts = novel.split(chapterRegex)
  let matches = novel.match(chapterRegex) || []

  matches.forEach((match, index) => {
    if (index < novelParts.length - 1) {
      const chapterDetail = match.split(" ")
      chapters.push({
        number: chapterDetail[0],
        title: chapterDetail[1],
        content: novelParts[index + 1].trim()
      })
    }
  })

  return chapters
}

export const sanguoStory = {
  title: "三国演义",
  chapters: splitNovelIntoChapters(sanguoyanyi)
}
