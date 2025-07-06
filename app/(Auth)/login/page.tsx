import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center">
      <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-2xl border p-10 shadow-2xl">
        <form action="" className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
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
              <Input type="text" placeholder="Enter your email" />
            </div>
            <div className="mt-2">
              <div className="flex transform items-center justify-between font-semibold text-gray-600 transition-all ease-out hover:text-gray-900">
                <label htmlFor="" className="font-semibold text-gray-950">
                  Password
                </label>
                <Link href="">Forgot Password ?</Link>
              </div>
              <Input type="password" placeholder="Enter your email" />
            </div>
            <div className="mt-5">
              <Button className="w-[100%] cursor-pointer items-center justify-center">Login</Button>
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
