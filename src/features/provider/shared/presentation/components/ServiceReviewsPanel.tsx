'use client';

import { useState } from 'react';
import StarRating from '@/features/provider/shared/presentation/components/StarRating';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import { MoreIcon } from '@/components/icons';
import type { ServiceReview } from '@/features/provider/shared/presentation/lib/mockReviews';

interface ServiceReviewsPanelProps {
  reviews: ServiceReview[];
}

export default function ServiceReviewsPanel({ reviews }: ServiceReviewsPanelProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (reviews.length === 0) {
    return <EmptyState className="mt-4 border-0 py-10" title="No reviews yet" description="Reviews from customers will show up here." />;
  }

  return (
    <ul className="mt-4 divide-y divide-gray-100">
      {reviews.map((review) => (
        <li key={review.id} className="py-4 first:pt-0">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
              {review.customerName.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.customerName}</p>
                  <p className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Online
                  </p>
                </div>
                <div className="relative shrink-0">
                  <button
                    type="button"
                    aria-label="More options"
                    onClick={() => setOpenMenuId((current) => (current === review.id ? null : review.id))}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <MoreIcon className="h-4 w-4" />
                  </button>
                  {openMenuId === review.id && (
                    <>
                      <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setOpenMenuId(null)}
                        className="fixed inset-0 z-10 cursor-default"
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(null)}
                          className="block w-full px-3 py-2 text-left text-xs font-semibold text-red-500 hover:bg-red-50"
                        >
                          Flag Abuse
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={review.rating} />
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-600">{review.comment}</p>
              <div className="mt-1.5 flex items-center gap-4 text-xs font-semibold">
                <button type="button" className="text-gray-500 hover:text-gray-700">
                  Reply
                </button>
                <button type="button" className="text-gray-500 hover:text-gray-700">
                  Like
                </button>
              </div>

              {review.response && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-gray-50 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                    {review.response.providerName.charAt(0)}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-gray-900">{review.response.providerName}</p>
                      {review.response.verified && (
                        <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-600">Verified</span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">{review.response.date}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
