import React from 'react'
import Hero from '@/components/Hero/Hero'
import ChatWidget from '@/components/Chat/ChatWidget'
import HeroCard from '@/components/Hero/HeroCard'
import { FaWifi, FaCoffee, FaCalendarCheck, FaClock } from 'react-icons/fa'
import { HiOutlineLightBulb } from 'react-icons/hi'

const Page = () => {
  return (
    <main className="relative min-h-screen bg-paperWhite flex flex-col">
        

        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
            <Hero />
        </section>

        {/* Visual Break / Feature Quote */}
        <section className="bg-deepGreen py-16 px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <blockquote className="text-paperWhite/90 font-serif text-2xl italic leading-snug">
                    "The Hive isn't just a place to sit; it's an intelligent environment designed to remove every friction point from your workday."
                </blockquote>
                <div className="mt-6 flex justify-center items-center gap-4">
                    <div className="h-px w-12 bg-mutedGold"></div>
                    <p className="text-mutedGold font-bold uppercase tracking-widest text-xs">Management Team</p>
                    <div className="h-px w-12 bg-mutedGold"></div>
                </div>
            </div>
        </section>

        <ChatWidget />

        {/* Enhanced Footer */}
        <footer className="mt-auto py-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-deepGreen font-serif font-bold text-xl">The Hive.</h3>
                    <p className="text-softBlack/40 text-xs mt-1">Modern Coworking & Intelligence</p>
                </div>

                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-deepGreen/60">
                    <a href="#" className="hover:text-mutedGold transition">Terms</a>
                    <a href="#" className="hover:text-mutedGold transition">Privacy</a>
                    <a href="#" className="hover:text-mutedGold transition">Support</a>
                </div>

                <p className="text-softBlack/40 text-xs font-sans">
                    © {new Date().getFullYear()} The Hive Coworking Spaces. All rights reserved.
                </p>
            </div>
        </footer>
    </main>
  )
}

export default Page