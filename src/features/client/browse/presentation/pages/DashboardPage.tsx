'use client';

import { useState } from 'react';
import CompareTray from '@/features/client/shared/presentation/components/CompareTray';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import SearchFilterBar from '@/features/client/browse/presentation/components/SearchFilterBar';
import FiltersMenu from '@/features/client/browse/presentation/components/FiltersMenu';
import ServiceSection from '@/features/client/browse/presentation/components/ServiceSection';
import ProviderResultCard from '@/features/client/browse/presentation/components/ProviderResultCard';
import { searchProviders } from '@/features/client/browse/data/providersApi';
import { serviceSections } from '@/features/client/shared/presentation/lib/mockServices';
import { applyServiceFilters, defaultServiceFilters } from '@/features/client/shared/presentation/lib/serviceFilters';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';
import type { ProviderSearchParams, ProviderSearchResult } from '@/features/client/browse/data/types';

interface DashboardPageProps {
  categories: ServiceCategory[];
}

export default function DashboardPage({ categories }: DashboardPageProps) {
  const [results, setResults] = useState<ProviderSearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(defaultServiceFilters);
  const filteredSections = applyServiceFilters(serviceSections, filters);

  async function handleSearch(params: ProviderSearchParams) {
    setSearching(true);
    setError(null);
    try {
      const found = await searchProviders(params);
      setResults(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />
      <SearchFilterBar categories={categories} onSearch={handleSearch} searching={searching} />

      <main className="px-6">
        {error && <p className="mt-6 text-center text-sm text-danger">{error}</p>}

        {results ? (
          results.length === 0 ? (
            <div className="mt-10 rounded-card border border-border py-16 text-center">
              <p className="text-sm text-subtle">No movers found nearby for this service. Try a wider radius.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((provider) => (
                <ProviderResultCard key={provider.id} provider={provider} />
              ))}
            </div>
          )
        ) : (
          <>
            <div className="flex justify-end pt-4">
              <FiltersMenu filters={filters} onFiltersChange={setFilters} />
            </div>
            {filteredSections.length === 0 ? (
              <div className="mt-10 rounded-card border border-border py-16 text-center">
                <p className="text-sm text-subtle">No services match these filters.</p>
              </div>
            ) : (
              filteredSections.map((section) => <ServiceSection key={section.id} section={section} />)
            )}
          </>
        )}
      </main>

      <CompareTray />
    </div>
  );
}
