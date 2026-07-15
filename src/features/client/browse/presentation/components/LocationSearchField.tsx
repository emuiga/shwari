'use client';

import { useState } from 'react';
import { SearchIcon, XIcon } from '@/components/icons';
import { searchLocations } from '@/lib/locations';

interface LocationSearchFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function LocationSearchField({ label, value, onChange }: LocationSearchFieldProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = searchLocations(query);

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <div className="relative mt-1">
        <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
          <SearchIcon className="h-4 w-4 shrink-0 text-gray-400" />
          {value && (
            <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                onClick={() => onChange('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 100)}
            placeholder={value ? '' : 'Search location'}
            className="min-w-[80px] flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute left-0 top-full z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
            {suggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(suggestion);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
