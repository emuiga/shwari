'use client';

import TagAutocomplete from '@/components/forms/TagAutocomplete';
import ImageUploader from '@/features/provider/service-listing/presentation/components/ImageUploader';
import { NAIROBI_LOCATIONS, searchLocations } from '@/lib/locations';
import { SERVICE_CATEGORIES, getCategoryById, searchSubcategoriesForCategory } from '@/features/provider/service-listing/presentation/lib/serviceCategories';
import type { ServiceListing } from '@/features/provider/service-listing/presentation/lib/mockServiceListings';

export interface ServiceListingFormValue {
  categoryId: string;
  price: string;
  serviceAreas: string[];
  locations: string[];
  images: string[];
}

interface ServiceListingFormProps {
  value: ServiceListingFormValue;
  onChange: (value: ServiceListingFormValue) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const MAX_IMAGES = 10;
const PLACEHOLDER_IMAGE = '/images/moving-service.png';

export function toFormValue(listing: ServiceListing): ServiceListingFormValue {
  return {
    categoryId: listing.categoryId,
    price: String(listing.price),
    serviceAreas: listing.serviceAreas,
    locations: listing.locations,
    images: listing.images,
  };
}

export function fromFormValue(value: ServiceListingFormValue): Omit<ServiceListing, 'id'> {
  return {
    categoryId: value.categoryId,
    price: Number(value.price) || 0,
    serviceAreas: value.serviceAreas,
    locations: value.locations,
    images: value.images.length > 0 ? value.images : [PLACEHOLDER_IMAGE],
  };
}

export default function ServiceListingForm({ value, onChange, onSubmit, submitLabel }: ServiceListingFormProps) {
  const canSubmit =
    value.categoryId !== '' && value.price !== '' && value.serviceAreas.length > 0 && value.locations.length > 0;
  const selectedCategory = getCategoryById(value.categoryId);

  function handleCategoryChange(categoryId: string) {
    onChange({ ...value, categoryId, serviceAreas: [] });
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h1 className="text-lg font-bold text-gray-900">
        {submitLabel === 'Save Details' ? 'Edit a Service' : 'Create New Service'}
      </h1>

      <div className="mt-5 grid items-start gap-5 sm:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500" htmlFor="service-type">
              Service type
            </label>
            {value.categoryId !== '' && (
              <button
                type="button"
                onClick={() => handleCategoryChange('')}
                className="text-xs font-semibold text-gray-400 hover:text-red-500"
              >
                Clear
              </button>
            )}
          </div>
          <select
            id="service-type"
            value={value.categoryId}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
          >
            <option value="">Select service type</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500" htmlFor="price">
            Price (Kes)
          </label>
          <input
            id="price"
            type="number"
            value={value.price}
            onChange={(event) => onChange({ ...value, price: event.target.value })}
            placeholder="Enter max price for the service"
            className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <TagAutocomplete
          label={selectedCategory ? `Service areas - ${selectedCategory.label}` : 'Service areas'}
          values={value.serviceAreas}
          onChange={(serviceAreas) => onChange({ ...value, serviceAreas })}
          suggestions={(query) => (selectedCategory ? searchSubcategoriesForCategory(selectedCategory.id, query) : [])}
          placeholder={selectedCategory ? 'Search service areas' : 'Select a service type first'}
          disabled={!selectedCategory}
        />

        <TagAutocomplete
          label="Locations covered"
          values={value.locations}
          onChange={(locations) => onChange({ ...value, locations })}
          suggestions={searchLocations}
          placeholder="Search for locations"
          quickSelect={{ label: 'Whole Nairobi Area', values: NAIROBI_LOCATIONS }}
        />

        <div className="sm:col-span-2">
          <ImageUploader
            label="Upload Upto 10 Images"
            images={value.images}
            onChange={(images) => onChange({ ...value, images })}
            maxImages={MAX_IMAGES}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="w-full rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
