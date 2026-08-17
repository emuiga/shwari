'use client';

import { useState } from 'react';
import { SearchIcon } from '@/components/icons';
import LocationAutocomplete from '@/features/client/browse/presentation/components/LocationAutocomplete';
import MaskIcon from '@/components/MaskIcon';
import {
  countActiveFilters,
  defaultServiceFilters,
  type ServiceFilters,
} from '@/features/client/shared/presentation/lib/serviceFilters';

interface SearchFilterBarProps {
  filters: ServiceFilters;
  onFiltersChange: (filters: ServiceFilters) => void;
}

export default function SearchFilterBar({ filters, onFiltersChange }: SearchFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  return (
    <div className="relative flex flex-col items-stretch gap-3 border-b border-border-soft bg-surface-muted px-4 py-4 sm:flex-row sm:items-center sm:justify-center sm:px-6 sm:py-6">
      <div className="flex w-full flex-col rounded-card border border-border bg-white shadow-sm transition-shadow focus-within:shadow-md sm:max-w-2xl sm:flex-row sm:items-center">
        <LocationAutocomplete
          label="Moving From"
          placeholder="Search origin"
          dropdownHeading="Origin"
        />
        <div className="h-px w-full bg-gray-200 sm:h-9 sm:w-px" />
        <LocationAutocomplete
          label="Moving To"
          placeholder="Search destination"
          dropdownHeading="Destination"
        />
        <button
          type="button"
          className="m-2 flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-primary-strong sm:mr-2 sm:ml-0"
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          Search
        </button>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className={`relative flex w-full items-center justify-center gap-2 rounded-card border px-5 py-3.5 text-sm font-medium shadow-sm sm:w-auto ${
            activeCount > 0
              ? 'border-primary bg-primary-subtle text-primary-strong'
              : 'border-border bg-white text-body hover:bg-surface-muted'
          }`}
        >
          <MaskIcon
            label="Filters"
            maskClassName="[mask-image:url('/icons/filter.png')] [-webkit-mask-image:url('/icons/filter.png')]"
            className="h-4 w-4"
          />
          Filters
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>

        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10 cursor-default"
            />
            <div className="absolute right-0 z-20 mt-2 w-[calc(100vw-2rem)] max-w-72 rounded-card border border-border-soft bg-white p-4 shadow-lg">
              <label className="block text-xs font-semibold text-subtle uppercase">
                Price range
                <select
                  value={filters.priceRange}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      priceRange: event.target.value as ServiceFilters['priceRange'],
                    })
                  }
                  className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-sm font-normal text-body normal-case focus:border-primary"
                >
                  <option value="any">Any price</option>
                  <option value="under-25k">Under KES 25,000</option>
                  <option value="25k-40k">KES 25,000 – 40,000</option>
                  <option value="over-40k">Over KES 40,000</option>
                </select>
              </label>

              <label className="mt-4 block text-xs font-semibold text-subtle uppercase">
                Minimum rating
                <select
                  value={filters.minRating}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      minRating: event.target.value as ServiceFilters['minRating'],
                    })
                  }
                  className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-sm font-normal text-body normal-case focus:border-primary"
                >
                  <option value="any">Any rating</option>
                  <option value="4.5">4.5 stars & up</option>
                  <option value="4.0">4.0 stars & up</option>
                </select>
              </label>

              <label className="mt-4 block text-xs font-semibold text-subtle uppercase">
                Sort by
                <select
                  value={filters.sortBy}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      sortBy: event.target.value as ServiceFilters['sortBy'],
                    })
                  }
                  className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-sm font-normal text-body normal-case focus:border-primary"
                >
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top rated</option>
                </select>
              </label>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onFiltersChange(defaultServiceFilters)}
                  className="flex-1 rounded-control border border-border py-2 text-sm font-semibold text-body hover:bg-surface-muted"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-control bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-strong"
                >
                  Done
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
