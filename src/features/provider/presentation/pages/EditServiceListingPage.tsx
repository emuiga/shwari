'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProviderHeader from '@/features/provider/presentation/components/ProviderHeader';
import ServiceListingForm, {
  fromFormValue,
  toFormValue,
  type ServiceListingFormValue,
} from '@/features/provider/presentation/components/ServiceListingForm';
import { useServiceListings } from '@/features/provider/presentation/context/ServiceListingsContext';

interface EditServiceListingPageProps {
  id: string;
}

export default function EditServiceListingPage({ id }: EditServiceListingPageProps) {
  const router = useRouter();
  const { getById, updateListing } = useServiceListings();
  const listing = getById(id);
  if (!listing) {
    notFound();
  }

  const [value, setValue] = useState<ServiceListingFormValue>(toFormValue(listing));

  function handleSubmit() {
    updateListing(id, fromFormValue(value));
    router.push(`/provider/service-listing/${id}`);
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <nav className="mb-6 text-xs text-gray-400">
          <Link href="/provider/service-listing" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">New Role</span>
        </nav>

        <h1 className="mb-4 text-lg font-bold text-gray-900">Edit Service Listing</h1>

        <div className="mx-auto max-w-3xl">
          <ServiceListingForm value={value} onChange={setValue} onSubmit={handleSubmit} submitLabel="Save Details" />
        </div>
      </main>
    </div>
  );
}
