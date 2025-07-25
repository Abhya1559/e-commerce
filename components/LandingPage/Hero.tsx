import Image from 'next/image';
import heroImage from '@/public/hero.jpg';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <figure className="relative w-full max-w-screen rounded-lg overflow-hidden shadow-lg">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-full h-auto object-cover"
          placeholder="blur"
          priority
        />
        <figcaption className="absolute inset-0 flex items-center justify-center">
          {/* Overlay */}
          <div className="bg-black/40 w-full h-full absolute" />

          {/* Text Content */}
          <div className="relative z-10 px-6 text-left flex flex-col items-center justify-center gap-4">
            <h1 className="text-orange-400 text-6xl uppercase tracking-widest font-semibold">
              New Arrival
            </h1>
            <p className="text-3xl text-center md:text-4xl font-extrabold text-white max-w-2xl leading-snug">
              Explore a curated collection of unique, high-quality T-shirts that
              express your style.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300">
              Discover Now
            </Button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
