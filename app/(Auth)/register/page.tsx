'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center gap-4">
      <div className="flex h-[500px] w-[400px] flex-col items-center justify-center gap-2 rounded-2xl border p-10 shadow-2xl">
        <form action="" className="flex w-full flex-col gap-4 font-semibold">
          <Link
            href="/"
            className="mt-2 flex items-center justify-center font-serif text-3xl font-semibold text-gray-800"
          >
            Sports.Co.India
          </Link>
          <div>
            <label htmlFor="">Name</label>
            <Input />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <Input type="email" />
          </div>{' '}
          <div>
            <label htmlFor="">Password</label>
            <Input type="password" />
          </div>
          <div className="mt-2 flex transform flex-col items-center justify-center gap-4 font-semibold text-gray-600 transition-all ease-out hover:text-gray-900">
            <Button className="w-[100%] cursor-pointer">Sign Up</Button>
            <Link href="/login">Already have an account ?</Link>
            <Button variant={'outline'} className="w-[100%] cursor-pointer">
              <FaGoogle className="h-5 w-5" /> Signup with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
