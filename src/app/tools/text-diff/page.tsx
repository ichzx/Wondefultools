// 文本差异对比
'use client'

import { useState } from 'react'
import { diffLines, Change } from 'diff'

export default function TextDiff() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<Change[]>([])

  const handleCompare = () => {
    const diff = diffLines(text1, text2)
    setDiffResult(diff)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full h-64 p-4 border rounded dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
              placeholder="Enter original text..."
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full h-64 p-4 border rounded dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
              placeholder="Enter modified text..."
            />
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Compare
        </button>

        <div className="border rounded dark:border-gray-700 p-4">
          <div className="font-mono text-sm whitespace-pre-wrap">
            {diffResult.map((part, index) => (
              <span
                key={index}
                className={`${
                  part.added
                    ? 'bg-green-100 dark:bg-green-900'
                    : part.removed
                    ? 'bg-red-100 dark:bg-red-900'
                    : ''
                }`}
              >
                {part.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
