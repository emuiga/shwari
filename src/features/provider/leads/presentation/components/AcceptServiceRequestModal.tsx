'use client';

import { XIcon } from '@/components/icons';
import type { Lead } from '@/features/provider/leads/presentation/lib/mockLeads';

interface AcceptServiceRequestModalProps {
  lead: Lead;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AcceptServiceRequestModal({ lead, onCancel, onConfirm }: AcceptServiceRequestModalProps) {
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

        <h2 className="text-lg font-bold text-gray-900">Accept Service Request</h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Ensure you have agreed on the amount of money that you will charge the client before moving. Ensure the date and time has been agreed.
        </p>

        <p className="mt-4 text-xs font-semibold text-gray-500">Clients moving date and time</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm font-medium text-gray-900">{lead.movingDate}</span>
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm font-medium text-gray-900">{lead.startTime}</span>
          <span className="text-xs text-gray-400">to</span>
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm font-medium text-gray-900">{lead.endTime}</span>
        </div>
        <p className="mt-1.5 text-xs text-gray-400">This information will be used to update your calendar for availability</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
