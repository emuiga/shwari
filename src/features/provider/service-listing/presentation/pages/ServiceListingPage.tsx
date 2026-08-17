'use client';

import Link from 'next/link';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import ServiceListingCard from '@/features/provider/service-listing/presentation/components/ServiceListingCard';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';

interface ServiceListingPageProps {
  categories: ServiceCategory[];
}

export default function ServiceListingPage({ categories }: ServiceListingPageProps) {
  const { listings } = useServiceListings();

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="page-title">Service Listing</h1>

          <div className="flex items-center gap-3">
            <select className="rounded-control border border-border bg-white px-3 py-2 text-sm font-medium text-body">
              <option>Filter</option>
            </select>
            <Link
              href="/service-listing/new"
              className="flex-1 rounded-control bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-strong sm:flex-none"
            >
              New Service
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="You don't have any active Service Listings?"
            description="Would you like to create service listings to enable customers to discover your company?"
            actionLabel="Create a New Service"
            actionHref="/service-listing/new"
          />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ServiceListingCard key={listing.id} listing={listing} categories={categories} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
