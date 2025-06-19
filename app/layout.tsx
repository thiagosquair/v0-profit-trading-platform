import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profitz Trading Psychology Lab",
  description: "Advanced trading psychology platform with AI coaching",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import './globals.css'