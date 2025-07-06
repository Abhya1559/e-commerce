'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BannerImages } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

export default function CarouselSpacing() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="w-full px-4 py-8">
      <Carousel className="mx-auto w-full max-w-6xl">
        <CarouselContent className="-ml-1">
          {BannerImages.map((banner, i) => (
            <CarouselItem key={i}>
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[500px]">
                <Image src={banner.img} alt="bannerImage" width={1200} height={500} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
