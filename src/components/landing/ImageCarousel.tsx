"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/family1.jpg",
    alt: "Young couple relaxing in their new apartment after moving in",
  },
  {
    src: "/images/family2.jpg",
    alt: "Young family with a baby settling into their new home",
  },
  {
    src: "/images/family3.jpg",
    alt: "Woman holding the keys to her new house",
  },
];

export default function ImageCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-green-950/60 to-zinc-950/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.25),_transparent_60%)]" />

      <div className="absolute right-6 bottom-8 flex gap-2 sm:right-8 lg:right-14 lg:bottom-12">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "w-8 bg-green-500" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
