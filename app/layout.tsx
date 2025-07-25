import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aryuki's Tools - 工具集合",
  description: 'A collection of AI-powered tools and applications by Aryuki',
  keywords: ['AI tools', 'artificial intelligence', 'web applications', 'aryuki'],
  authors: [{ name: 'Aryuki', url: 'https://home.aryuki.com' }],
  creator: 'Aryuki',
  publisher: 'Aryuki',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://home.aryuki.com',
    title: "Aryuki's Tools - 工具集合",
    description: 'A collection of AI-powered tools and applications by Aryuki',
    siteName: "Aryuki's Tools",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aryuki's Tools - 工具集合",
    description: 'A collection of AI-powered tools and applications by Aryuki',
    creator: '@yysy_rhy',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6ZCGYZP5S7"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6ZCGYZP5S7');
              `,
          }}
        /> 
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