'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MyReview } from '@/features/dashboard/presentation/lib/myReviews';

interface MyReviewCardProps {
  review: MyReview;
  onSave: (id: string, updates: { rating: number; comment: string }) => void;
  onDelete: (id: string) => void;
}

export default function MyReviewCard({ review, onSave, onDelete }: MyReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  function handleSave() {
    onSave(review.id, { rating, comment });
    setIsEditing(false);
  }

  function handleCancel() {
    setRating(review.rating);
    setComment(review.comment);
    setIsEditing(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Image src={review.serviceImage} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-gray-900">{review.serviceTitle}</p>
            <span className="shrink-0 text-xs text-gray-400">{review.date}</span>
          </div>
          <p className="text-xs text-gray-500">{review.providerName}</p>

          {isEditing ? (
            <div className="mt-1.5 flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                  onClick={() => setRating(value)}
                  className={value <= rating ? 'text-amber-400' : 'text-gray-200'}
                >
                  ★
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-1.5 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }, (_, position) => (
                <span key={position} className={position < review.rating ? '' : 'text-gray-200'}>
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={3}
          className="mt-3 w-full rounded-md border border-gray-200 p-2.5 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
        />
      ) : (
        <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
      )}

      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-green-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md border border-green-500 px-4 py-1.5 text-sm font-semibold text-green-600 hover:bg-green-50"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(review.id)}
              className="rounded-md border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-50"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
