'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContactIcon } from '@/features/dashboard/presentation/components/icons';
import { useCompare } from '@/features/dashboard/presentation/context/CompareContext';
import {
  formatKes,
  type MovingService,
} from '@/features/dashboard/presentation/lib/mockServices';

interface ServiceCardProps {
  service: MovingService;
}

const MAX_VISIBLE_LOCATIONS = 2;

export default function ServiceCard({ service }: ServiceCardProps) {
  const visibleLocations = service.locations.slice(0, MAX_VISIBLE_LOCATIONS);
  const remainingCount = service.locations.length - visibleLocations.length;
  const { isInCompare, toggleCompare, isCompareFull } = useCompare();
  const selected = isInCompare(service.id);
  const disabled = !selected && isCompareFull;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/service/${service.id}`} className="relative aspect-[16/9] w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/service/${service.id}`}>
          <p className="text-base font-semibold text-gray-900 hover:underline">
            {formatKes(service.price)}
          </p>
        </Link>
        <p className="mt-0.5 text-sm text-gray-500">{service.description}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleLocations.map((location) => (
            <span
              key={location}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {location}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              +{remainingCount}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-green-500 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
        >
          <ContactIcon className="h-4 w-4" />
          Contact Provider
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(service)}
          disabled={disabled}
          className={
            selected
              ? 'mt-2 flex w-full items-center justify-center rounded-md bg-gray-100 py-2 text-sm font-semibold text-gray-500'
              : 'mt-2 flex w-full items-center justify-center rounded-md border border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          }
        >
          {selected ? 'Added to Compare' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
