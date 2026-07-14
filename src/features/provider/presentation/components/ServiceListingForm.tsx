'use client';

import Image from 'next/image';
import TagAutocomplete from '@/components/forms/TagAutocomplete';
import { UploadIcon, XIcon } from '@/features/dashboard/presentation/components/icons';
import { searchLocations } from '@/features/dashboard/presentation/lib/locations';
import { SERVICE_CATEGORIES, searchSubcategories } from '@/features/provider/presentation/lib/serviceCategories';
import type { ServiceListing } from '@/features/provider/presentation/lib/mockServiceListings';

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

const MAX_IMAGES = 6;
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

  return (
    <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h1 className="text-lg font-bold text-gray-900">
        {submitLabel === 'Save Details' ? 'Edit a Service' : 'Create New Service'}
      </h1>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-gray-500" htmlFor="service-type">
            Service type
          </label>
          <select
            id="service-type"
            value={value.categoryId}
            onChange={(event) => onChange({ ...value, categoryId: event.target.value })}
            className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
          >
            <option value="">select service type</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500" htmlFor="price">
            Price
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
          label="Service areas"
          values={value.serviceAreas}
          onChange={(serviceAreas) => onChange({ ...value, serviceAreas })}
          suggestions={searchSubcategories}
          placeholder="Search service areas"
        />

        <TagAutocomplete
          label="Locations covered"
          values={value.locations}
          onChange={(locations) => onChange({ ...value, locations })}
          suggestions={searchLocations}
          placeholder="Search for locations"
        />

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500">
              Upload Service Images {value.images.length}/{MAX_IMAGES}
            </p>
            <button
              type="button"
              disabled={value.images.length >= MAX_IMAGES}
              onClick={() => onChange({ ...value, images: [...value.images, PLACEHOLDER_IMAGE] })}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <UploadIcon className="h-3.5 w-3.5" />
              Upload image
            </button>
          </div>

          {value.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {value.images.map((image, index) => (
                <div key={`${image}-${index}`} className="relative h-14 w-14 overflow-hidden rounded-lg">
                  <Image src={image} alt="" fill sizes="56px" className="object-cover" />
                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={() => onChange({ ...value, images: value.images.filter((_, i) => i !== index) })}
                    className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <XIcon className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {value.images.length >= MAX_IMAGES && (
            <p className="mt-1 text-xs text-red-500">A maximum of {MAX_IMAGES} images have been uploaded</p>
          )}
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
