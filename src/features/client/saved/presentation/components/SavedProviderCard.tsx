'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircleIcon, PaperPlaneIcon, PhoneIcon, XIcon } from '@/components/icons';
import ContactProviderModal from '@/features/client/shared/presentation/components/ContactProviderModal';
import { locationLabel } from '@/lib/locations';
import type { MovingService } from '@/features/client/shared/presentation/lib/mockServices';

const MAX_VISIBLE_LOCATIONS = 4;

interface SavedProviderCardProps {
  service: MovingService;
  onRemove: (id: string) => void;
}

export default function SavedProviderCard({ service, onRemove }: SavedProviderCardProps) {
  const { provider } = service;
  const visibleLocations = service.locations.slice(0, MAX_VISIBLE_LOCATIONS);
  const remainingCount = service.locations.length - visibleLocations.length;
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative rounded-2xl border border-gray-200 p-4">
      {isContactOpen && (
        <ContactProviderModal provider={provider} onClose={() => setIsContactOpen(false)} />
      )}
      <button
        type="button"
        aria-label={`Remove ${provider.name} from saved providers`}
        onClick={() => onRemove(service.id)}
        className="absolute right-4 top-4 text-gray-300 hover:text-gray-500"
      >
        <XIcon className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={provider.avatar} alt={provider.name} fill sizes="40px" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
            {provider.verified && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Verified
              </span>
            )}
            <span>{provider.memberSince}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {visibleLocations.map((location) => (
          <span
            key={location}
            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
          >
            {locationLabel(location)}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            +{remainingCount}
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href="/messages"
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-500 py-2 text-sm font-semibold text-white hover:bg-green-600"
        >
          <PaperPlaneIcon className="h-4 w-4" />
          Message Provider
        </Link>
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-green-500 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
        >
          <PhoneIcon className="h-4 w-4" />
          Show Contact
        </button>
      </div>
    </div>
  );
}
