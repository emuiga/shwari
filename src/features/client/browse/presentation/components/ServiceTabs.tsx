'use client';

import { useState } from 'react';
import ReviewItem from '@/features/client/reviews/presentation/components/ReviewItem';
import ServiceCard from '@/features/client/browse/presentation/components/ServiceCard';
import type {
  MovingService,
  ServiceReview,
} from '@/features/client/shared/presentation/lib/mockServices';

interface ServiceTabsProps {
  reviews: ServiceReview[];
  similarServices: MovingService[];
}

type Tab = 'reviews' | 'similar';

export default function ServiceTabs({ reviews, similarServices }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');

  return (
    <div className="mt-8">
      <div className="flex gap-6 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={
            activeTab === 'reviews'
              ? 'border-b-2 border-green-500 pb-3 text-sm font-semibold text-gray-900'
              : 'border-b-2 border-transparent pb-3 text-sm font-medium text-gray-400 hover:text-gray-600'
          }
        >
          Reviews
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('similar')}
          className={
            activeTab === 'similar'
              ? 'border-b-2 border-green-500 pb-3 text-sm font-semibold text-gray-900'
              : 'border-b-2 border-transparent pb-3 text-sm font-medium text-gray-400 hover:text-gray-600'
          }
        >
          Similar Services
        </button>
      </div>

      {activeTab === 'reviews' ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {similarServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
