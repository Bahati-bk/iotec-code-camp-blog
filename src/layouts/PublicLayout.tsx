import type { ReactNode } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
