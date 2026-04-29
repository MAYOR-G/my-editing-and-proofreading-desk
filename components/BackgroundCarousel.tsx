"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface BackgroundCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  overlayClassName?: string;
}

export function BackgroundCarousel({ 
  images, 
  interval = 4000, 
  className = "", 
  overlayClassName = "bg-ivory/90 backdrop-blur-[3px]" 
}: BackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          unoptimized
          className={`object-cover object-center transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
    </div>
  );
}
