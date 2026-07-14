'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProviderHeader from '@/features/provider/presentation/components/ProviderHeader';
import DeleteServiceModal from '@/features/provider/presentation/components/DeleteServiceModal';
import { PencilIcon, TrashIcon } from '@/features/provider/presentation/components/icons';
import ServiceImageGallery from '@/features/dashboard/presentation/components/ServiceImageGallery';
import { useServiceListings } from '@/features/provider/presentation/context/ServiceListingsContext';
import { getCategoryById } from '@/features/provider/presentation/lib/serviceCategories';
import { formatKes } from '@/features/provider/presentation/lib/mockServiceListings';

interface ServiceListingDetailPageProps {
  id: string;
}

export default function ServiceListingDetailPage({ id }: ServiceListingDetailPageProps) {
  const router = useRouter();
  const { getById, removeListing } = useServiceListings();
  const [showDelete, setShowDelete] = useState(false);

  const listing = getById(id);
  if (!listing) {
    notFound();
  }

  const category = getCategoryById(listing.categoryId);

  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <ServiceImageGallery images={listing.images} alt={category?.label ?? 'Service'} />

          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-gray-900">{formatKes(listing.price)}</p>
                <p className="text-sm font-semibold text-gray-700">{category?.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/provider/service-listing/${listing.id}/edit`}
                  aria-label="Edit service"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  aria-label="Delete service"
                  onClick={() => setShowDelete(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs font-semibold text-gray-500">Service Categories</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {listing.serviceAreas.map((area) => (
                <span key={area} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {area}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs font-semibold text-gray-500">Moving Locations</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {listing.locations.map((location) => (
                <span key={location} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showDelete && (
        <DeleteServiceModal
          listing={listing}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            removeListing(listing.id);
            router.push('/provider/service-listing');
          }}
        />
      )}
    </div>
  );
}
