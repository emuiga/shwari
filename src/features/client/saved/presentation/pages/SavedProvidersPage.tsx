'use client';

import Link from 'next/link';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import SavedProviderCard from '@/features/client/saved/presentation/components/SavedProviderCard';
import { useSavedServices } from '@/features/client/saved/presentation/context/SavedServicesContext';
import { getAllServices } from '@/features/client/shared/presentation/lib/mockServices';

export default function SavedProvidersPage() {
  const { savedIds, removeSaved, clearSaved } = useSavedServices();
  const savedServices = getAllServices().filter((service) => savedIds.includes(service.id));

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink">My Saved Providers</h1>
          {savedServices.length > 0 && (
            <button
              type="button"
              onClick={clearSaved}
              className="text-sm font-medium text-primary-strong hover:underline"
            >
              Remove all from the list
            </button>
          )}
        </div>

        {savedServices.length === 0 ? (
          <div className="mt-10 rounded-card border border-border py-16 text-center">
            <p className="text-sm text-subtle">You haven&apos;t saved any providers yet.</p>
            <Link
              href="/dashboard"
              className="mt-3 inline-block text-sm font-semibold text-primary-strong hover:underline"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {savedServices.map((service) => (
              <SavedProviderCard key={service.id} service={service} onRemove={removeSaved} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
