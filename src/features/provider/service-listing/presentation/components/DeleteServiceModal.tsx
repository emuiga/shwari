'use client';

import { XIcon } from '@/components/icons';
import type { ProviderService } from '@/features/provider/shared/data/types';

interface DeleteServiceModalProps {
  listing: ProviderService;
  onCancel: () => void;
  onConfirm: () => void;
  deleting?: boolean;
}

export default function DeleteServiceModal({ listing, onCancel, onConfirm, deleting }: DeleteServiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-card bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="absolute right-4 top-4 text-faint hover:text-body"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-danger">Are you sure you want to delete this service?</h2>
        <p className="mt-1.5 text-sm text-ink">Upon deletion this service will not be available to customers for viewing.</p>

        <p className="mt-4 text-sm font-semibold text-ink">{listing.categoryName}</p>

        <p className="mt-3 text-xs font-semibold text-subtle">Service Areas</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {(listing.serviceAreas ?? []).map((area) => (
            <span key={area} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-body">
              {area}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 rounded-control border border-border py-2.5 text-sm font-semibold text-body hover:border-primary hover:bg-primary-subtle hover:text-primary-strong disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 rounded-control bg-danger py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
