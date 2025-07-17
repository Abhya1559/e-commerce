import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-green-400 bg-clip-text text-transparent">
        Gradient Text
      </h1>
    </div>
  );
}
