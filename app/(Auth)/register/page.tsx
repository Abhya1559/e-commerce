'use client';
import Image from 'next/image';
import reg from '@/public/reg.jpg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@/app/schemas/userFormValidation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type RegisterFormInputs = z.infer<typeof UserSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setSubmit(true);
    setTimeout(async () => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
          toast.error(
            result.message || {
              description: 'Try logging in instead.',
            }
          );
          reset();
          return;
        }
        toast.success('user logged in successfully');
        reset();
        router.push('/login');
      } catch (error: any) {
        console.error(error.message);
      }
    }, 2000);
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(time);
  });
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-4xl font-bold text-orange-500">
          Loading...
        </div>
      </div>
    );
  }
  if (submit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-orange-600 font-semibold animate-pulse">
            Registering you in...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 font-sans">
      <div className="relative w-full h-full min-h-[400px] md:min-h-screen">
        <Image
          src={reg}
          alt="register-image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md p-6 rounded-lg">
          <div className="text-left">
            <h1 className="font-bold text-5xl mb-2">Welcome</h1>
            <p className="text-sm text-gray-600">
              Welcome to a seamless shopping experience
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4"
          >
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="mb-1 font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  {...formRegister('name')}
                  className="border px-3 py-2 border-gray-300 rounded-md"
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="mb-1 font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...formRegister('email')}
                  className="border px-3 py-2 border-gray-300 rounded-md"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-full relative">
                <label
                  htmlFor="password"
                  className="mb-1 font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formRegister('password')}
                  className="border px-3 py-2 border-gray-300 rounded-md"
                />
                <span
                  onClick={toggleVisibility}
                  className="absolute top-[42px] right-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formRegister('confirmPassword')}
                  className="border px-3 py-2 border-gray-300 rounded-md"
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-1/4">
                <label
                  htmlFor="role"
                  className="mb-1 font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  id="role"
                  {...formRegister('role')}
                  className="border px-3 py-2 border-gray-300 rounded-md"
                />
                {errors.role && (
                  <span className="text-sm text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <label
                  htmlFor="address"
                  className="mb-1 font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  id="address"
                  {...formRegister('address')}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
                {errors.address && (
                  <span className="text-sm text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
            >
              {/* {loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <div>Data loaded!</div>
              )} */}
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>

            <p className="font-medium text-center">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-orange-400 hover:underline ml-2"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
