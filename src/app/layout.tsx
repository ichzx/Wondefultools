import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import ThemeToggle from '@/components/theme-toggle'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

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
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-full max-w-screen-2xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 font-bold hover:opacity-80"
                >
                  <span className="ml-4">WonderfulTools</span>
                </Link>
                <div className="mr-4">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>

            <footer className="border-t py-6 md:py-0">
              <div className="w-full max-w-screen-2xl mx-auto flex h-14 items-center justify-center text-sm text-muted-foreground px-4 sm:px-6 lg:px-8">
                <p>© 2024 WonderfulTools. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}