'use client';

import { useState } from 'react';
import { searchLocations } from '@/features/dashboard/presentation/lib/locations';

interface LocationAutocompleteProps {
  label: string;
  dropdownHeading: string;
  placeholder: string;
}

export default function LocationAutocomplete({
  label,
  dropdownHeading,
  placeholder,
}: LocationAutocompleteProps) {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = searchLocations(value);

  return (
    <div className="relative flex-1 px-6 py-3">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        placeholder={placeholder}
        className="mt-0.5 w-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
          <p className="px-4 pb-1 text-xs font-semibold text-gray-400">{dropdownHeading}</p>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setValue(suggestion);
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
  );
}
