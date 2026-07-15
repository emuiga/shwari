import Image from 'next/image';
import Link from 'next/link';
import { PaperPlaneIcon } from '@/components/icons';
import type { Lead } from '@/features/provider/leads/presentation/lib/mockLeads';

interface LeadCardProps {
  lead: Lead;
  onAccept: (lead: Lead) => void;
  onDecline: (lead: Lead) => void;
}

export default function LeadCard({ lead, onAccept, onDecline }: LeadCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image src={lead.avatarSrc} alt="" fill sizes="36px" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{lead.customerName}</p>
          <p className="text-xs text-gray-400">{lead.memberSince}</p>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-gray-900">{lead.service}</p>
      <p className="text-xs text-gray-400">{lead.requestedAt}</p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-gray-600">
        <span className="rounded-full bg-gray-100 px-2.5 py-1">{lead.fromLocation}</span>
        <span className="text-gray-400">—</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1">{lead.toLocation}</span>
      </div>

      <p className="mt-2 text-sm text-gray-600">{lead.description}</p>

      <div className="mt-4 space-y-2">
        {lead.status === 'pending' ? (
          <>
            <Link
              href="/provider/messages"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
            >
              <PaperPlaneIcon className="h-4 w-4" />
              Message Lead
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onDecline(lead)}
                className="flex-1 rounded-md py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => onAccept(lead)}
                className="flex-1 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
              >
                Accept
              </button>
            </div>
          </>
        ) : lead.status === 'completed' ? (
          <Link
            href={`/provider/leads/${lead.id}/review`}
            className="flex w-full items-center justify-center rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            View Review
          </Link>
        ) : (
          <Link
            href="/provider/messages"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
          >
            <PaperPlaneIcon className="h-4 w-4" />
            Message Lead
          </Link>
        )}
      </div>
    </div>
  );
}
