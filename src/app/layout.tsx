import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ProgressProvider } from '@/components/providers/ProgressProvider'
import { Cursor } from '@/components/ui/Cursor'
import { BackgroundGradient } from '@/components/ui/BackgroundGradient'
import { NavigationDots } from '@/components/navigation/NavigationDots'
import { fonts } from '@/libs/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio - Azizbek Arzikulov',
  description: 'Web Developer portfolio showcasing projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="bg-light dark:bg-dark text-text-primary dark:text-text-light">
        <ThemeProvider>
          <ProgressProvider>
            {/* Custom cursor */}
            <Cursor />
            
            {/* Animated background gradient */}
            <BackgroundGradient />
            
            {/* Dynamic navigation dots */}
            <NavigationDots />
            
            {/* Main content */}
            <main className="relative min-h-screen">
              {children}
            </main>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}