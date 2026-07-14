'use client';

import TagAutocomplete from '@/components/forms/TagAutocomplete';
import { DAYS_OF_WEEK, TIME_OPTIONS, type BusinessDetails } from '@/features/auth/presentation/lib/businessProfile';
import { searchLocations } from '@/features/dashboard/presentation/lib/locations';

interface BusinessDetailsStepProps {
  details: BusinessDetails;
  onChange: (details: BusinessDetails) => void;
  onContinue: () => void;
}

export default function BusinessDetailsStep({ details, onChange, onContinue }: BusinessDetailsStepProps) {
  const canContinue =
    details.businessName.trim() !== '' &&
    details.phone.trim() !== '' &&
    details.days.length > 0 &&
    details.openingHours !== '' &&
    details.closingHours !== '' &&
    details.locations.length > 0;

  function toggleDay(day: string) {
    const days = details.days.includes(day)
      ? details.days.filter((current) => current !== day)
      : [...details.days, day];
    onChange({ ...details, days });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Set up your business profile</h2>
        <p className="text-sm text-gray-500">Please provide the following information about your business.</p>
      </div>

      <div>
        <label htmlFor="business-name" className="mb-1 block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <input
          id="business-name"
          type="text"
          placeholder="Enter your business name"
          value={details.businessName}
          onChange={(event) => onChange({ ...details, businessName: event.target.value })}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="business-phone" className="mb-1 block text-sm font-medium text-gray-700">
          Business Phone Number
        </label>
        <input
          id="business-phone"
          type="tel"
          placeholder="Enter your business phone number"
          value={details.phone}
          onChange={(event) => onChange({ ...details, phone: event.target.value })}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Select your days of operations</p>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                details.days.includes(day)
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="opening-hours" className="mb-1 block text-sm font-medium text-gray-700">
            Opening hours
          </label>
          <select
            id="opening-hours"
            value={details.openingHours}
            onChange={(event) => onChange({ ...details, openingHours: event.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
          >
            <option value="">select time</option>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="closing-hours" className="mb-1 block text-sm font-medium text-gray-700">
            Closing hours
          </label>
          <select
            id="closing-hours"
            value={details.closingHours}
            onChange={(event) => onChange({ ...details, closingHours: event.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
          >
            <option value="">select time</option>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TagAutocomplete
        label="What locations do you operate?"
        values={details.locations}
        onChange={(locations) => onChange({ ...details, locations })}
        suggestions={searchLocations}
        placeholder="Search for locations"
      />

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
