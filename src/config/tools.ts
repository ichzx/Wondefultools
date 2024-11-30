import { 
    Code2, 
    ImageIcon, 
    FileText
  } from 'lucide-react'
  
  export const tools = [
    {
      id: 'json-parser',
      title: 'JSON Parser',
      description: 'Format and validate JSON strings',
      icon: Code2,
      path: '/tools/json-parser'
    },
    {
      id: 'image-converter',
      title: 'Image Converter',
      description: 'Image format conversion and compression',
      icon: ImageIcon,
      path: '/tools/image-converter'
    },
    {
      id: 'text-diff',
      title: 'Text Diff',
      description: 'Compare two text blocks',
      icon: FileText,
      path: '/tools/text-diff'
    },
    // 可以继续添加更多工具...
  ]