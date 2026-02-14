'use client'
import { sendChat } from '@/services/chat.service'
import React, { useState, useEffect, useRef } from 'react'
import { FaChevronDown, FaRobot, FaPaperPlane, FaRegCircle } from 'react-icons/fa'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Hive Assistant. Ask me anything about our Wi-Fi, meeting rooms, or house rules!" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    const userMessage = input.trim()
    if (!userMessage || isLoading) return

    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendChat(userMessage)
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer || response }])
    } catch (err) {
      console.error("Chat Error:", err)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to the Hive mind right now. Please try again in a moment." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-125 max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="bg-deepGreen p-4 flex justify-between items-center text-paperWhite">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-mutedGold/30">
                  <FaRobot className="text-mutedGold text-xl" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-deepGreen rounded-full"></span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight">Hive Concierge</p>
                <p className="text-[10px] text-mutedGold opacity-90 uppercase tracking-widest font-semibold">AI Assistant Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaChevronDown />
            </button>
          </div>

          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-paperWhite/50"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-deepGreen text-white rounded-tr-none' 
                  : 'bg-white text-softBlack border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-gray-100 p-3 px-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-mutedGold rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-mutedGold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-mutedGold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-paperWhite rounded-xl px-3 py-2 border border-gray-200 focus-within:border-mutedGold focus-within:ring-1 focus-within:ring-mutedGold transition-all">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about meeting rooms, Wi-Fi..."
                className="flex-1 bg-transparent border-none outline-none text-softBlack text-sm py-1"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-deepGreen text-mutedGold disabled:bg-gray-100 disabled:text-gray-300 hover:bg-black transition-all shadow-sm"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-2 uppercase tracking-tighter">
              Powered by Hive RAG Engine
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 ${
          isOpen 
          ? 'bg-paperWhite border-deepGreen text-deepGreen rotate-180' 
          : 'bg-deepGreen border-mutedGold text-mutedGold hover:scale-110 active:scale-90'
        }`}
      >
        {isOpen ? (
          <FaChevronDown size={20} />
        ) : (
          <div className="relative">
            <HiChatBubbleLeftRight size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-mutedGold rounded-full border-2 border-deepGreen"></span>
          </div>
        )}
      </button>
    </div>
  )
}

export default ChatWidget