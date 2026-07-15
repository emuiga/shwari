'use client';

import { useState } from 'react';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import MyReviewCard from '@/features/client/reviews/presentation/components/MyReviewCard';
import { myReviews as initialMyReviews } from '@/features/client/reviews/presentation/lib/myReviews';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState(initialMyReviews);

  function handleSave(id: string, updates: { rating: number; comment: string }) {
    setReviews((current) =>
      current.map((review) => (review.id === id ? { ...review, ...updates } : review)),
    );
  }

  function handleDelete(id: string) {
    setReviews((current) => current.filter((review) => review.id !== id));
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="px-6 py-6">
        <h1 className="text-xl font-bold text-gray-900">My Reviews</h1>

        {reviews.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
            <p className="text-sm text-gray-500">You haven&apos;t left any reviews yet.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} onSave={handleSave} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
