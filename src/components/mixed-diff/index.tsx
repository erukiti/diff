import React from 'react'

import { parseSingleUnifiedDiff, DiffLine } from '@/diff'

import styles from './index.module.css'

type Props = ReturnType<typeof parseSingleUnifiedDiff>

const MixedDiffLine: React.FC<{
  left: string
  right: string
  notation?: string
}> = ({ notation, left, right }) => {
  // console.log('two', left, right)
  return (
    <div className={styles.row}>
      <code className={styles.leftCell}>
        <pre>{left}</pre>
      </code>
      <code className={styles.rightCell}>
        <pre>{right}</pre>
      </code>
      <div>{notation}</div>
    </div>
  )
}

const getDiffType = (diffLine: DiffLine) => {
  if (!diffLine.prev) {
    return 'added'
  }
  if (!diffLine.next) {
    return 'removed'
  }
  if (diffLine.prev.content === diffLine.next.content) {
    return 'same'
  }
  if (diffLine.prev.content.trim() === diffLine.next.content.trim()) {
    return 'indent-only'
  }
  return 'changed'
}

const Line: React.FC<{ diffLine: DiffLine }> = ({ diffLine }) => {
  const diffType = getDiffType(diffLine)
  const notation = {
    added: '追加',
    removed: '削除',
    changed: '変更',
    'indent-only': 'インデント修正',
    same: '',
  }
  return (
    <MixedDiffLine
      notation={notation[diffType]}
      left={diffLine.prev?.content || ''}
      right={diffLine.next?.content || ''}
    />
  )
}

export const MixedDiff: React.FC<Props> = ({
  prevFilename,
  nextFilename,
  diffLines,
}) => {
  return (
    <>
      {prevFilename !== nextFilename && (
        <MixedDiffLine left={prevFilename} right={nextFilename} />
      )}
      {diffLines.map((diffLine, i) => (
        <Line diffLine={diffLine} key={i} />
      ))}
    </>
  )
}
