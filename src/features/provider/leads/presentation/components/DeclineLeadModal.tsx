'use client';

import { XIcon } from '@/components/icons';
import type { Lead } from '@/features/provider/leads/presentation/lib/mockLeads';

interface DeclineLeadModalProps {
  lead: Lead;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeclineLeadModal({ lead, onCancel, onConfirm }: DeclineLeadModalProps) {
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

        <h2 className="text-lg font-bold text-red-600">Decline this service request?</h2>
        <p className="mt-1.5 text-sm text-gray-900">
          {lead.customerName}&apos;s request for {lead.service} will be reassigned to another service provider.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            Keep Request
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Decline Request
          </button>
        </div>
      </div>
    </div>
  );
}
