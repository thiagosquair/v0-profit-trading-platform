import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Import your UserProvider and AuthProvider
import { UserProvider } from "@/contexts/UserContext"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MaXTrades - Trading Psychology Lab",
  description: "Advanced trading psychology platform with Ai coaching",
  generator: "MaXTrades",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {/* Wrap children with AuthProvider and UserProvider */}
          <AuthProvider>
            <UserProvider>
              {children}
              <Toaster />
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
