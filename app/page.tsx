import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
export default function Home({ Component, pageProps }) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </div>
  );
}
