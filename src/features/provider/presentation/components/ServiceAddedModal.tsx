'use client';

import { CheckCircleIcon, XIcon } from '@/features/dashboard/presentation/components/icons';

interface ServiceAddedModalProps {
  onClose: () => void;
  onCreateAnother: () => void;
}

export default function ServiceAddedModal({ onClose, onCreateAnother }: ServiceAddedModalProps) {
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

        <h2 className="mt-4 text-lg font-bold text-gray-900">Service added successfully</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your new service listing has been added to the system successfully. Would you like to add another
          service?
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
            New Service
          </button>
        </div>
      </div>
    </div>
  );
}
