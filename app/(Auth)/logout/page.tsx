'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include', // important for cookies
        });

        // Optional: clear any client-side tokens or flags
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
      } catch (err) {
        console.error('Logout failed:', err);
      }

      // Wait 1.5 seconds before redirect
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    };

    logout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-semibold text-orange-500">
        Logging you out...
      </h1>
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
    </div>
  );
}
