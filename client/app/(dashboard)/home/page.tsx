import ChatWidget from '@/components/Chat/ChatWidget'
import Hero from '@/components/Hero/Hero'
import React from 'react'

const Page = () => {
  return (
    <main className="relative min-h-screen bg-paperWhite">
        {/* Navigation could go here */}
        
        <Hero />

        {/* The Chatbot stays fixed across the landing page */}
        <ChatWidget />

        {/* Simple Footer to complete the UI */}
        <footer className="py-8 text-center text-softBlack/40 text-xs font-sans">
            © {new Date().getFullYear()} The Hive Coworking Spaces. All rights reserved.
        </footer>
    </main>
  )
}

export default Page