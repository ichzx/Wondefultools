// 图片转换器
'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [format, setFormat] = useState('png')
  const [isSvg, setIsSvg] = useState(false)
  const [svgCode, setSvgCode] = useState('')
  const [inputMethod, setInputMethod] = useState<'file' | 'code'>('file')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMethod('file')
    setSvgCode('')
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setIsSvg(file.type === 'image/svg+xml')
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSvgCodeInput = (code: string) => {
    setSvgCode(code)
    setInputMethod('code')
    setSelectedFile(null)
    setIsSvg(true)
    // 将 SVG 代码转换为 data URL
    const svgBlob = new Blob([code], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    setPreview(url)
  }

  const handleConvert = async () => {
    if (!preview && !svgCode) return

    if (isSvg) {
      // 处理 SVG 转换
      const svgText = inputMethod === 'code' ? svgCode : await (await fetch(preview as string)).text()
      
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = svgText
      const svgElement = tempDiv.querySelector('svg')
      
      if (!svgElement) return
      
      // 获取 SVG 的尺寸
      const width = svgElement.width.baseVal.value || 800
      const height = svgElement.height.baseVal.value || 600
      
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // 将 SVG 转换为 Blob URL
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      const img = new Image()
      img.src = url
      
      await new Promise((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height)
          URL.revokeObjectURL(url)
          resolve(null)
        }
      })
      
      const convertedDataUrl = canvas.toDataURL(`image/${format}`)
      setConvertedImage(convertedDataUrl)
    } else {
      // 原有的图片转换逻辑
      const image = new Image()
      image.src = preview as string
      
      await new Promise(resolve => {
        image.onload = resolve
      })

      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.drawImage(image, 0, 0)
      
      const convertedDataUrl = canvas.toDataURL(`image/${format}`)
      setConvertedImage(convertedDataUrl)
    }
  }

  const handleDownload = () => {
    if (!convertedImage) return
    
    const link = document.createElement('a')
    link.href = convertedImage
    link.download = `converted-image.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setInputMethod('file')}
              className={`px-4 py-2 rounded ${
                inputMethod === 'file'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setInputMethod('code')}
              className={`px-4 py-2 rounded ${
                inputMethod === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Paste SVG Code
            </button>
          </div>

          {inputMethod === 'file' ? (
            <label className="block mb-4">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">Select an image to convert</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.svg"
                  onChange={handleFileSelect}
                />
              </div>
            </label>
          ) : (
            <div className="mb-4">
              <textarea
                value={svgCode}
                onChange={(e) => handleSvgCodeInput(e.target.value)}
                placeholder="Paste your SVG code here..."
                className="w-full h-48 p-4 border rounded dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
              />
            </div>
          )}

          <div className="flex gap-4 mb-4">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>

            <button
              onClick={handleConvert}
              disabled={!selectedFile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Convert
            </button>

            <button
              onClick={handleDownload}
              disabled={!convertedImage}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {preview && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Original</h3>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto border rounded dark:border-gray-700"
              />
            </div>
          )}
          
          {convertedImage && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Converted</h3>
              <img
                src={convertedImage}
                alt="Converted"
                className="max-w-full h-auto border rounded dark:border-gray-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

