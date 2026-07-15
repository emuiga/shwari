'use client';

import { CheckCircleIcon, XIcon } from '@/components/icons';

interface ServiceRequestSuccessModalProps {
  onClose: () => void;
  onCreateAnother: () => void;
}

export default function ServiceRequestSuccessModal({
  onClose,
  onCreateAnother,
}: ServiceRequestSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500">
          <CheckCircleIcon className="h-8 w-8 text-green-500" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">Service Request created successfully</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your request has been added to the system successfully. You will be notified when a service
          provider has been mapped to your service request. Would you like to create another request?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onCreateAnother}
            className="flex-1 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
          >
            New Service Request
          </button>
        </div>
      </div>
    </div>
  );
}
