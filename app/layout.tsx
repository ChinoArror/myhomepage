import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Idoubi's Tools - AI工具集合",
  description: 'A collection of AI-powered tools and applications by Idoubi',
  keywords: ['AI tools', 'artificial intelligence', 'web applications', 'idoubi'],
  authors: [{ name: 'Idoubi', url: 'https://idoubi.cc' }],
  creator: 'Idoubi',
  publisher: 'Idoubi',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.idoubi.cc',
    title: "Idoubi's Tools - AI工具集合",
    description: 'A collection of AI-powered tools and applications by Idoubi',
    siteName: "Idoubi's Tools",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Idoubi's Tools - AI工具集合",
    description: 'A collection of AI-powered tools and applications by Idoubi',
    creator: '@idoubi',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#34D399" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background-primary">
          {children}
        </div>
      </body>
    </html>
  )
}