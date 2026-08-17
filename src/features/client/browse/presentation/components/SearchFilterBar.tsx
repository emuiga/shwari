'use client';

import { useState } from 'react';
import { SearchIcon } from '@/components/icons';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';
import type { ProviderSearchParams } from '@/features/client/browse/data/types';

interface SearchFilterBarProps {
  categories: ServiceCategory[];
  onSearch: (params: ProviderSearchParams) => void;
  searching: boolean;
}

const RADIUS_OPTIONS = [5, 10, 20, 50];

export default function SearchFilterBar({ categories, onSearch, searching }: SearchFilterBarProps) {
  const [serviceType, setServiceType] = useState(categories[0]?.code ?? '');
  const [radiusKm, setRadiusKm] = useState(20);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function detectLocation() {
    if (!navigator.geolocation) {
      setError('Location detection is not supported on this browser.');
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setLocating(false);
      },
      () => {
        setError('Could not detect your location. Please allow location access and try again.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function handleSearch() {
    if (!serviceType) {
      setError('Choose a service type.');
      return;
    }
    if (!coords) {
      setError('Set your location to search nearby movers.');
      return;
    }
    setError(null);
    onSearch({ serviceType, latitude: coords.latitude, longitude: coords.longitude, radiusKm });
  }

  return (
    <div className="flex flex-col items-stretch gap-3 border-b border-border-soft bg-surface-muted px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-card border border-border bg-white p-3 shadow-sm sm:flex-row sm:items-center">
        <select
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value)}
          className="flex-1 rounded-control border border-border-strong px-3 py-2.5 text-sm text-ink focus:border-primary"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={detectLocation}
          disabled={locating}
          className="flex items-center justify-center gap-2 rounded-control border border-border-strong px-3 py-2.5 text-sm font-semibold text-body hover:bg-surface-muted disabled:opacity-50"
        >
          {locating ? 'Detecting…' : coords ? 'Location set ✓' : 'Use my location'}
        </button>

        <select
          value={radiusKm}
          onChange={(event) => setRadiusKm(Number(event.target.value))}
          className="rounded-control border border-border-strong px-3 py-2.5 text-sm text-ink focus:border-primary"
        >
          {RADIUS_OPTIONS.map((km) => (
            <option key={km} value={km}>
              Within {km} km
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-primary-strong disabled:opacity-50"
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          {searching ? 'Searching…' : 'Search'}
        </button>
      </div>

      {error && <p className="mx-auto text-xs text-danger">{error}</p>}
    </div>
  );
}
