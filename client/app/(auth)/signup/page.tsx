'use client'

import { signup } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const page = () => {
  const router = useRouter()  
  const [formData, setFormData] = React.useState({ email: '', password: '' , full_name: ''});
  const [showPassword, setShowPassword] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSignup = async (email: string, password: string, full_name: string) => {
    try {
        await signup(email, password, full_name)
        router.replace('/login')
        
    } catch(err) {
        console.error("Signup Error", err)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(formData.email, formData.password, formData.full_name)
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-paperWhite p-4 text-softBlack">
          
          {/* Card Container */}
          <div className="bg-white shadow-xl rounded-2xl flex flex-col w-full max-w-md p-8 md:p-10 border border-gray-100">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-deepGreen mb-2">Create Account</h1>
              <p className="text-gray-500">Please enter your details to create an account.</p>
            </div>
    
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Full Name Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="full_name" className="text-sm font-medium text-deepGreen">Full Name</label>
                    <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mutedGold focus:border-transparent transition duration-200 placeholder-gray-400"
                    required
                    />
                </div>
              
              {/* Email Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-deepGreen">Email Address</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mutedGold focus:border-transparent transition duration-200 placeholder-gray-400"
                    required
                    />
                </div>
        
                {/* Password Input */}
                <div className="flex flex-col gap-1 relative">
                    <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium text-deepGreen">Password</label>
                    <a href="#" className="text-xs text-mutedGold hover:underline hover:text-deepGreen transition">
                        Forgot Password?
                    </a>
                    </div>
                    <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mutedGold focus:border-transparent transition duration-200 placeholder-gray-400"
                        required
                    />
                    {/* Toggle Password Visibility Icon */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-deepGreen transition cursor-pointer"
                    >
                        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                    </button>
                    </div>
                </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 bg-deepGreen text-white font-semibold rounded-lg px-4 py-3 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Create Account
              </button>
            </form>
    
    
            
          </div>
        </section>
  )
}

export default page
