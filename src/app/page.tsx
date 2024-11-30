import { tools } from '@/config/tools'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header section - Modern title styles */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
            WonderfulTools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A Collection of Simple and Useful Online Tools
          </p>
        </header>

        {/* Tool cards grid - remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link 
              key={tool.id}
              href={tool.path}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 
                shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                border border-gray-100 dark:border-gray-700
                hover:border-blue-500 dark:hover:border-blue-400
                transform hover:-translate-y-1">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full
                    group-hover:bg-blue-100 dark:group-hover:bg-gray-600 
                    transition-colors duration-300">
                    <tool.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}