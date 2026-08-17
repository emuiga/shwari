import StarRating from '@/features/provider/shared/presentation/components/StarRating';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import type { ProviderReview } from '@/features/provider/shared/data/types';

interface ProviderReviewsListProps {
  reviews: ProviderReview[];
}

export default function ProviderReviewsList({ reviews }: ProviderReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Reviews from customers will show up here once they've rated your service."
      />
    );
  }

  return (
    <ul className="divide-y divide-border-soft">
      {reviews.map((review) => (
        <li key={review.id} className="py-4 first:pt-0">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-body">
              {(review.customerName ?? '?').charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-semibold text-ink">{review.customerName ?? 'Anonymous customer'}</p>
                {review.createdAt && <span className="text-xs text-faint">{review.createdAt}</span>}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={review.rating} />
                {review.serviceName && <span className="text-xs text-faint">{review.serviceName}</span>}
              </div>
              {review.comment && <p className="mt-1.5 text-sm text-body">{review.comment}</p>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
