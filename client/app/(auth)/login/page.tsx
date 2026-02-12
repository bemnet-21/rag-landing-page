'use client'

import { login } from '@/services/auth.service';
import { setUser } from '@/store/slices/auth.slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()  
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (email: string, password: string) => {
    try {
        const res = await login(email, password)
        const user = res.data.user
        const token = res.data.token
        localStorage.setItem("token", token)
        dispatch(setUser({user, token}))
        router.replace('/')
    } catch(err) {
        console.error("Login Error", err)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password)

  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-paperWhite p-4 text-softBlack">
      
      {/* Card Container */}
      <div className="bg-white shadow-xl rounded-2xl flex flex-col w-full max-w-md p-8 md:p-10 border border-gray-100">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-deepGreen mb-2">Welcome Back</h1>
          <p className="text-gray-500">Please enter your details to sign in.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
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
            Log In
          </button>
        </form>


        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href={'/signup'} className="text-mutedGold font-semibold hover:underline hover:text-deepGreen transition cursor-pointer">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;