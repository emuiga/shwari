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
    <div className="flex flex-col rounded-card border border-border-soft bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-muted">
          <Image src={lead.avatarSrc} alt="" fill sizes="36px" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{lead.customerName}</p>
          <p className="text-xs text-faint">{lead.memberSince}</p>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-ink">{lead.service}</p>
      <p className="text-xs text-faint">{lead.requestedAt}</p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-body">
        <span className="rounded-full bg-surface-muted px-2.5 py-1">{lead.fromLocation}</span>
        <span className="text-faint">—</span>
        <span className="rounded-full bg-surface-muted px-2.5 py-1">{lead.toLocation}</span>
      </div>

      <p className="mt-2 text-sm text-body">{lead.description}</p>

      <div className="mt-4 space-y-2">
        {lead.status === 'pending' ? (
          <>
            <Link
              href="/messages"
              className="flex w-full items-center justify-center gap-2 rounded-control border border-border py-2.5 text-sm font-semibold text-body hover:border-primary hover:bg-primary-subtle hover:text-primary-strong"
            >
              <PaperPlaneIcon className="h-4 w-4" />
              Message Lead
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onDecline(lead)}
                className="flex-1 rounded-control py-2.5 text-sm font-semibold text-danger hover:bg-danger-soft"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => onAccept(lead)}
                className="flex-1 rounded-control bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
              >
                Accept
              </button>
            </div>
          </>
        ) : lead.status === 'completed' ? (
          <Link
            href={`/leads/${lead.id}/review`}
            className="flex w-full items-center justify-center rounded-control border border-primary py-2.5 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            View Review
          </Link>
        ) : (
          <Link
            href="/messages"
            className="flex w-full items-center justify-center gap-2 rounded-control bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
          >
            <PaperPlaneIcon className="h-4 w-4" />
            Message Lead
          </Link>
        )}
      </div>
    </div>
  );
}
