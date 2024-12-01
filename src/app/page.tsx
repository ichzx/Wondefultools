import { tools } from '@/config/tools'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container relative">
        <div className="mx-auto flex flex-col items-center px-4 py-16">
          {/* Header section with Shadcn UI styling */}
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Wonderful<span className="text-primary">Tools</span>
            </h1>
            <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
              A Collection of Simple and Useful Online Tools
            </p>
          </section>

          {/* Tool cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[980px]">
            {tools.map((tool) => (
              <Link 
                key={tool.id}
                href={tool.path}
                className="transition-colors"
              >
                <Card className="h-full hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">{tool.title}</CardTitle>
                    <CardDescription className="text-center">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <SpeedInsights />
        </div>
      </div>
    </main>
  )
}