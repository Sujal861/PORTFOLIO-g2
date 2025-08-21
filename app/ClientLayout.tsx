"use client"

import type React from "react"
import { Inter, Jersey_15 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider
import { Analytics } from "@vercel/analytics/next" // Import Analytics
import { Suspense } from "react" // Import Suspense
import { useSearchParams } from "next/navigation" // Import useSearchParams

const inter = Inter({ subsets: ["latin"] })
const jersey15 = Jersey_15({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jersey",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jersey15.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
