'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Logout() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

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

      setStatus('done');

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    };

    logout();
  }, [router]);

  return (
    <motion.div
      className="h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        {status === 'loading' ? 'Logging out...' : 'You have been logged out'}
      </h2>
    </motion.div>
  );
}
