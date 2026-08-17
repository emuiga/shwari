'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PaperPlaneIcon } from '@/components/icons';
import ContactProviderModal from '@/features/client/shared/presentation/components/ContactProviderModal';
import { useCompare } from '@/features/client/saved/presentation/context/CompareContext';
import { locationLabel } from '@/lib/locations';
import {
  formatKes,
  type MovingService,
} from '@/features/client/shared/presentation/lib/mockServices';

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
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      {isContactOpen && (
        <ContactProviderModal provider={service.provider} onClose={() => setIsContactOpen(false)} />
      )}
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
          <p className="text-base font-semibold text-ink hover:underline">
            {formatKes(service.price)}
          </p>
        </Link>
        <p className="mt-0.5 text-sm text-subtle">{service.description}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleLocations.map((location) => (
            <span
              key={location}
              className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-body"
            >
              {locationLabel(location)}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-body">
              +{remainingCount}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
        >
          <PaperPlaneIcon className="h-4 w-4" />
          Contact Provider
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(service)}
          disabled={disabled}
          className={
            selected
              ? 'mt-2 flex w-full items-center justify-center rounded-control border border-primary bg-primary-subtle py-2 text-sm font-semibold text-primary-strong'
              : 'mt-2 flex w-full items-center justify-center rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50'
          }
        >
          {selected ? 'Added to Compare' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
