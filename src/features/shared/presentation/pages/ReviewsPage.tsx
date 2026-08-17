'use client';

import MyReviewsPage from '@/features/client/reviews/presentation/pages/MyReviewsPage';
import ProviderReviewsPage from '@/features/provider/reviews/presentation/pages/ProviderReviewsPage';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import type { ProviderReview } from '@/features/provider/shared/data/types';

interface ReviewsPageProps {
  providerReviews: ProviderReview[];
}

export default function ReviewsPage({ providerReviews }: ReviewsPageProps) {
  const { role } = useActiveRole();
  return role === 'SERVICE_PROVIDER' ? (
    <ProviderReviewsPage reviews={providerReviews} />
  ) : (
    <MyReviewsPage />
  );
}
