import { SearchIcon } from '@/features/dashboard/presentation/components/icons';
import LocationAutocomplete from '@/features/dashboard/presentation/components/LocationAutocomplete';
import MaskIcon from '@/features/dashboard/presentation/components/MaskIcon';

export default function SearchFilterBar() {
  return (
    <div className="flex items-center justify-center gap-3 border-b border-gray-100 bg-gray-50 px-6 py-6">
      <div className="flex w-full max-w-2xl items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow focus-within:shadow-md">
        <LocationAutocomplete
          label="Moving From"
          placeholder="Search origin"
          dropdownHeading="Origin"
        />
        <div className="h-9 w-px bg-gray-200" />
        <LocationAutocomplete
          label="Moving To"
          placeholder="Search destination"
          dropdownHeading="Destination"
        />
        <button
          type="button"
          aria-label="Search"
          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white transition-colors hover:bg-green-600"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <MaskIcon
          label="Filters"
          maskClassName="[mask-image:url('/icons/filter.png')] [-webkit-mask-image:url('/icons/filter.png')]"
          className="h-4 w-4"
        />
        Filters
      </button>
    </div>
  );
}
