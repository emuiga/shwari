'use client';

import { useState } from 'react';

interface TagAutocompleteProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions: (query: string) => string[];
  placeholder?: string;
}

export default function TagAutocomplete({
  label,
  values,
  onChange,
  suggestions,
  placeholder = 'Search…',
}: TagAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = suggestions(query).filter((option) => !values.includes(option));

  function addValue(value: string) {
    onChange([...values, value]);
    setQuery('');
  }

  function removeValue(value: string) {
    onChange(values.filter((current) => current !== value));
  }

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-gray-500">{label}</label>
      <div className="mt-1 flex flex-wrap items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
        {values.map((value) => (
          <span
            key={value}
            className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm"
          >
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => removeValue(value)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          placeholder={values.length === 0 ? placeholder : ''}
          className="min-w-[80px] flex-1 bg-transparent px-1 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute left-0 top-full z-30 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => addValue(option)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
