import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Jersey_25 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })
const jersey25 = Jersey_25({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jersey",
})

export const metadata: Metadata = {
  title: "Sujal Gupta - Robotics & AI Engineer",
  description:
    "Portfolio of Sujal Gupta, an innovative Robotics and AI engineering student specializing in autonomous systems, machine learning, and intelligent robotics.",
  keywords: "robotics, artificial intelligence, engineering, portfolio, automation, machine learning",
  authors: [{ name: "Sujal Gupta" }],
  creator: "Sujal Gupta",
  openGraph: {
    title: "Sujal Gupta - Robotics & AI Engineer",
    description:
      "Innovative Robotics and AI engineering student with expertise in autonomous systems and machine learning",
    url: "https://sujalgupta.vercel.app",
    siteName: "Sujal Gupta Portfolio",
    images: [
      {
        url: "/images/sujal-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sujal Gupta - Robotics & AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Gupta - Robotics & AI Engineer",
    description:
      "Innovative Robotics and AI engineering student with expertise in autonomous systems and machine learning",
    images: ["/images/sujal-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} ${jersey25.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
