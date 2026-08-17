'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { MoreIcon } from '@/components/icons';
import DeleteServiceModal from '@/features/provider/service-listing/presentation/components/DeleteServiceModal';
import EditServiceModal from '@/features/provider/service-listing/presentation/components/EditServiceModal';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { renderCategoryIcon } from '@/features/provider/service-listing/presentation/lib/categoryIcons';
import { ApiError } from '@/features/auth/data/authApi';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';
import type { ProviderService } from '@/features/provider/shared/data/types';

interface ServiceListingCardProps {
  listing: ProviderService;
  categories: ServiceCategory[];
}

const PLACEHOLDER_IMAGE = '/images/moving-service.png';

export default function ServiceListingCard({ listing, categories }: ServiceListingCardProps) {
  const { removeListing } = useServiceListings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const areas = listing.serviceAreas ?? [];
  const visibleAreas = areas.slice(0, 2);
  const extraCount = areas.length - visibleAreas.length;

  async function handleConfirmDelete() {
    setDeleting(true);
    try {
      await removeListing(listing.id);
      toast.success('Service Deleted Successfully', {
        description: 'This service is no longer available for customers to view.',
      });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      setDeleting(false);
      setShowDelete(false);
    }
  }

  return (
    <div className="flex flex-col rounded-card border border-border bg-white">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-card">
        <Image
          src={listing.images?.[0] || PLACEHOLDER_IMAGE}
          alt={listing.categoryName ?? 'Service'}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            listing.active ? 'bg-primary-subtle text-primary-emphasis' : 'bg-surface-muted text-subtle'
          }`}
        >
          {listing.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-emphasis">
              {renderCategoryIcon(listing.categoryCode, 'h-4.5 w-4.5')}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-ink">{listing.categoryName}</p>
              <p className="truncate text-xs font-medium text-subtle">
                KES {listing.priceFrom?.toLocaleString()} – {listing.priceTo?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              aria-label="Service actions"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-faint hover:bg-surface-muted"
            >
              <MoreIcon className="h-4 w-4" />
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="absolute right-0 z-20 mt-1 w-28 rounded-control border border-border-soft bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setShowEdit(true);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-xs text-body hover:bg-surface-muted"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setShowDelete(true);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-xs text-danger hover:bg-surface-muted"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {listing.description && <p className="mt-1.5 line-clamp-2 text-xs text-subtle">{listing.description}</p>}

        {areas.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-body">
            {visibleAreas.map((area) => (
              <span key={area} className="rounded-full bg-surface-muted px-2 py-0.5">
                {area}
              </span>
            ))}
            {extraCount > 0 && <span className="rounded-full bg-surface-muted px-2 py-0.5">+{extraCount}</span>}
          </div>
        )}
      </div>

      {showEdit && (
        <EditServiceModal listing={listing} categories={categories} onClose={() => setShowEdit(false)} />
      )}

      {showDelete && (
        <DeleteServiceModal
          listing={listing}
          deleting={deleting}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
