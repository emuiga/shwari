import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import ProviderReviewsList from '@/features/provider/reviews/presentation/components/ProviderReviewsList';
import type { ProviderReview } from '@/features/provider/shared/data/types';

interface ProviderReviewsPageProps {
  reviews: ProviderReview[];
}

export default function ProviderReviewsPage({ reviews }: ProviderReviewsPageProps) {
  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="page-title">Reviews</h1>
        <p className="page-subtitle">What customers are saying about your business.</p>
        <div className="mt-6 rounded-card border border-border bg-white p-4">
          <ProviderReviewsList reviews={reviews} />
        </div>
      </main>
    </div>
  );
}
