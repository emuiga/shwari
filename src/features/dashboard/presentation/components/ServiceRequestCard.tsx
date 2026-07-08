import Image from 'next/image';
import Link from 'next/link';
import {
  STATUS_ACTION_LABEL,
  STATUS_SECONDARY_ACTION_LABEL,
  STATUS_STYLES,
  type ServiceRequest,
} from '@/features/dashboard/presentation/lib/serviceRequests';

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

export default function ServiceRequestCard({ request }: ServiceRequestCardProps) {
  const secondaryAction = STATUS_SECONDARY_ACTION_LABEL[request.status];
  const primaryHref = request.status === 'Draft' ? '/service-requests/new' : '#';

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
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
        <p className="text-sm font-semibold text-gray-900">{request.title}</p>
        <p className="mt-0.5 text-xs text-gray-400">{request.requestDate}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <span className="rounded-full bg-gray-100 px-2.5 py-1">{request.origin}</span>
          <span className="text-gray-300">—</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1">{request.destination}</span>
        </div>

        <p className="mt-2 text-xs text-gray-500">{request.description}</p>

        <span
          className={`mt-3 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[request.status]}`}
        >
          {request.status}
        </span>

        <div className="mt-3 flex flex-col gap-2">
          <Link
            href={primaryHref}
            className="flex items-center justify-center rounded-md border border-green-500 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            {STATUS_ACTION_LABEL[request.status]}
          </Link>
          {secondaryAction && (
            <button
              type="button"
              className="flex items-center justify-center rounded-md border border-green-500 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
            >
              {secondaryAction}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
