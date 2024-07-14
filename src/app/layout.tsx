import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import QueryProvider from "@/components/ReactQueryClientProvider/ReactQueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hogwarts Express",
  description: "explore the Wizarding World",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
