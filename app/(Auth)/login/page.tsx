'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccess(data.message);
        router.push('/');
      } else {
        setError(data.message);
        // router.push('/login');
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center">
      <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-2xl border p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4 font-semibold">
            <Link
              href="/"
              className="mt-2 flex items-center justify-center font-serif text-3xl font-semibold text-gray-800"
            >
              Sports.Co.India
            </Link>

            <div className="mt-2">
              <label htmlFor="" className="font-semibold">
                Email
              </label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-2">
              <div className="flex transform items-center justify-between font-semibold text-gray-600 transition-all ease-out hover:text-gray-900">
                <label htmlFor="" className="font-semibold text-gray-950">
                  Password
                </label>
                <Link href="">Forgot Password ?</Link>
              </div>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter your email"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <div className="mt-5">
              <Button className="w-[100%] cursor-pointer items-center justify-center" type="submit">
                {loading ? 'loading...' : 'login'}
              </Button>
            </div>
            <div className="mt-2 mb-2 flex transform flex-col items-center justify-center gap-4 font-semibold text-gray-600 transition-all ease-out hover:text-gray-900">
              <Button variant={'outline'} className="w-[100%] cursor-pointer">
                <FaGoogle className="h-5 w-5" /> Login with google
              </Button>
              <Link href="/register">Don't have an account ?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
