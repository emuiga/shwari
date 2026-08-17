'use client';

import { XIcon } from '@/components/icons';

interface CancelSubscriptionModalProps {
  planName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CancelSubscriptionModal({ planName, onCancel, onConfirm }: CancelSubscriptionModalProps) {
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

        <h2 className="text-lg font-bold text-danger">Are you sure you want to cancel your subscription?</h2>
        <p className="mt-1.5 text-sm text-ink">
          You will lose access to the benefits of the {planName} at the end of your current billing cycle.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-control border border-border py-2.5 text-sm font-semibold text-body hover:border-primary hover:bg-primary-subtle hover:text-primary-strong"
          >
            Keep Subscription
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-control bg-danger py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
