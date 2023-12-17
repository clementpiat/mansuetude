import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "./components/Navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mansuétude',
  description: 'Vocabulaire français littéraire',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg"/>
        <link rel="manifest" href="/manifest.json"/>
      </head>
      <body className={inter.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
