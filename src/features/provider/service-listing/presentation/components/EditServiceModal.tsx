'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { XIcon } from '@/components/icons';
import ServiceListingForm, {
  toFormValue,
  toUpdateRequest,
  type ServiceListingFormValue,
} from '@/features/provider/service-listing/presentation/components/ServiceListingForm';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { ApiError } from '@/features/auth/data/authApi';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';
import type { ProviderService } from '@/features/provider/shared/data/types';

interface EditServiceModalProps {
  listing: ProviderService;
  categories: ServiceCategory[];
  onClose: () => void;
}

export default function EditServiceModal({ listing, categories, onClose }: EditServiceModalProps) {
  const { updateListing } = useServiceListings();
  const [value, setValue] = useState<ServiceListingFormValue>(toFormValue(listing));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await updateListing(listing.id, toUpdateRequest(value));
      toast.success('Service Updated Successfully', {
        description: 'Your service listing has been updated successfully.',
      });
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8">
      <div className="relative w-full max-w-xl rounded-card bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-faint hover:text-body"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-ink">Edit Service</h2>

        {error && <p className="mt-2 text-sm text-danger">{error}</p>}

        <ServiceListingForm
          mode="edit"
          categories={categories}
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          submitLabel="Save Details"
          submitting={submitting}
        />
      </div>
    </div>
  );
}
