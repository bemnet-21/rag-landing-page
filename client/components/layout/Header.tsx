'use client'
import { RootState } from '@/store';
import { logout } from '@/store/slices/auth.slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiUser, FiLogOut, FiHexagon } from 'react-icons/fi'; // Standard clean icons
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.authReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.replace('/login');
  };
  return (
    <header className="w-full h-16 md:h-20 bg-deepGreen flex items-center justify-between px-4 md:px-8 shadow-md sticky top-0 z-50">
      
      <div className="flex items-center gap-2 cursor-pointer group">
        <FiHexagon className="text-mutedGold text-xl md:text-2xl group-hover:rotate-90 transition-transform duration-500" />
        
        <div className="flex flex-col">
          <h1 className="text-mutedGold font-serif font-bold text-lg md:text-2xl tracking-wide leading-none">
            The Hive
          </h1>
          <span className="hidden sm:block text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">
            Knowledge Base
          </span>
        </div>
      </div>

      
    
      <div className="flex items-center gap-4 md:gap-6">
        {
        (user?.role.toLowerCase() === 'admin') &&
        <Link href={'/upload'} className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group" aria-label="Upload">
          <FaPlus className="text-mutedGold text-lg md:text-xl" />  
          <div className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Upload</div>
        </Link>
        }
        {
            (user) ? 
                <button className="flex items-center gap-3 group focus:outline-none">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-paperWhite/10 border border-mutedGold/50 flex items-center justify-center text-paperWhite group-hover:bg-mutedGold group-hover:text-deepGreen transition-colors duration-300">
                        <FiUser className="text-sm md:text-lg" />
                    </div>
                    
                    <div className="hidden md:flex flex-col items-start text-right">
                        <span className="text-paperWhite text-sm font-medium group-hover:text-mutedGold transition-colors">
                        {user?.name || "User Name"}
                        </span>
                        <span className="text-[10px] text-gray-400">{user?.role}</span>
                    </div>
                </button>
                :
                <button 
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group"
                    aria-label="Login" onClick={() => router.push('/login')}>
                        Login
                </button>
        }
        

        <div className="hidden md:block h-6 w-px bg-white/10"></div>

        <button 
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group"
          aria-label="Logout" onClick={handleLogout}
        >
          <FiLogOut className="text-lg md:text-xl group-hover:text-red-400 transition-colors" />
          <span className="hidden sm:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Header