'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ['/front pic.webp', '/8fda6bb1-09f2-45e7-b746-27b2e55f5811.webp']; // Use your actual images in order

export default function HomeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen flex justify-center items-center mt-8">
      <div className="relative w-screen h-[600px] rounded-none overflow-hidden shadow-lg">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            priority={i === 0}
            sizes="100vw"
          />
        ))}
      </div>
    </div>
  );
} 