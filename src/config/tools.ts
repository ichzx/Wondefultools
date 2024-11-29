import { 
    Code2, 
    ImageIcon, 
    FileText
  } from 'lucide-react'
  
  export const tools = [
    {
      id: 'json-parser',
      title: 'JSON 解析器',
      description: '格式化和验证 JSON 字符串',
      icon: Code2,
      path: '/tools/json-parser'
    },
    {
      id: 'image-converter',
      title: '图片转换器',
      description: '图片格式转换、压缩',
      icon: ImageIcon,
      path: '/tools/image-converter'
    },
    {
      id: 'text-diff',
      title: '文本对比',
      description: '对比两段文本的差异',
      icon: FileText,
      path: '/tools/text-diff'
    },
    // 可以继续添加更多工具...
  ]