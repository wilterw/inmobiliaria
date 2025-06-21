import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"
import { DynamicHead } from "@/components/dynamic-head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal Inmobiliario",
  description: "Encuentra tu próximo hogar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <DynamicHead />
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
