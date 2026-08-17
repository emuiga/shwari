'use client';

import Image from 'next/image';
import Link from 'next/link';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import { ContactIcon } from '@/components/icons';
import { useCompare } from '@/features/client/saved/presentation/context/CompareContext';
import { locationLabel } from '@/lib/locations';
import { formatKes } from '@/features/client/shared/presentation/lib/mockServices';

export default function CompareServicesPage() {
  const { compareServices, removeFromCompare } = useCompare();

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="px-6 py-6">
        <nav className="mb-6 text-xs text-faint">
          <Link href="/dashboard" className="hover:text-body">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-body">Compare</span>
        </nav>

        {compareServices.length < 2 ? (
          <div className="rounded-card border border-border py-16 text-center">
            <p className="text-sm text-subtle">
              {compareServices.length === 0
                ? "You haven't added any services to compare yet."
                : 'Add at least one more service to see a comparison.'}
            </p>
            <Link
              href="/dashboard"
              className="mt-3 inline-block text-sm font-semibold text-primary-strong hover:underline"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <div
            className={`grid gap-x-6 gap-y-8 ${
              compareServices.length >= 3
                ? 'grid-cols-[160px_repeat(3,1fr)]'
                : compareServices.length === 2
                  ? 'grid-cols-[160px_repeat(2,1fr)]'
                  : 'grid-cols-[160px_repeat(1,1fr)]'
            }`}
          >
            <div />
            {compareServices.map((service) => (
              <div key={service.id} className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}

            <p className="self-center text-sm font-semibold text-ink">Service Price</p>
            {compareServices.map((service) => (
              <p key={service.id} className="self-center text-sm text-body">
                {formatKes(service.price)}
              </p>
            ))}

            <p className="self-center text-sm font-semibold text-ink">Service Providers</p>
            {compareServices.map((service) => (
              <p key={service.id} className="self-center text-sm text-body">
                {service.description}
              </p>
            ))}

            <p className="self-center text-sm font-semibold text-ink">Service Type</p>
            {compareServices.map((service) => (
              <p key={service.id} className="self-center text-sm text-body">
                {service.description}
              </p>
            ))}

            <p className="self-start text-sm font-semibold text-ink">Locations</p>
            {compareServices.map((service) => (
              <div key={service.id} className="flex flex-wrap gap-1.5">
                {service.locations.map((location) => (
                  <span
                    key={location}
                    className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-body"
                  >
                    {locationLabel(location)}
                  </span>
                ))}
              </div>
            ))}

            <p className="self-start text-sm font-semibold text-ink">Actions</p>
            {compareServices.map((service) => (
              <div key={service.id} className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
                >
                  <ContactIcon className="h-4 w-4" />
                  Contact Provider
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCompare(service.id)}
                  className="rounded-control border border-red-400 py-2 text-sm font-semibold text-danger hover:bg-danger-soft"
                >
                  Remove from comparison
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
