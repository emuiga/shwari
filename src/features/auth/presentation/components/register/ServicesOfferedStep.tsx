'use client';

import { MAX_COMPANY_DESCRIPTION_LENGTH, type ServicesOffered } from '@/features/auth/presentation/lib/businessProfile';
import { SERVICE_CATEGORIES } from '@/features/provider/service-listing/presentation/lib/serviceCategories';

interface ServicesOfferedStepProps {
  services: ServicesOffered;
  onChange: (services: ServicesOffered) => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export default function ServicesOfferedStep({
  services,
  onChange,
  onPrevious,
  onSubmit,
}: ServicesOfferedStepProps) {
  const canSubmit = services.categoryIds.length > 0 && services.description.trim() !== '';

  function toggleCategory(id: string) {
    const categoryIds = services.categoryIds.includes(id)
      ? services.categoryIds.filter((current) => current !== id)
      : [...services.categoryIds, id];
    onChange({ ...services, categoryIds });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Set up your business profile</h2>
        <p className="text-sm text-gray-500">Please provide the following information about your business.</p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">What services do you offer?</p>
        <div className="flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                services.categoryIds.includes(category.id)
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="company-description" className="mb-1 block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          id="company-description"
          value={services.description}
          maxLength={MAX_COMPANY_DESCRIPTION_LENGTH}
          onChange={(event) => onChange({ ...services, description: event.target.value })}
          placeholder="Type a message here"
          rows={4}
          className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-gray-400">
          {services.description.length}/{MAX_COMPANY_DESCRIPTION_LENGTH}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrevious}
          className="w-full rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Set up business profile
        </button>
      </div>
    </div>
  );
}
