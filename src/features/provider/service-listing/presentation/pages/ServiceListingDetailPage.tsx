'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import DeleteServiceModal from '@/features/provider/service-listing/presentation/components/DeleteServiceModal';
import { PencilIcon, TrashIcon } from '@/features/provider/shared/presentation/components/icons';
import ServiceImageGallery from '@/components/ServiceImageGallery';
import ServiceReviewsPanel from '@/features/provider/shared/presentation/components/ServiceReviewsPanel';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { getCategoryById } from '@/features/provider/service-listing/presentation/lib/serviceCategories';
import { formatKes } from '@/features/provider/service-listing/presentation/lib/mockServiceListings';
import { mockServiceReviews } from '@/features/provider/shared/presentation/lib/mockReviews';

interface ServiceListingDetailPageProps {
  id: string;
}

export default function ServiceListingDetailPage({ id }: ServiceListingDetailPageProps) {
  const router = useRouter();
  const { getById, removeListing } = useServiceListings();
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const listing = getById(id);
  if (!listing && !isDeleting) {
    notFound();
  }
  if (!listing) {
    return null;
  }

  const category = getCategoryById(listing.categoryId);

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div>
            <ServiceImageGallery images={listing.images} alt={category?.label ?? 'Service'} />

            <div className="mt-6 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Reviews ({mockServiceReviews.length})</h2>
            </div>
            <ServiceReviewsPanel reviews={mockServiceReviews} />
          </div>

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
            setIsDeleting(true);
            removeListing(listing.id);
            toast.success('Service Deleted Successfully', {
              description: 'This service is no longer available for customers to view.',
            });
            router.push('/provider/service-listing');
          }}
        />
      )}
    </div>
  );
}
