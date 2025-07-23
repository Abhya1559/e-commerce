'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie;
    const hasToken = cookie.includes('refreshToken');
    console.log('Cookie:', cookie, 'Has token:', hasToken);
    setIsLoggedIn(true);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsLoggedIn(false);
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center gap-8 font-semibold">
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

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center justify-between font-semibold gap-4">
          {isLoggedIn ? (
            <Button
              className="bg-orange-500 hover:bg-orange-700 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:underline hover:text-orange-500"
              >
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-700 cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 font-semibold">
          <Link
            href="/"
            className="block hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/men"
            className="block hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            Men
          </Link>
          <Link
            href="/women"
            className="block hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            Women
          </Link>
          <Link
            href="/kids"
            className="block hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kids
          </Link>

          {isLoggedIn ? (
            <Button
              className="w-full bg-orange-500 hover:bg-orange-700 mt-2"
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-orange-500"
              >
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-orange-500 hover:bg-orange-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
