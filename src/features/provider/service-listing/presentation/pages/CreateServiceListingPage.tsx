'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import ServiceAddedModal from '@/features/provider/service-listing/presentation/components/ServiceAddedModal';
import ServiceListingForm, {
  toCreateRequest,
  type ServiceListingFormValue,
} from '@/features/provider/service-listing/presentation/components/ServiceListingForm';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { ApiError } from '@/features/auth/data/authApi';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';

const EMPTY_FORM: ServiceListingFormValue = {
  categoryCode: '',
  description: '',
  priceFrom: '',
  priceTo: '',
  serviceAreas: [],
  active: true,
  mediaIds: [],
};

interface CreateServiceListingPageProps {
  categories: ServiceCategory[];
}

export default function CreateServiceListingPage({ categories }: CreateServiceListingPageProps) {
  const router = useRouter();
  const { addListing } = useServiceListings();
  const [value, setValue] = useState<ServiceListingFormValue>(EMPTY_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await addListing(toCreateRequest(value));
      setShowSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <nav className="mb-6 text-xs text-faint">
          <Link href="/service-listing" className="hover:text-body">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-body">New Service</span>
        </nav>

        <h1 className="page-title mb-4">Create New Service Listing</h1>

        <div className="mx-auto max-w-3xl">
          {error && <p className="mb-3 text-sm text-danger">{error}</p>}
          <ServiceListingForm
            mode="create"
            categories={categories}
            value={value}
            onChange={setValue}
            onSubmit={handleSubmit}
            submitLabel="Submit service listing"
            submitting={submitting}
          />
        </div>
      </main>

      {showSuccess && (
        <ServiceAddedModal
          onClose={() => router.push('/service-listing')}
          onCreateAnother={() => {
            setValue(EMPTY_FORM);
            setShowSuccess(false);
          }}
        />
      )}
    </div>
  );
}
