'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) {
          const data = await res.json();
          console.error('Logout failed:', data.message);
        }

        localStorage.clear();
        sessionStorage.clear();
      } catch (err) {
        console.error('Logout failed', err);
      }

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
