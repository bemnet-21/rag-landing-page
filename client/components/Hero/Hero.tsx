'use client'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import HeroCard from './HeroCard'
import { FaCalendar, FaCoffee, FaWifi } from 'react-icons/fa'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi2'

const Hero = () => {
  const { user } = useSelector((state: RootState) => state.authReducer)

  return (
    <section className='bg-paperWhite min-h-[85vh] w-full flex flex-col gap-y-12 items-center justify-center px-6 py-12 md:px-10 lg:px-16'>
        
        {/* Header Text Section */}
        <div className='text-center max-w-3xl mb-12 md:mb-16 animate-fade-in'>
            <h1 className='text-deepGreen font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight'>
                Welcome, {user?.name || 'Member'}
            </h1>
            
            <div className='flex flex-col sm:flex-row items-center justify-center gap-2 text-softBlack/80 font-sans text-base sm:text-lg'>
                <span>You are checked into <span className='font-semibold text-deepGreen'>The Hive - Adama</span>.</span>
                
                <span className='hidden sm:inline text-mutedGold'>•</span>
                
                <div className='flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-gray-200'>
                    <span className='relative flex h-3 w-3'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                    <span className='text-sm font-medium text-deepGreen'>Wi-Fi: Excellent</span>
                </div>
            </div>
        </div>
        

        <div className='w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            <HeroCard 
                label='Meeting Rooms' 
                icon={FaCalendar} 
                description='Soundproof environments for your calls. Equipped with 4K casting and whiteboard walls.' 
            />
            <HeroCard 
                label='High-Speed Internet' 
                icon={FaWifi} 
                description='Enjoy our dedicated fiber-optic connection. Validated for secure VPN usage and large file transfers.' 
            />
            <HeroCard 
                label='Refreshments' 
                icon={FaCoffee} 
                description='Unlimited artisan coffee and herbal teas available in the kitchen. Happy Hour is every Friday at 5 PM.' 
            />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-mutedGold font-bold tracking-widest text-xs uppercase mb-3">
                    <HiOutlineLightBulb className="text-lg" />
                    <span>The Digital Concierge</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-deepGreen">
                    Everything you need to thrive, <br /> 
                    <span className="text-mutedGold">just a question away.</span>
                </h2>
            </div>
            <p className="text-softBlack/60 max-w-sm text-sm leading-relaxed">
                Our AI is trained on The Hive’s entire ecosystem—from network protocols to community event schedules and meeting room availability.
            </p>
        </div>
    </section>
  )
}

export default Hero