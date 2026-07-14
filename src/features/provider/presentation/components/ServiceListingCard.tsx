import Image from 'next/image';
import Link from 'next/link';
import { getCategoryById } from '@/features/provider/presentation/lib/serviceCategories';
import { formatKes, type ServiceListing } from '@/features/provider/presentation/lib/mockServiceListings';

interface ServiceListingCardProps {
  listing: ServiceListing;
}

export default function ServiceListingCard({ listing }: ServiceListingCardProps) {
  const category = getCategoryById(listing.categoryId);
  const visibleAreas = listing.serviceAreas.slice(0, 2);
  const extraCount = listing.serviceAreas.length - visibleAreas.length;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={listing.images[0]}
          alt={category?.label ?? 'Service'}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-gray-900">{formatKes(listing.price)}</p>
        <p className="mt-0.5 text-sm text-gray-700">{category?.label}</p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-gray-600">
          {visibleAreas.map((area) => (
            <span key={area} className="rounded-full bg-gray-100 px-2.5 py-1">
              {area}
            </span>
          ))}
          {extraCount > 0 && <span className="rounded-full bg-gray-100 px-2.5 py-1">+{extraCount}</span>}
        </div>

        <Link
          href={`/provider/service-listing/${listing.id}`}
          className="mt-3 flex items-center justify-center rounded-md border border-green-500 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
        >
          View Service
        </Link>
      </div>
    </div>
  );
}
