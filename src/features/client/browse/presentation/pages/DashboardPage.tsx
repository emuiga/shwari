'use client';

import { useState } from 'react';
import CompareTray from '@/features/client/shared/presentation/components/CompareTray';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import SearchFilterBar from '@/features/client/browse/presentation/components/SearchFilterBar';
import ServiceSection from '@/features/client/browse/presentation/components/ServiceSection';
import { serviceSections } from '@/features/client/shared/presentation/lib/mockServices';
import {
  applyServiceFilters,
  defaultServiceFilters,
} from '@/features/client/shared/presentation/lib/serviceFilters';

export default function DashboardPage() {
  const [filters, setFilters] = useState(defaultServiceFilters);
  const filteredSections = applyServiceFilters(serviceSections, filters);

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />
      <SearchFilterBar filters={filters} onFiltersChange={setFilters} />

      <main className="px-6">
        {filteredSections.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
            <p className="text-sm text-gray-500">No services match these filters.</p>
          </div>
        ) : (
          filteredSections.map((section) => <ServiceSection key={section.id} section={section} />)
        )}
      </main>

      <CompareTray />
    </div>
  );
}
