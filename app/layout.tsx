import type React from "react"
import type { Metadata } from "next"
import { Inter, Jersey_15 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider

const inter = Inter({ subsets: ["latin"] })
const jersey15 = Jersey_15({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jersey",
})

export const metadata: Metadata = {
  title: "Sujal Gupta - Robotics & AI Engineer",
  description:
    "Portfolio of Sujal Gupta, an innovative Robotics and AI engineering student specializing in autonomous systems, machine learning, and intelligent robotics solutions.",
  keywords:
    "robotics, artificial intelligence, engineering, portfolio, automation, machine learning, IoT, embedded systems",
  authors: [{ name: "Sujal Gupta" }],
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jersey15.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
