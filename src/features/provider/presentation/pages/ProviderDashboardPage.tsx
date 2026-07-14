'use client';

import ProviderHeader from '@/features/provider/presentation/components/ProviderHeader';
import { useServiceListings } from '@/features/provider/presentation/context/ServiceListingsContext';

export default function ProviderDashboardPage() {
  const { listings } = useServiceListings();

  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
            <p className="mt-1 text-sm text-gray-500">Active Service Listings</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="mt-1 text-sm text-gray-500">New Leads</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="mt-1 text-sm text-gray-500">Unread Messages</p>
          </div>
        </div>
      </main>
    </div>
  );
}
