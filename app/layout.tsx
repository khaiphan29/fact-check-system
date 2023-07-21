import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import '@/styles/main.css'
import React from 'react'

export const metadata = {
    title: "BK Fact Check",
    description: "Check Fact for a piece of news"
}

const RootLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <html lang='en'>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
