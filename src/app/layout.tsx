import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import ThemeToggle from '@/components/theme-toggle'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WonderfulTools - 在线工具集合',
  description: '简单好用的在线工具集合',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold text-blue-500 dark:text-blue-400"
              >
                WonderfulTools
              </Link>
              <ThemeToggle />
            </div>
          </nav>

          <main>{children}</main>

          <footer className="mt-12 py-6 text-center text-gray-600">
            <p>© 2024 WonderfulTools. All rights reserved.</p>
          </footer>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}