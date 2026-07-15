'use client';

import { XIcon } from '@/components/icons';
import { getCategoryById } from '@/features/provider/service-listing/presentation/lib/serviceCategories';
import type { ServiceListing } from '@/features/provider/service-listing/presentation/lib/mockServiceListings';

interface DeleteServiceModalProps {
  listing: ServiceListing;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteServiceModal({ listing, onCancel, onConfirm }: DeleteServiceModalProps) {
  const category = getCategoryById(listing.categoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-red-600">Are you sure you want to delete this service?</h2>
        <p className="mt-1.5 text-sm text-gray-900">Upon deletion this service will not be available to customers for viewing.</p>

        <p className="mt-4 text-sm font-semibold text-gray-900">{category?.label}</p>

        <p className="mt-3 text-xs font-semibold text-gray-500">Service Categories</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {listing.serviceAreas.map((area) => (
            <span key={area} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {area}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs font-semibold text-gray-500">Moving Locations</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {listing.locations.map((location) => (
            <span key={location} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {location}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
