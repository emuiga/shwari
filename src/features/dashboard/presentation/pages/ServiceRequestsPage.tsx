'use client';

import Link from 'next/link';
import { useState } from 'react';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import { PlusIcon } from '@/features/dashboard/presentation/components/icons';
import ServiceRequestCard from '@/features/dashboard/presentation/components/ServiceRequestCard';
import { useServiceRequests } from '@/features/dashboard/presentation/context/ServiceRequestsContext';
import type { ServiceRequestStatus } from '@/features/dashboard/presentation/lib/serviceRequests';

const STATUS_FILTERS: Array<ServiceRequestStatus | 'All'> = [
  'All',
  'Completed',
  'Draft',
  'Active',
  'Expired',
  'Reviewed',
  'Incomplete',
];

export default function ServiceRequestsPage() {
  const { requests } = useServiceRequests();
  const [statusFilter, setStatusFilter] = useState<ServiceRequestStatus | 'All'>('All');

  const filteredRequests =
    statusFilter === 'All' ? requests : requests.filter((request) => request.status === statusFilter);

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />
      <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Service Requests</h1>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as ServiceRequestStatus | 'All')}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none"
          >
            {STATUS_FILTERS.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'Request status' : status}
              </option>
            ))}
          </select>

          <Link
            href="/service-requests/new"
            className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
          >
            <PlusIcon className="h-4 w-4" />
            New Service Request
          </Link>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">No service requests match this status.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredRequests.map((request) => (
            <ServiceRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
      </main>
    </div>
  );
}
