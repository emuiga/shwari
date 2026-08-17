'use client';

import { useState } from 'react';

interface QuickSelectOption {
  label: string;
  values: string[];
}

interface TagAutocompleteProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions: (query: string) => string[];
  placeholder?: string;
  quickSelect?: QuickSelectOption;
  disabled?: boolean;
}

export default function TagAutocomplete({
  label,
  values,
  onChange,
  suggestions,
  placeholder = 'Search…',
  quickSelect,
  disabled = false,
}: TagAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = suggestions(query).filter((option) => !values.includes(option));
  const quickSelectApplied = quickSelect ? quickSelect.values.every((value) => values.includes(value)) : false;

  function addValue(value: string) {
    onChange([...values, value]);
    setQuery('');
  }

  function applyQuickSelect() {
    if (!quickSelect) return;
    const merged = [...values, ...quickSelect.values.filter((value) => !values.includes(value))];
    onChange(merged);
    setQuery('');
    setIsOpen(false);
  }

  function removeValue(value: string) {
    onChange(values.filter((current) => current !== value));
  }

  function clearAll() {
    onChange([]);
    setQuery('');
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-subtle">{label}</label>
        {values.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-faint hover:text-danger"
          >
            Clear
          </button>
        )}
      </div>
      <div
        className={`mt-1 flex flex-wrap items-center gap-1.5 rounded-control border border-border px-2 py-1.5 ${
          disabled ? 'bg-surface-muted' : 'bg-surface-muted'
        }`}
      >
        {values.map((value) => (
          <span
            key={value}
            className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-body shadow-sm"
          >
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => removeValue(value)}
              className="text-faint hover:text-body"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={query}
          disabled={disabled}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          placeholder={values.length === 0 ? placeholder : ''}
          className="min-w-[80px] flex-1 bg-transparent px-1 py-1 text-sm text-ink placeholder:text-faint disabled:cursor-not-allowed disabled:text-faint"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`h-4 w-4 shrink-0 text-faint transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {!disabled && isOpen && (quickSelect || options.length > 0) && (
        <div className="absolute left-0 top-full z-30 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-border bg-white py-2 shadow-lg">
          {quickSelect && (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={applyQuickSelect}
              disabled={quickSelectApplied}
              className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-primary-strong hover:bg-primary-subtle disabled:cursor-not-allowed disabled:text-faint disabled:hover:bg-transparent"
            >
              {quickSelect.label}
              {quickSelectApplied && <span className="text-xs font-normal text-faint">All added</span>}
            </button>
          )}
          {quickSelect && options.length > 0 && <div className="my-1 border-t border-border-soft" />}
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => addValue(option)}
              className="block w-full px-4 py-2 text-left text-sm text-body hover:bg-surface-muted"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
