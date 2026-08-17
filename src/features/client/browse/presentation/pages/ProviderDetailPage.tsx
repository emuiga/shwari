import { notFound } from 'next/navigation';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import BackButton from '@/components/ui/BackButton';
import { formatDayGroupLabel, formatHoursRange, groupOperatingHours } from '@/features/provider/shared/presentation/lib/operatingHours';
import type { ProviderPublicProfile } from '@/features/client/browse/data/types';

interface ProviderDetailPageProps {
  provider: ProviderPublicProfile | null;
}

export default function ProviderDetailPage({ provider }: ProviderDetailPageProps) {
  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="page-title truncate">{provider.businessName ?? 'Moving company'}</h1>
          <BackButton href="/dashboard" className="shrink-0" />
        </div>

        {provider.verificationStatus && (
          <span className="mb-4 inline-block rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-emphasis">
            {provider.verificationStatus}
          </span>
        )}

        {provider.description && <p className="text-sm text-body">{provider.description}</p>}

        {provider.latitude != null && provider.longitude != null && (
          <p className="mt-4 text-xs text-faint">
            Location: {provider.latitude.toFixed(4)}, {provider.longitude.toFixed(4)}
          </p>
        )}

        {provider.operatingHours && Object.keys(provider.operatingHours).length > 0 && (
          <div className="mt-6 border-t border-border-soft pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">Operating hours</p>
            <ul className="mt-2 space-y-1.5">
              {groupOperatingHours(provider.operatingHours).map((group) => (
                <li key={group.days[0]} className="flex justify-between text-sm text-body">
                  <span>{formatDayGroupLabel(group.days)}</span>
                  <span className="font-medium text-ink">{formatHoursRange(group.range)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
