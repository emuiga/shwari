'use client';

import TagAutocomplete from '@/components/forms/TagAutocomplete';
import ImageUploader from '@/features/provider/shared/presentation/components/ImageUploader';
import { NAIROBI_LOCATIONS, searchLocations } from '@/lib/locations';
import type {
  CreateServiceRequest,
  ServiceCategory,
  UpdateServiceRequest,
} from '@/features/provider/service-listing/data/types';
import type { ProviderService } from '@/features/provider/shared/data/types';

export interface ServiceListingFormValue {
  categoryCode: string;
  description: string;
  priceFrom: string;
  priceTo: string;
  serviceAreas: string[];
  active: boolean;
  mediaIds: string[];
}

interface ServiceListingFormProps {
  mode: 'create' | 'edit';
  categories: ServiceCategory[];
  value: ServiceListingFormValue;
  onChange: (value: ServiceListingFormValue) => void;
  onSubmit: () => void;
  submitLabel: string;
  submitting?: boolean;
}

const MAX_IMAGES = 10;

export function toFormValue(listing: ProviderService): ServiceListingFormValue {
  return {
    categoryCode: listing.categoryCode ?? '',
    description: listing.description ?? '',
    priceFrom: listing.priceFrom != null ? String(listing.priceFrom) : '',
    priceTo: listing.priceTo != null ? String(listing.priceTo) : '',
    serviceAreas: listing.serviceAreas ?? [],
    active: listing.active ?? true,
    mediaIds: [],
  };
}

export function toCreateRequest(value: ServiceListingFormValue): CreateServiceRequest {
  return {
    categoryCode: value.categoryCode,
    description: value.description,
    pricingModel: 'FIXED',
    priceFrom: Number(value.priceFrom) || 0,
    priceTo: Number(value.priceTo) || 0,
    serviceAreas: value.serviceAreas,
    active: value.active,
    mediaIds: value.mediaIds,
  };
}

export function toUpdateRequest(value: ServiceListingFormValue): UpdateServiceRequest {
  return {
    categoryCode: value.categoryCode,
    description: value.description,
    pricingModel: 'FIXED',
    priceFrom: Number(value.priceFrom) || 0,
    priceTo: Number(value.priceTo) || 0,
    active: value.active,
  };
}

export default function ServiceListingForm({
  mode,
  categories,
  value,
  onChange,
  onSubmit,
  submitLabel,
  submitting,
}: ServiceListingFormProps) {
  const canSubmit =
    value.categoryCode !== '' &&
    value.description.trim() !== '' &&
    value.priceFrom !== '' &&
    value.priceTo !== '' &&
    (mode === 'edit' || value.serviceAreas.length > 0);

  const fields = (
    <div className="mt-5 space-y-5">
      <div>
        <label className="text-xs font-semibold text-subtle" htmlFor="service-type">
          Service type
        </label>
        <select
          id="service-type"
          value={value.categoryCode}
          onChange={(event) => onChange({ ...value, categoryCode: event.target.value })}
          className="mt-1 w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink"
        >
          <option value="">Select service type</option>
          {categories.map((category) => (
            <option key={category.code} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-subtle" htmlFor="priceFrom">
            Price from (KES)
          </label>
          <input
            id="priceFrom"
            type="number"
            value={value.priceFrom}
            onChange={(event) => onChange({ ...value, priceFrom: event.target.value })}
            placeholder="5000"
            className="mt-1 w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-faint"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-subtle" htmlFor="priceTo">
            Price to (KES)
          </label>
          <input
            id="priceTo"
            type="number"
            value={value.priceTo}
            onChange={(event) => onChange({ ...value, priceTo: event.target.value })}
            placeholder="25000"
            className="mt-1 w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-faint"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-subtle" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
          rows={3}
          placeholder="Describe what this service covers"
          className="mt-1 w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-faint"
        />
      </div>

      {mode === 'create' && (
        <TagAutocomplete
          label="Service areas"
          values={value.serviceAreas}
          onChange={(serviceAreas) => onChange({ ...value, serviceAreas })}
          suggestions={searchLocations}
          placeholder="Search for locations"
          quickSelect={{ label: 'Whole Nairobi Area', values: NAIROBI_LOCATIONS }}
        />
      )}

      <label className="flex items-center gap-2 text-sm font-medium text-body">
        <input
          type="checkbox"
          checked={value.active}
          onChange={(event) => onChange({ ...value, active: event.target.checked })}
          className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary"
        />
        Active — visible to customers
      </label>

      {mode === 'create' && (
        <ImageUploader
          label="Upload Upto 10 Images"
          purpose="SERVICE"
          onChange={(mediaIds) => onChange({ ...value, mediaIds })}
          maxImages={MAX_IMAGES}
        />
      )}
    </div>
  );

  const submitButton = (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        disabled={!canSubmit || submitting}
        onClick={onSubmit}
        className="w-full rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </div>
  );

  if (mode === 'edit') {
    return (
      <>
        {fields}
        {submitButton}
      </>
    );
  }

  return (
    <div className="rounded-card border border-border p-4 sm:p-6">
      <h1 className="text-lg font-bold text-ink">Create New Service</h1>
      {fields}
      {submitButton}
    </div>
  );
}
