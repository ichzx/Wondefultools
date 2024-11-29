'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

export default function JsonParser() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleParse = () => {
    try {
      const parsed = JSON.stringify(JSON.parse(input), null, 2)
      setOutput(parsed)
    } catch {
      setOutput('Invalid JSON')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <textarea
          className="w-full h-full p-4 font-mono border rounded dark:bg-gray-800 dark:border-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
        />
      </div>
      
      <div className="flex flex-col gap-4 p-4">
        <button 
          onClick={handleParse}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Parse →
        </button>
      </div>

      <div className="flex-1 p-4 relative">
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={handleCopy}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <div className="w-full h-full rounded overflow-auto">
          <SyntaxHighlighter
            language="json"
            style={vscDarkPlus}
            className="h-full rounded"
            customStyle={{
              margin: 0,
              padding: '1rem',
              height: '100%',
            }}
          >
            {output || ' '}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}