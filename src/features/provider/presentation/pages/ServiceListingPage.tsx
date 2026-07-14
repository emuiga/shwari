'use client';

import Link from 'next/link';
import ProviderHeader from '@/features/provider/presentation/components/ProviderHeader';
import ServiceListingCard from '@/features/provider/presentation/components/ServiceListingCard';
import { useServiceListings } from '@/features/provider/presentation/context/ServiceListingsContext';

export default function ServiceListingPage() {
  const { listings } = useServiceListings();

  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-gray-900">Service Listing</h1>

          <div className="flex items-center gap-3">
            <select className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none">
              <option>Filter</option>
            </select>
            <Link
              href="/provider/service-listing/new"
              className="flex-1 rounded-md bg-green-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-600 sm:flex-none"
            >
              New Service
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
            <p className="text-sm font-semibold text-gray-900">You don&apos;t have any active Service Listings?</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              Would you like to create service listings to enable customers to discover your company?
            </p>
            <Link
              href="/provider/service-listing/new"
              className="mt-4 inline-block rounded-md border border-green-500 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
            >
              Create a New Service
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ServiceListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
