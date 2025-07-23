'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/app/schemas/LoginFormValidation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import login from '@/public/login.jpg';

type loginFormInputs = z.infer<typeof loginSchema>;
export default function Login() {
  const router = useRouter();

  const {
    register: fromRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginFormInputs) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || 'Invalid credentials');
        return;
      }
      toast.success('logged in successful');
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Form Section */}
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md p-6 rounded-lg">
          {/* Welcome Text */}
          <div className="text-left w-full">
            <h1 className="font-bold text-5xl mb-2">Welcome</h1>
            <p className="text-sm text-gray-600">
              Welcome to a seamless shopping experience
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center justify-center w-full"
          >
            {/* Email Field */}
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register('email')}
                className="w-full border border-gray-300 px-3 py-2 rounded-md  focus:ring-orange-500"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col w-full relative">
              <label
                htmlFor="password"
                className="mb-1 font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full border px-3 py-2 border-gray-300  rounded-md  focus:ring-orange-500"
              />

              <span
                className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
                onClick={toggleVisibility}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
            >
              Login
            </button>

            {/* Redirect Text */}
            <p className="font-medium">
              Don't have an account?
              <Link
                href="/register"
                className="text-orange-400 hover:underline ml-2"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full min-h-screen hidden md:block">
        <Image src={login} alt="login image" fill className="" priority />
      </div>
    </div>
  );
}
