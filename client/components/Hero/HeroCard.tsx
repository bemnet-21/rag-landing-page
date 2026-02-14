// components/HeroCard.tsx
import { HeroCardProps } from '@/interface'



const HeroCard = ({ label, description, icon: Icon } : HeroCardProps) => {
  return (
    <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 border-t-4 border-t-mutedGold hover:shadow-md transition-shadow duration-300 flex flex-col h-full'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='p-3 bg-paperWhite rounded-full text-deepGreen'>
           <Icon size={24} />
        </div>
        <h3 className='font-serif text-xl text-deepGreen font-bold'>
            {label}
        </h3>
      </div>
      <p className='text-softBlack/80 text-sm sm:text-base leading-relaxed font-sans'>
        {description}
      </p>
    </div>
  )
}

export default HeroCard