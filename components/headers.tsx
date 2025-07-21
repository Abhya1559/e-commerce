import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <div className="top-0 fixed z-10 w-full bg-white shadow-md p-4 font-sans">
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="font-bold text-2xl capitalize">
              T<span className="font-bold text-orange-500">Mania</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 font-semibold">
          <Link href="/" className="cursor-pointer hover:text-orange-500">
            Home
          </Link>
          <Link href="/about" className="cursor-pointer hover:text-orange-500">
            About
          </Link>
          <Link href="/men" className="cursor-pointer hover:text-orange-500">
            Men
          </Link>
          <Link href="/women" className="cursor-pointer hover:text-orange-500">
            Women
          </Link>
          <Link href="/kids" className="cursor-pointer hover:text-orange-500">
            Kids
          </Link>
        </div>
        <div className="flex items-center justify-between font-semibold gap-4">
          <Link href="/login" className="hover:underline hover:text-orange-500">
            Login
          </Link>
          <Link href="/register">
            <Button className="bg-orange-500 hover:bg-orange-700 cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
