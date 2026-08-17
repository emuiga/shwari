'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/icons';

interface ServiceImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ServiceImageGallery({ images, alt }: ServiceImageGalleryProps) {
  const [index, setIndex] = useState(0);

  function goTo(offset: number) {
    setIndex((current) => (current + offset + images.length) % images.length);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-gray-900">
      <Image
        src={images[index]}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(-1)}
            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-body hover:bg-white"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(1)}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-body hover:bg-white"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {index + 1} of {images.length}
          </span>
        </>
      )}
    </div>
  );
}
