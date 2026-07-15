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
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-red-600">Are you sure you want to cancel your subscription?</h2>
        <p className="mt-1.5 text-sm text-gray-900">
          You will lose access to the benefits of the {planName} at the end of your current billing cycle.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            Keep Subscription
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
