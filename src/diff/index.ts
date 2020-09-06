export type Difference = {
  lineNumber: number
  content: string
}

export type DiffLine = {
  prev?: Difference
  next?: Difference
}

export type Diff = {
  prevFilename: string
  nextFilename: string
  diffLines: DiffLine[]
}

const reLines = /^@@ -(\d+),(\d+) \+(\d+),(\d+) @@/

/**
 * --- から始まる unified diff 文字列を parse する
 */
export const parseSingleUnifiedDiff = (text: string) => {
  const lines = text.trim().split('\n')
  if (!lines[0].startsWith('--- ')) {
    throw new Error(`illegal diff ${text}`)
  }
  if (!lines[1].startsWith('+++ ')) {
    throw new Error(`illegal diff ${text}`)
  }
  const res: Diff = {
    prevFilename: lines[0].replace('--- a/', ''),
    nextFilename: lines[1].replace('+++ b/', ''),
    diffLines: [],
  }

  let n = 2
  while (n < lines.length) {
    const diffLines: DiffLine[] = []

    const getDiffLine = (o: number) => {
      if (!diffLines[o]) {
        diffLines[o] = {}
      }
      return diffLines[o]
    }

    const matched = reLines.exec(lines[n])
    if (!matched) {
      throw new Error(`illegal diff ${text}`)
    }
    n++

    let prevLine = Number.parseInt(matched[1])
    let prevLeft = Number.parseInt(matched[2])
    let nextLine = Number.parseInt(matched[3])
    let nextLeft = Number.parseInt(matched[4])
    let offset = 0
    let prevOffset = 0
    let nextOffset = 0

    const newOffset = () => {
      if (prevOffset === 0 && nextOffset === 0) {
        return
      }

      if (prevOffset > nextOffset) {
        offset += prevOffset
      } else {
        offset += nextOffset
      }
      prevOffset = 0
      nextOffset = 0
    }

    const sameLine = (content: string) => {
      const diffLine = getDiffLine(offset)
      diffLine.prev = { content, lineNumber: prevLine }
      diffLine.next = { content, lineNumber: nextLine }

      offset++
      prevLine++
      nextLine++
      prevLeft--
      nextLeft--
      prevOffset = 0
      nextOffset = 0
    }

    const removeLine = (content: string) => {
      const diffLine = getDiffLine(offset + prevOffset)
      diffLine.prev = { content, lineNumber: prevLine }
      prevLine++
      prevLeft--
      prevOffset++
    }

    const addLine = (content: string) => {
      const diffLine = getDiffLine(offset + nextOffset)
      diffLine.next = { content, lineNumber: nextLine }
      nextLine++
      nextLeft--
      nextOffset++
    }

    const checkOffset = () => {
      if (prevLeft > 0 || nextLeft > 0) {
        throw new Error(`illegal Diff ${text}`)
      }
    }
    let prev = n - 1
    while (n < lines.length) {
      // console.log(n)
      if (prev === n) {
        throw new Error(`loop error ${n} ${text}`)
      }
      prev++
      const content = lines[n].slice(1)
      switch (lines[n].charAt(0)) {
        case ' ': {
          newOffset()
          sameLine(content)
          n++
          continue
        }
        case '-': {
          removeLine(content)
          n++
          continue
        }
        case '+': {
          addLine(content)
          n++
          continue
        }
        case '@': {
          break
        }
        default:
          throw new Error(`unknown line leading ${content}`)
      }
      if (lines[n].startsWith('@')) {
        break
      }
    }
    checkOffset()
    res.diffLines.push(...diffLines)
  }

  return res
}

export const splitDiffs = (text: string) => {
  return text
    .split('\n')
    .filter((line) => ' +-@'.includes(line.charAt(0)))
    .join('\n')
    .split('\n--- ')
    .map((line, i) => (i === 0 ? line.trim() : `--- ${line.trim()}`))
}
