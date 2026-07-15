import Image from 'next/image';
import type { ServiceReview } from '@/features/client/shared/presentation/lib/mockServices';

interface ReviewItemProps {
  review: ServiceReview;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="flex gap-3">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
        <Image src={review.avatar} alt={review.name} fill sizes="36px" className="object-cover" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
          <span className="text-xs text-gray-400">{review.date}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }, (_, position) => (
            <span key={position} className={position < review.rating ? '' : 'text-gray-200'}>
              ★
            </span>
          ))}
        </div>
        <p className="mt-1.5 max-w-prose text-sm text-gray-600">{review.comment}</p>
      </div>
    </div>
  );
}
