'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Delete the cookie manually (client-side only)
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Optionally clear any other client-side auth state
    localStorage.removeItem('token='); // if used

    // Redirect after 1.5 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1500);

    return () => clearTimeout(timer);
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
