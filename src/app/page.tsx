import { tools } from '@/config/tools'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部 */}
      <header className="text-center mb-12 relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          WonderfulTools
        </h1>
        <p className="text-xl text-gray-600">
          简单好用的在线工具集合
        </p>
      </header>

      {/* 工具卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.id}
            href={tool.path}
            className="transform hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex flex-col items-center">
                <tool.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}