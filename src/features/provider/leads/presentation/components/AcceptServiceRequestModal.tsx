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
      <div className="relative w-full max-w-md rounded-card bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="absolute right-4 top-4 text-faint hover:text-body"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-ink">Accept Service Request</h2>
        <p className="mt-1.5 text-sm text-subtle">
          Ensure you have agreed on the amount of money that you will charge the client before moving. Ensure the date and time has been agreed.
        </p>

        <p className="mt-4 text-xs font-semibold text-subtle">Clients moving date and time</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="rounded-control border border-border bg-surface-muted px-2.5 py-1.5 text-sm font-medium text-ink">{lead.movingDate}</span>
          <span className="rounded-control border border-border bg-surface-muted px-2.5 py-1.5 text-sm font-medium text-ink">{lead.startTime}</span>
          <span className="text-xs text-faint">to</span>
          <span className="rounded-control border border-border bg-surface-muted px-2.5 py-1.5 text-sm font-medium text-ink">{lead.endTime}</span>
        </div>
        <p className="mt-1.5 text-xs text-faint">This information will be used to update your calendar for availability</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-control border border-border py-2.5 text-sm font-semibold text-body hover:border-primary hover:bg-primary-subtle hover:text-primary-strong"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-control bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
