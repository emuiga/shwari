'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import ServiceAddedModal from '@/features/provider/service-listing/presentation/components/ServiceAddedModal';
import ServiceListingForm, {
  fromFormValue,
  type ServiceListingFormValue,
} from '@/features/provider/service-listing/presentation/components/ServiceListingForm';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';

const EMPTY_FORM: ServiceListingFormValue = {
  categoryId: '',
  price: '',
  serviceAreas: [],
  locations: [],
  images: [],
};

export default function CreateServiceListingPage() {
  const router = useRouter();
  const { addListing } = useServiceListings();
  const [value, setValue] = useState<ServiceListingFormValue>(EMPTY_FORM);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit() {
    addListing(fromFormValue(value));
    setShowSuccess(true);
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
          <span className="text-gray-600">New Service</span>
        </nav>

        <h1 className="page-title mb-4">Create New Service Listing</h1>

        <div className="mx-auto max-w-3xl">
          <ServiceListingForm value={value} onChange={setValue} onSubmit={handleSubmit} submitLabel="Submit service listing" />
        </div>
      </main>

      {showSuccess && (
        <ServiceAddedModal
          onClose={() => router.push('/provider/service-listing')}
          onCreateAnother={() => {
            setValue(EMPTY_FORM);
            setShowSuccess(false);
          }}
        />
      )}
    </div>
  );
}
