import Image from 'next/image';
import Link from 'next/link';
import {
  STATUS_ACTION_LABEL,
  STATUS_SECONDARY_ACTION_LABEL,
  STATUS_STYLES,
  type ServiceRequest,
} from '@/features/client/requests/presentation/lib/serviceRequests';

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

export default function ServiceRequestCard({ request }: ServiceRequestCardProps) {
  const secondaryAction = STATUS_SECONDARY_ACTION_LABEL[request.status];
  const primaryHref = request.status === 'Draft' ? '/service-requests/new' : '#';

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-border bg-white">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={request.images[0]}
          alt={request.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-ink">{request.title}</p>
        <p className="mt-0.5 text-xs text-faint">{request.requestDate}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-body">
          <span className="rounded-full bg-surface-muted px-2.5 py-1">{request.origin}</span>
          <span className="text-gray-300">—</span>
          <span className="rounded-full bg-surface-muted px-2.5 py-1">{request.destination}</span>
        </div>

        <p className="mt-2 text-xs text-subtle">{request.description}</p>

        <span
          className={`mt-3 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[request.status]}`}
        >
          {request.status}
        </span>

        <div className="mt-3 flex flex-col gap-2">
          <Link
            href={primaryHref}
            className="flex items-center justify-center rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            {STATUS_ACTION_LABEL[request.status]}
          </Link>
          {secondaryAction && (
            <button
              type="button"
              className="flex items-center justify-center rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
            >
              {secondaryAction}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
