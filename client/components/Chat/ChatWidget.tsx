'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaChevronDown, FaRobot, FaPaperPlane } from 'react-icons/fa'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Hive Assistant. Ask me anything about our Wi-Fi, meeting rooms, or house rules!" }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    
    // Simulate bot typing/streaming (For UI demo purposes)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm looking into that in our documents... (RAG retrieval simulation)" }])
    }, 600)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-deepGreen p-4 flex justify-between items-center text-paperWhite">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaRobot className="text-mutedGold text-xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-deepGreen rounded-full"></span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm">Hive Concierge</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">AI Support Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-mutedGold transition-colors">
              <FaChevronDown />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-paperWhite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-deepGreen text-white rounded-tr-none' 
                  : 'bg-white text-softBlack shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-paperWhite rounded-full px-4 py-2 border border-gray-200 focus-within:border-mutedGold transition-colors">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the Hive..."
                className="flex-1 bg-transparent border-none outline-none text-softBlack text-sm h-8"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="text-mutedGold disabled:text-gray-300 hover:scale-110 transition-transform"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-deepGreen text-mutedGold rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-mutedGold"
      >
        {isOpen ? <FaChevronDown className="text-white" /> : <HiChatBubbleLeftRight size={28} />}
      </button>
    </div>
  )
}

export default ChatWidget