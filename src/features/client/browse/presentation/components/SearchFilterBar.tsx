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
    <div className="relative flex flex-col items-stretch gap-3 border-b border-gray-100 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-center sm:px-6 sm:py-6">
      <div className="flex w-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow focus-within:shadow-md sm:max-w-2xl sm:flex-row sm:items-center">
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
          className="m-2 flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-green-600 sm:mr-2 sm:ml-0"
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          Search
        </button>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className={`relative flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-medium shadow-sm sm:w-auto ${
            activeCount > 0
              ? 'border-green-500 bg-green-50 text-green-600'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MaskIcon
            label="Filters"
            maskClassName="[mask-image:url('/icons/filter.png')] [-webkit-mask-image:url('/icons/filter.png')]"
            className="h-4 w-4"
          />
          Filters
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-semibold text-white">
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
            <div className="absolute right-0 z-20 mt-2 w-[calc(100vw-2rem)] max-w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
              <label className="block text-xs font-semibold text-gray-500 uppercase">
                Price range
                <select
                  value={filters.priceRange}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      priceRange: event.target.value as ServiceFilters['priceRange'],
                    })
                  }
                  className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal text-gray-700 normal-case focus:border-green-500 focus:outline-none"
                >
                  <option value="any">Any price</option>
                  <option value="under-25k">Under KES 25,000</option>
                  <option value="25k-40k">KES 25,000 – 40,000</option>
                  <option value="over-40k">Over KES 40,000</option>
                </select>
              </label>

              <label className="mt-4 block text-xs font-semibold text-gray-500 uppercase">
                Minimum rating
                <select
                  value={filters.minRating}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      minRating: event.target.value as ServiceFilters['minRating'],
                    })
                  }
                  className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal text-gray-700 normal-case focus:border-green-500 focus:outline-none"
                >
                  <option value="any">Any rating</option>
                  <option value="4.5">4.5 stars & up</option>
                  <option value="4.0">4.0 stars & up</option>
                </select>
              </label>

              <label className="mt-4 block text-xs font-semibold text-gray-500 uppercase">
                Sort by
                <select
                  value={filters.sortBy}
                  onChange={(event) =>
                    onFiltersChange({
                      ...filters,
                      sortBy: event.target.value as ServiceFilters['sortBy'],
                    })
                  }
                  className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal text-gray-700 normal-case focus:border-green-500 focus:outline-none"
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
                  className="flex-1 rounded-md border border-gray-200 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-md bg-green-500 py-2 text-sm font-semibold text-white hover:bg-green-600"
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
