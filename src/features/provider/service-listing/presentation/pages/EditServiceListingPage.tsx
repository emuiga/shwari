'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import ServiceListingForm, {
  fromFormValue,
  toFormValue,
  type ServiceListingFormValue,
} from '@/features/provider/service-listing/presentation/components/ServiceListingForm';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';

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
    toast.success('Request Updated Successfully', {
      description: 'Your request has been updated successfully.',
    });
    router.push(`/provider/service-listing/${id}`);
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <nav className="mb-6 text-xs text-gray-400">
          <Link href="/provider/service-listing" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">Edit Service</span>
        </nav>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="page-title truncate">Edit Service Listing</h1>
          <BackButton href={`/provider/service-listing/${id}`} className="shrink-0" />
        </div>

        <div className="mx-auto max-w-3xl">
          <ServiceListingForm value={value} onChange={setValue} onSubmit={handleSubmit} submitLabel="Save Details" />
        </div>
      </main>
    </div>
  );
}
