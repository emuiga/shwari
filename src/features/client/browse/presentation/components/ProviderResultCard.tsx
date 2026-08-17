import Link from 'next/link';
import type { ProviderSearchResult } from '@/features/client/browse/data/types';

interface ProviderResultCardProps {
  provider: ProviderSearchResult;
}

export default function ProviderResultCard({ provider }: ProviderResultCardProps) {
  return (
    <Link
      href={`/providers/${provider.id}`}
      className="flex h-full flex-col rounded-card border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-base font-semibold text-ink">{provider.businessName ?? 'Moving company'}</p>
        {provider.distanceKm != null && (
          <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-body">
            {provider.distanceKm.toFixed(1)} km away
          </span>
        )}
      </div>
      {provider.description && <p className="mt-1.5 text-sm text-subtle">{provider.description}</p>}
      {provider.verificationStatus && (
        <span className="mt-3 inline-block w-fit rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-emphasis">
          {provider.verificationStatus}
        </span>
      )}
    </Link>
  );
}
