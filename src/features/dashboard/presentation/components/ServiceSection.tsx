'use client';

import { useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@/features/dashboard/presentation/components/icons';
import ServiceCard from '@/features/dashboard/presentation/components/ServiceCard';
import type { ServiceSection as ServiceSectionData } from '@/features/dashboard/presentation/lib/mockServices';

interface ServiceSectionProps {
  section: ServiceSectionData;
}

const SCROLL_STEP = 320;

export default function ServiceSection({ section }: ServiceSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(offset: number) {
    scrollerRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  }

  return (
    <section className="border-b border-gray-100 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
          <button
            type="button"
            aria-label={`Add to ${section.title}`}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-SCROLL_STEP)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(SCROLL_STEP)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1"
      >
        {section.services.map((service) => (
          <div key={service.id} className="w-72 shrink-0 snap-start sm:w-80">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
